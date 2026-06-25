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

        <div className="mt-10 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {painCards.slice(0, 2).map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-center sm:p-6 sm:text-left"
                >
                  <div className="mx-auto mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-200 text-zinc-950 sm:mx-0 sm:h-11 sm:w-11">
                    <Icon size={20} className="sm:hidden" />
                    <Icon size={22} className="hidden sm:block" />
                  </div>
                  <h3 className="text-sm font-black leading-tight text-zinc-950 sm:text-lg">{card.title}</h3>
                  <p className="mt-2 text-[11px] leading-relaxed text-zinc-600 sm:text-sm">{card.text}</p>
                </article>
              );
            })}
          </div>

          {painCards.slice(2).map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-center sm:p-6"
              >
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-200 text-zinc-950">
                  <Icon size={22} />
                </div>
                <h3 className="text-base font-black leading-tight text-zinc-950 sm:text-lg">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{card.text}</p>
              </article>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}
