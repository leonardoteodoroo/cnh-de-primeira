import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Lock } from "lucide-react";
import { closingCta } from "./data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function ClosingCTA() {
  return (
    <section className="bg-zinc-950 px-5 py-16 text-white md:px-8 md:py-24">
      <ScrollReveal className="mx-auto max-w-xl text-center">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-yellow-300">
          {closingCta.eyebrow}
        </p>

        <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">
          {closingCta.headline}
        </h2>

        <div className="mt-8 flex flex-col items-center gap-2">
          <span className="text-5xl font-extrabold tracking-tighter text-yellow-400 md:text-6xl">
            {closingCta.price}
          </span>
          <span className="text-sm font-medium text-white/60">
            {closingCta.priceNote}
          </span>
        </div>

        <div className="mt-8">
          <a
            href="https://lastlink.com/p/C144D3843/checkout-payment/"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-yellow-500 px-10 py-5 text-base font-black text-zinc-950 transition-all hover:scale-[1.02] hover:bg-yellow-400 active:scale-[0.98]"
          >
            {closingCta.cta}
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-white/50">
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <Lock className="h-4 w-4 text-yellow-500" />
            <span>Pagamento Seguro</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <ShieldCheck className="h-4 w-4 text-yellow-500" />
            <span>15 Dias de Garantia</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span>Acesso Imediato</span>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-md text-[11px] leading-relaxed text-white/40">
          {closingCta.disclaimer}
        </p>
      </ScrollReveal>
    </section>
  );
}
