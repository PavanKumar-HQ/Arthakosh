"use client";

import React from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Brain, Sparkles } from "lucide-react";
import { OnboardingEmotionalContext } from "@/types/onboarding";

interface EmotionalStepProps {
  value: OnboardingEmotionalContext;
  onChange: (val: OnboardingEmotionalContext) => void;
}

export function EmotionalStep({ value, onChange }: EmotionalStepProps) {
  const updateMetric = (key: keyof OnboardingEmotionalContext, val: number) => {
    onChange({
      ...value,
      [key]: val
    });
  };

  const anxietyLabel = [
    "",
    "No stress — fully cushioned",
    "Minor friction — brief annoyance",
    "Moderate worry — requires budget adjustments",
    "Highly stressful — disruptive to peace of mind",
    "Overwhelming — causes physical dread or avoidance"
  ][value.anxietyLevel];

  const confidenceLabel = [
    "",
    "Complete fog — guessing next steps",
    "Hesitant — second-guessing decisions",
    "Reasonable — know basic structures",
    "Confident — make deliberate, structured moves",
    "Highly secure — fully optimized leverage"
  ][value.confidenceLevel];

  const exhaustionLabel = [
    "",
    "Frictionless — checking is automated & easy",
    "Slight fatigue — occasional chore",
    "Moderate drag — avoid logging spreadsheets",
    "Heavy drain — feels like homework/shame",
    "Severely exhausting — complete paralysis"
  ][value.exhaustionLevel];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8 max-w-2xl mx-auto px-4"
    >
      <div className="text-center mb-8">
        <div className="w-10 h-10 rounded-full bg-violet/10 text-violet flex items-center justify-center mx-auto mb-3">
          <Brain className="w-5 h-5" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-2">
          Your Emotional Financial Context
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm max-w-md mx-auto">
          We want to understand your mindset, not just your balance sheet. This helps us customize our recommendations to be stress-aware.
        </p>
      </div>

      <div className="space-y-8">
        {/* Metric 1: Anxiety */}
        <div className="bg-accent/30 border border-border/50 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h4 className="text-sm font-semibold text-foreground">Stress Sensitivity</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                When unexpected expenses happen, how stressful does it usually feel?
              </p>
            </div>
            <span className="text-xs font-bold text-violet bg-violet/10 px-2 py-0.5 rounded-full shrink-0">
              Level {value.anxietyLevel}/5
            </span>
          </div>

          <Slider
            value={[value.anxietyLevel]}
            onValueChange={(val) => {
              const value = Array.isArray(val) ? val[0] : val;
              updateMetric("anxietyLevel", value);
            }}
            min={1}
            max={5}
            step={1}
            className="my-4"
          />

          <div className="text-[11px] text-muted-foreground italic text-center">
            "{anxietyLabel}"
          </div>
        </div>

        {/* Metric 2: Confidence */}
        <div className="bg-accent/30 border border-border/50 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h4 className="text-sm font-semibold text-foreground">Decision Confidence</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                How confident do financial decisions currently feel to you?
              </p>
            </div>
            <span className="text-xs font-bold text-emerald bg-emerald/10 px-2 py-0.5 rounded-full shrink-0">
              Level {value.confidenceLevel}/5
            </span>
          </div>

          <Slider
            value={[value.confidenceLevel]}
            onValueChange={(val) => {
              const value = Array.isArray(val) ? val[0] : val;
              updateMetric("confidenceLevel", value);
            }}
            min={1}
            max={5}
            step={1}
            className="my-4"
          />

          <div className="text-[11px] text-muted-foreground italic text-center">
            "{confidenceLabel}"
          </div>
        </div>

        {/* Metric 3: Planning exhaustion */}
        <div className="bg-accent/30 border border-border/50 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h4 className="text-sm font-semibold text-foreground">Planning Fatigue</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                How emotionally exhausting does financial planning feel right now?
              </p>
            </div>
            <span className="text-xs font-bold text-amber bg-amber/10 px-2 py-0.5 rounded-full shrink-0">
              Level {value.exhaustionLevel}/5
            </span>
          </div>

          <Slider
            value={[value.exhaustionLevel]}
            onValueChange={(val) => {
              const value = Array.isArray(val) ? val[0] : val;
              updateMetric("exhaustionLevel", value);
            }}
            min={1}
            max={5}
            step={1}
            className="my-4"
          />

          <div className="text-[11px] text-muted-foreground italic text-center">
            "{exhaustionLabel}"
          </div>
        </div>
      </div>
    </motion.div>
  );
}
