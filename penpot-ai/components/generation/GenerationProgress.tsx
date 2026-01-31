"use client";

import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import { useGenerationStore } from "@/lib/stores/generationStore";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Interpreting prompt" },
  { id: 2, label: "Generating components" },
  { id: 3, label: "Applying design rules" },
  { id: 4, label: "Validating accessibility" },
  { id: 5, label: "Finalizing design" },
];

export function GenerationProgress() {
  const { progress, currentStep } = useGenerationStore();

  const currentStepIndex = Math.floor((progress / 100) * steps.length);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
      {/* Animated icon */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8"
      >
        <Sparkles className="w-10 h-10 text-primary" />
      </motion.div>

      {/* Progress bar */}
      <div className="w-full max-w-xs mb-6">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>{Math.round(progress)}%</span>
          <span>{currentStep}</span>
        </div>
      </div>

      {/* Steps list */}
      <div className="space-y-3 w-full max-w-xs">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl",
                isCurrent && "bg-primary/10",
                isCompleted && "opacity-60"
              )}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                  isCompleted && "bg-green-500 text-white",
                  isCurrent && "bg-primary text-primary-foreground",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={cn(
                  "text-sm",
                  isCurrent && "font-medium text-foreground",
                  !isCurrent && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
              {isCurrent && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="ml-auto w-2 h-2 rounded-full bg-primary"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
