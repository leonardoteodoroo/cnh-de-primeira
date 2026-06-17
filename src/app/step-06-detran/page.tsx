"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Typewriter } from "@/components/ui/typewriter";

export default function Step06Detran() {
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
            src="/images/detran-profit.png"
            alt="Ilustração sobre o lucro sombrio das taxas de reteste do Detran"
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
            O Lucro Sombrio com as Taxas de Reteste
          </h1>
          <div className="w-full bg-[oklch(0.96_0.005_80)] p-5 border-y border-[oklch(0.92_0.005_80)] shadow-sm">
            <div className="text-[15px] leading-relaxed text-[oklch(0.35_0.01_250)] text-left min-h-[120px]">
              <Typewriter
                text="Em estados como SP, MG e RJ, milhares de alunos fazem a prova teórica por dia. Se "
                speed={25} initialDelay={800} loop={false} showCursor={false}
              />
              <strong>
                <Typewriter
                  text="60% reprovam"
                  speed={25} initialDelay={2850} loop={false} showCursor={false}
                />
              </strong>
              <Typewriter
                text=" e gastam "
                speed={25} initialDelay={3150} loop={false} showCursor={false}
              />
              <strong>
                <Typewriter
                  text="R$ 300 reais"
                  speed={25} initialDelay={3400} loop={false} showCursor={false}
                />
              </strong>
              <Typewriter
                text=" adicionais para remarcar, quanto dinheiro a máquina pública arrecada a cada 24 horas?"
                speed={25} initialDelay={3700} loop={false} showCursor={false}
              />
              <Typewriter
                text=" Faça a conta."
                speed={40} initialDelay={7000} loop={false}
              />
            </div>
          </div>
        </motion.div>

        <div className="flex-1 min-h-[40px]" />

        {/* CTA animado vindo de baixo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full px-5 pb-8"
        >
          <Link
            href="/step-07-conta" // Próximo step
            className="w-full py-4 rounded-2xl bg-[oklch(0.25_0.01_250)] text-white text-[15px] font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-150 shadow-[0_4px_16px_oklch(0.15_0.01_250/20%)] mt-8"
          >
            Continuar
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
