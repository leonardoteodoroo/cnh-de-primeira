"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Eye,
  Timer,
  RefreshCcw,
  AlertCircle,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PriceSpoilerCardProps {
  initialAnchorPrice?: string;
  promoPrice?: string;
  checkoutUrl?: string;
  className?: string;
}

const STORAGE_KEY = "cnh_price_timer_v1";
const DURATION_SECONDS = 420; // 7 minutes

export const PriceSpoilerCard: React.FC<PriceSpoilerCardProps> = ({
  initialAnchorPrice = "R$ 197,00",
  promoPrice = "R$ 44,90",
  checkoutUrl = "https://lastlink.com/p/C144D3843/checkout-payment/",
  className,
}) => {
  const [status, setStatus] = useState<"spoiler" | "revealed" | "expired">("spoiler");
  const [timeLeft, setTimeLeft] = useState(DURATION_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { status: savedStatus, endTime } = JSON.parse(saved);

        if (savedStatus === "revealed") {
          const now = Date.now();
          const remaining = Math.max(0, Math.ceil((endTime - now) / 1000));

          if (remaining > 0) {
            setStatus("revealed");
            setTimeLeft(remaining);
          } else {
            setStatus("expired");
            setTimeLeft(0);
          }
        } else if (savedStatus === "expired") {
          setStatus("expired");
          setTimeLeft(0);
        }
      } catch (e) {
        console.error("Failed to parse saved timer state", e);
      }
    }
  }, []);

  useEffect(() => {
    if (status === "revealed" && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newValue = prev - 1;
          if (newValue <= 0) {
            clearInterval(timerRef.current!);
            setStatus("expired");
            sessionStorage.setItem(
              STORAGE_KEY,
              JSON.stringify({ status: "expired", endTime: 0 }),
            );
            return 0;
          }
          return newValue;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, timeLeft]);

  const handleReveal = () => {
    const endTime = Date.now() + DURATION_SECONDS * 1000;
    setStatus("revealed");
    setTimeLeft(DURATION_SECONDS);
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ status: "revealed", endTime }),
    );
  };

  const handleReset = () => {
    setStatus("revealed");
    const endTime = Date.now() + DURATION_SECONDS * 1000;
    setTimeLeft(DURATION_SECONDS);
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ status: "revealed", endTime }),
    );
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <section id="price-spoiler" className="relative overflow-hidden bg-[oklch(0.985_0.003_85)] pb-20 pt-10 md:pb-32 md:pt-16">
      <div className="container mx-auto flex flex-col items-center px-4 md:px-6">
        <div
          className={cn(
            "relative mx-auto w-full max-w-lg overflow-hidden transition-all duration-500",
            "rounded-[28px] border bg-white shadow-2xl shadow-zinc-200/50",
            status === "spoiler"
              ? "border-zinc-200 p-8"
              : "border-zinc-100 p-2 ring-1 ring-zinc-200/50",
            className,
          )}
        >
          <AnimatePresence mode="wait">
            {/* STATE: SPOILER */}
            {status === "spoiler" && (
              <motion.div
                key="spoiler"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center space-y-8 text-center"
              >
                {/* Efeito de Spoiler Ultra-Premium */}
                <button
                  onClick={handleReveal}
                  className="group relative w-full cursor-pointer overflow-hidden rounded-2xl"
                  aria-label="Revelar preço"
                >
                  <div className="absolute inset-0 z-0 bg-zinc-950 opacity-100 transition-opacity duration-500">
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        filter: "contrast(150%) brightness(100%)",
                      }}
                    />
                    <div className="animate-[shimmer_2s_infinite] absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                  </div>

                  <div className="relative z-10 flex select-none flex-col items-center justify-center gap-3 px-4 py-14">
                    <div className="mb-2 h-5 w-2/3 animate-pulse rounded-md bg-white/10 blur-[2px]" />
                    <div className="h-12 w-1/2 animate-pulse rounded-md bg-white/10 blur-[2px]" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex transform items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-bold text-white shadow-xl backdrop-blur-md transition-all group-hover:scale-105 group-hover:bg-white/20 group-hover:text-yellow-400">
                        <Eye className="h-4 w-4" />
                        Toque para revelar
                      </span>
                    </div>
                  </div>
                </button>

                <div className="space-y-5 px-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black leading-tight tracking-tight text-zinc-950 md:text-3xl">
                      Acesso liberado a uma condição única.
                    </h2>
                    <p className="mt-2 text-base text-zinc-600">
                      O seu acesso completo para entender, treinar e passar de primeira.
                    </p>
                  </div>

                  <div className="border-t border-zinc-100 pt-5">
                    <p className="text-[11px] font-medium leading-relaxed text-zinc-600">
                      *Ao ativar, você concorda que esta oferta exclusiva ficará
                      disponível apenas para esta seção e o cronômetro será iniciado.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STATE: REVEALED */}
            {status === "revealed" && (
              <motion.div
                key="revealed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="flex w-full flex-col items-center rounded-[24px] bg-white p-6 md:p-10"
              >
                {/* Top Eyebrow Branding CNH */}
                <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-[10px] font-black tracking-widest text-yellow-600 uppercase">
                  <Timer size={14} className="text-yellow-600" />
                  Oferta por tempo limitado
                </span>

                {/* Content Container */}
                <div className="flex w-full flex-col items-center space-y-8 text-center">
                  <div className="flex w-full flex-col items-center">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-base font-bold text-zinc-400 line-through"
                    >
                      De: {initialAnchorPrice}
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 400, delay: 0.3 }}
                      className="mt-1 whitespace-nowrap text-6xl font-extrabold leading-none tracking-tighter text-yellow-500 sm:text-[80px] md:text-[96px]"
                    >
                      {promoPrice}
                    </motion.div>
                  </div>

                  {/* Timer CNH Style */}
                  <div
                    className="flex w-full max-w-sm items-center justify-between rounded-2xl bg-zinc-950 p-4 shadow-lg md:p-5"
                    role="timer"
                    aria-live="polite"
                  >
                    <div className="flex items-center gap-2 text-zinc-300">
                      <Timer className="h-5 w-5 animate-pulse text-yellow-400" />
                      <span className="text-[13px] font-bold md:text-sm">
                        Reserva acaba em:
                      </span>
                    </div>
                    <span className="w-[70px] text-right font-mono text-xl font-bold tracking-tight text-yellow-400 md:text-2xl">
                      {formatTime(timeLeft)}
                    </span>
                  </div>

                  {/* CTA Botão CNH */}
                  <a href={checkoutUrl} className="w-full">
                    <button className="group relative inline-flex w-full items-center justify-center gap-3 rounded-full bg-yellow-500 py-6 text-base font-black text-zinc-950 transition-all hover:scale-[1.02] hover:bg-yellow-400 active:scale-[0.98]">
                      Garantir minha vaga agora
                    </button>
                  </a>

                  {/* Trust Badges */}
                  <div className="flex w-full flex-wrap items-center justify-center gap-4 text-zinc-400 md:gap-6">
                    <div className="flex items-center gap-1.5 text-xs font-bold md:text-sm">
                      <Lock className="h-4 w-4 text-yellow-500" />
                      <span>Pagamento Seguro</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold md:text-sm">
                      <ShieldCheck className="h-4 w-4 text-yellow-500" />
                      <span>15 Dias de Garantia</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold md:text-sm">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span>Acesso Imediato</span>
                    </div>
                  </div>

                  {/* Price Anchoring Minimalist */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-full rounded-2xl border border-zinc-100 bg-zinc-50/50 p-5 text-left md:p-6"
                  >
                    <p className="mb-4 text-xs font-black uppercase tracking-wider text-zinc-400">
                      O investimento é menor que:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-sm font-medium leading-relaxed text-zinc-600 md:text-base">
                        <span className="shrink-0 text-lg">🚌</span>
                        <span>
                          <strong className="font-bold text-zinc-950">4 passagens daquele ônibus lotado</strong>{" "}
                          (que você pega todo dia e não aguenta mais)
                        </span>
                      </li>
                      <li className="flex items-start gap-3 text-sm font-medium leading-relaxed text-zinc-600 md:text-base">
                        <span className="shrink-0 text-lg">🛍️</span>
                        <span>Uma blusinha barata na Shopee (que você usa duas vezes e guarda no fundo do armário)</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm font-medium leading-relaxed text-zinc-600 md:text-base">
                        <span className="shrink-0 text-lg">🚗</span>
                        <span>1 Uber ida+volta pro shopping</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* STATE: EXPIRED */}
            {status === "expired" && (
              <motion.div
                key="expired"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center space-y-8 bg-white p-10 text-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100">
                  <AlertCircle className="h-10 w-10 text-zinc-400" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tight text-zinc-950">
                    Reserva expirada
                  </h3>
                  <p className="mx-auto max-w-[250px] text-base leading-relaxed text-zinc-400">
                    O tempo para garantir essa condição especial se esgotou.
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-zinc-950 py-5 font-bold text-white transition-all hover:bg-zinc-800"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Tentar Novamente
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
