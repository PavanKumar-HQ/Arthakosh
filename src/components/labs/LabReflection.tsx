"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, CheckCircle2, ChevronRight } from "lucide-react";

interface LabReflectionProps {
  onComplete: (answers: { influence: string; stressImpact: string; difficulty: string }) => void;
}

export function LabReflection({ onComplete }: LabReflectionProps) {
  const [step, setStep] = useState(1);
  const [influence, setInfluence] = useState<string>("");
  const [stressImpact, setStressImpact] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete({ influence, stressImpact, difficulty });
    }
  };

  return (
    <Card className="max-w-xl mx-auto p-6 sm:p-8 bg-background/50 border-border/40 backdrop-blur-xl space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Brain className="w-5 h-5 text-violet" />
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
          Post-Simulation Reflection
        </h3>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-foreground">
            1. What influenced your decisions most during this simulation?
          </p>
          <div className="grid grid-cols-1 gap-2">
            {[
              { label: "Immediate Emotional Safety", val: "safety" },
              { label: "Long-term Wealth Optimization", val: "wealth" },
              { label: "Fear of running completely out of cash", val: "fear" },
              { label: "Pressure to maintain social expectations", val: "social" }
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => setInfluence(opt.label)}
                className={`text-left p-3.5 rounded-xl border text-xs transition-all ${
                  influence === opt.label
                    ? "border-violet bg-violet/5 font-semibold text-foreground"
                    : "border-border/60 hover:border-border text-muted-foreground hover:text-foreground bg-accent/20"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-foreground">
            2. Would you make the same decisions if you were under less daily stress?
          </p>
          <div className="grid grid-cols-1 gap-2">
            {[
              { label: "Yes, these match my logical core values.", val: "yes" },
              { label: "No, stress made me make reactive choices for quick relief.", val: "no" },
              { label: "Maybe, but I would take more calculated risks.", val: "maybe" }
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => setStressImpact(opt.label)}
                className={`text-left p-3.5 rounded-xl border text-xs transition-all ${
                  stressImpact === opt.label
                    ? "border-violet bg-violet/5 font-semibold text-foreground"
                    : "border-border/60 hover:border-border text-muted-foreground hover:text-foreground bg-accent/20"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-foreground">
            3. Which tradeoff did you find the most difficult to balance?
          </p>
          <div className="grid grid-cols-1 gap-2">
            {[
              { label: "Depleting my cash reserves to clear debts", val: "repay" },
              { label: "Delaying retirement investments to build runway", val: "delay" },
              { label: "Experiencing high stress levels to preserve margins", val: "stress" },
              { label: "Admitting boundaries to family or friends", val: "vulnerability" }
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => setDifficulty(opt.label)}
                className={`text-left p-3.5 rounded-xl border text-xs transition-all ${
                  difficulty === opt.label
                    ? "border-violet bg-violet/5 font-semibold text-foreground"
                    : "border-border/60 hover:border-border text-muted-foreground hover:text-foreground bg-accent/20"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-border/20">
        <span className="text-[10px] text-muted-foreground uppercase font-bold">
          Question {step} of 3
        </span>
        <button
          onClick={handleNext}
          disabled={
            (step === 1 && !influence) ||
            (step === 2 && !stressImpact) ||
            (step === 3 && !difficulty)
          }
          className={`h-9 px-5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
            (step === 1 && influence) ||
            (step === 2 && stressImpact) ||
            (step === 3 && difficulty)
              ? "bg-violet hover:bg-violet-hover text-white"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {step === 3 ? "Complete Review" : "Continue"} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </Card>
  );
}
