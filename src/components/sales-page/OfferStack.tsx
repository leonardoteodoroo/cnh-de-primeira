import { methodSteps, offerItems, salesCopy } from "./data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function OfferStack() {
  return (
    <section id="oferta" className="bg-[oklch(0.97_0.006_85)] px-5 py-16 md:px-8 md:py-24">
      <ScrollReveal className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-yellow-700">
            {salesCopy.methodName}
          </p>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-zinc-950 md:text-5xl">
            Chega de depender da sorte para ver o{" "}
            <span className="relative inline-block text-yellow-600">
              'APTO'
              <svg
                className="absolute w-full h-2.5 -bottom-2.5 left-0 text-yellow-500"
                preserveAspectRatio="none"
                viewBox="0 0 100 10"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
              </svg>
            </span>{" "}
            no sistema.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-zinc-600 md:text-xl">
            {salesCopy.methodBody}
          </p>
        </div>

        {/* 
        <div className="mx-auto mt-10 grid grid-cols-2 md:grid-cols-3 max-w-4xl gap-2 md:gap-3">
          {methodSteps.map((step) => {
            const isThird = step.number === "3";
            return (
              <div
                key={step.number}
                className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200 text-center ${
                  isThird ? "col-span-2 md:col-span-1" : "col-span-1"
                }`}
              >
                <div className="mx-auto mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950 text-sm font-black text-white">
                  {step.number}
                </div>
                <h3 className="font-black text-zinc-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{step.text}</p>
              </div>
            );
          })}
        </div>
        */}

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {offerItems.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
                <Icon className="mb-5 text-yellow-600" size={26} />
                <h3 className="text-lg font-black leading-tight text-zinc-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.text}</p>
              </article>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}
