import { NextResponse } from "next/server";
import clientPromise from "@/utils/mongodb";
import xml2js from "xml2js";
import fs from "fs";
import path from "path";

// Tipado de noticia
interface NewsItem {
  title: string;
  description?: string;
  url: string;
  image?: string | null;
  date: string | Date;
  source: string;
  relevance?: number;
  status?: "top" | "more";
}

// Entidades dinámicas y stopwords
const dynamicEntities = ["Tesla","Apple","Microsoft","Bitcoin","Ethereum","Amazon","Google"];
const stopwords = new Set([
  "the","and","is","a","an","of","to","in","for","on","at","with","by","from","as","that","this","it","its"
]);

const IGNORE_WORDS = ["birthday", "sports score", "weather", "horoscope", "tv schedule", "famous birthdays"];

function tokenize(text: string): string[] {
  const matches = text.toLowerCase().match(/\b\w+\b/g);
  return matches ? matches : [];
}

function extractDynamicKeywords(title: string, description?: string): string[] {
  const words: string[] = tokenize(title).concat(tokenize(description || ""));
  const filtered = words.filter(w => !stopwords.has(w));
  const counts: Record<string, number> = {};
  filtered.forEach(w => counts[w] = (counts[w] || 0) + 1);

  return Object.entries(counts)
    .filter(([word, count]) => count > 1 || dynamicEntities.includes(word.charAt(0).toUpperCase() + word.slice(1)))
    .map(([word]) => word);
}

function calculateRelevance(title: string, description?: string, source?: string): number {
  const keywords = extractDynamicKeywords(title, description);
  let score = keywords.length;

  const highImpactSources = ["NewsAPI","Marketaux","EODHD","Yahoo"];
  if (source && highImpactSources.includes(source)) score += 1;

  const titleAndDesc = (title + " " + (description || "")).toLowerCase();
  dynamicEntities.forEach(entity => {
    if (titleAndDesc.includes(entity.toLowerCase())) score += 2;
  });

  return score;
}

async function fetchYahooRSS(rssUrl: string): Promise<NewsItem[]> {
  try {
    const res = await fetch(rssUrl);
    const xml = await res.text();
    const parsed = await xml2js.parseStringPromise(xml, { explicitArray: false });
    const items: any[] = parsed.rss.channel.item ? (Array.isArray(parsed.rss.channel.item) ? parsed.rss.channel.item : [parsed.rss.channel.item]) : [];
    return items.map((item: any): NewsItem => ({
      title: item.title,
      description: item.description,
      url: item.link,
      image: null,
      date: new Date(item.pubDate),
      source: "Yahoo",
      relevance: calculateRelevance(item.title, item.description, "Yahoo"),
      status: "more"
    })).slice(0, 4);
  } catch(err) {
    console.error("Yahoo RSS error:", err);
    return [];
  }
}

