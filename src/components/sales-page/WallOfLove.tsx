"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import { reviewRows } from "./data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface Review {
  name: string;
  age: number;
  location: string;
  text: string;
  highlight: string;
}

const tickerRows = reviewRows.map((row) => [...row, ...row, ...row]);

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="h-fit w-[290px] shrink-0 select-none rounded-2xl border border-white/70 bg-white/82 px-5 py-4 shadow-sm backdrop-blur md:w-[340px]">
      <p className="mb-3 text-[13px] leading-relaxed text-zinc-700">&quot;{review.text}&quot;</p>
      <div className="flex items-center justify-between gap-3">
        <div>
          <strong className="block text-xs font-black uppercase tracking-tight text-zinc-950">
            {review.name}
          </strong>
          <span className="text-[11px] text-zinc-500">
            {review.age} anos · {review.location}
          </span>
        </div>
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-[10px] font-black uppercase tracking-tight text-yellow-800">
          {review.highlight}
        </span>
      </div>
    </article>
  );
}

function TickerRow({
  reviews,
  direction,
  speed,
}: {
  reviews: Review[];
  direction: "left" | "right";
  speed: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const baseVelocity = direction === "left" ? -speed : speed;

  useEffect(() => {
    if (!containerRef.current) return;
    const totalWidth = containerRef.current.scrollWidth;
    setContentWidth(totalWidth / 3);
    if (direction === "right") {
      x.set(-totalWidth / 3);
    }
  }, [direction, x]);

  useAnimationFrame((_time, delta) => {
    if (shouldReduceMotion || isPaused || !contentWidth) return;

    const moveBy = baseVelocity * (delta / 16);
    const current = x.get();
    let next = current + moveBy;

    if (direction === "left") {
      if (next <= -contentWidth) next += contentWidth;
      if (next > 0) next -= contentWidth;
    } else {
      if (next >= 0) next -= contentWidth;
      if (next < -contentWidth) next += contentWidth;
    }

    x.set(next);
  });

  return (
    <div
      className="relative w-full cursor-grab touch-pan-y active:cursor-grabbing"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <motion.div
        ref={containerRef}
        className="flex w-max items-center gap-4 pl-4 will-change-transform"
        style={{ x }}
        drag="x"
        dragElastic={0.08}
        dragMomentum={false}
        dragConstraints={{ left: -10000, right: 10000 }}
      >
        {reviews.map((review, index) => (
          <ReviewCard key={`${review.name}-${index}`} review={review} />
        ))}
      </motion.div>
    </div>
  );
}

export function WallOfLove() {
  return (
    <section id="mural-do-amor" className="relative overflow-hidden bg-white py-16 md:py-24">
      <ScrollReveal className="mx-auto max-w-6xl px-5 text-center md:px-8">
        <span className="inline-flex rounded-full bg-rose-50 px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-rose-600">
          Mural do amor
        </span>
        <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black leading-tight tracking-tight text-zinc-950 md:text-5xl">
          Pessoas que estavam inseguras antes de chegar na prova.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
          Veja como pessoas reais, com pouco tempo e muito nervosismo, conseguiram transformar a insegurança em clareza no dia da prova.
        </p>
      </ScrollReveal>

      <div className="relative mt-12 py-16">
        <div className="absolute inset-0">
          <img
            src="/images/vendas-temp/ad-3.png"
            alt="Fundo editorial do CNH de Primeira atrás dos depoimentos"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover opacity-20 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-white/58 backdrop-blur-[2px]" />
        </div>

        <ScrollReveal delay={0.2} className="relative z-10 flex scale-[1.02] flex-col gap-4">
          <TickerRow reviews={tickerRows[0] as Review[]} direction="left" speed={1.5} />
          <TickerRow reviews={tickerRows[1] as Review[]} direction="right" speed={1.5} />
        </ScrollReveal>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-white to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-white to-transparent md:w-32" />
      </div>
    </section>
  );
}
