"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, ArrowRight, Check, X } from "lucide-react";
import { QuizHeader } from "@/components/QuizHeader";

// Sequência de numeração: 01, 07, 21, 29 (de 30)
const QUIZ_SEQUENCE = [1, 7, 21, 29];

const QUESTION = {
  step: 3,
  totalSteps: QUIZ_SEQUENCE.length,
  questionNumber: QUIZ_SEQUENCE[2], // "Pergunta 21 de 30"
  totalQuestions: 30,
  label: "Legislação de Trânsito",
  errorRate: "73%",
  text: "Você se aproxima de uma rotatória movimentada em uma via urbana. Não existe nenhum tipo de sinalização no local — nem placa de pare, nem de dê a preferência, nem faixa pintada no chão. De quem é a preferência de passagem, segundo o CTB?",
  options: [
    {
      id: "a",
      text: "Do veículo que vier pela sua direita, pois a regra geral de preferência é sempre do condutor à direita.",
    },
    {
      id: "b",
      text: "Do veículo que já estiver circulando pela rotatória.",
    },
    {
      id: "c",
      text: "Do veículo que estiver trafegando pela via mais larga ou pela avenida principal.",
    },
    {
      id: "d",
      text: "Do primeiro veículo que chegar à entrada da rotatória, independente da direção de onde vem.",
    },
  ],
  correctId: "b",
};

const LETTERS = ["A", "B", "C", "D"];

