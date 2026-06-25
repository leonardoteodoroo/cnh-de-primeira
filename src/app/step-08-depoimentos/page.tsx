"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { CarouselDepoimentos } from "@/components/CarouselDepoimentos";

export default function Step08Depoimentos() {
  return (
    <main className="min-h-dvh flex flex-col bg-[oklch(0.98_0.003_80)] text-[oklch(0.15_0.01_250)] selection:bg-[oklch(0.85_0.08_80)] overflow-x-hidden">
      <section className="flex-1 flex flex-col items-center px-0 pt-8 pb-8 max-w-full">

        {/* Título Principal com SVG */}
        <div className="w-full mb-6 px-5 flex flex-col gap-4">
          <h1 className="text-[26px] font-extrabold tracking-tight text-[oklch(0.15_0.01_250)] leading-tight">
            Passaram{" "}
            <span className="text-[oklch(0.25_0.01_250)] relative inline-block">
              EXATAMENTE
              <svg
                className="absolute w-full h-2.5 -bottom-1 left-0 text-[oklch(0.65_0.05_250)]"
                preserveAspectRatio="none"
                viewBox="0 0 100 10"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </span>{" "}
            pelo mesmo aperto que você.
          </h1>

          {/* Overlapping Avatars */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {[
                "/images/depoimentos/depoimento_mariana_1782086167193.png",
                "/images/depoimentos/depoimento_thiago_1782086187044.png",
                "/images/depoimentos/depoimento_fernanda_1782086214755.png"
              ].map((src, i) => (
                <div
                  key={i}
                  aria-hidden="true"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-[oklch(0.98_0.003_80)] bg-[oklch(0.92_0.035_150)] overflow-hidden"
                >
                  <img src={src} alt="Aluno Aprovado" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-[13px] text-[oklch(0.4_0.01_250)]">
              <span className="text-[oklch(0.25_0.01_250)] font-bold">Alunos aprovados</span> pelo método
            </div>
          </div>
        </div>

        {/* Componente de Depoimentos 3D */}
        <div className="w-full">
          <CarouselDepoimentos />
        </div>

        {/* Container do Botão */}
        <div className="w-full mt-auto flex flex-col pt-6 px-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <Link
              href="/step-09-estudar-certo"
              className="w-full py-4 rounded-2xl bg-[oklch(0.25_0.01_250)] text-white text-[15px] font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-150 shadow-[0_4px_16px_oklch(0.15_0.01_250/20%)]"
            >
              Descobrir como eles passaram
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

      </section>
    </main>
  );
}