async function fetchAndFilter(url: string, extractFn: (data: any) => NewsItem[], sourceName: string): Promise<NewsItem[]> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API ${sourceName} response not ok: ${res.status}`);
    const data = await res.json();
    return (extractFn(data) || [])
      .map((a: NewsItem) => ({
        ...a,
        relevance: calculateRelevance(a.title, a.description, sourceName),
        status: "more" as "more"
      }))
      .slice(0, 4);
  } catch(err) {
    console.error(`${sourceName} fetch error:`, err);
    return [];
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    if (!client) throw new Error("No se pudo conectar a MongoDB");
    const db = client.db("InversiatiDB");
    const newsCol = db.collection("News");

    // Cuando todo funcione, puedes borrar esta línea sin afectar el resto
    // await newsCol.deleteMany({});

    const NEWSAPI_KEY = process.env.NEWSAPI_KEY;
    const MARKETAUX_KEY = process.env.MARKETAUX_KEY;
    const EODHD_KEY = process.env.EODHD_KEY;

    if (!NEWSAPI_KEY || !MARKETAUX_KEY || !EODHD_KEY) {
      throw new Error("Faltan keys de APIs en .env");
    }

    const [newsapi, marketaux, eodhd, yahoo] = await Promise.all([
      fetchAndFilter(
        `https://newsapi.org/v2/everything?q=finance&language=en&sortBy=publishedAt&pageSize=15&apiKey=${NEWSAPI_KEY}`,
        (data: any): NewsItem[] => data.articles?.map((a: any): NewsItem => ({
          title: a.title,
          description: a.description,
          url: a.url,
          image: a.urlToImage,
          date: a.publishedAt,
          source: "NewsAPI"
        })) || [],
        "NewsAPI"
      ),
      fetchAndFilter(
        `https://api.marketaux.com/v1/news/all?api_token=${MARKETAUX_KEY}&language=en&entities=finance,stocks,crypto&limit=15`,
        (data: any): NewsItem[] => data.data?.map((a: any): NewsItem => ({
          title: a.title,
          description: a.description,
          url: a.url,
          image: a.image_url,
          date: a.published_at,
          source: "Marketaux"
        })) || [],
        "Marketaux"
      ),
      fetchAndFilter(
        `https://eodhistoricaldata.com/api/news?api_token=${EODHD_KEY}&limit=15`,
        (data: any): NewsItem[] => data.data?.map((a: any): NewsItem => ({
          title: a.title,
          description: a.description,
          url: a.url,
          image: a.image_url || null,
          date: a.published_at,
          source: "EODHD"
        })) || [],
        "EODHD"
      ),
      fetchYahooRSS("https://finance.yahoo.com/news/rssindex")
    ]);

    let allNews: NewsItem[] = [...newsapi, ...marketaux, ...eodhd, ...yahoo];

    const seenUrls = new Set<string>();
    const discarded: NewsItem[] = [];

    // Filtrado y eliminación de duplicados + relevancia robusta
  allNews = allNews.filter(n => {
  const url = n.url.toLowerCase();
  const titleLower = n.title.toLowerCase();
  const descLower = (n.description || "").toLowerCase();

  // Ignorar si contiene palabras irrelevantes
  if (IGNORE_WORDS.some(w => titleLower.includes(w))) {
    discarded.push(n);
    return false;
  }

  // Relevancia mínima
  const rel = n.relevance ?? 0;
  if (rel < 3) {
    discarded.push(n);
    return false;
  }

  // Evitar duplicados por URL
  if (seenUrls.has(url)) {
    discarded.push(n);
    return false;
  }

  seenUrls.add(url);
  return true;
});



    // Guardar JSON de noticias descartadas en la carpeta de la page de noticias
    try {
      const jsonPath = path.join(process.cwd(), "app/noticias/discardedNews.json");
      fs.writeFileSync(jsonPath, JSON.stringify(discarded, null, 2), "utf-8");
      console.log("JSON de noticias descartadas creado:", jsonPath);
    } catch(err) {
      console.error("Error guardando discardedNews.json:", err);
    }

    // Ordenar por relevancia
    const combined: NewsItem[] = allNews.sort((a,b) => (b.relevance ?? 0) - (a.relevance ?? 0));

    const top14: NewsItem[] = combined.slice(0, 14).map(n => ({ ...n, status: "top" as "top" }));
    const more: NewsItem[] = combined.slice(14).map(n => ({ ...n, status: "more" as "more" }));

    // Borrar noticias >3 días
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    await newsCol.deleteMany({ date: { $lt: threeDaysAgo } });

    // Guardar noticias finales en DB
    await newsCol.insertMany([...top14, ...more]);

    console.log("Top14:", top14.length, "More:", more.length);
    return NextResponse.json([...top14, ...more]);
  } catch(err: any) {
    console.error("Route GET error:", err);
    return NextResponse.json([], { status: 200 });
  }
}
