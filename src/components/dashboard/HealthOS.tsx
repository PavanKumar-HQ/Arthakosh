"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ShieldCheck, 
  Coins, 
  Percent, 
  Activity, 
  CheckCircle2, 
  HelpCircle 
} from "lucide-react";
import { OnboardingProfile } from "@/types/onboarding";
import { Goal } from "@/types";

interface HealthOSProps {
  profile: OnboardingProfile;
  goals: Goal[];
  monthlyIncome: number;
}

export function HealthOS({ profile, goals, monthlyIncome }: HealthOSProps) {
  // 1. Calculate Liquidity Health
  const totalCommitments = goals.reduce((sum, g) => sum + g.monthlyContribution, 0);
  const surplusIncome = Math.max(0, monthlyIncome - totalCommitments);
  const liquidityRatio = monthlyIncome > 0 ? (surplusIncome / monthlyIncome) * 100 : 0;
  
  // 2. Emergency Resilience (months covered)
  const emergencyGoals = goals.filter(g => g.category === "emergency-fund");
  const emergencySavings = emergencyGoals.reduce((sum, g) => sum + g.currentSavings, 0);
  const monthlyExpenses = monthlyIncome * 0.6; // assume standard 60% expenses if not details
  const emergencyMonths = monthlyExpenses > 0 ? Math.round((emergencySavings / monthlyExpenses) * 10) / 10 : 0;

  // 3. Debt Pressure index
  let debtPressure = 0;
  if (profile.financialReality.hasDebt) {
    debtPressure += 40;
    if (profile.financialReality.debtType === "credit-card") debtPressure += 30;
    if (profile.financialReality.expensePressure === "high") debtPressure += 20;
  } else {
    debtPressure = 10; // baseline healthy
  }

  // 4. Flexibility (Breathing Room)
  const breathingRoom = Math.max(10, Math.round(liquidityRatio));

  const getStatusLabel = (val: number) => {
    if (val >= 70) return { text: "Secure", color: "text-emerald bg-emerald/10 border-emerald/20" };
    if (val >= 40) return { text: "Moderate", color: "text-amber bg-amber/10 border-amber/20" };
    return { text: "Stretched", color: "text-rose-500 bg-rose-500/10 border-rose-500/20" };
  };

  const liquidityStatus = getStatusLabel(liquidityRatio);
  const emergencyStatus = emergencyMonths >= 6 ? getStatusLabel(90) : emergencyMonths >= 3 ? getStatusLabel(50) : getStatusLabel(20);
  const debtStatus = debtPressure > 60 ? getStatusLabel(20) : debtPressure > 30 ? getStatusLabel(50) : getStatusLabel(90);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Pillar 1: Liquidity Health */}
      <Card className="p-5 bg-background/50 border-border/40 backdrop-blur-xl space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Coins className="w-4 h-4 text-violet" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Liquidity Margin</span>
          </div>
          <Badge className={`text-[9px] border px-2 py-0.5 rounded-full ${liquidityStatus.color}`}>
            {liquidityStatus.text}
          </Badge>
        </div>
        <div>
          <span className="text-2xl font-extrabold text-foreground">{Math.round(liquidityRatio)}%</span>
          <span className="text-[10px] text-muted-foreground block mt-0.5">Surplus ratio of income</span>
        </div>
        <Progress value={liquidityRatio} className="h-1 bg-muted" />
      </Card>

      {/* Pillar 2: Emergency Resilience */}
      <Card className="p-5 bg-background/50 border-border/40 backdrop-blur-xl space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-emerald" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Runway Coverage</span>
          </div>
          <Badge className={`text-[9px] border px-2 py-0.5 rounded-full ${emergencyStatus.color}`}>
            {emergencyMonths >= 6 ? "Resilient" : emergencyMonths >= 3 ? "Standard" : "Vulnerable"}
          </Badge>
        </div>
        <div>
          <span className="text-2xl font-extrabold text-foreground">{emergencyMonths} mo</span>
          <span className="text-[10px] text-muted-foreground block mt-0.5">Expenses covered in savings</span>
        </div>
        <Progress value={Math.min(100, (emergencyMonths / 6) * 100)} className="h-1 bg-muted" />
      </Card>

      {/* Pillar 3: Debt Pressure */}
      <Card className="p-5 bg-background/50 border-border/40 backdrop-blur-xl space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Activity className="w-4 h-4 text-rose-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Debt Burden</span>
          </div>
          <Badge className={`text-[9px] border px-2 py-0.5 rounded-full ${debtStatus.color}`}>
            {debtPressure > 60 ? "Heavy Load" : debtPressure > 30 ? "Manageable" : "Minimal"}
          </Badge>
        </div>
        <div>
          <span className="text-2xl font-extrabold text-foreground">{debtPressure}/100</span>
          <span className="text-[10px] text-muted-foreground block mt-0.5">Calculated stress index</span>
        </div>
        <Progress value={debtPressure} className="h-1 bg-muted" />
      </Card>

      {/* Pillar 4: Financial Flexibility */}
      <Card className="p-5 bg-background/50 border-border/40 backdrop-blur-xl flex flex-col justify-between">
        <div className="flex items-center gap-1.5 text-muted-foreground mb-2">
          <Percent className="w-4 h-4 text-amber" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Breathing Room</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-amber/15 border-t-amber flex items-center justify-center shrink-0">
            <span className="text-[11px] font-extrabold text-foreground">{breathingRoom}%</span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Percentage of income free from mandatory goals or fixed commitments.
          </p>
        </div>
      </Card>
    </div>
  );
}
