"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import { salesCopy } from "./data";

export function SalesHero() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.13_0.015_85)] text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/vendas-temp/ad-3.png"
          alt="Capa do CNH de Primeira com mesa de estudos, notebook com aula teórica e materiais de revisão"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/50 to-[oklch(0.13_0.015_85)]" />
      </div>

      <div className="relative mx-auto flex min-h-dvh max-w-6xl flex-col px-5 py-6 md:px-8">
        <nav className="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.18em] text-white/70">
          <Link href="/step-09-estudar-certo" className="hover:text-white">
            Voltar
          </Link>
          <span>CNH de Primeira</span>
        </nav>

        <div className="flex flex-1 items-center py-14 md:py-20">
          <div className="grid w-full items-center gap-10 md:grid-cols-[1.04fr_0.78fr]">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-yellow-200 backdrop-blur">
                <BadgeCheck size={16} />
                {salesCopy.heroEyebrow}
              </div>

              <h1 className="max-w-[860px] text-[44px] font-black leading-[0.95] tracking-tight md:text-[78px]">
                {salesCopy.heroTitle}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/82 md:text-xl">
                {salesCopy.heroBody}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#oferta"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-yellow-300 px-6 text-sm font-black uppercase tracking-wide text-black shadow-[0_18px_50px_rgba(250,204,21,0.24)] transition hover:bg-yellow-200"
                >
                  {salesCopy.primaryCta}
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="#mural-do-amor"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition hover:bg-white/16"
                >
                  {salesCopy.secondaryCta}
                  <ArrowDown size={18} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 22 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[28px] border border-white/16 bg-white/10 p-3 shadow-2xl backdrop-blur-md"
            >
              <div className="overflow-hidden rounded-[20px] bg-black">
                <Image
                  src="/images/vendas-temp/ad-3.png"
                  alt="Visual da capa oficial usada na página de vendas do CNH de Primeira"
                  width={1672}
                  height={941}
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 pt-3 text-center text-[11px] font-bold uppercase tracking-tight text-white/78">
                <span className="rounded-xl bg-white/10 px-2 py-3">Diagnóstico</span>
                <span className="rounded-xl bg-white/10 px-2 py-3">Questões</span>
                <span className="rounded-xl bg-white/10 px-2 py-3">Plano</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
