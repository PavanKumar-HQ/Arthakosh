"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, MessageSquare, ArrowRight } from "lucide-react";
import { OnboardingProfile } from "@/types/onboarding";
import { Goal } from "@/types";

interface AIGuidancePanelProps {
  profile: OnboardingProfile;
  goals: Goal[];
}

export function AIGuidancePanel({ profile, goals }: AIGuidancePanelProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const questions = [
    "Should I prioritize debt or investing?",
    "Am I financially overstretched?",
    "Can I realistically take a career break?",
    "Why does my financial stress keep increasing?"
  ];

  const handleAsk = (q: string) => {
    setSelectedQuestion(q);
    setLoading(true);
    setResponse(null);

    // Simulate AI thinking and building context-aware reasoning
    setTimeout(() => {
      let ans = "";
      if (q.includes("prioritize debt")) {
        if (profile.financialReality.hasDebt) {
          ans = `Given that you are in the "${profile.lifeStage.replace("-", " ")}" stage and carry active liabilities (${profile.financialReality.debtType?.replace("-", " ")}), we highly recommend focusing on DEBT first. Payoff EMIs/Credit cards using Snowball metrics. A 10% market return is non-guaranteed, whereas retiring a 14% debt provides an immediate, guaranteed risk-free return of 14%.`;
        } else {
          ans = "Since you have no active high-risk debt, you should focus on maximizing compound wealth via low-cost Index Funds and SIPs, while keeping a standard 3-6 month emergency buffer in liquid accounts.";
        }
      } else if (q.includes("overstretched")) {
        const totalContribution = goals.reduce((sum, g) => sum + g.monthlyContribution, 0);
        if (profile.financialReality.expensePressure === "high" || totalContribution > 15000) {
          ans = "Yes, your metrics show elevated signs of pressure. Competing priorities may be squeezing your monthly breathing room. We suggest extending non-essential goal timelines by 3-6 months to reduce monthly commitments and avoid burnout.";
        } else {
          ans = "No, your current goal commitments appear balanced relative to standard surplus buffers. You retain reasonable financial breathing room for discretionary lifestyle spending.";
        }
      } else if (q.includes("career break")) {
        const emergencyGoals = goals.filter(g => g.category === "emergency-fund");
        const totalEmergency = emergencyGoals.reduce((sum, g) => sum + g.currentSavings, 0);
        if (totalEmergency > 100000) {
          ans = "Your accumulated savings provide some stability runway. However, taking a career break is a significant lifestyle pivot. Ensure you have 6-9 months of active expenses buffered separately from your core investments before pausing active income streams.";
        } else {
          ans = "Currently, your emergency runway is below the recommended 6-month threshold. Pausing income now would create high anxiety and likely force liquidation of long-term investments. Focus on stabilizing the emergency runway first.";
        }
      } else if (q.includes("financial stress")) {
        if (profile.emotionalContext.anxietyLevel >= 4) {
          ans = `We notice your baseline anxiety score is high (${profile.emotionalContext.anxietyLevel}/5). This stress is likely driven by decision fatigue and fear of market volatility. We suggest automating all essential bills and investments, then checking bank statements only once a week to break the hyper-vigilance loop.`;
        } else {
          ans = "Your stress level appears manageable. However, ensure goals are sequenced rather than funded simultaneously to prevent minor cash flow pinches from turning into regular anxiety triggers.";
        }
      }

      setResponse(ans);
      setLoading(false);
    }, 1200);
  };

  return (
    <Card className="p-5 bg-background/50 border-border/40 backdrop-blur-xl space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-5 h-5 text-violet" />
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          AI Contextual Reasoning
        </h3>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">
          Ask a stress-aware question. Our reasoning model uses your active lifemap, goals, and emotional contexts.
        </p>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {questions.map((q) => (
            <button
              key={q}
              onClick={() => handleAsk(q)}
              className={`text-left text-[11px] px-3 py-1.5 rounded-lg border transition-all ${
                selectedQuestion === q
                  ? "border-violet bg-violet/5 text-foreground font-semibold"
                  : "border-border/60 hover:border-border text-muted-foreground hover:text-foreground bg-accent/20"
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="p-4 rounded-xl bg-accent/30 border border-border/40 flex items-center gap-2.5 text-xs text-muted-foreground">
          <div className="w-4 h-4 rounded-full border border-violet/30 border-t-violet animate-spin shrink-0" />
          Evaluating lifemap buffers...
        </div>
      )}

      {response && !loading && (
        <div className="p-4 rounded-xl bg-violet-500/[0.02] border border-violet/10 text-xs leading-relaxed space-y-2">
          <div className="flex items-center gap-1.5 text-violet font-semibold">
            <Brain className="w-3.5 h-3.5" />
            <span>Reasoning Output</span>
          </div>
          <p className="text-muted-foreground italic">
            "{response}"
          </p>
        </div>
      )}
    </Card>
  );
}
