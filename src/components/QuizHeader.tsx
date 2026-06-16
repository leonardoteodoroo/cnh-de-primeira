"use client";

import { LucideIcon } from "lucide-react";
import { QuizTimer } from "./QuizTimer";
import { QuizProgress } from "./QuizProgress";

interface QuizHeaderProps {
  icon: LucideIcon;
  questionNumber: number;
  totalQuestions: number;
  label: string;
  currentStep: number;
  totalSteps: number;
  isTimerPaused: boolean;
  onTimeUp: () => void;
}

export function QuizHeader({
  icon: Icon,
  questionNumber,
  totalQuestions,
  label,
  currentStep,
  totalSteps,
  isTimerPaused,
  onTimeUp,
}: QuizHeaderProps) {
  return (
    <header className="px-5 pt-5 pb-3">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[oklch(0.95_0.04_55)] flex items-center justify-center">
            <Icon size={17} className="text-[oklch(0.55_0.14_55)]" />
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-[oklch(0.55_0.02_80)]">
              Pergunta {questionNumber} de {totalQuestions}
            </p>
            <p className="text-xs font-semibold text-[oklch(0.35_0.02_80)]">
              {label}
            </p>
          </div>
        </div>

        {/* Timer independente */}
        <QuizTimer isPaused={isTimerPaused} onTimeUp={onTimeUp} />
      </div>

      {/* Barra de progresso contínua */}
      <QuizProgress currentStep={currentStep} totalSteps={totalSteps} />
    </header>
  );
}
