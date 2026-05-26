import { Goal, HealthStatus, RiskComfort, GoalProjection } from "@/types";

export const getExpectedReturn = (riskComfort: RiskComfort): number => {
  switch (riskComfort) {
    case "conservative":
      return 6; // e.g., FDs, Debt funds
    case "balanced":
      return 10; // e.g., Hybrid funds, Index funds
    case "growth_oriented":
      return 12; // e.g., Mid/Small cap equity, Active mutual funds
    default:
      return 10;
  }
};

export interface GoalHealthAnalysis {
  status: HealthStatus;
  projectedEndValue: number;
  inflationAdjustedTarget: number;
  gap: number;
  recommendations: string[];
}

export function generateProjections(
  targetAmount: number,
  currentSavings: number,
  monthlyContribution: number,
  timelineMonths: number,
  expectedReturn: number,
  inflationRate: number
): GoalProjection[] {
  const monthlyReturn = expectedReturn / 100 / 12;
  const monthlyInflation = inflationRate / 100 / 12;
  const projections: GoalProjection[] = [];

  let invested = currentSavings;
  let projected = currentSavings;
  let inflationAdjustedTarget = targetAmount;

  projections.push({
    month: 0,
    invested: currentSavings,
    projected: currentSavings,
    inflationAdjusted: targetAmount,
    target: targetAmount,
  });

  for (let month = 1; month <= timelineMonths; month++) {
    invested += monthlyContribution;
    projected = (projected + monthlyContribution) * (1 + monthlyReturn);
    inflationAdjustedTarget = targetAmount * Math.pow(1 + monthlyInflation, month);

    projections.push({
      month,
      invested: Math.round(invested),
      projected: Math.round(projected),
      inflationAdjusted: Math.round(inflationAdjustedTarget),
      target: targetAmount,
    });
  }

  return projections;
}

export function analyzeGoalHealth(goal: Goal): GoalHealthAnalysis {
  const expectedReturn = getExpectedReturn(goal.riskComfort);
  const projections = generateProjections(
    goal.targetAmount,
    goal.currentSavings,
    goal.monthlyContribution,
    goal.timeline,
    expectedReturn,
    goal.inflationRate
  );

  const finalProjection = projections[projections.length - 1];
  const projectedEndValue = finalProjection.projected;
  const inflationAdjustedTarget = finalProjection.inflationAdjusted;
  
  const gap = inflationAdjustedTarget - projectedEndValue;
  const gapPercentage = gap / inflationAdjustedTarget;

  let status: HealthStatus = "excellent";
  const recommendations: string[] = [];

  if (gap <= 0) {
    if (gapPercentage < -0.2) {
      status = "excellent";
      recommendations.push("You are well ahead of schedule! You could consider lowering your monthly contribution to free up cash flow.");
    } else {
      status = "achievable";
    }
  } else if (gapPercentage < 0.15) {
    status = "tight";
    recommendations.push("You are slightly short of your target. A small increase in monthly savings or a 3-6 month timeline extension will fix this.");
  } else if (gapPercentage < 0.3) {
    status = "underfunded";
    recommendations.push("There is a meaningful gap in funding. Consider extending your timeline or prioritizing this goal.");
  } else {
    status = "high_risk";
    recommendations.push("Your current plan is highly underfunded. Reassess your target amount or drastically extend the timeline to reduce financial stress.");
  }

  // Risk detection
  if (goal.timeline < 36 && goal.riskComfort === "growth_oriented") {
    recommendations.push("Warning: For goals under 3 years, a growth-oriented approach is risky. Market volatility could result in capital loss right when you need the money.");
  }

  if (goal.priority === "essential" && goal.riskComfort === "growth_oriented") {
    recommendations.push("Since this goal is essential, consider a more balanced or conservative approach to protect your capital.");
  }

  return {
    status,
    projectedEndValue: Math.round(projectedEndValue),
    inflationAdjustedTarget: Math.round(inflationAdjustedTarget),
    gap: Math.round(gap),
    recommendations,
  };
}
