import Image from "next/image";
import { Award, GraduationCap, ShieldCheck } from "lucide-react";
import { salesCopy } from "./data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function InstructorSection() {
  return (
    <section className="bg-black px-5 py-16 text-white md:px-8 md:py-24">
      <ScrollReveal className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.82fr_1fr] md:items-center">
        <div className="relative -mx-5 md:mx-0">
          {/* <Image
            src="/images/vendas-temp/instrutor-anderson.webp"
            alt="O especialista e instrutor de trânsito Anderson posando em frente ao carro de autoescola com postura de autoridade"
            width={1792}
            height={2400}
            sizes="(min-width: 768px) 42vw, 100vw"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover object-[50%_20%] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
          /> */}
          <Image
            src="/images/vendas-temp/instrutor-anderson-v2.webp"
            alt="Retrato de perto do instrutor especialista Anderson focado em ajudar novos motoristas"
            width={1792}
            height={2400}
            sizes="(min-width: 768px) 42vw, 100vw"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover object-[50%_20%] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-300">
              Instrutor
            </p>
            <h2 className="mt-1 text-2xl font-black">{salesCopy.instructorName}</h2>
          </div>
        </div>

        <div>
          <p className="font-mono text-sm font-bold tracking-widest text-yellow-500 uppercase">
            SEU INSTRUTOR E GUIA
          </p>
          <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">
            A internet está cheia de dicas. E esse pode ser exatamente o seu problema.
          </h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-white/72">
            <p>
              Você encontra centenas de vídeos, resumos e macetes, mas as informações estão espalhadas e, muitas vezes, sem qualquer critério. No fim, acaba estudando conteúdos que quase nunca aparecem na prova e deixando de lado as pegadinhas que eliminam milhares de candidatos.
            </p>
            <p>
              Foi por isso que eu fiz esse trabalho por você.
            </p>
            <p>
              Analisei, filtrei e organizei os simulados com base no que os Detrans realmente cobram atualmente. Sem excesso de conteúdo e sem decoreba interminável.
            </p>
            <p>
              Aqui, você aprende a identificar a lógica da prova, entende as armadilhas mais comuns, treina com questões alinhadas ao padrão oficial e chega ao exame com mais confiança, clareza e preparo para conquistar sua aprovação.
            </p>
          </div>

          <div className="mt-8 grid gap-3">
            {[
              { icon: GraduationCap, text: "Explicações detalhadas e dicas práticas que te salvam na hora H" },
              { icon: Award, text: "Simulados para você se familiarizar com o estilo de perguntas oficial" },
              { icon: ShieldCheck, text: "Aulas de revisão direto ao ponto, no seu ritmo, quantas vezes quiser" },
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
