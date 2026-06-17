import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { faqItems, finalBullets, salesCopy } from "./data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function FAQAndClose() {
  return (
    <section className="bg-zinc-950 px-5 py-16 text-white md:px-8 md:py-24">
      <ScrollReveal className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-yellow-300">
              Antes de decidir
            </p>
            <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">
              Respostas francas para não vender no grito.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/68">
              Transparência total. Sem promessas milagrosas, sem falsos atalhos e sem fingir que podemos substituir a etapa oficial do seu estado.
            </p>
          </div>

          <div className="grid gap-3">
            {faqItems.map((item) => (
              <article key={item.question} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <h3 className="text-base font-black text-white">{item.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/68">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-[28px] border border-yellow-300/30 bg-yellow-300 p-6 text-zinc-950 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-700">
                Próximo passo
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight md:text-5xl">
                Você pode continuar juntando dica solta. Ou pode seguir um plano.
              </h2>
              <div className="mt-6 grid gap-2 md:grid-cols-3">
                {finalBullets.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-center gap-2 text-sm font-black">
                      <Icon size={18} />
                      <span>{item.text}</span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-zinc-800">{salesCopy.officialNote}</p>
            </div>
            <Link
              href="#oferta"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-zinc-950 px-7 text-sm font-black uppercase tracking-wide text-white transition hover:bg-zinc-800"
            >
              {salesCopy.primaryCta}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
