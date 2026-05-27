// ============================================================
// Arthakosh — App Constants
// ============================================================

export const APP_NAME = 'Arthakosh';
export const APP_TAGLINE = 'Financial literacy for real life, not just investing.';
export const APP_DESCRIPTION = 'A premium platform for financial literacy and real-life money decision making, designed for Indian students, young professionals, freelancers, and working adults.';

export const NAV_CATEGORIES = [
  {
    category: "CORE",
    items: [
      { label: 'Home', href: '/', icon: 'LayoutDashboard', description: 'Command Center' },
      { label: 'Toolkit', href: '/tools', icon: 'Wrench', description: 'Interactive calculators & simulators' },
      { label: 'Labs', href: '/labs', icon: 'FlaskConical', description: 'Interactive decision labs' },
      { label: 'Simulations', href: '/scenarios', icon: 'GitBranch', description: 'Scenario testing' },
      { label: 'Resources', href: '/resources', icon: 'BookOpen', description: 'Guides, PDFs & Videos' },
    ]
  },
  {
    category: "PLANNING",
    items: [
      { label: 'Goals', href: '/goals', icon: 'Target', description: 'Plan and track financial goals' },
      { label: 'Budgeting', href: '/budget', icon: 'Wallet', description: 'Cashflow management' },
      { label: 'Emergency', href: '/emergency', icon: 'ShieldAlert', description: 'Shock readiness' },
      { label: 'Investing', href: '/investing', icon: 'TrendingUp', description: 'Growth strategies' },
    ]
  },
  {
    category: "CAREER",
    items: [
      { label: 'Salary', href: '/salary', icon: 'Briefcase', description: 'Negotiation mastery' },
    ]
  },
  {
    category: "MINDSET",
    items: [
      { label: 'Psychology', href: '/psychology', icon: 'BrainCircuit', description: 'Money mindset' },
      { label: 'Behavior', href: '/behavior', icon: 'Activity', description: 'Cognitive patterns' },
      { label: 'Decision Making', href: '/decisions', icon: 'Split', description: 'Mental models' },
    ]
  }
];

export const NAV_ITEMS = NAV_CATEGORIES.flatMap(c => c.items);

export const FOOTER_LINKS = {
  product: [
    { label: 'Goal Planning', href: '/goals' },
    { label: 'Decision Labs', href: '/labs' },
    { label: 'Learning Hub', href: '/learn' },
    { label: 'Money Toolkit', href: '/tools' },
  ],
  resources: [
    { label: 'Salary Negotiation', href: '/salary' },
    { label: 'Estate Planning', href: '/estate' },
    { label: 'Financial Psychology', href: '/psychology' },
  ],
} as const;

// Indian financial constants
export const INFLATION_RATE_INDIA = 6; // average CPI
export const FD_RATE_INDIA = 7; // average FD rate
export const EQUITY_RETURN_INDIA = 12; // long-term equity avg
export const PPF_RATE = 7.1;
export const EPF_RATE = 8.15;

// Tax slabs - New Regime (FY 2024-25 onwards)
export const NEW_TAX_SLABS = [
  { min: 0, max: 300000, rate: 0 },
  { min: 300000, max: 700000, rate: 5 },
  { min: 700000, max: 1000000, rate: 10 },
  { min: 1000000, max: 1200000, rate: 15 },
  { min: 1200000, max: 1500000, rate: 20 },
  { min: 1500000, max: Infinity, rate: 30 },
] as const;

// Tax slabs - Old Regime
export const OLD_TAX_SLABS = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 5 },
  { min: 500000, max: 1000000, rate: 20 },
  { min: 1000000, max: Infinity, rate: 30 },
] as const;

export const STANDARD_DEDUCTION_NEW = 75000;
export const STANDARD_DEDUCTION_OLD = 50000;
export const SECTION_80C_LIMIT = 150000;
export const SECTION_80D_LIMIT_SELF = 25000;
export const SECTION_80D_LIMIT_PARENTS = 50000;
export const NPS_ADDITIONAL_LIMIT = 50000;
export const CESS_RATE = 4;

// Currency formatting
export const CURRENCY_SYMBOL = '₹';
export const LOCALE = 'en-IN';

export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyFull(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatMonths(months: number): string {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years === 0) return `${remainingMonths} months`;
  if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`;
  return `${years}y ${remainingMonths}m`;
}
