"use client";

import { useState, useEffect, useRef } from "react";
import { Clock } from "lucide-react";

interface QuizTimerProps {
  duration?: number;
  isPaused: boolean;
  onTimeUp: () => void;
}

export function QuizTimer({ duration = 30, isPaused, onTimeUp }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onTimeUpRef = useRef(onTimeUp);

  // Keep ref fresh so it doesn't trigger effect re-runs unnecessarily
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setTimeout(() => onTimeUpRef.current(), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  if (isPaused) return null;

  return (
    <div className={`flex items-center gap-1.5 tabular-nums text-xs font-medium ${
      timeLeft <= 10
        ? "text-[oklch(0.5_0.18_25)]"
        : "text-[oklch(0.5_0.01_250)]"
    }`}>
      <Clock size={13} className="opacity-60" />
      <span>0:{timeLeft.toString().padStart(2, "0")}</span>
    </div>
  );
}
