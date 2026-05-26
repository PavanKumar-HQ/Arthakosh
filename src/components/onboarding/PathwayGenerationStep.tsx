"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  ArrowRight, 
  Brain, 
  TrendingUp, 
  ShieldCheck, 
  HelpCircle,
  Activity,
  Heart
} from "lucide-react";
import { OnboardingProfile } from "@/types/onboarding";

interface PathwayGenerationStepProps {
  profile: OnboardingProfile;
  onFinish: () => void;
}

export function PathwayGenerationStep({ profile, onFinish }: PathwayGenerationStepProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const getPathwayInfo = () => {
    switch (profile.lifeStage) {
      case "student":
        return {
          title: "The Smart Student Path",
          subtitle: "Build Early Leverage",
          description: "Your priority is setting up high-conviction habits without feeling restricted. We'll start with small investments and credit building.",
          focusAreas: ["Micro-SIP setup", "Credit score concepts", "Scarcity psychology"],
          quote: "Starting with just ₹500/month establishes the compound mindset early."
        };
      case "freelancer":
        return {
          title: "The Freelancer's Financial OS",
          subtitle: "Master Income Volatility",
          description: "Your priority is stabilizing unpredictable cash flows. We'll design emergency safety buffers and irregular tax plans.",
          focusAreas: ["6-Month Safety Simulator", "Tax earmarking guidelines", "Emergency Resilience Tool"],
          quote: "A larger buffer gives you the leverage to choose projects you love."
        };
      case "recovering-debt":
      case "debt-management" as any:
        return {
          title: "The Debt Recovery Framework",
          subtitle: "Sustainable Financial Healing",
          description: "Focus on structured debt payoff order while preserving mental peace. We will set up snowball metrics to make wins tangible.",
          focusAreas: ["Debt Recovery System", "Interest compression math", "Stress indicators"],
          quote: "Getting out of debt is a behavioral recovery project, not a math exam."
        };
      case "first-job":
        return {
          title: "The First Salary Playbook",
          subtitle: "Figuring Out the Rules",
          description: "Establish strong defaults before lifestyle inflation catches up. We'll balance first savings with negotiating power.",
          focusAreas: ["Salary Negotiation simulation", "EMI stress-aware calculators", "50/30/20 adaptation"],
          quote: "Your early choices set the baseline. Build structures before you see the wealth."
        };
      case "retirement":
        return {
          title: "The Retirement Readiness Map",
          subtitle: "Securing the Transition",
          description: "Preserve capital gains, optimize tax liabilities, and transition assets into passive cash flows.",
          focusAreas: ["Compound growth scenarios", "Nomination & nominee checklists", "Fixed cost optimization"],
          quote: "Transitioning to retirement is about cash flow security, not asset size."
        };
      default:
        return {
          title: "Adaptive Stability Framework",
          subtitle: "Personalized Operating System",
          description: "A customized journey built around reducing money anxiety, establishing emergency margin, and intentional goals.",
          focusAreas: ["Safety buffer tuning", "Goal tracking", "Cognitive psychology tools"],
          quote: "Financial confidence beats numerical complexity every single day."
        };
    }
  };

  const path = getPathwayInfo();

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center text-center py-20 px-4"
      >
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-full border-4 border-violet/20 border-t-violet animate-spin" />
          <Brain className="w-6 h-6 text-violet absolute inset-0 m-auto" />
        </div>
        <h3 className="text-lg font-bold mb-2">Analyzing Life Map & Context...</h3>
        <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
          Evaluating emotional triggers, priority sequences, and cash flow limits.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto space-y-6 px-4"
    >
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-amber" />
          <Badge className="bg-violet/10 text-violet border-none px-3 py-1 rounded-full text-xs font-semibold">
            Pathway Complete
          </Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          {path.title}
        </h1>
        <p className="text-xs text-muted-foreground italic font-medium">
          {path.subtitle}
        </p>
      </div>

      <Card className="p-6 bg-background/50 border-border/40 backdrop-blur-xl space-y-6">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {path.description}
        </p>

        <div>
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
            Primary Focus Modules
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {path.focusAreas.map((area, idx) => (
              <div 
                key={idx} 
                className="p-3 bg-accent/40 border border-border/50 rounded-xl text-center text-xs font-semibold text-foreground flex items-center justify-center min-h-[50px]"
              >
                {area}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-violet/5 border border-violet/10 flex gap-3 items-start">
          <Heart className="w-4 h-4 text-violet shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-violet uppercase tracking-wider mb-1">Behavioral Blueprint</h4>
            <p className="text-xs text-muted-foreground leading-relaxed italic">
              "{path.quote}"
            </p>
          </div>
        </div>
      </Card>

      {/* Trust & Transparency disclosure */}
      <p className="text-[10px] text-muted-foreground text-center max-w-md mx-auto leading-relaxed">
        This pathway is completely local and stress-aware. It does not suggest complex investments or sell insurance. We start building clarity from where you are today.
      </p>

      <div className="text-center pt-2">
        <Button
          onClick={onFinish}
          className="h-11 px-8 bg-foreground text-background font-semibold hover:opacity-90 rounded-xl flex items-center gap-2 justify-center mx-auto"
        >
          Initialize Personalized Dashboard
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}
