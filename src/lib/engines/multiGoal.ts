import { Goal } from "@/types";

export interface MultiGoalConflict {
  type: "overcommitment" | "priority_inversion" | "emergency_fund_missing";
  severity: "low" | "medium" | "high";
  message: string;
  involvedGoalIds: string[];
}

export function detectMultiGoalConflicts(
  goals: Goal[],
  monthlyIncome: number | null
): MultiGoalConflict[] {
  const conflicts: MultiGoalConflict[] = [];

  if (goals.length === 0) return conflicts;

  // 1. Overcommitment Check
  const totalMonthlyCommitment = goals.reduce((sum, g) => sum + g.monthlyContribution, 0);
  if (monthlyIncome && monthlyIncome > 0) {
    const savingsRatio = totalMonthlyCommitment / monthlyIncome;
    
    if (savingsRatio > 0.6) {
      conflicts.push({
        type: "overcommitment",
        severity: "high",
        message: `You are committing ${(savingsRatio * 100).toFixed(0)}% of your income to savings. This is highly aggressive and may lead to cash flow issues. Consider extending timelines on non-essential goals.`,
        involvedGoalIds: goals.map(g => g.id),
      });
    } else if (savingsRatio > 0.4) {
      conflicts.push({
        type: "overcommitment",
        severity: "medium",
        message: `You are saving ${(savingsRatio * 100).toFixed(0)}% of your income. Ensure you have enough liquidity for daily living expenses.`,
        involvedGoalIds: goals.map(g => g.id),
      });
    }
  }

  // 2. Priority Inversion Check
  // E.g., User is heavily funding an "aspirational" goal while an "essential" goal is underfunded or has a distant timeline.
  const essentialGoals = goals.filter(g => g.priority === "essential");
  const aspirationalGoals = goals.filter(g => g.priority === "aspirational");

  if (essentialGoals.length > 0 && aspirationalGoals.length > 0) {
    const essentialTotalContribution = essentialGoals.reduce((sum, g) => sum + g.monthlyContribution, 0);
    const aspirationalTotalContribution = aspirationalGoals.reduce((sum, g) => sum + g.monthlyContribution, 0);

    if (aspirationalTotalContribution > essentialTotalContribution * 1.5) {
      conflicts.push({
        type: "priority_inversion",
        severity: "medium",
        message: "You are contributing significantly more towards aspirational goals than essential goals. Consider reallocating some funds to secure your essentials first.",
        involvedGoalIds: [...essentialGoals.map(g => g.id), ...aspirationalGoals.map(g => g.id)],
      });
    }
  }

  // 3. Emergency Fund Missing Check
  const hasEmergencyFund = goals.some(g => g.category === "emergency-fund");
  const hasHighPriorityGoal = goals.some(g => g.priority === "essential" && g.category !== "emergency-fund");

  if (!hasEmergencyFund && hasHighPriorityGoal) {
    conflicts.push({
      type: "emergency_fund_missing",
      severity: "high",
      message: "You are funding essential goals but do not have an Emergency Fund planned. A sudden expense could derail your progress. Start an Emergency Fund first.",
      involvedGoalIds: [],
    });
  }

  return conflicts;
}
