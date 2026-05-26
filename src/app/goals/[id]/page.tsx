"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGoalsStore } from "@/lib/store/goals";
import { analyzeGoalHealth, generateProjections, getExpectedReturn } from "@/lib/engines/analysis";
import { EditorialChart } from "@/components/goals/EditorialChart";
import { HealthIndicator } from "@/components/goals/HealthIndicator";
import { RecommendationBanner } from "@/components/goals/RecommendationBanner";
import { AnimatedSection, StaggerChildren, StaggerItem } from "@/components/shared/AnimatedSection";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/constants";
import { ArrowLeft, Trash2, Edit3, Settings2 } from "lucide-react";
import { Goal } from "@/types";

export default function GoalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { goals, deleteGoal, updateGoal } = useGoalsStore();
  const [goal, setGoal] = useState<Goal | null>(null);

  useEffect(() => {
    const id = params.id as string;
    const found = goals.find((g) => g.id === id);
    if (found) {
      setGoal(found);
    } else {
      router.push("/goals");
    }
  }, [params.id, goals, router]);

  if (!goal) return null; // or loading skeleton

  const expectedReturn = getExpectedReturn(goal.riskComfort);
  const projections = generateProjections(
    goal.targetAmount,
    goal.currentSavings,
    goal.monthlyContribution,
    goal.timeline,
    expectedReturn,
    goal.inflationRate
  );

  const analysis = analyzeGoalHealth(goal);

  return (
    <div className="container-page py-8 sm:py-12 max-w-5xl mx-auto">
      <AnimatedSection>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.push("/goals")}
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </button>
          
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              <Settings2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => {
                deleteGoal(goal.id);
                router.push("/goals");
              }}
              className="p-2 rounded-lg text-rose hover:bg-rose/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-border/50 pb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-sm" style={{ backgroundColor: `${goal.color}15` }}>
              {goal.icon}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">{goal.name}</h1>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground capitalize">{goal.priority} Priority</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span className="text-sm text-muted-foreground capitalize">{goal.riskComfort} Risk</span>
                {goal.healthStatus && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <HealthIndicator status={goal.healthStatus} />
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Target Amount</p>
            <p className="text-3xl font-bold font-tabular">{formatCurrency(goal.targetAmount)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (Chart & Analysis) */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-semibold text-lg">Growth Projection</h3>
                  <p className="text-sm text-muted-foreground">Assumes {expectedReturn}% expected returns over {goal.timeline} months.</p>
                </div>
              </div>
              
              <EditorialChart data={projections} color={goal.color} height={320} />
            </Card>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Intelligent Insights</h3>
              {analysis.recommendations.map((rec, i) => (
                <RecommendationBanner 
                  key={i} 
                  message={rec} 
                  type={rec.includes("Warning") || analysis.status === "high_risk" ? "warning" : "insight"} 
                />
              ))}
              {analysis.recommendations.length === 0 && (
                <p className="text-sm text-muted-foreground">Your plan looks incredibly solid. Keep up the consistency!</p>
              )}
            </div>
          </div>

          {/* Sidebar (Controls & Stats) */}
          <div className="space-y-6">
            <Card className="p-5">
              <h4 className="text-sm font-semibold mb-4">Financial Status</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Current Savings</p>
                  <p className="text-xl font-bold font-tabular">{formatCurrency(goal.currentSavings)}</p>
                </div>
                <div className="h-px bg-border/50 w-full" />
                <div>
                  <div className="flex justify-between mb-1">
                    <p className="text-xs text-muted-foreground">Monthly Contribution</p>
                    <button className="text-[10px] text-blue-accent hover:underline">Edit</button>
                  </div>
                  <p className="text-xl font-bold font-tabular">{formatCurrency(goal.monthlyContribution)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-5 bg-surface-raised/30">
              <h4 className="text-sm font-semibold mb-4">The Impact of Inflation</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                At an inflation rate of <span className="font-semibold text-foreground">{goal.inflationRate}%</span>, 
                the purchasing power of your target amount will decrease over {Math.round(goal.timeline / 12)} years.
              </p>
              <div className="p-3 rounded-lg bg-background border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Inflation-Adjusted Target</p>
                <p className="text-lg font-bold font-tabular text-destructive">
                  {formatCurrency(analysis.inflationAdjustedTarget)}
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Our projection chart already factors this in to ensure you don&apos;t fall short when the time comes.
              </p>
            </Card>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
