"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { TextEffect } from "@/components/ui/text-effect";

export default function Step07Conta() {
  const slowBlurVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.04 },
      },
    },
    item: {
      hidden: { opacity: 0, filter: 'blur(8px)' },
      visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.5 } },
    },
  };

  return (
    <main className="min-h-dvh flex flex-col bg-[oklch(0.98_0.003_80)] text-[oklch(0.15_0.01_250)] selection:bg-[oklch(0.85_0.08_80)]">
      <section className="flex-1 flex flex-col items-center">
        {/* Imagem (Edge-to-edge) com efeito de fade e scale leve */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full aspect-video relative overflow-hidden"
        >
          <Image
            src="/step-07-conta.jpeg"
            alt="Ilustração de uma calculadora somando taxas de reteste da prova teórica do Detran"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Título e Texto com slide up e fade in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mb-auto flex flex-col items-center mt-6"
        >
          <h1 className="text-[22px] font-bold leading-tight tracking-tight text-[oklch(0.15_0.01_250)] mb-5 text-center px-5">
            Quanto custa reprovar?
          </h1>
          <div className="w-full px-5 mt-2 flex flex-col gap-4">
            {/* Tabela de Custos */}
            <div className="w-full flex flex-col font-mono text-[13px] sm:text-[14px] text-[oklch(0.25_0.02_250)]">
              {/* Row 1 */}
              <div className="flex justify-between items-start py-4 border-b border-dashed border-[oklch(0.90_0.01_250)] gap-4">
                <div className="flex-1 leading-snug">
                  <TextEffect per="word" variants={slowBlurVariants} delay={0.2}>1. Taxa Estadual de Reexame do Detran</TextEffect>
                </div>
                <div className="text-red-600 font-semibold text-right whitespace-nowrap">
                  <TextEffect per="word" variants={slowBlurVariants} delay={1.0}>R$ 90,00 a R$ 180,00</TextEffect>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex flex-col py-4 border-b border-dashed border-[oklch(0.90_0.01_250)] gap-1">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 leading-snug">
                    <TextEffect per="word" variants={slowBlurVariants} delay={1.8}>2. Taxa de Remarcação da Autoescola</TextEffect>
                  </div>
                  <div className="text-red-600 font-semibold text-right whitespace-nowrap">
                    <TextEffect per="word" variants={slowBlurVariants} delay={2.6}>R$ 150,00 a R$ 250,00</TextEffect>
                  </div>
                </div>
                <div className="font-sans text-[11px] text-[oklch(0.55_0.01_250)] tracking-tight">
                  <TextEffect per="word" variants={slowBlurVariants} delay={3.4}>(Custo administrativo opcional cobrado abusivamente)</TextEffect>
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex justify-between items-start py-4 border-b border-dashed border-[oklch(0.90_0.01_250)] gap-4">
                <div className="flex-1 leading-snug">
                  <TextEffect per="word" variants={slowBlurVariants} delay={4.2}>3. Transporte até o Local de Exame (2 viagens)</TextEffect>
                </div>
                <div className="text-[oklch(0.25_0.02_250)] font-semibold text-right">
                  <TextEffect per="word" variants={slowBlurVariants} delay={5.1}>R$ 40,00 a R$ 80,00</TextEffect>
                </div>
              </div>

              {/* Row 4 */}
              <div className="flex justify-between items-start py-4 border-b border-dashed border-[oklch(0.90_0.01_250)] gap-4">
                <div className="flex-1 leading-snug">
                  <TextEffect per="word" variants={slowBlurVariants} delay={5.9}>4. Hora-Trabalho perdida ou dia de folga no emprego</TextEffect>
                </div>
                <div className="text-[oklch(0.25_0.02_250)] font-semibold text-right">
                  <TextEffect per="word" variants={slowBlurVariants} delay={6.8}>R$ 100,00 a R$ 200,00</TextEffect>
                </div>
              </div>

              {/* Footer Row */}
              <div className="flex justify-between items-center py-6 gap-2">
                <div className="font-bold text-[13px] sm:text-[14px] leading-tight">
                  <TextEffect per="word" variants={slowBlurVariants} delay={7.6}>PREJUÍZO FINANCEIRO ESTIMADO</TextEffect>
                </div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 8.3 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md font-bold text-right whitespace-nowrap text-[13px] sm:text-[14px]"
                >
                  R$ 380,00 a R$ 710,00
                </motion.div>
              </div>
            </div>

          </div>
        </motion.div>

        <div className="flex-1 min-h-[40px]" />

        {/* Container do Botão e Aviso */}
        <div className="w-full px-5 pb-8 flex flex-col">
          {/* CTA animado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <Link
              href="/step-08-depoimentos" // Próximo step
              className="w-full py-4 rounded-2xl bg-[oklch(0.25_0.01_250)] text-white text-[15px] font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-150 shadow-[0_4px_16px_oklch(0.15_0.01_250/20%)]"
            >
              Ver quem passa de primeira
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Aviso movido para baixo do botão */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-[13px] sm:text-[14px] leading-relaxed text-orange-900 mt-4"
          >
            👉 <strong>O sistema confuso e caro que transforma erro em retrabalho:</strong> A burocracia do trânsito foi estruturada para prolongar seu processo. Cada erro simples em uma alternativa dúbia te obriga a reiniciar prazos, pagar taxas adicionais e alimentar os custos administrativos do ecossistema.
          </motion.div>
        </div>
      </section>
    </main>
  );
}
