'use client';

import { useAuth } from "@/utils/authContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RealPage() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const isAdmin = user?.email === adminEmail;

  return (
    <main className="container py-5" style={{ color: "#DBDBDB" }}>
      <h1 className="mb-4">Modo Real</h1>

      <section className="mb-4" style={{ color: "#DBDBDB" }}>
        <p>
          Bienvenido al Modo Real, donde cada decisión cuenta porque operas con dinero
          verdadero. Aquí no solo accedes a una plataforma robusta de trading, sino que
          también cuentas con el respaldo de una inteligencia artificial avanzada que
          monitorea constantemente los mercados globales para detectar las mejores
          oportunidades de inversión.
        </p>
        <p>
          Nuestra IA utiliza algoritmos sofisticados para analizar tendencias, volúmenes y
          patrones históricos, permitiéndote automatizar tus estrategias con precisión y
          adaptabilidad en tiempo real. Así, puedes maximizar tus ganancias mientras
          minimizas riesgos potenciales, todo con un control total y una interfaz amigable.
        </p>
        <p>
          Además, este modo incluye funcionalidades exclusivas como configuraciones
          personalizadas, reportes detallados y acceso directo a alertas de mercado para
          que siempre estés un paso adelante en tus inversiones.
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
              Estás conectado. Haz clic en el siguiente botón para ingresar al modo real
              y comenzar a potenciar tus inversiones con la ayuda de nuestra IA.
            </p>
            <button
              className="btn btn-primary"
              onClick={() =>
                router.push(isAdmin ? "/real/entorno-real/admin" : "/real/entorno-real/bot")
              }
              aria-label="Entrar al modo real"
            >
              {isAdmin ? "Entrar al Panel Admin" : "Entrar al Modo Real"}
            </button>
          </>
        )}
      </section>

      <section className="mt-5" style={{ color: "#DBDBDB" }}>
        <h2>Casos destacados de la IA</h2>
        <p>
          Aquí podrás encontrar ejemplos reales y detallados que demuestran cómo nuestra
          IA ha ayudado a optimizar operaciones y maximizar beneficios en diversos mercados
          financieros. Próximamente agregaremos gráficos, análisis y testimonios que te
          permitirán entender el verdadero potencial de esta tecnología.
        </p>

        {/* Zona escalable para agregar más contenido visual o textual */}
      </section>
    </main>
  );
}
