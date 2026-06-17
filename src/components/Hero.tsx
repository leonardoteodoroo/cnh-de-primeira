import Image from 'next/image';
import Link from 'next/link';
import { TextEffect } from '@/components/ui/text-effect';
import { Typewriter } from '@/components/ui/typewriter';

export default function Hero() {
  const slowBlurVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
      },
    },
    item: {
      hidden: { opacity: 0, filter: 'blur(12px)' },
      visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 1.2 } },
    },
  };

  const slowSlideVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
    },
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-slate-50">
      {/* Decorações de Fundo (Visíveis apenas no desktop para não poluir o mobile) */}
      <div className="hidden lg:block absolute z-0 rounded-full blur-[80px] opacity-40 pointer-events-none bg-emerald-500 w-[400px] h-[400px] -top-[100px] right-[10%] transform-gpu will-change-transform" />
      <div className="hidden lg:block absolute z-0 rounded-full blur-[80px] opacity-40 pointer-events-none bg-blue-500 w-[300px] h-[300px] -bottom-[50px] -left-[100px] transform-gpu will-change-transform" />

      <main className="relative min-h-screen flex flex-col lg:justify-center z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl mx-auto lg:px-8">

          {/* Coluna de Imagem (Mobile First: Fica no topo ocupando a tela, com o degradê) */}
          <div className="order-1 lg:order-2 relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-auto lg:h-[700px] lg:rounded-3xl overflow-hidden lg:shadow-2xl lg:[transform:perspective(1000px)_rotateY(-5deg)_translateZ(0)] hover:lg:[transform:perspective(1000px)_rotateY(0deg)_translateZ(0)] transition-transform duration-500 will-change-transform transform-gpu">
            <Image
              src="/images/hero.png"
              alt="Jovem comemorando aprovação na prova teórica com alívio"
              fill
              priority
              className="object-cover object-bottom lg:object-center scale-110 lg:scale-100 origin-bottom"
            />
            {/* Efeito Degradê Mobile: Fica por cima da imagem criando o "halo" para o texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent lg:hidden" />
          </div>

          {/* Coluna de Texto (Mobile: Fica embaixo e "sobe" no degradê da imagem via margin negativa) */}
          <div className="order-2 lg:order-1 relative z-20 flex flex-col gap-6 lg:items-start text-center lg:text-left px-6 lg:px-0 -mt-[20%] md:-mt-[15%] lg:mt-0 pb-16 lg:pb-0">
            <div className="inline-block px-4 py-2 bg-slate-50/80 backdrop-blur-md border border-emerald-100 text-emerald-800 rounded-full font-semibold text-sm w-fit lg:mx-0 mx-auto tracking-wide shadow-sm">
              Você está pronto(a) para a prova teórica?
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-slate-900 tracking-tight drop-shadow-sm lg:drop-shadow-none">
              <TextEffect variants={slowBlurVariants} per="word" delay={0.2}>
                A CNH mudou.
              </TextEffect>
              <span className="text-emerald-600 inline-block mt-2">
                <TextEffect variants={slowSlideVariants} per="word" delay={1.2}>
                  O jeito de estudar também.
                </TextEffect>
              </span>
            </h1>

            {/* Texto de Apoio com Efeito Typewriter */}
            <div className="text-lg md:text-xl leading-relaxed text-slate-700 max-w-[540px] lg:mx-0 mx-auto mt-2 min-h-[140px] md:min-h-[100px]">
              <Typewriter
                text="O novo processo ficou mais livre. Agora você precisa de um plano para não se perder. Antes de marcar a prova, descubra se você está pronto e elimine o medo de reprovar."
                speed={35}
                initialDelay={2200}
                loop={false}
              />
            </div>

            <div className="flex flex-wrap gap-4 mt-2 lg:justify-start justify-center w-full">
              <Link href="/step-02-pergunta-01" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-medium text-lg bg-emerald-500 text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:bg-emerald-600 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] transition-all">
                É GRÁTIS! É RÁPIDO! 🚦➡️
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
