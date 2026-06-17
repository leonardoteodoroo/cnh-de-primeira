"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  PanInfo,
  animate,
  MotionValue,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  id: number;
  name: string;
  age: number;
  location: string;
  quote: string;
  detail: string;
  status: string;
  initial: string;
  isTop?: boolean;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Rafael",
    age: 22,
    location: "São Paulo, SP",
    quote: '"Não precisei decorar nada"',
    detail: 'Eu tava desesperado achando que ia ter que ler o código de trânsito inteiro. O método focou só no que realmente cai e nas pegadinhas. Resultado: passei com 28/30 pontos sem estresse.',
    status: "Aprovado de primeira",
    initial: "R",
  },
  {
    id: 2,
    name: "Camila",
    age: 28,
    location: "Curitiba, PR",
    quote: '"Fugi da taxa de reteste"',
    detail: 'Minha amiga reprovou e teve que pagar quase 200 reais pro Detran pra refazer. Eu fiquei com muito medo, mas as simulações das pegadinhas me salvaram. Caiu exatamente a questão da rotatória!',
    status: "Economizou R$ 180",
    initial: "C",
    isTop: true,
  },
  {
    id: 3,
    name: "Thiago",
    age: 19,
    location: "Belo Horizonte, MG",
    quote: '"Direto ao ponto"',
    detail: 'Eu trabalho o dia todo e não tinha tempo pra ler apostila de autoescola. Peguei o método, foquei nas armadilhas mais comuns e fui pra prova confiante. Primeira etapa concluída!',
    status: "Aprovado com 26 pontos",
    initial: "T",
  },
  {
    id: 4,
    name: "Beatriz",
    age: 34,
    location: "Rio de Janeiro, RJ",
    quote: '"Zero surpresas na prova"',
    detail: 'Parecia que eu já tinha feito a prova antes. As pegadinhas de infrações gravíssimas estavam frescas na minha cabeça. Valeu muito a pena para não perder tempo com bobeira.',
    status: "Aprovada sem ansiedade",
    initial: "B",
  },
  {
    id: 5,
    name: "Lucas",
    age: 25,
    location: "Porto Alegre, RS",
    quote: '"Melhor que a autoescola"',
    detail: 'Nas aulas teóricas da autoescola eu só dormia. O professor passava slide antigo. Se eu não tivesse estudado o material focado nas pegadinhas, eu com certeza ia rodar.',
    status: "Passou estudando sozinho",
    initial: "L",
  }
];

