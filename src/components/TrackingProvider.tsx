"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
    trackExitPopup: () => void;
  }
}

const FB_PIXEL_IDS = ["563316966782879", "1575575627612728"];
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyeF18pyGxZGVJ8yCmOKWzSVwdbGeJvW5Qvhweb6DlLke7Td0WBM74qa1oxDhBgSiWoEg/exec";

// Mapeamento de rotas para colunas/etapas da planilha do Sheets
const PATH_TO_EVENT: Record<string, string> = {
  "/": "hero",
  "/step-01-hero": "hero",
  "/step-01-hero-lab1": "hero",
  "/step-01-hero-lab2": "hero",
  "/step-02-pergunta-01": "pergunta_01",
  "/step-03-pergunta-02": "pergunta_02",
  "/step-04-pergunta-03": "pergunta_03",
  "/step-05-pergunta-04": "pergunta_04",
  "/step-06-detran": "detran",
  "/step-07-conta": "conta",
  "/step-08-depoimentos": "depoimentos",
  "/step-09-estudar-certo": "estudar_certo",
  "/step-10-sales-page": "sales_page",
  "/obrigado": "obrigado",
};

// Helpers de Cookies
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `; expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}${expires}; path=/; SameSite=Lax`;
}

// Helpers de LocalStorage
function getStorage(key: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
}

function setStorage(key: string, value: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, value);
}

// Gera um visitor_id único caso o usuário não possua
function generateVisitorId(): string {
  const ts = Date.now();
  const rand = Math.random().toString(36).substring(2, 11);
  return `cnh_${ts}_${rand}`;
}

