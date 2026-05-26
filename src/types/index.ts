// ============================================================
// Arthakosh — TypeScript Type Definitions
// ============================================================

// --- Life Stage & Onboarding ---

export type LifeStage =
  | 'student'
  | 'first-salary'
  | 'freelancer'
  | 'married'
  | 'supporting-parents'
  | 'higher-education'
  | 'debt-management'
  | 'emergency-fund'
  | 'retirement';

export interface LifeStageOption {
  id: LifeStage;
  label: string;
  description: string;
  icon: string;
  color: string;
}

export type FinancialPriority =
  | 'budgeting'
  | 'saving'
  | 'investing'
  | 'debt-payoff'
  | 'tax-planning'
  | 'insurance'
  | 'emergency-fund'
  | 'retirement'
  | 'education-fund'
  | 'home-buying'
  | 'travel'
  | 'side-income'
  | 'salary-negotiation'
  | 'estate-planning';

export interface PriorityOption {
  id: FinancialPriority;
  label: string;
  description: string;
  icon: string;
}

export interface UserProfile {
  lifeStage: LifeStage | null;
  priorities: FinancialPriority[];
  monthlyIncome: number | null;
  existingSavings: number | null;
  confidenceLevel: number; // 1-5
}

export interface Pathway {
  title: string;
  description: string;
  recommendedSections: string[];
  recommendedTools: string[];
  keyInsights: string[];
}

// --- Goal Planning ---

export type GoalCategory =
  | 'emergency-fund'
  | 'travel'
  | 'education'
  | 'startup'
  | 'wedding'
  | 'home'
  | 'gadgets'
  | 'retirement'
  | 'custom';

export interface GoalTemplate {
  id: GoalCategory;
  name: string;
  description: string;
  icon: string;
  defaultTarget: number;
  defaultTimeline: number; // months
  defaultReturnRate: number;
  color: string;
}

export type GoalPriority = 'essential' | 'important' | 'aspirational';
export type RiskComfort = 'conservative' | 'balanced' | 'growth_oriented';
export type HealthStatus = 'excellent' | 'achievable' | 'tight' | 'high_risk' | 'underfunded';

export interface Goal {
  id: string;
  name: string;
  category: GoalCategory;
  targetAmount: number;
  currentSavings: number;
  monthlyContribution: number;
  timeline: number; // months
  priority: GoalPriority;
  riskComfort: RiskComfort;
  inflationRate: number;
  healthStatus?: HealthStatus;
  projectedGap?: number;
  color: string;
  icon: string;
  createdAt?: string;
}

export interface Milestone {
  id: string;
  label: string;
  targetAmount: number;
  targetDate: string;
  completed: boolean;
}

export interface GoalProjection {
  month: number;
  invested: number;
  projected: number;
  inflationAdjusted: number;
  target: number;
}

export interface MonthlyRecommendation {
  type: 'increase' | 'on-track' | 'ahead' | 'behind';
  message: string;
  suggestedAmount?: number;
  insight: string;
}

// --- Scenario Simulator ---

export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'career' | 'relationships' | 'health' | 'education' | 'life-events';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  icon: string;
  color: string;
  nodes: ScenarioNode[];
}

export interface ScenarioNode {
  id: string;
  type: 'situation' | 'choice' | 'consequence' | 'summary';
  title: string;
  narrative: string;
  context?: string;
  financialSnapshot?: FinancialSnapshot;
  choices?: ScenarioChoice[];
  consequence?: ConsequenceData;
  isEnd?: boolean;
}

export interface ScenarioChoice {
  id: string;
  label: string;
  description: string;
  nextNodeId: string;
  impact: 'positive' | 'neutral' | 'negative' | 'mixed';
}

export interface ConsequenceData {
  title: string;
  financialImpact: string;
  explanation: string;
  tradeoff: string;
  lesson: string;
}

export interface FinancialSnapshot {
  income?: number;
  savings?: number;
  expenses?: number;
  debt?: number;
  investments?: number;
  netWorth?: number;
}

// --- Learning System ---

export interface Simulator {
  id: string;
  title: string;
  description: string;
  category: 'budgeting' | 'credit' | 'debt' | 'investing' | 'emergency';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  icon: string;
  color: string;
  status: 'available' | 'coming-soon';
}

export interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  recommended: number; // percentage
  allocated: number; // percentage
  amount: number;
  tip: string;
}

export interface CreditFactor {
  id: string;
  name: string;
  weight: number;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  description: string;
  impact: string;
}

// --- Money Toolkit ---

export interface ToolMeta {
  id: string;
  name: string;
  description: string;
  category: 'investing' | 'debt' | 'planning' | 'tax';
  icon: string;
  color: string;
}

export interface SIPResult {
  totalInvested: number;
  wealthGained: number;
  maturityAmount: number;
  monthlyData: { month: number; invested: number; value: number }[];
}

export interface EMIResult {
  monthlyEMI: number;
  totalInterest: number;
  totalPayment: number;
  principalPercentage: number;
  interestPercentage: number;
  amortization: { month: number; principal: number; interest: number; balance: number }[];
}

export interface DebtItem {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

export interface DebtPayoffResult {
  method: 'snowball' | 'avalanche';
  totalInterestPaid: number;
  totalTimeline: number; // months
  interestSaved: number;
  payoffOrder: { name: string; payoffMonth: number }[];
  monthlyData: { month: number; totalBalance: number }[];
}

export interface TaxInput {
  annualIncome: number;
  regime: 'old' | 'new';
  deductions: {
    section80C: number;
    section80D: number;
    hra: number;
    lta: number;
    homeLoanInterest: number;
    nps: number;
    otherDeductions: number;
  };
}

export interface TaxResult {
  taxableIncome: number;
  totalTax: number;
  effectiveRate: number;
  cess: number;
  slabBreakdown: { slab: string; rate: number; tax: number }[];
}

export interface NetWorthItem {
  id: string;
  name: string;
  category: string;
  amount: number;
  type: 'asset' | 'liability';
}

// --- Salary Negotiation ---

export interface NegotiationStep {
  id: string;
  title: string;
  description: string;
  tips: string[];
  pitfalls: string[];
  icon: string;
}

export interface MockMessage {
  id: string;
  sender: 'recruiter' | 'you';
  message: string;
  choices?: ConversationChoice[];
}

export interface ConversationChoice {
  id: string;
  text: string;
  quality: 'excellent' | 'good' | 'poor';
  feedback: string;
  nextMessages: MockMessage[];
}

// --- Estate Planning ---

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: 'essential' | 'important' | 'recommended';
  completed: boolean;
  details: string;
  actionItems: string[];
}

// --- Financial Psychology ---

export interface PsychologyTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  selfCheckQuestions: string[];
  tips: string[];
  examples: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: { id: string; text: string; trait: string }[];
}

export interface QuizResult {
  personality: string;
  description: string;
  strengths: string[];
  watchOuts: string[];
  recommendations: string[];
}

// --- Shared ---

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  description?: string;
}

export interface StatData {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  prefix?: string;
  suffix?: string;
}
