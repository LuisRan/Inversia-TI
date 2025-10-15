'use client';

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top py-4 shadow">
      <div className="container">
        <Link href="/" className="navbar-brand fs-3">
          Inversia
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className="nav-link active">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/real" className="nav-link">
                Modo Real
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/prueba" className="nav-link">
                Modo Prueba
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/indicadores" className="nav-link">
                Indicadores
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/noticias" className="nav-link">
                Noticias
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/login" className="nav-link">
                Login 
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
