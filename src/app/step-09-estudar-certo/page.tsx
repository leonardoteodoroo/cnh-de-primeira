"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { TextEffect } from "@/components/ui/text-effect";
import { Typewriter } from "@/components/ui/typewriter";

export default function Step09EstudarCerto() {
  const fastBlurVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    },
    item: {
      hidden: { opacity: 0, filter: 'blur(8px)' },
      visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.4 } },
    },
  };

  const fastSlideVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    },
    item: {
      hidden: { opacity: 0, y: 15 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
    },
  };

  return (
    <main className="min-h-dvh flex flex-col bg-[oklch(0.98_0.003_80)] text-[oklch(0.15_0.01_250)] selection:bg-[oklch(0.85_0.08_80)]">
      <section className="flex-1 flex flex-col items-center pt-10 pb-8">

        {/* Título Principal */}
        <div className="w-full mb-6 px-5 mt-2">
          <h1 className="text-[32px] font-extrabold leading-tight tracking-tight text-center text-[oklch(0.15_0.01_250)] uppercase drop-shadow-sm">
            <TextEffect variants={fastBlurVariants} per="word" delay={0.0}>
              +2.000 QUESTÕES
            </TextEffect>
            <span className="text-emerald-600 inline-block mt-1">
              <TextEffect variants={fastSlideVariants} per="word" delay={0.3}>
                COMENTADAS
              </TextEffect>
            </span>
          </h1>
        </div>

        {/* Narrativa e Quebra */}
        <div className="w-full mb-6 px-5 mt-2 min-h-[70px]">
          <div className="text-[oklch(0.3_0.01_250)] text-[15px] leading-relaxed">
            <span className="font-bold uppercase text-[oklch(0.15_0.01_250)]">
              <Typewriter
                text="NOSSA... SÓ DE LER JÁ ATÉ CANSA, NÃO ACHA?"
                speed={25} initialDelay={800} loop={false} showCursor={false}
              />
            </span>
            <Typewriter
              text=" Você tenta aprender sozinho(a)... pesquisa na internet... O resultado?"
              speed={25} initialDelay={1900} loop={false} showCursor={true}
            />
          </div>
        </div>

        {/* Imagem (Edge-to-edge) com efeito de fade e scale leve */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 3.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full aspect-video mb-8 relative overflow-hidden"
        >
          <Image
            src="/images/caos-youtube.jpeg"
            alt="Mural caótico do YouTube"
            fill
            className="object-cover scale-[1.02]"
            priority
          />
        </motion.div>

        {/* Resolução do problema Parte 1 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 4.0, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mb-4 px-5"
        >
          <p className="text-[oklch(0.3_0.01_250)] text-[15px] leading-relaxed">
            Te empurram 2 mil coisas para decorar. Questões que mais caem. Ah, e o melhor: <span className="font-bold underline decoration-[oklch(0.8_0.02_250)] underline-offset-4">BAIXE O APP</span>. Daí você baixa e, no dia seguinte, tem bandido usando sua foto e mandando mensagens para seus contatos pedindo para pagar boleto. Ou seu celular enche de anúncios pornô.
          </p>
        </motion.div>

        {/* Ponte Dramática com Typewriter */}
        <div className="w-full px-5 py-2 mb-4 min-h-[40px]">
          <div className="text-center font-semibold italic text-[oklch(0.15_0.01_250)] text-[16px]">
            <Typewriter
              text="Olha... EU entendo."
              speed={40} initialDelay={4500} loop={false} showCursor={true}
            />
          </div>
        </div>

        {/* Resolução do problema Parte 2 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 5.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mb-8 px-5"
        >
          <p className="text-[oklch(0.3_0.01_250)] text-[15px] leading-relaxed">
            O segredo da aprovação não é sair consuminto tudo loucamente! Você precisa de um plano, não de sorte.
          </p>
        </motion.div>

        {/* Container do Botão */}
        <div className="w-full mt-auto flex flex-col pt-4 px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 5.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <Link
              href="/" // Atualizar para o step-10 depois
              className="w-full py-4 rounded-2xl bg-[oklch(0.25_0.01_250)] text-white text-[15px] font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-150 shadow-[0_4px_16px_oklch(0.15_0.01_250/20%)]"
            >
              Vamos construir um plano com calma?
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

      </section>
    </main>
  );
}
