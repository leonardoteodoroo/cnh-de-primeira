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
        <picture className="h-full w-full">
          <source media="(min-width: 768px)" srcSet="/images/vendas-temp/hero-desktop.jpeg" />
          <img
            src="/images/vendas-temp/hero-mobile.jpeg"
            alt="Capa do método CNH de Primeira"
            loading="eager"
            decoding="sync"
            className="h-full w-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/90 md:via-black/30 md:to-black" />
      </div>

      <div className="relative mx-auto flex min-h-dvh max-w-6xl flex-col px-5 py-6 md:px-8">
        <div className="flex flex-1 items-start pt-4 pb-14 md:items-center md:py-20">
          <div className="grid w-full items-center gap-12 md:grid-cols-2 md:gap-16">
            
            <div className="flex flex-col">
              <h1 className="mb-6 inline-flex items-center gap-2 self-start rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5 text-[10px] font-black tracking-widest text-yellow-500 uppercase md:mb-8 md:px-4 md:py-2 md:text-xs">
                <ShieldCheck size={14} className="text-yellow-500" />
                {salesCopy.heroEyebrow}
              </h1>

              {/* Hook principal da copy. Rebaixado para H2 para permitir que o Eyebrow (rico em palavras-chave) seja o H1 de SEO. */}
              <h2 className="sr-only md:not-sr-only md:max-w-[860px] md:text-[84px] md:font-extrabold md:leading-[1.05] md:tracking-tight">
                <span className="mb-2 block text-white/80 md:text-[68px]">
                  A CNH mudou.
                </span>
                <span className="block text-white">O jeito de estudar também.</span>
              </h2>

              {/* MOBILE IMAGE BLOCK (Substitui o título) */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="-mx-5 mb-6 border-y border-white/10 bg-black/50 pb-5 shadow-2xl backdrop-blur-xl md:hidden"
              >
                <div className="relative aspect-video w-full overflow-hidden shadow-inner">
                  <Image
                    src="/images/vendas-temp/ad-3.png"
                    alt="Interface do CNH de Primeira"
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/0 to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                </div>
                
                <div className="mt-5 flex items-center justify-between gap-2 px-5">
                  {["Diagnóstico", "Questões", "Plano"].map((label) => (
                    <span
                      key={label}
                      className="flex-1 rounded-xl bg-white/10 py-2.5 text-center text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-md"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </motion.div>

              <p className="max-w-[600px] text-base leading-relaxed text-zinc-300 md:mt-8 md:text-xl">
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

            {/* DESKTOP IMAGE BLOCK (Fica na coluna da direita) */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="hidden rounded-[28px] border border-white/10 bg-white/10 p-3 pb-3 shadow-2xl backdrop-blur-xl md:block"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] shadow-inner">
                <Image
                  src="/images/vendas-temp/ad-3.png"
                  alt="Interface do CNH de Primeira"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
              
              <div className="mt-3 flex items-center justify-between gap-2 px-1">
                {["Diagnóstico", "Questões", "Plano"].map((label) => (
                  <span
                    key={label}
                    className="flex-1 rounded-xl bg-white/10 py-2.5 text-center text-xs font-black uppercase tracking-wider text-white backdrop-blur-md"
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
