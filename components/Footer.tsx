"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5 border-top">
      <div className="container">
        <div className="row">
          {/* Enlaces legales */}
          <div className="col-md-12 text-center mb-2">
            <Link href="/condiciones" className="text-white me-3 text-decoration-underline">
              Condiciones de uso
            </Link>
            <span className="text-white me-3">|</span>
            <Link href="/privacidad" className="text-white text-decoration-underline">
              Aviso de privacidad
            </Link>
          </div>

          {/* Información institucional */}
          <div className="col-md-12 text-center">
            <p className="mb-1">© {new Date().getFullYear()} Inversia</p>
            <p className="mb-1">Todos los derechos reservados</p>
            <p className="mb-0 fst-italic">Impulsando tu inversión con vision</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
