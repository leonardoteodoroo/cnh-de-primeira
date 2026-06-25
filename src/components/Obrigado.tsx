"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, Mail, HelpCircle, Lock, BookOpen, Clock, Layers } from "lucide-react";
import Link from "next/link";

export default function Obrigado() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  const checkmarkVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
        delay: 0.2
      }
    }
  };

  // OBSERVAÇÃO PARA O USUÁRIO: Altere o número de telefone no link abaixo conforme necessário
  const whatsappUrl = "https://wa.me/5562999918702?text=Ol%C3%A1!%20Acabei%20de%20comprar%20o%20CNH%20de%20Primeira%20e%20vim%20liberar%20meu%20acesso%20%F0%9F%9A%A6";

  return (
    <div className="relative min-h-screen bg-[oklch(0.13_0.015_85)] text-white overflow-hidden flex flex-col justify-between">
      {/* Luzes de fundo desfocadas de alta qualidade (Soft Seams e Rich Aesthetics) */}
      <div className="absolute z-0 rounded-full blur-[140px] opacity-35 pointer-events-none bg-emerald-500 w-[350px] h-[350px] -top-[50px] -left-[100px] transform-gpu will-change-transform" />
      <div className="absolute z-0 rounded-full blur-[140px] opacity-25 pointer-events-none bg-yellow-500 w-[300px] h-[300px] top-[40%] right-[-100px] transform-gpu will-change-transform" />
      <div className="absolute z-0 rounded-full blur-[140px] opacity-20 pointer-events-none bg-emerald-600 w-[400px] h-[400px] bottom-[-100px] left-[30%] transform-gpu will-change-transform" />

      {/* Conteúdo Principal */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12 md:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-2xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[32px] p-6 md:p-10 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)]"
        >
          {/* Ícone de Sucesso Animado */}
          <div className="flex justify-center mb-6">
            <motion.div
              variants={checkmarkVariants}
              className="relative flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
            >
              <CheckCircle2 size={44} className="stroke-[1.5]" />
              <div className="absolute inset-0 rounded-full bg-emerald-500/5 animate-ping opacity-75" />
            </motion.div>
          </div>

          {/* Cabeçalho */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black tracking-widest uppercase mb-3">
              🎉 COMPRA CONFIRMADA
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              Sua matrícula está garantida!
            </h1>
            <p className="text-sm md:text-base text-zinc-300 max-w-lg mx-auto">
              Parabéns por escolher estudar com direção. Você acaba de dar o passo definitivo para passar de primeira no Detran.
            </p>
          </motion.div>

          {/* Card de Recibo e Status de Matrícula (MVP) */}
          <motion.div
            variants={itemVariants}
            className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 mb-8 text-left"
          >
            <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
              <Lock size={14} className="text-yellow-500" /> Detalhes do seu Pedido
            </h3>

            <div className="space-y-3 border-b border-white/5 pb-4 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Produto:</span>
                <span className="font-semibold text-white text-right">Treinamento CNH de Primeira</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Entrega:</span>
                <span className="font-semibold text-emerald-400">Acesso por E-mail + WhatsApp</span>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-xs md:text-sm text-yellow-200/90 leading-relaxed">
              <p className="font-bold text-yellow-500 mb-1">⏳ Como funciona a liberação do seu acesso:</p>
              Como este é um treinamento exclusivo com acompanhamento personalizado, o seu login e senha estão sendo gerados <strong className="font-semibold text-white">manualmente</strong> pelo responsável nas próximas horas.
              <br />
              <span className="font-semibold text-white">Não se preocupe:</span> fique atento ao seu <strong className="font-semibold text-white">e-mail cadastrado</strong> e ao seu número de <strong className="font-semibold text-white">WhatsApp</strong>. Nós entraremos em contato direto para te enviar o link da nossa área de membros com o seu login pronto!
            </div>
          </motion.div>

          {/* Seção de Ação Requerida (WhatsApp Direto) */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h2 className="text-lg md:text-xl font-bold mb-3 flex items-center justify-center gap-2">
              🚀 Quer acelerar a sua liberação?
            </h2>
            <p className="text-xs md:text-sm text-zinc-300 mb-5 max-w-md mx-auto">
              Você pode chamar o <strong className="font-semibold text-white">atendente responsável</strong> agora mesmo no WhatsApp para que ele crie e te mande o seu acesso imediatamente!
            </p>

            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto rounded-full bg-emerald-500 text-zinc-950 font-black text-sm md:text-base px-8 py-4 transition-all hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] shadow-[0_12px_24px_-8px_rgba(16,185,129,0.5)]"
            >
              <MessageCircle size={20} className="fill-zinc-950" />
              Falar com o Responsável no WhatsApp
            </Link>
          </motion.div>

          {/* Dúvidas Frequentes Rápidas */}
          <motion.div
            variants={itemVariants}
            className="border-t border-white/10 pt-6 text-left"
          >
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-1.5">
              <HelpCircle size={14} className="text-zinc-400" /> Dúvidas frequentes de acesso
            </h4>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-bold text-white mb-1">Qual é o prazo para liberação?</p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  O processo é realizado no mesmo dia. Se comprado em horário comercial, sua matrícula é criada em menos de 60 minutos. Fora desse horário, será liberada logo no início da manhã seguinte.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Rodapé Legal Simplificado */}
      <footer className="relative z-10 py-6 border-t border-white/5 bg-black/20 text-center px-4">
        <p className="text-[10px] text-zinc-500 max-w-md mx-auto">
          © 2026 Treinamento CNH de Primeira. Todos os direitos reservados.
          <br />
          Esta página de obrigado é de caráter meramente informativo e de confirmação de matrícula.
        </p>
      </footer>
    </div>
  );
}
