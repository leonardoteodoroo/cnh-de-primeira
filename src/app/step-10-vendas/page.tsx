"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function LegacyVendasPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/step-10-sales-page");
  }, [router]);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-[oklch(0.985_0.003_85)] px-5 text-center text-[oklch(0.15_0.01_250)]">
      <section className="max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-700">
          Página atualizada
        </p>
        <h1 className="mt-3 text-2xl font-black">A página de vendas mudou de endereço.</h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          Você será encaminhado para a nova sales page do CNH de Primeira.
        </p>
        <Link
          href="/step-10-sales-page"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white"
        >
          Ir para a nova página
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
