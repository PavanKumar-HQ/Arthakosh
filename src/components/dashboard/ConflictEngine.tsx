"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight, ShieldCheck, GitPullRequest } from "lucide-react";
import { useGoalsStore } from "@/lib/store/goals";
import { MultiGoalConflict } from "@/lib/engines/multiGoal";

interface ConflictEngineProps {
  conflicts: MultiGoalConflict[];
}

export function ConflictEngine({ conflicts }: ConflictEngineProps) {
  const { goals, updateGoal } = useGoalsStore();

  const handleResolveOvercommitment = (involvedIds: string[]) => {
    // Extend timelines by 6 months for involved non-essential goals to reduce savings pressure
    involvedIds.forEach((id) => {
      const goal = goals.find((g) => g.id === id);
      if (goal && goal.priority !== "essential") {
        const newTimeline = goal.timeline + 6;
        const newContribution = Math.round(
          (goal.targetAmount - goal.currentSavings) / newTimeline
        );
        updateGoal(id, { 
          timeline: newTimeline, 
          monthlyContribution: Math.max(500, newContribution) 
        });
      }
    });
  };

  const handleResolvePriorityInversion = (involvedIds: string[]) => {
    // Reduce aspirational contributions and boost essential contributions
    involvedIds.forEach((id) => {
      const goal = goals.find((g) => g.id === id);
      if (goal) {
        if (goal.priority === "aspirational") {
          const reducedContribution = Math.round(goal.monthlyContribution * 0.7);
          updateGoal(id, { monthlyContribution: reducedContribution });
        } else if (goal.priority === "essential") {
          const boostedContribution = Math.round(goal.monthlyContribution * 1.3);
          updateGoal(id, { monthlyContribution: boostedContribution });
        }
      }
    });
  };

  if (conflicts.length === 0) {
    return (
      <Card className="p-5 bg-background/50 border-border/40 backdrop-blur-xl flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald shrink-0" />
        <span className="text-xs text-muted-foreground font-semibold">
          No goal conflicts detected. Your contributions match your targets.
        </span>
      </Card>
    );
  }

  return (
    <Card className="p-5 bg-background/50 border-border/40 backdrop-blur-xl space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <AlertCircle className="w-5 h-5 text-rose-500" />
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Multi-Goal Conflicts Detected
        </h3>
      </div>

      <div className="space-y-4">
        {conflicts.map((conflict, idx) => (
          <div 
            key={idx} 
            className="p-4 rounded-xl bg-accent/40 border border-border/40 space-y-3"
          >
            <p className="text-xs text-muted-foreground leading-relaxed">
              {conflict.message}
            </p>

            <div className="flex flex-wrap gap-2">
              {conflict.type === "overcommitment" && (
                <Button
                  onClick={() => handleResolveOvercommitment(conflict.involvedGoalIds)}
                  className="h-8 text-xs font-semibold bg-violet hover:bg-violet-hover text-white rounded-lg px-4 flex items-center gap-1.5"
                >
                  Extend timelines (+6mo) to free flow <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              )}

              {conflict.type === "priority_inversion" && (
                <Button
                  onClick={() => handleResolvePriorityInversion(conflict.involvedGoalIds)}
                  className="h-8 text-xs font-semibold bg-violet hover:bg-violet-hover text-white rounded-lg px-4 flex items-center gap-1.5"
                >
                  Automate Essential-first split <GitPullRequest className="w-3.5 h-3.5" />
                </Button>
              )}

              {conflict.type === "emergency_fund_missing" && (
                <Link
                  href="/goals/create?category=emergency-fund"
                  className="inline-flex items-center justify-center h-8 text-xs font-semibold bg-violet hover:bg-violet-hover text-white rounded-lg px-4 gap-1.5"
                >
                  Create Emergency Goal <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
