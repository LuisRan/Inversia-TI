'use client';

import { useState } from "react";
import { useAuth } from "@/utils/authContext";  // Ajusta ruta si es necesario
import MarketOverview from "../components/widgets/MarketOverview";
import MarketQuotes from "../components/widgets/MarketQuotes";
import TradingViewWidget from "../components/widgets/TradingViewWidget";

export default function HomePage() {
  const { user, isLoggedIn } = useAuth();
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <>
      <div style={{ color: '#fff' }}>
        <main className="container py-4">
          {/* Presentación principal */}
          <section
            id="presentation"
            className="container py-5 text-center"
            style={{ color: "#DBDBDB" }}
          >
            <h1 className="display-4 mb-3">Inversia Trading Inteligente con IA</h1>
            <p className="lead mb-4">
              Bienvenido a Inversia, la plataforma de trading del futuro donde la inteligencia artificial hace el trabajo duro por ti. 
              Olvídate de pasar horas analizando gráficos y noticias; nuestra IA monitorea el mercado 24/7, detecta oportunidades y riesgos en tiempo real, 
              tomando decisiones estratégicas basadas en datos y tendencias globales. Tú solo estableces tus parámetros y observas cómo tu inversión crece de forma inteligente y segura.
            </p>
          </section>

          {/* Acordeón con info y entornos */}
          <section className="container my-5">
            <div className="accordion" id="infoAccordion" style={{ color: "#DBDBDB" }}>
              <div className="accordion-item bg-dark border-secondary">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button collapsed bg-dark text-light"
                    type="button"
                    onClick={() => setAccordionOpen(!accordionOpen)}
                    aria-expanded={accordionOpen}
                    aria-controls="collapseOne"
                  >
                    Entornos de Inversia
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className={`accordion-collapse collapse ${accordionOpen ? "show" : ""}`}
                  aria-labelledby="headingOne"
                  data-bs-parent="#infoAccordion"
                >
                  <div className="accordion-body bg-secondary text-light">
                    <p>
                      <strong>Modo Real:</strong> Operaciones en tiempo real con dinero auténtico. Nuestra IA monitorea el mercado y ejecuta inversiones basándose en los parámetros que configures, asegurando las mejores decisiones en tu capital real.
                    </p>
                    <a href="/real" className="btn btn-success me-3 mb-3">Probar Entorno Real</a>

                    <p>
                      <strong>Modo Prueba:</strong> Un entorno seguro donde puedes experimentar sin riesgo. La IA simula inversiones con datos reales para que evalúes su desempeño y optimices tus estrategias antes de operar con dinero real.
                    </p>
                    <a href="/prueba" className="btn btn-warning mb-3">Probar Entorno de Prueba</a>
                  </div>
                </div>
              </div>

              <div className="accordion-item bg-dark border-secondary">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed bg-dark text-light"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    ¿Qué es Inversia?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#infoAccordion"
                >
                  <div className="accordion-body bg-secondary text-light">
                    Inversia es una plataforma revolucionaria de trading que combina la potencia de la inteligencia artificial con el análisis en tiempo real del mercado financiero global. 
                    A diferencia de otros servicios, Inversia no solo analiza números: nuestra IA incorpora el "ruido del mercado" — noticias, opiniones, eventos sociales y campañas de marketing — 
                    para anticipar movimientos y proteger tu inversión. El objetivo es que inviertas con confianza y maximices tus ganancias sin tener que ser un experto.
                  </div>
                </div>
              </div>

              <div className="accordion-item bg-dark border-secondary">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed bg-dark text-light"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    ¿Cómo lo hacemos?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#infoAccordion"
                >
                  <div className="accordion-body bg-secondary text-light">
                    En Inversia, nuestra IA trabaja las 24 horas como un experto trader que nunca descansa. Rastrea datos bursátiles y noticias en tiempo real, evaluando riesgos y oportunidades según tus preferencias. 
                    Puedes configurar estrategias conservadoras o agresivas, y la IA optimiza el crecimiento de tu capital. Además, ofrecemos entornos de prueba y real para que inviertas con confianza y seguridad.
                  </div>
                </div>
              </div>

              <div className="accordion-item bg-dark border-secondary">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button collapsed bg-dark text-light"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    Novedades frente a la competencia
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#infoAccordion"
                >
                  <div className="accordion-body bg-secondary text-light">
                    Lo que hace único a Inversia es su capacidad para analizar no solo cifras financieras sino también información externa — campañas, polémicas, eventos virales — que afectan directamente el valor de las acciones. 
                    Esta visión integral permite reaccionar a tiempo a cambios repentinos y proteger tu inversión como ninguna otra plataforma.
                  </div>
                </div>
              </div>

              <div className="accordion-item bg-dark border-secondary">
                <h2 className="accordion-header" id="headingFive">
                  <button
                    className="accordion-button collapsed bg-dark text-light"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    ¿Por qué elegirnos?
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#infoAccordion"
                >
                  <div className="accordion-body bg-secondary text-light">
                    Elegir Inversia significa apostar por la tranquilidad y la eficiencia. Nuestra IA trabaja para ti, minimizando riesgos y maximizando oportunidades en mercados volátiles. No necesitas experiencia previa: nosotros hacemos el análisis complejo, tú solo supervisas resultados y creces tu capital con seguridad y confianza.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-5">
            <h2 className="mb-3" style={{ color: "#DBDBDB" }}>
              Empresas Destacadas
            </h2>
            <div style={{ width: '100%', height: '400px', overflow: 'hidden' }}>
              <TradingViewWidget />
            </div>
          </section>

          <section className="mb-5">
            <h2 className="mb-3" style={{ color: "#DBDBDB" }}>
              Visión del Mercado
            </h2>
            <div style={{ width: '100%', height: '550px', overflow: 'hidden' }}>
              <MarketOverview />
            </div>
          </section>

          <section className="mb-5">
            <h2 className="mb-3" style={{ color: "#DBDBDB" }}>
              Resumen del Mercado
            </h2>
            <div style={{ width: '100%', height: '550px', overflow: 'hidden' }}>
              <MarketQuotes />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
