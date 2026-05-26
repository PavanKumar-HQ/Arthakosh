export type LabCategory = 
  | "foundation" 
  | "pressure" 
  | "growth" 
  | "strategic";

export interface LabTelemetry {
  cashReserves: number; // in ₹
  debtPressure: number; // 0-100
  stressLevel: number; // 0-100
  flexibilityMargin: number; // 0-100
}

export interface LabChoice {
  id: string;
  label: string;
  description: string;
  nextNodeId: string;
  impact: "positive" | "negative" | "mixed" | "neutral";
  telemetryChange: {
    cash?: number;
    debt?: number;
    stress?: number;
    flexibility?: number;
  };
}

export interface LabConsequence {
  title: string;
  financialImpact: string;
  explanation: string;
  tradeoff: string;
  lesson: string;
}

export interface LabNode {
  id: string;
  type: "situation" | "consequence" | "summary";
  title: string;
  narrative: string;
  choices?: LabChoice[];
  consequence?: LabConsequence;
  isEnd?: boolean;
}

export interface LabScenario {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: LabCategory;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  icon: string;
  color: string;
  initialTelemetry: LabTelemetry;
  nodes: LabNode[];
}

export interface FinancialConfidenceScore {
  consistency: number; // 0-100
  resilience: number; // 0-100
  recovery: number; // 0-100
  adaptability: number; // 0-100
  strategicAwareness: number; // 0-100
}

export interface UserLabsProfile {
  completedLabs: string[];
  confidence: FinancialConfidenceScore;
  lastSimulatedDate: string;
}
