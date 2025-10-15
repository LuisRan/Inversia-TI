"use client";

import { useEffect, useState } from "react";
import "./NoticiasPage.css";

interface NewsItem {
  title: string;
  description?: string;
  url: string;
  image?: string | null;
  date: string;
  relevance: number;
  source: string;
  status: "top" | "more";
}

export default function NoticiasPage() {
  const [topNews, setTopNews] = useState<NewsItem[]>([]);
  const [moreNews, setMoreNews] = useState<NewsItem[]>([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news");
        if (!res.ok) throw new Error(`Error en API: ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setTopNews(data.slice(0, 14));
          setMoreNews(data.slice(14));
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchNews();
  }, []);

  const renderNewsCard = (news: NewsItem, i: number) => (
    <div key={i} className="col mb-3">
      <div className="news-card h-100">
        {news.image && <img src={news.image} alt={news.title} />}
        <div className="card-body">
          <h5 className="card-title">{news.title}</h5>
          <p className="description">{news.description}</p>
          <a href={news.url} target="_blank" className="read-more">Leer más</a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container my-4 text-light">
      <h2 className="mb-3">Noticias destacadas</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {topNews.map(renderNewsCard)}
      </div>

      {moreNews.length > 0 && (
        <>
          <button className="btn btn-secondary my-3" onClick={() => setShowMore(!showMore)}>
            {showMore ? "Ocultar noticias" : "Ver más noticias"}
          </button>
          {showMore && (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
              {moreNews.map(renderNewsCard)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
