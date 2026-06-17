import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CNH de Primeira",
  description: "Diagnóstico rápido para estudar para a prova teórica da CNH com mais clareza.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className="h-full overflow-x-hidden antialiased"
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">{children}</body>
    </html>
  );
}
