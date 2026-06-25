import { ShieldCheck, Lock, MousePointerClick, Zap } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function GuaranteeSection() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 pt-16 pb-[450px] md:py-24">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-[url('/images/garantia-mobile-bg.webp')] bg-cover bg-bottom md:bg-[url('/images/garantia-bg.webp')] md:bg-right"
        aria-hidden="true"
      >
        {/* Degradê que funde o topo (mobile) e a esquerda (desktop) com a cor da seção anterior, dando efeito de scroll infinito */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/40 to-transparent md:bg-gradient-to-r md:from-zinc-950 md:via-zinc-950/30 md:to-transparent" />
      </div>

      <ScrollReveal className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col text-center md:w-[45%] lg:w-[40%] md:text-left">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-zinc-950 shadow-[0_0_40px_rgba(250,204,21,0.3)] md:mx-0">
            <ShieldCheck size={32} />
          </div>

          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-yellow-400">
            O Risco é todo meu
          </p>

          <h2 className="mb-6 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-[3.5rem] md:leading-[1.1]">
            Estude por 15 dias sem risco financeiro.
          </h2>

          <div className="space-y-4 text-base leading-relaxed text-zinc-300 md:text-lg">
            <p>
              Você não precisa decidir agora se o método é bom ou não. 
              <strong className="mt-1 block text-white md:mt-0 md:inline"> Você pode entrar, testar tudo por 15 dias inteiros.</strong>
            </p>
            <p>
              Faça o diagnóstico inicial. Assista às aulas de revisão mais diretas que você já viu e entenda como as pegadinhas funcionam.
            </p>
            <p className="font-medium text-white/90">
              Se por qualquer motivo – qualquer um mesmo – você achar que isso não te ajudou, basta me mandar uma mensagem e eu aperto um botão para devolver 100% do seu dinheiro. Simples e sem enrolação.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-1.5 sm:gap-3">
            {[
              { icon: ShieldCheck, text: "Risco ZERO para você" },
              { icon: Lock, text: "Plataforma segura" },
              { icon: MousePointerClick, text: "Reembolso com 1 clique" },
              { icon: Zap, text: "Acesso imediato após a compra" },
            ].map((feature, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center gap-1 sm:gap-2 rounded-lg sm:rounded-xl border border-zinc-800 bg-zinc-900/50 p-2 sm:p-3 shadow-sm backdrop-blur-sm md:justify-start"
              >
                <feature.icon className="h-3.5 w-3.5 shrink-0 text-yellow-400 sm:h-4 sm:w-4" />
                <span className="whitespace-nowrap text-[8.5px] font-medium text-zinc-300 sm:text-xs">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
