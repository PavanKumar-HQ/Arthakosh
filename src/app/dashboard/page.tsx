"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AnimatedSection, StaggerChildren, StaggerItem } from "@/components/shared/AnimatedSection";
import {
  Target,
  GitBranch,
  BookOpen,
  Calculator,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  RotateCcw,
  Brain,
  ShieldCheck,
  Zap,
  ArrowRightCircle,
  HelpCircle
} from "lucide-react";
import { useGoalsStore } from "@/lib/store/goals";
import { HealthOS } from "@/components/dashboard/HealthOS";
import { LifeTimeline } from "@/components/dashboard/LifeTimeline";
import { ConflictEngine } from "@/components/dashboard/ConflictEngine";
import { AIGuidancePanel } from "@/components/dashboard/AIGuidancePanel";
import { OnboardingProfile } from "@/types/onboarding";

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<OnboardingProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { goals, monthlyIncome, conflicts, setMonthlyIncome } = useGoalsStore();

  useEffect(() => {
    const saved = localStorage.getItem("user_onboarding_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProfile(parsed);
        // Sync default income from profile if not set in goals store
        if (monthlyIncome === null) {
          let defaultInc = 50000;
          if (parsed.financialReality.incomeRange === "25k-50k") defaultInc = 35000;
          else if (parsed.financialReality.incomeRange === "below-25k") defaultInc = 20000;
          else if (parsed.financialReality.incomeRange === "50k-1l") defaultInc = 75000;
          else if (parsed.financialReality.incomeRange === "1l-2l") defaultInc = 150000;
          else if (parsed.financialReality.incomeRange === "above-2l") defaultInc = 250000;
          setMonthlyIncome(defaultInc);
        }
      } catch (e) {
        console.error("Error reading profile", e);
      }
    }
    setLoading(false);
  }, [monthlyIncome]);

  const handleReset = () => {
    localStorage.removeItem("user_onboarding_profile");
    setProfile(null);
    router.push("/onboarding");
  };

  const getStageHeader = () => {
    if (!profile) return { title: "Your Financial Path", sub: "Setup your life map to start." };
    
    switch (profile.lifeStage) {
      case "student":
        return {
          title: "Smart Student Path",
          sub: "Focus on micro-investments, low friction habits, and compound awareness."
        };
      case "freelancer":
        return {
          title: "Freelancer Financial OS",
          sub: "Managing unpredictable income streams and optimizing tax cash flow reserves."
        };
      case "recovering-debt":
        return {
          title: "Debt Recovery Center",
          sub: "Strategic debt elimination order with non-judgmental stability filters."
        };
      case "first-job":
        return {
          title: "First Salary Playbook",
          sub: "Establishing defensive buffers before lifestyle inflation creeps in."
        };
      default:
        return {
          title: "Adaptive Life Blueprint",
          sub: "Intentional savings allocations built around your actual priority sequence."
        };
    }
  };

  const getDailyMicroGuidance = () => {
    if (!profile) return [];
    
    const tips = [
      "Review your 48h Impulse Buffer list before purchasing non-essentials.",
      "Check standard SIP compound rates in the SIP Simulator."
    ];

    if (profile.behavioralSignals.avoidanceTendency) {
      tips.push("Anxiety script detected: Focus on automation, don't manual-transfer.");
    }
    if (profile.behavioralSignals.stressSensitivity) {
      tips.push("Expense margins are tight. Keep your discretionary buffer flexible.");
    }

    return tips;
  };

  const getRecommendedSimulators = () => {
    if (!profile) return [];

    const sims = [];
    if (profile.lifeStage === "first-job" || profile.lifeStage === "professional") {
      sims.push({
        title: "Salary Negotiation Simulator",
        desc: "Interactive recruiter simulation to optimize baseline salary.",
        href: "/salary",
        time: "10 min"
      });
    }

    sims.push({
      title: "Credit Score Simulator",
      desc: "Simulate card limit or payment updates to monitor score drag.",
      href: "/tools",
      time: "5 min"
    });

    sims.push({
      title: "Emergency Shock Simulator",
      desc: "Stress-test reserves against medical bills or sudden job loss.",
      href: "/tools",
      time: "8 min"
    });

    return sims;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 rounded-full border-2 border-violet/20 border-t-violet animate-spin" />
      </div>
    );
  }

  // If no onboarding profile is found, render onboarding setup CTA (Empty state handling: Part 14)
  if (!profile) {
    return (
      <div className="container-page py-16 sm:py-24 text-center min-h-[calc(100vh-6rem)] flex flex-col justify-center items-center">
        <AnimatedSection className="max-w-md space-y-6">
          <div className="w-16 h-16 bg-violet/10 text-violet rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Financial clarity grows gradually.
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Welcome to Arthakosh. Let's start with a brief, 3-minute onboarding to map out your life stage, pressures, and priorities.
          </p>
          <Link href="/onboarding" className="block">
            <Button className="w-full h-11 bg-violet hover:bg-violet-hover text-white rounded-xl shadow-lg shadow-violet/15 flex items-center justify-center gap-2">
              Start Life Mapping <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    );
  }

  const header = getStageHeader();
  const tips = getDailyMicroGuidance();
  const sims = getRecommendedSimulators();

  return (
    <div className="container-page py-8 sm:py-12 space-y-8 relative">
      {/* Radial background decoration */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-tr from-violet-500/5 to-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Header section */}
      <AnimatedSection>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge className="bg-violet/10 text-violet border-none px-2.5 py-0.5 rounded-full text-xs font-semibold">
                Financial Operating System
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
              {header.title}
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-xl leading-relaxed">
              {header.sub}
            </p>
          </div>
          <Button
            onClick={handleReset}
            variant="outline"
            className="text-xs border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent/40 self-start sm:self-auto h-8 rounded-lg flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Adjust Lifemap
          </Button>
        </div>
      </AnimatedSection>

      {/* Part 3: Health Operating System Panel */}
      <AnimatedSection delay={0.05}>
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">
            Financial Health Telemetry
          </h3>
          <HealthOS 
            profile={profile} 
            goals={goals} 
            monthlyIncome={monthlyIncome || 50000} 
          />
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Conflict Engine, Action Steps, AI reasoning */}
        <div className="lg:col-span-8 space-y-6">
          {/* Part 5: Multi-Goal Conflict Engine */}
          <AnimatedSection delay={0.1}>
            <ConflictEngine conflicts={conflicts} />
          </AnimatedSection>

          {/* Part 11: AI reasoning panels */}
          <AnimatedSection delay={0.15}>
            <AIGuidancePanel profile={profile} goals={goals} />
          </AnimatedSection>

          {/* Simulators recommendation panel (Part 12) */}
          <AnimatedSection delay={0.2}>
            <Card className="p-5 bg-background/50 border-border/40 backdrop-blur-xl">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                Recommended Interactive Simulations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {sims.map((sim, idx) => (
                  <Link key={idx} href={sim.href}>
                    <div className="p-4 rounded-xl border border-border/50 hover:border-border hover:bg-accent/25 transition-all group cursor-pointer flex flex-col justify-between min-h-[120px]">
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold group-hover:text-violet transition-colors">
                          {sim.title}
                        </h4>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          {sim.desc}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-3 shrink-0">
                        <Clock className="w-3 h-3" />
                        <span>{sim.time}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </AnimatedSection>
        </div>

        {/* Right column: Life Timeline & Daily Micro-Guidance */}
        <div className="lg:col-span-4 space-y-6">
          {/* Daily Micro Guidance (Part 9) */}
          <AnimatedSection delay={0.25}>
            <Card className="p-5 bg-background/50 border-border/40 backdrop-blur-xl space-y-4">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Supportive Guidance
              </h3>
              <div className="space-y-3">
                {tips.map((tip, idx) => (
                  <div key={idx} className="flex gap-2 items-start text-xs text-muted-foreground leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </Card>
          </AnimatedSection>

          {/* Part 4: Life Timeline System */}
          <AnimatedSection delay={0.3}>
            <LifeTimeline profile={profile} goals={goals} />
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
