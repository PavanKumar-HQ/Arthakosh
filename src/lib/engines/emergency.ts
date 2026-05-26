export type EmploymentType = "salaried" | "freelancer" | "business";

export interface EmergencyFundProfile {
  monthlyExpenses: number;
  employmentType: EmploymentType;
  dependents: number;
  hasExistingHealthInsurance: boolean;
  hasHighRiskDebt: boolean; // e.g. Credit Card Debt, Personal Loans
}

export interface EmergencyFundRecommendation {
  recommendedMonths: number;
  targetAmount: number;
  reasoning: string[];
}

export function calculateEmergencyFundTarget(profile: EmergencyFundProfile): EmergencyFundRecommendation {
  let baseMonths = 6;
  const reasoning: string[] = [];

  if (profile.employmentType === "freelancer") {
    baseMonths = 9;
    reasoning.push("Freelancers face variable income, so a 9-month safety net is recommended to smooth out dry spells.");
  } else if (profile.employmentType === "business") {
    baseMonths = 12;
    reasoning.push("Business owners carry higher risk and overheads. A 12-month runway provides critical stability.");
  } else {
    reasoning.push("For salaried individuals, a 6-month buffer covers standard job transition periods.");
  }

  if (profile.dependents > 0) {
    const additionalMonths = Math.min(profile.dependents * 1.5, 3);
    baseMonths += additionalMonths;
    reasoning.push(`Having ${profile.dependents} dependent(s) increases essential burn rate. Adding ${additionalMonths} months for family security.`);
  }

  if (!profile.hasExistingHealthInsurance) {
    baseMonths += 2;
    reasoning.push("Without health insurance, medical emergencies can drain cash fast. Adding a 2-month medical buffer.");
  }

  if (profile.hasHighRiskDebt) {
    baseMonths += 1;
    reasoning.push("High-interest debt increases your minimum monthly obligations. Adding a 1-month buffer.");
  }

  // Cap at 18 months max to prevent cash hoarding
  const finalMonths = Math.min(Math.round(baseMonths), 18);
  const targetAmount = finalMonths * profile.monthlyExpenses;

  if (finalMonths === 18) {
    reasoning.push("Note: We cap the recommendation at 18 months to prevent 'cash drag'. Money beyond this should be invested.");
  }

  return {
    recommendedMonths: finalMonths,
    targetAmount: Math.round(targetAmount),
    reasoning,
  };
}
