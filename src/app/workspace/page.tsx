"use client";

import { useGoalsStore } from "@/lib/store/goals";
import { useBudgetStore } from "@/lib/store/budget";
import { Card } from "@/components/ui/card";
import { AnimatedSection, StaggerChildren, StaggerItem } from "@/components/shared/AnimatedSection";
import { formatCurrency } from "@/lib/constants";
import { MonitorPlay, Target, Wallet, Brain, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserLabsProfile } from "@/types/labs";

export default function WorkspaceDashboard() {
  const { goals } = useGoalsStore();
  const { incomes, expenses } = useBudgetStore();
  const [labsProfile, setLabsProfile] = useState<UserLabsProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("user_labs_profile");
    if (saved) {
      try {
        setLabsProfile(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Budget calculations
  const totalIncome = incomes.filter(i => i.frequency === "monthly").reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  // Goals calculations
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalSaved = goals.reduce((sum, g) => sum + g.currentSavings, 0);
  const goalsProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  return (
    <div className="container-page py-8 sm:py-12">
      <AnimatedSection>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
              <MonitorPlay className="w-8 h-8 text-foreground" />
              Command Workspace
            </h1>
            <p className="text-muted-foreground">Your centralized operational dashboard.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium">System Online</span>
          </div>
        </div>

        {/* Global Telemetry */}
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Budget Telemetry */}
          <StaggerItem>
            <Link href="/budget">
              <Card className="p-5 h-full bg-surface-raised/50 border-border/50 hover:border-border transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Wallet className="w-16 h-16 text-violet-500" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Wallet className="w-4 h-4 text-violet-500" />
                  <h3 className="font-semibold">Cashflow Engine</h3>
                </div>
                <p className="text-3xl font-bold font-tabular mb-1">{formatCurrency(totalIncome - totalExpenses)}</p>
                <p className="text-xs text-muted-foreground mb-4">Monthly Free Cashflow</p>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Savings Rate</span>
                    <span className="font-medium">{savingsRate.toFixed(1)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-accent rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 transition-all duration-500" style={{ width: `${Math.min(100, Math.max(0, savingsRate))}%` }} />
                  </div>
                </div>
              </Card>
            </Link>
          </StaggerItem>

          {/* Goals Telemetry */}
          <StaggerItem>
            <Link href="/goals">
              <Card className="p-5 h-full bg-surface-raised/50 border-border/50 hover:border-border transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Target className="w-16 h-16 text-blue-500" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-4 h-4 text-blue-500" />
                  <h3 className="font-semibold">Goal Portfolio</h3>
                </div>
                <p className="text-3xl font-bold font-tabular mb-1">{formatCurrency(totalSaved)}</p>
                <p className="text-xs text-muted-foreground mb-4">Total Liquid Assets</p>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Master Progress</span>
                    <span className="font-medium">{goalsProgress.toFixed(1)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-accent rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${Math.min(100, Math.max(0, goalsProgress))}%` }} />
                  </div>
                </div>
              </Card>
            </Link>
          </StaggerItem>

          {/* Labs Telemetry */}
          <StaggerItem>
            <Link href="/labs">
              <Card className="p-5 h-full bg-surface-raised/50 border-border/50 hover:border-border transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Brain className="w-16 h-16 text-amber-500" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-4 h-4 text-amber-500" />
                  <h3 className="font-semibold">Cognitive Defense</h3>
                </div>
                <p className="text-3xl font-bold font-tabular mb-1">
                  {labsProfile ? Math.round(
                    (labsProfile.confidence.consistency + 
                    labsProfile.confidence.resilience + 
                    labsProfile.confidence.recovery + 
                    labsProfile.confidence.adaptability + 
                    labsProfile.confidence.strategicAwareness) / 5
                  ) : "0"}
                </p>
                <p className="text-xs text-muted-foreground mb-4">Average Confidence Score</p>
                
                <div className="flex items-center gap-2 text-xs text-amber-500 font-medium">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{labsProfile?.completedLabs.length || 0} Simulations Completed</span>
                </div>
              </Card>
            </Link>
          </StaggerItem>
        </StaggerChildren>

        {/* Recommended Actions */}
        <h2 className="text-xl font-bold mb-4">Recommended Directives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 bg-surface border-border/50 flex items-center justify-between hover:bg-accent/50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Emergency Fund Critical</p>
                <p className="text-xs text-muted-foreground">Current reserves cover &lt;1 month of fixed expenses.</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </Card>
          
          <Card className="p-4 bg-surface border-border/50 flex items-center justify-between hover:bg-accent/50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">New Lab Available</p>
                <p className="text-xs text-muted-foreground">Test your response to a sudden 20% income drop.</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </Card>
        </div>

      </AnimatedSection>
    </div>
  );
}
