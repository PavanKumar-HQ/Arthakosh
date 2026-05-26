export type EmotionalState = 
  | "stressed" 
  | "bored" 
  | "anxious" 
  | "happy" 
  | "lonely" 
  | "celebratory" 
  | "tired" 
  | "inadequate"
  | "neutral";

export type PurchaseRegretLevel = "none" | "slight" | "moderate" | "high";

export interface ReflectionLog {
  id: string;
  date: string;
  item: string;
  amount: number;
  prePurchaseEmotion: EmotionalState;
  postPurchaseEmotion: EmotionalState;
  regretLevel: PurchaseRegretLevel;
  wasPlanned: boolean;
  notes?: string;
}

export interface MoneyPersonalityScore {
  discipline: number; // 0-100 (high = saves, delays gratification)
  anxiety: number;    // 0-100 (high = stressed about money regardless of amount)
  social: number;     // 0-100 (high = influenced by peers, trends)
  reward: number;     // 0-100 (high = spends for dopamine, treats)
}

export interface UserPsychologyProfile {
  scores: MoneyPersonalityScore;
  dominantTrait: "disciplined" | "anxious" | "social" | "reward-driven" | "balanced";
  lastAssessmentDate: string;
}

export type EmotionalTrigger = {
  emotion: EmotionalState;
  frequency: number;
  averageSpend: number;
  commonCategories: string[];
};
