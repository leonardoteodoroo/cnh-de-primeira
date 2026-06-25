"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export const ExitIntent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasFired, setHasFired] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (e.clientY <= 10 && !hasFired) {
        setIsVisible(true);
        setHasFired(true);
        if (typeof window.trackExitPopup === "function") {
          window.trackExitPopup();
        }
      }
    },
    [hasFired],
  );

  // Desktop: quando o mouse sai pelo topo da tela
  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  // Mobile: intercepta o botão de voltar / gesto de voltar
  useEffect(() => {
    if (hasFired) return;

    let isHistoryPushed = false;

    const initMobileExitIntent = () => {
      if (isHistoryPushed) return;
      
      try {
        // Empurra o estado fake no histórico (aceito agora porque foi disparado por interação do usuário)
        window.history.pushState(null, "", window.location.href);
        isHistoryPushed = true;
        
        if (process.env.NODE_ENV !== "production") {
          console.log("📱 Mobile Exit Intent ativado via interação do usuário.");
        }
      } catch (e) {
        console.error("Falha ao configurar histórico mobile", e);
      }
    };

    const handlePopState = () => {
      if (!hasFired) {
        setIsVisible(true);
        setHasFired(true);
        if (typeof window.trackExitPopup === "function") {
          window.trackExitPopup();
        }
        // Coloca mais um estado para garantir que o usuário consiga sair se clicar em voltar de novo
        window.history.pushState(null, "", window.location.href);
      }
    };

    // Escuta as primeiras interações do usuário para ativar o pushState com segurança
    window.addEventListener("touchstart", initMobileExitIntent, { passive: true });
    window.addEventListener("scroll", initMobileExitIntent, { passive: true });
    window.addEventListener("click", initMobileExitIntent, { passive: true });
    
    // Escuta o botão voltar do histórico
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("touchstart", initMobileExitIntent);
      window.removeEventListener("scroll", initMobileExitIntent);
      window.removeEventListener("click", initMobileExitIntent);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [hasFired]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = () => setIsVisible(false);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Overlay de fundo escuro desfocado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-zinc-900 border border-zinc-800 text-white rounded-[28px] shadow-2xl w-full max-w-sm md:max-w-md max-h-[90dvh] flex flex-col overflow-hidden z-10"
          >
            {/* Botão de Fechar */}
            <button
              onClick={close}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors z-30 bg-zinc-800/80 hover:bg-zinc-800 p-1.5 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Container rolável do conteúdo */}
            <div className="overflow-y-auto flex-1 flex flex-col scrollbar-thin">
              {/* Imagem de Capa do Popup */}
              <div className="relative w-full h-32 sm:h-40 shrink-0 overflow-hidden">
                <Image
                  src="/images/hero.webp"
                  alt="Jovem emocionado e aliviado celebrando a aprovação no exame de direção após usar o treinamento de simulação focado"
                  fill
                  loading="lazy"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent" />
              </div>

              {/* Conteúdo Interno */}
              <div className="px-5 pb-6 pt-2 flex flex-col text-center flex-1">
                <span className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-[9px] font-black tracking-widest text-yellow-500 uppercase mb-3 shrink-0">
                  🛑 CONDIÇÃO EXCLUSIVA DE SAÍDA
                </span>

                <h3 className="text-lg md:text-xl font-black text-white tracking-tight leading-tight mb-1.5 shrink-0">
                  Espera! Não feche esta página ainda…
                </h3>
                <p className="text-zinc-400 text-[11px] leading-relaxed mb-4 max-w-xs mx-auto shrink-0">
                  Você realmente vai correr o risco de reprovar e gastar mais de R$ 300,00 em taxa de reteste do Detran?
                </p>

                {/* Recursos de Destaque */}
                <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-3.5 mb-4 text-left space-y-2.5 shrink-0">
                  {[
                    "Acesso ao método inteligente focado nas questões que caem",
                    "Simulados dinâmicos e comentados passo a passo",
                    "15 dias de garantia incondicional (risco zero)",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-normal">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Spacer flexível para empurrar o CTA */}
                <div className="flex-1 min-h-[10px]" />

                {/* Oferta de Preço Especial */}
                <div className="mb-4 flex flex-col items-center shrink-0">
                  <span className="text-[10px] font-bold text-zinc-500 line-through mb-0.5">
                    De R$ 197,00
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[10px] font-black text-yellow-500">Por Apenas</span>
                    <span className="text-3xl font-extrabold text-yellow-500 tracking-tighter">
                      R$ 44,90
                    </span>
                    <span className="text-[10px] font-bold text-zinc-400">à vista</span>
                  </div>
                  <p className="text-[9px] text-zinc-500 mt-0.5">
                    Pagamento único • Sem mensalidades adicionais
                  </p>
                </div>

                {/* Botão de Ação */}
                <a
                  href="https://lastlink.com/p/C144D3843/checkout-payment/"
                  className="group w-full py-3.5 rounded-full bg-yellow-500 text-zinc-950 font-black text-xs uppercase tracking-wider transition-all hover:scale-[1.02] hover:bg-yellow-400 active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_6px_16px_rgba(234,179,8,0.15)] shrink-0"
                >
                  QUERO PASSAR DE PRIMEIRA
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>

                <div className="flex items-center justify-center gap-1.5 text-[8px] text-zinc-500 mt-3 font-bold shrink-0">
                  <ShieldCheck className="w-3 h-3 text-yellow-500" />
                  <span>Compra 100% Segura • Acesso Imediato</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
