export type RecruiterArchetypeId = 'founder' | 'corporate' | 'high_pressure' | 'faang';

export interface RecruiterArchetype {
  id: RecruiterArchetypeId;
  name: string;
  role: string;
  company: string;
  avatar: string;
  tone: string;
  description: string;
  baseLeverage: number; // 0-100
  initialOffer: Compensation;
  maxOffer: Compensation;
  pressureFrequency: number; // 0-1
}

export interface Compensation {
  base: number; // in LPA
  bonus?: number; // in Lakhs
  equity?: string; // e.g. "0.05%" or "₹2L ESOPs"
  milestoneReview: boolean;
  benefits: string[];
}

export type DialogueNodeId = 
  | 'intro'
  | 'react_to_offer'
  | 'negotiate_benefits'
  | 'handling_deadline'
  | 'comp_justification'
  | 'walk_away_check'
  | 'final_close';

export interface ChoiceImpact {
  leverageChange: number;
  sentimentChange: number;
  stressChange: number;
  baseChange?: number; // adjustment to offered base salary
  bonusChange?: number;
  milestoneSecured?: boolean;
  benefitsAdded?: string[];
}

export interface UserChoice {
  id: string;
  strategyLabel: string; // e.g. "Collaborative Counter", "Aggressive Anchor", "Passive Acceptance"
  text: string;
  impact: ChoiceImpact;
  feedback: string;
  nextNodeId: DialogueNodeId | 'outcome';
}

export interface DialogueNode {
  id: DialogueNodeId;
  recruiterMessage: string;
  recruiterSentiment: 'Warm' | 'Professional' | 'Skeptical' | 'Annoyed' | 'Impatient';
  choices: UserChoice[];
  pressureApplied?: string; // Pressure phrase if any
}

export interface Scenario {
  id: string;
  title: string;
  role: string;
  experience: string;
  city: string;
  companyType: string;
  initialBase: number;
  marketRange: string;
  recruiters: RecruiterArchetype[];
}