export default function TrackingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isInitialized = useRef(false);

  // Armazena dados de rastreamento compartilhados e persistentes
  const trackingDataRef = useRef<{
    visitorId: string;
    gclid: string;
    gbraid: string;
    wbraid: string;
    fbclid: string;
    fbc: string;
    fbp: string;
  }>({
    visitorId: "",
    gclid: "",
    gbraid: "",
    wbraid: "",
    fbclid: "",
    fbc: "",
    fbp: "",
  });

  // 1. Inicialização de dados (roda apenas uma vez na montagem do cliente)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // A. Identificação do Visitante (visitor_id)
    let visitorId = getStorage("cnh_visitor_id") || getCookie("cnh_visitor_id");
    if (!visitorId) {
      visitorId = generateVisitorId();
      setStorage("cnh_visitor_id", visitorId);
      setCookie("cnh_visitor_id", visitorId);
    }
    trackingDataRef.current.visitorId = visitorId;

    // B. Captura de Parâmetros de Marketing da URL
    const searchParams = new URLSearchParams(window.location.search);
    const keys = ["gclid", "gbraid", "wbraid", "fbclid"] as const;

    keys.forEach((key) => {
      const val = searchParams.get(key);
      if (val) {
        setStorage(`cnh_mkt_${key}`, val);
        trackingDataRef.current[key] = val;
      } else {
        trackingDataRef.current[key] = getStorage(`cnh_mkt_${key}`) || "";
      }
    });

    // C. Cookies da Meta (fbc / fbp)
    let fbp = getCookie("_fbp") || "";
    let fbc = getCookie("_fbc") || "";

    // Se tiver fbclid na URL e não tiver o cookie _fbc, cria o formato recomendado
    if (trackingDataRef.current.fbclid && !fbc) {
      const creationTime = Date.now();
      fbc = `fb.1.${creationTime}.${trackingDataRef.current.fbclid}`;
      setCookie("_fbc", fbc);
    }

    trackingDataRef.current.fbp = fbp;
    trackingDataRef.current.fbc = fbc;

    if (process.env.NODE_ENV !== "production") {
      console.log("⚡ CNH Tracker Inicializado:", trackingDataRef.current);
    }

    isInitialized.current = true;

    // Função exposta globalmente para traquear a exibição do Exit Intent Popup
    window.trackExitPopup = () => {
      if (process.env.NODE_ENV !== "production") {
        console.log("🚪 Rastreando exibição do Exit Popup...");
      }

      // 1. Enviar para a planilha
      const payload = {
        visitor_id: trackingDataRef.current.visitorId,
        event_type: "exit_popup",
        gclid: trackingDataRef.current.gclid,
        gbraid: trackingDataRef.current.gbraid,
        wbraid: trackingDataRef.current.wbraid,
        fbclid: trackingDataRef.current.fbclid,
        fbc: trackingDataRef.current.fbc,
        fbp: trackingDataRef.current.fbp,
        user_agent: navigator.userAgent,
        screen: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        timestamp: new Date().toISOString(),
      };

      fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(payload),
        keepalive: true,
      });

      // 2. Enviar Pixel da Meta
      if (typeof window.fbq === "function") {
        window.fbq("trackCustom", "cnh_exit_popup");
      }
    };

    // D. Capturar clique no botão de checkout (Redirect para o LastLink)
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.href && anchor.href.includes("lastlink.com")) {
        if (process.env.NODE_ENV !== "production") {
          console.log("🛒 Clique em Checkout Detectado! Enviando tracking...");
        }

        // 1. Dispara o webhook com keepalive: true para garantir a entrega
        const payload = {
          visitor_id: trackingDataRef.current.visitorId,
          event_type: "checkout_click",
          gclid: trackingDataRef.current.gclid,
          gbraid: trackingDataRef.current.gbraid,
          wbraid: trackingDataRef.current.wbraid,
          fbclid: trackingDataRef.current.fbclid,
          fbc: trackingDataRef.current.fbc,
          fbp: trackingDataRef.current.fbp,
          user_agent: navigator.userAgent,
          screen: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language,
          timestamp: new Date().toISOString(),
        };

        fetch(WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(payload),
          keepalive: true,
        });

        // 2. Dispara Pixel da Meta (InitiateCheckout + Evento Customizado)
        if (typeof window.fbq === "function") {
          window.fbq("track", "InitiateCheckout", {
            value: 44.90,
            currency: "BRL",
            content_name: "CNH de Primeira",
            content_category: "Course",
            content_ids: ["cnh-de-primeira"],
            content_type: "product"
          });
          window.fbq("trackCustom", "cnh_checkout_click");
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  // 2. Monitoramento de transições de rotas (Funil e Meta Pixel PageView)
  useEffect(() => {
    // Garante que só dispara eventos depois que os dados de identificação foram lidos/gerados
    if (!isInitialized.current) return;

    // A. Enviar PageView para o Facebook Pixel
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }

    // B. Enviar Webhook para o Google Sheets (se mapeado)
    // Normaliza o pathname para remover barras no final (ex: /step-02-pergunta-01/ -> /step-02-pergunta-01)
    const cleanPathname = pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

    const eventType = PATH_TO_EVENT[cleanPathname];
    if (eventType) {
      if (process.env.NODE_ENV !== "production") {
        console.log(`📍 Funil: transição para o step "${eventType}" (de "${pathname}")`);
      }

      // Dispara Evento Personalizado no Facebook Pixel para cada etapa do funil
      if (typeof window.fbq === "function") {
        window.fbq("trackCustom", `cnh_${eventType}`);
      }

      const payload = {
        visitor_id: trackingDataRef.current.visitorId,
        event_type: eventType,
        gclid: trackingDataRef.current.gclid,
        gbraid: trackingDataRef.current.gbraid,
        wbraid: trackingDataRef.current.wbraid,
        fbclid: trackingDataRef.current.fbclid,
        fbc: trackingDataRef.current.fbc,
        fbp: trackingDataRef.current.fbp,
        user_agent: navigator.userAgent,
        screen: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        timestamp: new Date().toISOString(),
      };

      fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    }
  }, [pathname]);

  return (
    <>
      {/* Script do Meta Pixel */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_IDS[0]}');
            fbq('init', '${FB_PIXEL_IDS[1]}');
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* Noscript fallback para rastreamento sem JS */}
      {FB_PIXEL_IDS.map((id) => (
        <noscript key={id}>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      ))}

      {children}
    </>
  );
}