const CardInner: React.FC<{ review: Review; isCenter: boolean }> = ({ review, isCenter }) => {
  return (
    <div
      className={`bg-white h-full flex flex-col transition-shadow duration-300 ${isCenter
        ? "shadow-2xl border-2 border-[oklch(0.85_0.02_250)]" 
        : "shadow-xl border-2 border-transparent"
        }`}
    >
      <div className="relative overflow-hidden shrink-0 h-48 w-full">
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[oklch(0.96_0.02_250)] to-[oklch(0.90_0.04_250)]">
          <div className="w-20 h-20 rounded-full bg-white/60 flex items-center justify-center text-[oklch(0.25_0.01_250)] text-3xl font-bold">
            {review.initial}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute left-5 bottom-4">
          <h3 className="text-white font-bold text-xl leading-tight">
            {review.name}, {review.age}
          </h3>
          <p className="text-white/80 text-xs">{review.location}</p>
        </div>

        {review.isTop && (
          <div
            className={`absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg border border-white/30 transition-opacity duration-300 ${isCenter ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-sm">★</span>
              <span className="text-white text-xs font-bold">Top Relato</span>
            </div>
          </div>
        )}
      </div>

      <div className="relative flex flex-col flex-1 p-5">
        <span
          className={`inline-flex items-center self-start px-3 py-1 rounded-full text-[11px] font-bold mb-3 transition-colors duration-300 tracking-wide uppercase ${isCenter ? "bg-[oklch(0.25_0.01_250)] text-white" : "bg-[oklch(0.96_0.02_250)] text-[oklch(0.25_0.01_250)]"
            }`}
        >
          {review.status}
        </span>

        <blockquote className="font-bold mb-2 text-gray-900 leading-tight text-[15px]">
          {review.quote}
        </blockquote>

        <p className="text-[oklch(0.4_0.01_250)] text-[13px] leading-relaxed flex-1">
          {review.detail}
        </p>
      </div>
    </div>
  );
};

const DRAG_BUFFER = 10;
const VELOCITY_THRESHOLD = 50;

export const CarouselDepoimentos: React.FC = () => {
  const [gap, setGap] = useState(280);

  useEffect(() => {
    const handleResize = () => {
      setGap(window.innerWidth < 400 ? 260 : 290);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [activeIndex, setActiveIndex] = useState(1);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(-gap);
  const containerRef = useRef<HTMLDivElement>(null);

  const prevGap = useRef(gap);

  useEffect(() => {
    if (prevGap.current !== gap) {
      x.stop();
      x.set(-activeIndex * gap);
      prevGap.current = gap;
    }
  }, [gap, activeIndex, x]);

  const jumpTo = (idx: number) => {
    setActiveIndex(idx);
    animate(x, -idx * gap, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      jumpTo((activeIndex + 1) % reviews.length);
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      jumpTo((activeIndex - 1 + reviews.length) % reviews.length);
    } else {
      jumpTo(activeIndex);
    }
  };

  const handlePan = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    x.set(x.get() + info.delta.x);
  };

  const nextSlide = () => jumpTo((activeIndex + 1) % reviews.length);
  const prevSlide = () => jumpTo((activeIndex - 1 + reviews.length) % reviews.length);

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center relative my-4 overflow-visible">
      <div
        ref={containerRef}
        className="relative h-[420px] md:h-[460px] w-full flex items-center justify-center touch-pan-y select-none"
        style={{ perspective: 1000 }}
      >
        <motion.div
          className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing touch-pan-y"
          onPan={handlePan}
          onPanEnd={handleDragEnd}
          whileTap={{ cursor: "grabbing" }}
        />

        {reviews.map((review, i) => (
          <CarouselCard
            key={review.id}
            index={i}
            review={review}
            x={x}
            gap={gap}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col items-center mt-4 gap-4 relative z-50 pointer-events-none w-full px-4">
        
        {/* Deslize para ler */}
        <div className="flex items-center gap-2 opacity-60 mb-[-4px]">
          <span className="text-[10px] uppercase tracking-tighter font-bold text-[oklch(0.25_0.01_250)]">
            Deslize para ler
          </span>
          <div className="flex gap-1">
            <motion.div
              animate={shouldReduceMotion ? { x: 0 } : { x: [0, 5, 0] }}
              transition={{
                repeat: shouldReduceMotion ? 0 : Infinity,
                duration: shouldReduceMotion ? 0 : 1.5,
              }}
              className="w-1 h-1 rounded-full bg-[oklch(0.25_0.01_250)]"
            />
            <div className="w-1 h-1 rounded-full bg-[oklch(0.25_0.01_250)] opacity-50" />
            <div className="w-1 h-1 rounded-full bg-[oklch(0.25_0.01_250)] opacity-25" />
          </div>
        </div>

        <div className="flex justify-between items-center w-full max-w-[200px] pointer-events-auto">
          <button
            onClick={prevSlide}
            className="w-9 h-9 rounded-full border border-[oklch(0.90_0.02_250)] flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-sm active:scale-95 text-[oklch(0.25_0.01_250)]"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-1.5 items-center">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => jumpTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex
                  ? "w-5 bg-[oklch(0.25_0.01_250)]"
                  : "w-1.5 bg-[oklch(0.85_0.02_250)]"
                  }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-9 h-9 rounded-full border border-[oklch(0.90_0.02_250)] flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-sm active:scale-95 text-[oklch(0.25_0.01_250)]"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const CarouselCard: React.FC<{
  index: number;
  review: Review;
  x: MotionValue<number>;
  gap: number;
  shouldReduceMotion: boolean | null;
}> = ({ index, review, x, gap, shouldReduceMotion }) => {
  const position = useTransform(x, (currentX) => currentX + index * gap);

  const rotateY = useTransform(
    position,
    [-gap, 0, gap],
    shouldReduceMotion ? [0, 0, 0] : [22, 0, -22]
  );
  const scale = useTransform(
    position,
    [-gap, 0, gap],
    shouldReduceMotion ? [0.95, 1, 0.95] : [0.85, 1, 0.85]
  );
  const opacity = useTransform(
    position,
    [-gap * 1.5, 0, gap * 1.5],
    [0.4, 1, 0.4]
  );
  const blur = useTransform(
    position,
    [-gap, 0, gap],
    shouldReduceMotion ? [0, 0, 0] : [3.5, 0, 3.5]
  );
  const z = useTransform(position, (pos) =>
    shouldReduceMotion ? 0 : -Math.abs(pos) * 1.2
  );
  const translateX = useTransform(position, (pos) => pos * 0.6);

  const display = useTransform(position, (pos) =>
    Math.abs(pos) >= gap * 2.2 ? "none" : "block"
  );
  
  const filterStyle = useMotionTemplate`blur(${blur}px)`;

  const [isCenter, setIsCenter] = useState(false);
  useEffect(() => {
    const unsubscribe = x.on("change", (latestX) => {
      const currentPos = latestX + index * gap;
      setIsCenter(Math.abs(currentPos) < gap * 0.5);
    });
    return unsubscribe;
  }, [x, index, gap]);

  return (
    <motion.div
      className="absolute w-[260px] min-[375px]:w-[280px] min-h-[350px] md:min-h-[380px] max-w-[85vw] rounded-[24px] pointer-events-none will-change-transform"
      style={{
        x: translateX,
        rotateY,
        scale,
        opacity,
        z,
        display,
        filter: shouldReduceMotion ? "none" : filterStyle,
        zIndex: useTransform(position, (pos) => 100 - Math.round(Math.abs(pos))),
      }}
    >
      <div className="w-full h-full rounded-[24px] overflow-hidden bg-white relative">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/40 via-transparent to-black/5 pointer-events-none z-50 rounded-[24px]" />
        <CardInner review={review} isCenter={isCenter} />
      </div>
    </motion.div>
  );
};