export default function StepPergunta03() {
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const confirmedRef = useRef(false);

  const isCorrect = selected === QUESTION.correctId;

  const handleConfirm = useCallback(() => {
    if (confirmedRef.current) return;
    confirmedRef.current = true;
    setConfirmed(true);
  }, []);

  return (
    <main className="min-h-dvh flex flex-col bg-[oklch(0.98_0.003_80)] text-[oklch(0.15_0.01_250)] selection:bg-[oklch(0.85_0.08_80)]">
      <QuizHeader
        icon={RotateCcw}
        questionNumber={QUESTION.questionNumber}
        totalQuestions={QUESTION.totalQuestions}
        label={QUESTION.label}
        currentStep={QUESTION.step}
        totalSteps={QUESTION.totalSteps}
        isTimerPaused={confirmed}
        onTimeUp={handleConfirm}
      />

      <section className="px-5 pt-3 pb-8 flex-1 flex flex-col">
        {/* Question */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7"
        >
          <h1 className="text-[17px] leading-[1.6] font-semibold text-[oklch(0.18_0.01_250)]">
            {QUESTION.text}
          </h1>
        </motion.div>

        {/* Options */}
        <div className="flex flex-col gap-2.5">
          {QUESTION.options.map((option, i) => {
            const isSelected = selected === option.id;
            const showResult = confirmed;
            const isRight = option.id === QUESTION.correctId;

            let cardStyle =
              "bg-white border-[oklch(0.92_0.005_80)] shadow-[0_1px_3px_oklch(0.15_0.01_250/5%)]";
            let letterBg = "bg-[oklch(0.96_0.005_80)]";
            let letterColor = "text-[oklch(0.4_0.01_250)]";

            if (showResult && isRight) {
              cardStyle =
                "bg-[oklch(0.97_0.03_155)] border-[oklch(0.8_0.1_155)] shadow-[0_2px_12px_oklch(0.5_0.15_155/12%)]";
              letterBg = "bg-[oklch(0.55_0.18_155)]";
              letterColor = "text-white";
            } else if (showResult && isSelected && !isRight) {
              cardStyle =
                "bg-[oklch(0.97_0.02_25)] border-[oklch(0.85_0.08_25)] shadow-[0_2px_12px_oklch(0.5_0.15_25/12%)]";
              letterBg = "bg-[oklch(0.6_0.2_25)]";
              letterColor = "text-white";
            } else if (isSelected) {
              cardStyle =
                "bg-[oklch(0.96_0.04_55)] border-[oklch(0.75_0.1_55)] shadow-[0_2px_12px_oklch(0.55_0.14_55/15%)]";
              letterBg = "bg-[oklch(0.55_0.14_55)]";
              letterColor = "text-white";
            }

            return (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                disabled={confirmed}
                onClick={() => setSelected(option.id)}
                className={`
                  relative w-full text-left rounded-2xl border px-4 py-3.5
                  transition-all duration-200
                  ${cardStyle}
                  ${confirmed ? "cursor-default" : "cursor-pointer active:scale-[0.98]"}
                `}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`
                      mt-0.5 w-7 h-7 shrink-0 rounded-full flex items-center justify-center
                      text-[11px] font-bold
                      transition-all duration-200
                      ${letterBg} ${letterColor}
                    `}
                  >
                    {showResult && isRight ? (
                      <Check size={14} strokeWidth={3} />
                    ) : showResult && isSelected && !isRight ? (
                      <X size={14} strokeWidth={3} />
                    ) : (
                      LETTERS[i]
                    )}
                  </span>
                  <p className="text-[13px] leading-relaxed text-[oklch(0.3_0.01_250)]">
                    {option.text}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="flex-1 min-h-6" />

        {/* CTA */}
        <AnimatePresence mode="wait">
          {!confirmed ? (
            <motion.button
              key="confirm-btn"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: selected ? 1 : 0.35, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              disabled={!selected}
              onClick={handleConfirm}
              className={`
                w-full py-4 rounded-2xl text-sm font-semibold
                flex items-center justify-center gap-2
                transition-all duration-200
                ${selected
                  ? "bg-[oklch(0.25_0.01_250)] text-white active:scale-[0.98] shadow-[0_4px_16px_oklch(0.15_0.01_250/20%)]"
                  : "bg-[oklch(0.92_0.005_80)] text-[oklch(0.55_0.01_250)] cursor-not-allowed"
                }
              `}
            >
              Confirmar resposta
              <ArrowRight size={16} />
            </motion.button>
          ) : (
            <motion.div
              key="feedback-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col-reverse"
            >
              <div
                className={`
                relative rounded-2xl px-5 py-5 mt-3
                ${isCorrect
                    ? "bg-[oklch(0.97_0.03_155)] border border-[oklch(0.85_0.1_155)]"
                    : "bg-[oklch(0.97_0.02_25)] border border-[oklch(0.88_0.06_25)]"
                  }
              `}
              >
                {/* Taxa de erro nacional — canto superior direito */}
                <span className="absolute top-3 right-3.5 text-[10px] tabular-nums text-[oklch(0.55_0.01_250)] leading-none">
                  Taxa de erro nacional: {QUESTION.errorRate}
                </span>

                <p
                  className={`text-sm font-bold mb-1.5 ${isCorrect ? "text-[oklch(0.4_0.12_155)]" : "text-[oklch(0.45_0.15_25)]"}`}
                >
                  {isCorrect ? "✓ Acertou. Poucos acertam essa." : "✗ A regra que você conhece não vale aqui."}
                </p>
                <p className="text-xs leading-relaxed text-[oklch(0.4_0.01_250)]">
                  {isCorrect
                    ? "Em rotatória sem sinalização, a preferência é de quem já circula por ela (Art. 29, III, CTB). A famosa \"regra da direita\" só vale em cruzamentos comuns. Essa diferença reprova."
                    : "A \"regra da direita\" existe, sim. Mas ela não se aplica a rotatórias. O Art. 29, III do CTB é claro: em rotatória sem sinalização, preferência de quem já circula. Esse é o tipo de pegadinha que parece óbvia depois, mas reprova na hora."}
                </p>
              </div>

              <Link href="/step-05-pergunta-04" className="w-full py-4 rounded-2xl bg-[oklch(0.25_0.01_250)] text-white text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform duration-150 shadow-[0_4px_16px_oklch(0.15_0.01_250/20%)]">
                Próxima pergunta
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
