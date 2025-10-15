// app/layout.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { AuthProvider } from "@/utils/authContext";

export const metadata: Metadata = {
  title: "Inversia - TI",
  description: "Plataforma de trading automatizado con inteligencia artificial",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/logo-inversia.png",
    shortcut: "/logo-inversia.png",
    apple: "/logo-inversia.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/logo-inversia.png" />
      </head>
      <body
        style={{
          backgroundColor: "#0F0F0F",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          margin: 0,
        }}
      >
        <AuthProvider>
          <Navbar />
          <main style={{ paddingTop: "70px", flexGrow: 1 }} className="container">
            {children}
          </main>
          <Footer />
        </AuthProvider>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          async
        />
      </body>
    </html>
  );
}