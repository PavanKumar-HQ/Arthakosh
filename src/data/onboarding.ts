import type { LifeStageOption, PriorityOption, GoalTemplate, Pathway } from '@/types';

export const LIFE_STAGES: LifeStageOption[] = [
  {
    id: 'student',
    label: 'Student',
    description: 'Managing pocket money, education loans, or part-time income',
    icon: '🎓',
    color: 'bg-blue-accent/10 text-blue-accent',
  },
  {
    id: 'first-salary',
    label: 'First Salary',
    description: 'Just started earning — figuring out budgets, savings, and lifestyle',
    icon: '💰',
    color: 'bg-emerald/10 text-emerald',
  },
  {
    id: 'freelancer',
    label: 'Freelancer',
    description: 'Irregular income, no employer benefits, self-managed finances',
    icon: '💻',
    color: 'bg-violet/10 text-violet',
  },
  {
    id: 'married',
    label: 'Married / Partner',
    description: 'Joint finances, shared goals, family planning',
    icon: '💑',
    color: 'bg-rose/10 text-rose',
  },
  {
    id: 'supporting-parents',
    label: 'Supporting Parents',
    description: 'Financial responsibility for parents alongside personal goals',
    icon: '🏠',
    color: 'bg-amber/10 text-amber',
  },
  {
    id: 'higher-education',
    label: 'Higher Education',
    description: 'Planning for MBA, MS, or professional courses — domestic or abroad',
    icon: '📚',
    color: 'bg-blue-accent/10 text-blue-accent',
  },
  {
    id: 'debt-management',
    label: 'Debt Management',
    description: 'Dealing with education loans, credit card debt, or EMIs',
    icon: '📊',
    color: 'bg-rose/10 text-rose',
  },
  {
    id: 'emergency-fund',
    label: 'Emergency Fund',
    description: 'Building a financial safety net from scratch',
    icon: '🛡️',
    color: 'bg-emerald/10 text-emerald',
  },
  {
    id: 'retirement',
    label: 'Retirement Planning',
    description: 'Long-term wealth building and retirement preparation',
    icon: '🌅',
    color: 'bg-amber/10 text-amber',
  },
];

export const PRIORITIES: PriorityOption[] = [
  { id: 'budgeting', label: 'Budgeting', description: 'Track and manage monthly spending', icon: '📋' },
  { id: 'saving', label: 'Building Savings', description: 'Grow your savings consistently', icon: '🏦' },
  { id: 'investing', label: 'Start Investing', description: 'Learn and begin investing wisely', icon: '📈' },
  { id: 'debt-payoff', label: 'Paying Off Debt', description: 'Get out of debt strategically', icon: '🔓' },
  { id: 'tax-planning', label: 'Tax Planning', description: 'Optimize tax savings legally', icon: '📑' },
  { id: 'insurance', label: 'Getting Insured', description: 'Protect yourself and your family', icon: '🛡️' },
  { id: 'emergency-fund', label: 'Emergency Fund', description: 'Build a safety net', icon: '🚨' },
  { id: 'retirement', label: 'Retirement', description: 'Plan for long-term financial freedom', icon: '🌴' },
  { id: 'education-fund', label: 'Education Fund', description: 'Save for higher education', icon: '🎓' },
  { id: 'home-buying', label: 'Home Buying', description: 'Save for a home down payment', icon: '🏡' },
  { id: 'travel', label: 'Travel Fund', description: 'Save for meaningful experiences', icon: '✈️' },
  { id: 'side-income', label: 'Side Income', description: 'Build additional income streams', icon: '💡' },
  { id: 'salary-negotiation', label: 'Salary Negotiation', description: 'Maximize your earning potential', icon: '🤝' },
  { id: 'estate-planning', label: 'Estate Planning', description: 'Protect your legacy', icon: '📜' },
];

export function getPathway(lifeStage: string, priorities: string[]): Pathway {
  const pathways: Record<string, Pathway> = {
    'student': {
      title: 'The Smart Student Path',
      description: 'Build financial awareness early — the best investment you can make.',
      recommendedSections: ['learn', 'tools', 'psychology'],
      recommendedTools: ['budget-allocator', 'sip-calculator', 'inflation-calculator'],
      keyInsights: [
        'Start a ₹500/month SIP — compounding starts now',
        'Understand credit scores before you need one',
        'Avoid lifestyle inflation when you get your first job',
      ],
    },
    'first-salary': {
      title: 'The First Salary Playbook',
      description: 'Your first ₹25K/month is the foundation for everything.',
      recommendedSections: ['scenarios', 'tools', 'goals', 'salary'],
      recommendedTools: ['budget-allocator', 'emergency-fund-planner', 'sip-calculator', 'tax-estimator'],
      keyInsights: [
        'Follow the 50/30/20 rule — adjusted for your reality',
        'Build 3 months of expenses as emergency fund first',
        'Start SIP before lifestyle catches up with salary',
        'Negotiate well — your first salary sets the baseline forever',
      ],
    },
    'freelancer': {
      title: 'The Freelancer\'s Financial OS',
      description: 'Master irregular income, self-employment taxes, and financial stability.',
      recommendedSections: ['scenarios', 'tools', 'goals', 'learn'],
      recommendedTools: ['emergency-fund-planner', 'tax-estimator', 'sip-calculator', 'insurance-estimator'],
      keyInsights: [
        'Build 6-9 months emergency fund (not 3)',
        'Set aside 30% of every payment for taxes',
        'Pay yourself a fixed "salary" monthly',
        'Get health insurance independently',
      ],
    },
    'married': {
      title: 'The Joint Finance Framework',
      description: 'Align financial goals, build together, protect each other.',
      recommendedSections: ['goals', 'tools', 'estate', 'psychology'],
      recommendedTools: ['net-worth-tracker', 'insurance-estimator', 'emi-calculator', 'tax-estimator'],
      keyInsights: [
        'Have the money conversation — align on goals',
        'Update all nominees and insurance beneficiaries',
        'Plan for both careers — don\'t depend on one income',
        'Consider a joint emergency fund + individual savings',
      ],
    },
    'default': {
      title: 'Your Personalized Path',
      description: 'A tailored roadmap based on your priorities.',
      recommendedSections: ['goals', 'tools', 'learn', 'scenarios'],
      recommendedTools: ['sip-calculator', 'emergency-fund-planner', 'budget-allocator'],
      keyInsights: [
        'Start with emergency fund — it\'s the foundation',
        'Automate savings — don\'t rely on willpower',
        'Review your finances monthly — consistency beats intensity',
      ],
    },
  };

  return pathways[lifeStage] || pathways['default'];
}
