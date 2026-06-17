"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { methodSteps, resultMetrics, studentCards } from "./data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const tickerCards = [...studentCards, ...studentCards];

export function StudentResultsStepper() {
  return (
    <section className="relative overflow-hidden bg-zinc-50 px-5 py-16 md:px-8 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.18),transparent_36%)]" />
      <ScrollReveal className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[0.88fr_1.12fr] md:items-center">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-yellow-700">
              Como a preparação anda
            </p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-zinc-950 md:text-5xl">
              O fim do medo de reprovar.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 md:text-lg">
              Você não precisa se afogar em milhares de questões soltas. Você só precisa descobrir onde ainda está errando para chegar na prova teórica com confiança absoluta.
            </p>

            <div className="mt-8">
              <div className="relative mx-auto max-w-[390px] md:mx-0">
                <div className="absolute left-0 right-0 top-4 h-[2px] rounded-full bg-yellow-100" />
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                  className="absolute left-0 right-0 top-4 h-[2px] origin-left rounded-full bg-yellow-400"
                />
                <div className="relative z-10 grid grid-cols-3 gap-2">
                  {methodSteps.map((step, index) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.18, type: "spring", stiffness: 220, damping: 22 }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-yellow-400 bg-white text-sm font-black text-zinc-950 ring-4 ring-yellow-50">
                        {step.number}
                      </div>
                      <strong className="mt-3 text-xs uppercase tracking-tight text-zinc-950">{step.title}</strong>
                      <span className="mt-1 text-[11px] leading-snug text-zinc-500">{step.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-5 shadow-xl ring-1 ring-zinc-200">
            <div className="grid grid-cols-2 gap-3">
              {resultMetrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl bg-zinc-50 p-5 text-center">
                  <div className="text-3xl font-black text-zinc-950">{metric.value}</div>
                  <p className="mt-1 text-xs font-bold uppercase tracking-tight text-zinc-500">{metric.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-black text-zinc-950">
                <CheckCircle2 className="text-yellow-600" size={20} />
                O que o aluno compra de verdade
              </div>
              <p className="text-sm leading-relaxed text-zinc-700">
                Não é uma pilha de aulas. É a tranquilidade de saber o que revisar antes de apostar a primeira tentativa.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 overflow-hidden">
          <div className="-mx-5 mb-16 overflow-hidden md:mx-auto md:max-w-5xl md:rounded-[28px] md:shadow-2xl md:ring-1 md:ring-zinc-200/50">
            <Image
              src="/images/hero-16-9-2.jpeg"
              alt="Milhares de alunos com mais clareza"
              width={1600}
              height={900}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
          <h3 className="mb-6 text-center text-sm font-black uppercase tracking-[0.18em] text-zinc-400">
            Milhares de alunos com mais clareza
          </h3>
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 32, ease: "linear", repeat: Infinity }}
            className="flex w-max gap-4 px-2"
          >
            {tickerCards.map((card, index) => (
              <div
                key={`${card.name}-${index}`}
                className="w-56 shrink-0 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-black uppercase tracking-tight text-yellow-700">
                  {card.location}
                </p>
                <h4 className="mt-2 text-lg font-black text-zinc-950">{card.name}</h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{card.result}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  );
}
