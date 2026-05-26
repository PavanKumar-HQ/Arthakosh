"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGoalsStore } from "@/lib/store/goals";
import { GoalCard } from "@/components/goals/GoalCard";
import { RecommendationBanner } from "@/components/goals/RecommendationBanner";
import { AnimatedSection, StaggerChildren, StaggerItem } from "@/components/shared/AnimatedSection";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/constants";
import { Target, Plus, AlertCircle, ArrowRight, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { MultiGoalConflict } from "@/lib/engines/multiGoal";

export default function GoalsDashboard() {
  const router = useRouter();
  const { goals, monthlyIncome, conflicts, setMonthlyIncome } = useGoalsStore();
  const [isSettingIncome, setIsSettingIncome] = useState(monthlyIncome === null);
  const [tempIncome, setTempIncome] = useState(monthlyIncome || "");

  const totalMonthlySIP = goals.reduce((sum, g) => sum + g.monthlyContribution, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalSavings = goals.reduce((sum, g) => sum + g.currentSavings, 0);

  const handleSaveIncome = () => {
    if (tempIncome) {
      setMonthlyIncome(Number(tempIncome));
      setIsSettingIncome(false);
    }
  };

  if (goals.length === 0) {
    return (
      <div className="container-page py-16 sm:py-24 text-center">
        <AnimatedSection>
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner shadow-black/5">
            🎯
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-4">Financial clarity starts with one goal.</h1>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8 text-lg">
            Whether it&apos;s an emergency fund, a career break, or buying a home. Tell us what matters to you, and we&apos;ll help you map out the path.
          </p>
          <Link 
            href="/goals/create" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 shadow-lg shadow-foreground/10"
          >
            Create Your First Goal
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="container-page py-8 sm:py-12">
      <AnimatedSection>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Goal Portfolio</h1>
            <p className="text-muted-foreground">Your financial objectives, analyzed intelligently.</p>
          </div>
          <Link 
            href="/goals/create" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-semibold hover:opacity-90 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Goal
          </Link>
        </div>

        {/* Global Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-5 bg-surface-raised/30 border-border/50">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Total Monthly SIP</p>
            <p className="text-3xl font-bold font-tabular">{formatCurrency(totalMonthlySIP)}</p>
          </Card>
          <Card className="p-5 bg-surface-raised/30 border-border/50">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Total Accumulated</p>
            <p className="text-3xl font-bold font-tabular">{formatCurrency(totalSavings)}</p>
          </Card>
          <Card className="p-5 bg-surface-raised/30 border-border/50 flex flex-col justify-center">
            {isSettingIncome ? (
              <div className="flex gap-2">
                <input 
                  type="number"
                  placeholder="Monthly Income"
                  value={tempIncome}
                  onChange={(e) => setTempIncome(e.target.value)}
                  className="flex-1 bg-background border border-border rounded-lg px-3 py-1.5 text-sm font-tabular"
                />
                <button onClick={handleSaveIncome} className="text-xs font-semibold bg-foreground text-background px-3 rounded-lg">Save</button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Monthly Income</p>
                  <p className="text-lg font-bold font-tabular">{monthlyIncome ? formatCurrency(monthlyIncome) : "Not set"}</p>
                </div>
                <button onClick={() => setIsSettingIncome(true)} className="text-xs text-blue-accent font-medium hover:underline">Edit</button>
              </div>
            )}
          </Card>
        </div>

        {/* Conflict & Warning Banners */}
        {conflicts.length > 0 && (
          <div className="mb-8 space-y-3">
            {conflicts.map((conflict, i) => (
              <RecommendationBanner 
                key={i} 
                type={conflict.severity === "high" ? "warning" : "insight"} 
                message={conflict.message} 
              />
            ))}
          </div>
        )}

        <h2 className="text-lg font-semibold mb-4">Active Goals</h2>
        
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {goals.map((goal) => (
            <StaggerItem key={goal.id}>
              <GoalCard 
                goal={goal} 
                onClick={() => router.push(`/goals/${goal.id}`)} 
              />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </AnimatedSection>
    </div>
  );
}
