"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function ApprovedStudentsStepper() {
  const carouselImages = ["aluno-aprovado-wlh6qs.webp","aluno-aprovado-vpvc7e.webp","aluno-aprovado-k41ywg.webp","aluno-aprovado-ihuhw1.webp","aluno-aprovado-yko2s4.webp","aluno-aprovado-dl865p.webp","aluno-aprovado-cb8i8q.webp","aluno-aprovado-t7vata.webp","aluno-aprovado-qo39e0.webp","aluno-aprovado-c2d0yi.webp","aluno-aprovado-nrtte2.webp","aluno-aprovado-ew6b0h.webp","aluno-aprovado-hjxqcf.webp","aluno-aprovado-6w1upd.webp","aluno-aprovado-zgsorf.webp","aluno-aprovado-00j11u.webp"];

  return (
    <section id="approved-stepper" data-section="approved-stepper" className="relative overflow-hidden bg-zinc-50 px-6 py-16 font-sans lg:px-20">
      <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-400/10 via-transparent to-transparent opacity-60"></div>
      
      <ScrollReveal className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-12 lg:flex-row">
        <div className="flex-1 space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="mb-4 text-3xl font-black text-zinc-900 lg:text-4xl">
              Sua CNH de Primeira
            </h2>
            <p className="text-lg text-zinc-600">
              O método validado que já colocou a habilitação na mão de milhares de alunos. Chega de depender da sorte ou pagar taxas abusivas de reteste.
            </p>
          </div>
          
          <div className="flex flex-col gap-6">
            <h3 className="mb-2 text-center text-sm font-bold uppercase tracking-wider text-zinc-900 lg:text-left">
              Como funciona:
            </h3>
            
            <div className="relative mx-auto w-full max-w-[320px] lg:mx-0">
              {/* Linha de Conexão Base */}
              <div className="absolute left-0 right-0 top-4 h-[2px] rounded-full bg-yellow-100/60" />

              {/* Linha de Progresso Animada */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute left-0 right-0 top-4 h-[2px] origin-left overflow-hidden rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]"
              >
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 0.5,
                  }}
                  className="absolute inset-0 w-2/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </motion.div>

              <div className="relative z-10 grid grid-cols-3 items-start justify-items-center">
                {/* Passo 1 */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-yellow-500 bg-white text-sm font-bold leading-none text-yellow-600 shadow-md ring-4 ring-yellow-50">
                    1
                  </div>
                  <span className="whitespace-nowrap text-center text-[11px] font-bold leading-none text-zinc-800">
                    Prepare-se
                  </span>
                </motion.div>

                {/* Passo 2 */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-yellow-500 bg-white text-sm font-bold leading-none text-yellow-600 shadow-md ring-4 ring-yellow-50">
                    2
                  </div>
                  <span className="whitespace-nowrap text-center text-[11px] font-bold leading-none text-zinc-800">
                    Faça a Prova
                  </span>
                </motion.div>

                {/* Passo 3 */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.1, type: "spring", stiffness: 260, damping: 20 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold leading-none text-zinc-900 shadow-lg ring-4 ring-yellow-100">
                    3
                  </div>
                  <span className="rounded-full bg-yellow-50/80 px-1.5 py-0.5 whitespace-nowrap text-center text-[11px] font-bold leading-none text-yellow-800">
                    Comemore
                  </span>
                </motion.div>
              </div>
            </div>

            <p className="mt-2 text-center text-xs font-medium italic text-zinc-600 lg:text-left">
              "A sensação de ver o APTO no sistema do Detran"
            </p>

            <ul className="space-y-3">
              <li className="flex items-start gap-3 font-medium text-zinc-700">
                <CheckCircle className="mt-0.5 shrink-0 text-yellow-500" size={20} />
                <span>Cronograma focado no que o Detran mais cobra</span>
              </li>
              <li className="flex items-start gap-3 font-medium text-zinc-700">
                <CheckCircle className="mt-0.5 shrink-0 text-yellow-500" size={20} />
                <span>Chega de estudar milhares de questões soltas</span>
              </li>
              <li className="flex items-start gap-3 font-medium text-zinc-700">
                <CheckCircle className="mt-0.5 shrink-0 text-yellow-500" size={20} />
                <span>Descubra e corrija os seus pontos cegos</span>
              </li>
              <li className="flex items-start gap-3 font-medium text-zinc-700">
                <CheckCircle className="mt-0.5 shrink-0 text-yellow-500" size={20} />
                <span>Simulados focados e muito mais assertivos</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="relative flex-1">
          <div className="relative z-10 rotate-3 rounded-2xl border-4 border-zinc-100 bg-white p-2 shadow-2xl transition duration-500 hover:rotate-0">
            <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden border border-zinc-200 bg-zinc-100 md:aspect-square lg:aspect-[4/5]">
              <img
                src="/images/aprovados/aluno-principal-cnha.webp"
                alt="Aluno principal orgulhoso exibindo a CNH de primeira após concluir o método"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rotate-6 rounded-2xl bg-yellow-400/20"></div>
        </div>
      </ScrollReveal>

      {/* Ticker Infinito de Alunos Aprovados */}
      <div className="relative mb-6 mt-24 flex w-full flex-col items-center overflow-hidden">
        <h4 className="mb-6 text-center text-sm font-bold uppercase tracking-wider text-zinc-400">
          Junte-se a milhares de alunos aprovados
        </h4>

        {/* NOTA: full-width / edge-to-edge pattern - margens negativas seguras sem w-screen */}
        <div className="group relative -mx-6 flex w-[calc(100%+3rem)] overflow-hidden lg:-mx-20 lg:w-[calc(100%+10rem)]">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 40,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex w-max gap-4 px-4 group-hover:[animation-play-state:paused]"
          >
            {/* Imagens do carrossel duplicadas para loop infinito perfeito, com 11 e 12 afastados */}
            {[...carouselImages, ...carouselImages].map((n, i) => (
              <div
                key={i}
                className="relative h-64 w-48 shrink-0 overflow-hidden rounded-xl border-4 border-white bg-zinc-100 shadow-xl md:h-72 md:w-56"
              >
                <img
                  src={`/images/aprovados/${n}`}
                  alt={`Foto de aluno orgulhoso segurando sua carteira de motorista recém-aprovada através do método do instrutor`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover grayscale-[30%] transition-all duration-300 hover:grayscale-0"
                />
              </div>
            ))}
          </motion.div>

          {/* Sombras laterais para fade out */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-zinc-50 to-transparent md:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-zinc-50 to-transparent md:w-32" />
        </div>
      </div>

      {/* Fade out para a próxima seção (transição suave) */}
      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
    </section>
  );
}
