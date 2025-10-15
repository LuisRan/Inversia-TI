"use client";

import { ReactNode, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function RouteGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [hideNavFooter, setHideNavFooter] = useState(false);

  useEffect(() => {
    setHideNavFooter(
      pathname.startsWith("/entorno-real/bot") ||
      pathname.startsWith("/entorno-prueba/bot")
    );
  }, [pathname]);

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <main style={{ paddingTop: hideNavFooter ? 0 : "70px", flexGrow: 1 }} className={hideNavFooter ? undefined : "container"}>
        {children}
      </main>
      {!hideNavFooter && <Footer />}
    </>
  );
}
