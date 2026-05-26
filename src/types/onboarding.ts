export type OnboardingLifeStage =
  | "student"
  | "first-job"
  | "professional"
  | "freelancer"
  | "entrepreneur"
  | "career-transition"
  | "married"
  | "supporting-parents"
  | "higher-studies"
  | "recovering-debt"
  | "building-stability"
  | "retirement";

export type OnboardingPriority =
  | "emergency-stability"
  | "reducing-stress"
  | "paying-debt"
  | "building-savings"
  | "improving-confidence"
  | "learning-investing"
  | "supporting-family"
  | "career-flexibility"
  | "lifestyle-balance"
  | "long-term-wealth"
  | "preparing-uncertainty";

export interface OnboardingEmotionalContext {
  anxietyLevel: number; // 1-5 (5 = high anxiety)
  confidenceLevel: number; // 1-5 (1 = low confidence)
  exhaustionLevel: number; // 1-5 (5 = very exhausted by planning)
}

export interface OnboardingFinancialReality {
  incomeRange: string; // e.g. "below-25k", "25k-50k", "50k-1l", "1l-2l", "above-2l"
  expensePressure: "low" | "medium" | "high";
  hasDebt: boolean;
  debtType?: "credit-card" | "student" | "home-personal" | "none";
  dependents: number;
  savingsRate: "none" | "occasional" | "regular";
}

export interface InferredBehavioralSignals {
  avoidanceTendency: boolean; // true if anxiety is high and confidence is low
  impulsiveRisk: boolean; // true if reward seeking or high emotional spend is suspected
  stabilityPreference: boolean; // true if emergency-stability is top priority
  planningInconsistency: boolean; // true if savingsRate is occasional and exhaustion is high
  stressSensitivity: boolean; // true if expensePressure is high and anxiety is high
}

export interface OnboardingProfile {
  lifeStage: OnboardingLifeStage;
  priorities: OnboardingPriority[];
  emotionalContext: OnboardingEmotionalContext;
  financialReality: OnboardingFinancialReality;
  behavioralSignals: InferredBehavioralSignals;
  completedAt: string;
}
