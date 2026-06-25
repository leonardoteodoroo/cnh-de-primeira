import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import TrackingProvider from "@/components/TrackingProvider";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://cnh-de-primeira.semprenamoda.com.br";
const SITE_NAME = "CNH de Primeira";
const SITE_DESCRIPTION =
  "Curso preparatório completo para a prova teórica da CNH com simulados comentados, diagnóstico de prontidão e plano de estudo guiado. Estude pelo celular e passe de primeira.";
const OG_IMAGE = "/images/vendas-temp/ad-4.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CNH de Primeira — Curso Preparatório para Prova Teórica da CNH",
    template: "%s | CNH de Primeira",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "CNH",
    "prova teórica CNH",
    "curso preparatório CNH",
    "simulado CNH",
    "prova do Detran",
    "estudar para CNH",
    "habilitação",
    "carteira de motorista",
    "prova teórica Detran",
    "simulado prova CNH",
    "passar de primeira CNH",
    "curso CNH online",
    "preparatório Detran",
    "questões CNH",
    "legislação de trânsito",
    "direção defensiva",
    "primeiros socorros trânsito",
    "sinalização de trânsito",
    "autoescola",
    "treino prova CNH",
  ],
  authors: [{ name: "Anderson Mageski" }],
  creator: "CNH de Primeira",
  publisher: "CNH de Primeira",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "CNH de Primeira — Curso Preparatório + Simulados para Prova Teórica da CNH",
    description:
      "Pare de estudar no escuro. Diagnóstico gratuito + curso com simulados comentados para você passar na prova teórica de primeira. R$ 44,90 pagamento único.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "CNH de Primeira — Curso Preparatório com Simulados para Prova Teórica da CNH | R$ 44,90",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CNH de Primeira — Passe na Prova Teórica de Primeira",
    description:
      "Diagnóstico gratuito + curso preparatório com simulados comentados. Estude pelo celular com plano guiado. R$ 44,90.",
    images: [OG_IMAGE],
  },
  category: "education",
};

/** JSON-LD Schema.org — Estruturado para Google e Facebook entenderem o produto */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "CNH de Primeira — Curso Preparatório para Prova Teórica da CNH",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  provider: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
  instructor: {
    "@type": "Person",
    name: "Anderson Mageski",
    jobTitle: "Professor com especialização em Gestão, Mobilidade e Segurança no Trânsito",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "PT13H",
    inLanguage: "pt-BR",
  },
  offers: {
    "@type": "Offer",
    price: "44.90",
    priceCurrency: "BRL",
    availability: "https://schema.org/InStock",
    url: "https://lastlink.com/p/C144D3843/checkout-payment/",
    validFrom: "2025-01-01",
  },
  educationalLevel: "Beginner",
  about: [
    "Legislação de Trânsito",
    "Direção Defensiva",
    "Primeiros Socorros",
    "Mecânica Básica",
    "Meio Ambiente e Cidadania",
    "Sinalização de Trânsito",
  ],
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
    audienceType: "Candidatos à primeira habilitação (CNH) no Brasil",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    bestRating: "5",
    ratingCount: "60",
  },
  image: `${SITE_URL}${OG_IMAGE}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`h-full overflow-x-hidden antialiased ${outfit.className}`}
    >
      <head>
        {/* JSON-LD Structured Data — Google Rich Results + Facebook Product Understanding */}
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <TrackingProvider>
          {children}
        </TrackingProvider>
      </body>
    </html>
  );
}
