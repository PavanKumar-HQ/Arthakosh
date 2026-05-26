"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LabPlayer } from "@/components/labs/LabPlayer";
import { LabReflection } from "@/components/labs/LabReflection";
import { LAB_SCENARIOS } from "@/data/labsScenarios";
import { LabTelemetry, UserLabsProfile, FinancialConfidenceScore } from "@/types/labs";
import { ArrowLeft, CheckCircle2, ShieldCheck, Heart, RotateCcw } from "lucide-react";
import { formatCurrency } from "@/lib/constants";

export default function LabPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const labId = params.labId as string;
  const scenario = LAB_SCENARIOS.find((s) => s.id === labId);

  const [mode, setMode] = useState<"play" | "reflect" | "done">("play");
  const [finalTelemetry, setFinalTelemetry] = useState<LabTelemetry | null>(null);
  const [reflectionAnswers, setReflectionAnswers] = useState<any>(null);

  if (!scenario) {
    return (
      <div className="container-narrow py-20 text-center">
        <h2 className="text-xl font-bold mb-3">Lab environment not found</h2>
        <Link href="/labs" className="text-sm text-muted-foreground hover:text-foreground underline">
          ← Back to Labs Hub
        </Link>
      </div>
    );
  }

  const handleCompleteSimulation = (telemetry: LabTelemetry, pathHistory: string[]) => {
    setFinalTelemetry(telemetry);
    setMode("reflect");
  };

  const handleCompleteReflection = (answers: any) => {
    setReflectionAnswers(answers);
    
    // Save completion & update confidence score profile in localStorage
    const saved = localStorage.getItem("user_labs_profile");
    let currentProfile: UserLabsProfile = {
      completedLabs: [],
      confidence: {
        consistency: 60,
        resilience: 50,
        recovery: 45,
        adaptability: 55,
        strategicAwareness: 50
      },
      lastSimulatedDate: ""
    };

    if (saved) {
      try {
        currentProfile = JSON.parse(saved);
      } catch (e) {
        console.error("Error loading profile", e);
      }
    }

    if (!currentProfile.completedLabs.includes(labId)) {
      currentProfile.completedLabs.push(labId);
    }

    // Calibrate Confidence scores based on ending telemetry parameters
    if (finalTelemetry) {
      const conf = { ...currentProfile.confidence };
      
      if (labId === "first-salary") {
        conf.consistency = Math.min(100, conf.consistency + 15);
        if (finalTelemetry.cashReserves > 15000) conf.strategicAwareness = Math.min(100, conf.strategicAwareness + 10);
        if (finalTelemetry.stressLevel < 40) conf.resilience = Math.min(100, conf.resilience + 10);
      } else if (labId === "job-loss") {
        conf.resilience = Math.min(100, conf.resilience + 20);
        if (finalTelemetry.debtPressure < 30) conf.recovery = Math.min(100, conf.recovery + 15);
        if (finalTelemetry.flexibilityMargin > 50) conf.adaptability = Math.min(100, conf.adaptability + 15);
      } else if (labId === "basic-emergency") {
        conf.resilience = Math.min(100, conf.resilience + 15);
        conf.consistency = Math.min(100, conf.consistency + 10);
      } else if (labId === "budget-flex") {
        conf.adaptability = Math.min(100, conf.adaptability + 15);
        conf.strategicAwareness = Math.min(100, conf.strategicAwareness + 10);
      } else if (labId === "debt-recovery") {
        conf.recovery = Math.min(100, conf.recovery + 20);
        conf.strategicAwareness = Math.min(100, conf.strategicAwareness + 10);
      } else if (labId === "income-instability") {
        conf.resilience = Math.min(100, conf.resilience + 15);
        conf.adaptability = Math.min(100, conf.adaptability + 15);
      } else if (labId === "wealth-compounding") {
        conf.consistency = Math.min(100, conf.consistency + 20);
        conf.strategicAwareness = Math.min(100, conf.strategicAwareness + 10);
      } else if (labId === "career-growth") {
        conf.strategicAwareness = Math.min(100, conf.strategicAwareness + 15);
        conf.adaptability = Math.min(100, conf.adaptability + 15);
      } else if (labId === "sabbatical-plan") {
        conf.adaptability = Math.min(100, conf.adaptability + 20);
        conf.resilience = Math.min(100, conf.resilience + 10);
      } else if (labId === "startup-risk") {
        conf.strategicAwareness = Math.min(100, conf.strategicAwareness + 20);
        conf.recovery = Math.min(100, conf.recovery + 10);
      } else if (labId === "family-dependency") {
        conf.resilience = Math.min(100, conf.resilience + 20);
        conf.recovery = Math.min(100, conf.recovery + 15);
      } else if (labId === "lifestyle-inflation") {
        conf.strategicAwareness = Math.min(100, conf.strategicAwareness + 15);
        conf.consistency = Math.min(100, conf.consistency + 15);
      }

      currentProfile.confidence = conf;
    }

    currentProfile.lastSimulatedDate = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });

    localStorage.setItem("user_labs_profile", JSON.stringify(currentProfile));
    setMode("done");
  };

  const handleRestart = () => {
    setFinalTelemetry(null);
    setReflectionAnswers(null);
    setMode("play");
  };

  return (
    <div className="container-page py-8 sm:py-12 space-y-6">
      {/* Dynamic Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border/20">
        <Link 
          href="/labs"
          className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Exit Environment
        </Link>
        <div className="flex items-center gap-1.5">
          <Badge className="bg-violet/10 text-violet border-none px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
            {scenario.category} Lab
          </Badge>
          <span className="text-[10px] text-muted-foreground font-semibold">
            Difficulty: <b className="capitalize text-foreground">{scenario.difficulty}</b>
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          {scenario.title}
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {scenario.description}
        </p>
      </div>

      {mode === "play" && (
        <LabPlayer 
          scenario={scenario} 
          onComplete={handleCompleteSimulation} 
          onExit={() => router.push("/labs")} 
        />
      )}

      {mode === "reflect" && (
        <LabReflection onComplete={handleCompleteReflection} />
      )}

      {mode === "done" && finalTelemetry && (
        <Card className="max-w-xl mx-auto p-6 sm:p-8 bg-background/50 border-border/40 backdrop-blur-xl text-center space-y-6">
          <div className="w-12 h-12 bg-emerald/10 text-emerald rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-bold tracking-tight">Simulation Finalized</h3>
          
          <div className="p-4 rounded-xl bg-accent/40 border border-border/40 grid grid-cols-2 gap-4 text-left">
            <div>
              <span className="block text-[10px] text-muted-foreground uppercase font-bold">Reserves Ending</span>
              <span className="text-sm font-extrabold text-foreground">{formatCurrency(finalTelemetry.cashReserves)}</span>
            </div>
            <div>
              <span className="block text-[10px] text-muted-foreground uppercase font-bold">Ending Stress</span>
              <span className="text-sm font-extrabold text-foreground">{finalTelemetry.stressLevel}/100</span>
            </div>
            <div>
              <span className="block text-[10px] text-muted-foreground uppercase font-bold">Flexibility margin</span>
              <span className="text-sm font-extrabold text-foreground">{finalTelemetry.flexibilityMargin}%</span>
            </div>
            <div>
              <span className="block text-[10px] text-muted-foreground uppercase font-bold">Repayment Debt</span>
              <span className="text-sm font-extrabold text-foreground">{finalTelemetry.debtPressure}/100</span>
            </div>
          </div>

          {reflectionAnswers && (
            <div className="p-4 rounded-xl bg-violet-500/[0.02] border border-violet/10 text-left text-xs leading-relaxed space-y-1.5">
              <span className="font-bold text-violet block uppercase tracking-wider text-[10px]">Reflection Logged</span>
              <p className="text-muted-foreground">
                Primary influence: <b>{reflectionAnswers.influence}</b>
              </p>
              <p className="text-muted-foreground">
                Tradeoff difficulty: <b>{reflectionAnswers.difficulty}</b>
              </p>
            </div>
          )}

          <div className="flex gap-2 justify-center pt-2">
            <Link href="/labs" className="block">
              <Button className="h-10 px-6 bg-foreground text-background font-semibold hover:opacity-90 rounded-xl text-xs">
                Back to Portal
              </Button>
            </Link>
            <Button
              onClick={handleRestart}
              variant="outline"
              className="h-10 px-5 border-border/50 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-accent/40 rounded-xl flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Replay Timeline
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
