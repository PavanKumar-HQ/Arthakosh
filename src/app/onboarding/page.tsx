"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { WelcomeStep } from "@/components/onboarding/WelcomeStep";
import { LifeStageStep } from "@/components/onboarding/LifeStageStep";
import { PriorityStep } from "@/components/onboarding/PriorityStep";
import { EmotionalStep } from "@/components/onboarding/EmotionalStep";
import { RealityStep } from "@/components/onboarding/RealityStep";
import { PathwayGenerationStep } from "@/components/onboarding/PathwayGenerationStep";
import { 
  OnboardingLifeStage, 
  OnboardingPriority, 
  OnboardingEmotionalContext, 
  OnboardingFinancialReality,
  InferredBehavioralSignals,
  OnboardingProfile 
} from "@/types/onboarding";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0 = Welcome, 1 = LifeStage, 2 = Priorities, 3 = Emotional, 4 = Reality, 5 = PathwayGen

  // Onboarding States
  const [lifeStage, setLifeStage] = useState<OnboardingLifeStage | null>(null);
  const [priorities, setPriorities] = useState<OnboardingPriority[]>([]);
  const [emotionalContext, setEmotionalContext] = useState<OnboardingEmotionalContext>({
    anxietyLevel: 3,
    confidenceLevel: 3,
    exhaustionLevel: 3
  });
  const [financialReality, setFinancialReality] = useState<OnboardingFinancialReality>({
    incomeRange: "50k-1l",
    expensePressure: "medium",
    hasDebt: false,
    dependents: 0,
    savingsRate: "occasional"
  });

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const calculateBehavioralSignals = (): InferredBehavioralSignals => {
    const avoidanceTendency = emotionalContext.anxietyLevel >= 4 && emotionalContext.confidenceLevel <= 2;
    const impulsiveRisk = priorities.includes("lifestyle-balance") && emotionalContext.confidenceLevel <= 3;
    const stabilityPreference = priorities.includes("emergency-stability") || priorities.includes("reducing-stress");
    const planningInconsistency = financialReality.savingsRate === "occasional" && emotionalContext.exhaustionLevel >= 3;
    const stressSensitivity = financialReality.expensePressure === "high" && emotionalContext.anxietyLevel >= 4;

    return {
      avoidanceTendency,
      impulsiveRisk,
      stabilityPreference,
      planningInconsistency,
      stressSensitivity
    };
  };

  const handleFinish = () => {
    if (!lifeStage) return;

    const profile: OnboardingProfile = {
      lifeStage,
      priorities,
      emotionalContext,
      financialReality,
      behavioralSignals: calculateBehavioralSignals(),
      completedAt: new Date().toISOString()
    };

    localStorage.setItem("user_onboarding_profile", JSON.stringify(profile));
    router.push("/dashboard");
  };

  const isStepValid = () => {
    if (step === 1) return lifeStage !== null;
    if (step === 2) return priorities.length >= 2;
    return true;
  };

  const totalSteps = 4; // Excluding Welcome (0) and PathwayGen (5)
  const currentProgress = step > 0 && step <= 4 ? ((step - 1) / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between py-6 sm:py-10">
      <div className="w-full max-w-4xl mx-auto flex-grow flex flex-col justify-center">
        
        {/* Step Progress indicators */}
        {step > 0 && step < 5 && (
          <div className="w-full max-w-md mx-auto mb-10 px-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Step {step} of {totalSteps}
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                {step === 1 && "Life Context"}
                {step === 2 && "Priorities"}
                {step === 3 && "Mindset"}
                {step === 4 && "Financial Profile"}
              </span>
            </div>
            <Progress value={currentProgress} className="h-1" />
          </div>
        )}

        <div className="flex-grow flex items-center justify-center">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <WelcomeStep key="welcome" onNext={handleNext} />
            )}

            {step === 1 && (
              <LifeStageStep
                key="lifestage"
                value={lifeStage}
                onChange={setLifeStage}
                onNext={handleNext}
              />
            )}

            {step === 2 && (
              <PriorityStep
                key="priorities"
                selected={priorities}
                onChange={setPriorities}
              />
            )}

            {step === 3 && (
              <EmotionalStep
                key="emotional"
                value={emotionalContext}
                onChange={setEmotionalContext}
              />
            )}

            {step === 4 && (
              <RealityStep
                key="reality"
                value={financialReality}
                onChange={setFinancialReality}
              />
            )}

            {step === 5 && lifeStage && (
              <PathwayGenerationStep
                key="pathway"
                profile={{
                  lifeStage,
                  priorities,
                  emotionalContext,
                  financialReality,
                  behavioralSignals: calculateBehavioralSignals(),
                  completedAt: new Date().toISOString()
                }}
                onFinish={handleFinish}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Global Footer Stepper Buttons */}
        {step > 0 && step < 5 && (
          <div className="w-full max-w-2xl mx-auto flex items-center justify-between mt-12 pt-6 border-t border-border/30 px-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`h-9 px-5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isStepValid()
                  ? "bg-foreground text-background hover:opacity-90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
