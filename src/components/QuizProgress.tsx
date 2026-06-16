"use client";

import { motion } from "framer-motion";

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function QuizProgress({ currentStep, totalSteps }: QuizProgressProps) {
  // Ex: Passo 1 de 4 (0 etapas concluídas) = 0% de preenchimento
  const percentage = ((currentStep - 1) / totalSteps) * 100;

  return (
    <div className="w-full h-1.5 bg-[oklch(0.9_0.01_80)] rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-[oklch(0.55_0.14_55)] rounded-full origin-left"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
