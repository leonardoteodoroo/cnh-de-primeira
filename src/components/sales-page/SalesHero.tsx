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
        <picture>
          <source media="(min-width: 768px)" srcSet="/images/vendas-temp/hero-desktop.jpeg" />
          <img
            src="/images/vendas-temp/hero-mobile.jpeg"
            alt="Capa do método CNH de Primeira"
            loading="eager"
            decoding="sync"
            className="h-full w-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/50 to-[oklch(0.985_0.003_85)] md:via-black/30" />
      </div>

      <div className="relative mx-auto flex min-h-dvh max-w-6xl flex-col px-5 py-6 md:px-8">
        <div className="flex flex-1 items-start pt-2 pb-14 md:items-center md:py-20">
          <div className="grid w-full items-center gap-10 md:grid-cols-[1.04fr_0.78fr]">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-yellow-300 backdrop-blur-md">
                <BadgeCheck size={16} className="text-yellow-400" />
                {salesCopy.heroEyebrow}
              </div>

              <h1 className="max-w-[860px] text-[48px] font-extrabold leading-[1.05] tracking-tight md:text-[84px]">
                <span className="mb-2 block text-white/80 md:text-[68px]">
                  A CNH mudou.
                </span>
                <span className="block text-white">O jeito de estudar também.</span>
              </h1>

              <p className="mt-8 max-w-[600px] text-lg font-medium leading-[1.65] text-white/70 md:text-[22px]">
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
                  href="#oferta"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition hover:bg-white/16"
                >
                  {salesCopy.secondaryCta}
                  <ArrowDown size={18} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="-mx-5 mt-10 border-y border-white/10 bg-black/40 pb-5 shadow-2xl backdrop-blur-xl md:mx-0 md:mt-0 md:rounded-[28px] md:border md:bg-white/10 md:p-3 md:pb-3"
            >
              <div className="relative aspect-video w-full overflow-hidden shadow-inner md:aspect-[4/3] md:rounded-[20px]">
                <Image
                  src="/images/vendas-temp/ad-3.png"
                  alt="Interface do CNH de Primeira"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
              
              <div className="mt-5 flex items-center justify-between gap-2 px-5 md:mt-3 md:px-1">
                {["Diagnóstico", "Questões", "Plano"].map((label) => (
                  <span
                    key={label}
                    className="flex-1 rounded-xl bg-white/10 py-2.5 text-center text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-md md:text-xs"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
