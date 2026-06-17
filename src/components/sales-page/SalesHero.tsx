"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black md:via-black/30" />
      </div>

      <div className="relative mx-auto flex min-h-dvh max-w-6xl flex-col px-5 py-6 md:px-8">
        <div className="flex flex-1 items-start pt-12 pb-14 md:items-center md:py-20">
          <div className="grid w-full items-center gap-12 md:grid-cols-2 md:gap-16">
            
            <div className="flex flex-col">
              <div className="mb-6 inline-flex items-center gap-2 self-start rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5 text-[10px] font-black tracking-widest text-yellow-500 uppercase md:mb-8 md:px-4 md:py-2 md:text-xs">
                <ShieldCheck size={14} className="text-yellow-500" />
                {salesCopy.heroEyebrow}
              </div>

              <h1 className="max-w-[860px] text-[48px] font-extrabold leading-[1.05] tracking-tight md:text-[84px]">
                <span className="mb-2 block text-white/80 md:text-[68px]">
                  A CNH mudou.
                </span>
                <span className="block text-white">O jeito de estudar também.</span>
              </h1>

              <p className="mt-6 max-w-[600px] text-base leading-relaxed text-zinc-300 md:mt-8 md:text-xl">
                {salesCopy.heroBody}
              </p>

              <div className="mt-8 flex flex-col gap-4 md:mt-10 md:flex-row md:items-center">
                <Link
                  href="#oferta"
                  className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-yellow-500 px-8 py-4 text-sm font-black text-zinc-950 transition-all hover:bg-yellow-400 hover:scale-[1.02] active:scale-[0.98] md:px-10 md:py-5 md:text-base"
                >
                  {salesCopy.primaryCta}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="#oferta"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-white/10 md:px-10 md:py-5 md:text-base"
                >
                  {salesCopy.secondaryCta}
                </Link>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="-mx-5 mt-10 border-y border-white/10 bg-black/50 pb-5 shadow-2xl backdrop-blur-xl md:mx-0 md:mt-0 md:rounded-[28px] md:border md:bg-white/10 md:p-3 md:pb-3"
            >
              <div className="relative aspect-video w-full overflow-hidden shadow-inner md:aspect-[4/3] md:rounded-[20px]">
                <Image
                  src="/images/vendas-temp/ad-3.png"
                  alt="Interface do CNH de Primeira"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/0 to-transparent md:hidden" />
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
