import Image from "next/image";
import { Award, GraduationCap, ShieldCheck } from "lucide-react";
import { salesCopy } from "./data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function InstructorSection() {
  return (
    <section className="bg-zinc-950 px-5 py-16 text-white md:px-8 md:py-24">
      <ScrollReveal className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.82fr_1fr] md:items-center">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
          <Image
            src="/images/vendas-temp/instrutor-anderson.jpeg"
            alt="Anderson Mageski, instrutor do CNH de Primeira, em foto editorial durante apresentação"
            width={1792}
            height={2400}
            sizes="(min-width: 768px) 42vw, 100vw"
            className="aspect-[4/5] w-full object-cover object-[50%_20%]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-300">
              Instrutor
            </p>
            <h2 className="mt-1 text-2xl font-black">{salesCopy.instructorName}</h2>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-yellow-300">
            Quem guia o plano
          </p>
          <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">
            Um professor para organizar o que a internet deixa solto.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/72">{salesCopy.instructorBody}</p>

          <div className="mt-8 grid gap-3">
            {[
              { icon: GraduationCap, text: salesCopy.instructorRole },
              { icon: Award, text: "Aulas diretas para revisão e treino de prova teórica" },
              { icon: ShieldCheck, text: "Preparação complementar, sem promessa absoluta" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <Icon className="mt-0.5 shrink-0 text-yellow-300" size={20} />
                  <span className="text-sm leading-relaxed text-white/78">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
