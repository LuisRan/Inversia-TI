'use client';

import { useAuth } from "@/utils/authContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TestPage() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const isAdmin = user?.email === adminEmail;

  return (
    <main className="container py-5" style={{ color: "#DBDBDB" }}>
      <h1 className="mb-4">Modo Prueba</h1>

      <section className="mb-4" style={{ color: "#DBDBDB" }}>
        <p>
          Bienvenido al Modo Prueba, un entorno seguro y libre de riesgos donde puedes
          experimentar y perfeccionar tus estrategias de trading sin utilizar dinero real.
          Aquí, cada operación es simulada con datos de mercado en tiempo real para que
          puedas aprender, probar y ajustar tus métodos de inversión con total confianza.
        </p>
        <p>
          Nuestra plataforma te brinda acceso a las mismas herramientas avanzadas de análisis
          e inteligencia artificial que en el modo real, permitiéndote familiarizarte con
          el comportamiento del mercado y la respuesta del sistema antes de operar con capital
          real.
        </p>
        <p>
          Este modo es ideal para principiantes que desean adquirir experiencia y para traders
          experimentados que buscan probar nuevas estrategias o ajustes sin comprometer su
          patrimonio.
        </p>
      </section>

      {/* Mensaje condicional según sesión */}
      <section className="mb-4" style={{ color: "#DBDBDB" }}>
        {!isLoggedIn ? (
          <p>
            Para acceder a esta herramienta debes{" "}
            <Link
              href="/login"
              style={{ color: "yellow", textDecoration: "underline", cursor: "pointer" }}
            >
              iniciar sesión con tu cuenta
            </Link>{" "}
            .
          </p>
        ) : (
          <>
            <p>
              Estás conectado. Haz clic en el siguiente botón para ingresar al modo prueba
              y comenzar a experimentar con las funcionalidades del trading automatizado sin
              riesgo alguno.
            </p>
            <button
              className="btn btn-primary"
              onClick={() =>
                router.push(isAdmin ? "/prueba/entorno-prueba/admin" : "/prueba/entorno-prueba/bot")
              }
              aria-label="Entrar al modo prueba"
            >
              {isAdmin ? "Entrar al Panel Admin" : "Entrar al Modo Prueba"}
            </button>
          </>
        )}
      </section>

      <section className="mt-5" style={{ color: "#DBDBDB" }}>
        <h2>Beneficios del Modo Prueba</h2>
        <p>
          En este entorno podrás monitorear el desempeño de tus estrategias, analizar resultados
          sin presión financiera y mejorar continuamente tu enfoque con datos precisos y en tiempo real.
          Próximamente añadiremos reportes detallados y simuladores avanzados para potenciar tu aprendizaje.
        </p>

        {/* Aquí puedes añadir más contenido o futuras funcionalidades */}
      </section>
    </main>
  );
}
