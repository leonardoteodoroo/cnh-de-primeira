"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ForceTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Impede o navegador de restaurar a posição de scroll anterior no F5
      window.history.scrollRestoration = "manual";
      
      // Força o scroll para o topo absoluto
      window.scrollTo(0, 0);

      // Se houver hash na URL que esteja causando a queda, removemos da URL (sem recarregar a página)
      if (window.location.hash) {
        window.history.replaceState(null, "", pathname);
      }
    }
  }, [pathname]);

  return null;
}
