import { painCards, salesCopy } from "./data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function DiagnosticShift() {
  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-24">
      <ScrollReveal className="mx-auto max-w-6xl">
        <div className="grid gap-10 text-center md:grid-cols-[0.9fr_1.1fr] md:items-end md:text-left">
          <div>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-zinc-950 md:text-5xl">
              {salesCopy.diagnosticTitle}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-zinc-600 md:text-xl">
            {salesCopy.diagnosticBody}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {painCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-200 text-zinc-950">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-black leading-tight text-zinc-950">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{card.text}</p>
              </article>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}
