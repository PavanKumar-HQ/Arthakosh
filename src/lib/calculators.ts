// ============================================================
// Arthakosh — Financial Calculation Engines
// All functions are pure, deterministic, and India-specific
// ============================================================

import type {
  SIPResult,
  EMIResult,
  GoalProjection,
  DebtItem,
  DebtPayoffResult,
  TaxInput,
  TaxResult,
} from '@/types';
import {
  NEW_TAX_SLABS,
  OLD_TAX_SLABS,
  STANDARD_DEDUCTION_NEW,
  STANDARD_DEDUCTION_OLD,
  CESS_RATE,
} from './constants';

// --- SIP Calculator ---

export function calculateSIP(
  monthlyInvestment: number,
  annualReturnRate: number,
  years: number,
  stepUpRate: number = 0
): SIPResult {
  const monthlyRate = annualReturnRate / 100 / 12;
  const totalMonths = years * 12;
  const monthlyData: { month: number; invested: number; value: number }[] = [];

  let totalInvested = 0;
  let currentValue = 0;
  let currentMonthly = monthlyInvestment;

  for (let month = 1; month <= totalMonths; month++) {
    // Step-up: increase monthly investment annually
    if (stepUpRate > 0 && month > 1 && (month - 1) % 12 === 0) {
      currentMonthly = currentMonthly * (1 + stepUpRate / 100);
    }

    totalInvested += currentMonthly;
    currentValue = (currentValue + currentMonthly) * (1 + monthlyRate);

    monthlyData.push({
      month,
      invested: Math.round(totalInvested),
      value: Math.round(currentValue),
    });
  }

  return {
    totalInvested: Math.round(totalInvested),
    wealthGained: Math.round(currentValue - totalInvested),
    maturityAmount: Math.round(currentValue),
    monthlyData,
  };
}

// --- EMI Calculator ---

export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number
): EMIResult {
  const monthlyRate = annualRate / 100 / 12;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;

  const amortization: { month: number; principal: number; interest: number; balance: number }[] = [];
  let balance = principal;

  for (let month = 1; month <= tenureMonths; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = emi - interestPayment;
    balance -= principalPayment;

    amortization.push({
      month,
      principal: Math.round(principalPayment),
      interest: Math.round(interestPayment),
      balance: Math.max(0, Math.round(balance)),
    });
  }

  return {
    monthlyEMI: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    principalPercentage: Math.round((principal / totalPayment) * 100),
    interestPercentage: Math.round((totalInterest / totalPayment) * 100),
    amortization,
  };
}

// --- Inflation Calculator ---

export function calculateInflationAdjusted(
  currentAmount: number,
  years: number,
  inflationRate: number = 6
): number {
  return Math.round(currentAmount * Math.pow(1 + inflationRate / 100, years));
}

export function calculatePresentValue(
  futureAmount: number,
  years: number,
  inflationRate: number = 6
): number {
  return Math.round(futureAmount / Math.pow(1 + inflationRate / 100, years));
}

// --- Goal Projection ---

export function calculateGoalProjection(
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

// --- Emergency Fund ---

export function calculateEmergencyFund(
  monthlyExpenses: number,
  months: number = 6
): { recommended: number; monthly3: number; monthly6: number; monthly9: number } {
  return {
    recommended: monthlyExpenses * months,
    monthly3: monthlyExpenses * 3,
    monthly6: monthlyExpenses * 6,
    monthly9: monthlyExpenses * 9,
  };
}

// --- Debt Snowball / Avalanche ---

export function calculateDebtPayoff(
  debts: DebtItem[],
  extraPayment: number,
  method: 'snowball' | 'avalanche'
): DebtPayoffResult {
  // Sort debts
  const sortedDebts = [...debts].sort((a, b) => {
    if (method === 'snowball') return a.balance - b.balance;
    return b.interestRate - a.interestRate;
  });

  const balances = sortedDebts.map((d) => d.balance);
  const rates = sortedDebts.map((d) => d.interestRate / 100 / 12);
  const minimums = sortedDebts.map((d) => d.minimumPayment);
  const payoffOrder: { name: string; payoffMonth: number }[] = [];
  const monthlyData: { month: number; totalBalance: number }[] = [];

  let month = 0;
  let totalInterestPaid = 0;

  monthlyData.push({ month: 0, totalBalance: balances.reduce((a, b) => a + b, 0) });

  while (balances.some((b) => b > 0) && month < 360) {
    month++;
    let availableExtra = extraPayment;

    // Pay minimums on all debts and accrue interest
    for (let i = 0; i < balances.length; i++) {
      if (balances[i] <= 0) continue;

      const interest = balances[i] * rates[i];
      totalInterestPaid += interest;
      balances[i] += interest;

      const payment = Math.min(balances[i], minimums[i]);
      balances[i] -= payment;

      if (balances[i] <= 0) {
        balances[i] = 0;
        payoffOrder.push({ name: sortedDebts[i].name, payoffMonth: month });
      }
    }

    // Apply extra payment to first non-zero debt
    for (let i = 0; i < balances.length; i++) {
      if (balances[i] <= 0) continue;
      const extra = Math.min(balances[i], availableExtra);
      balances[i] -= extra;
      availableExtra -= extra;

      if (balances[i] <= 0) {
        balances[i] = 0;
        if (!payoffOrder.find((p) => p.name === sortedDebts[i].name)) {
          payoffOrder.push({ name: sortedDebts[i].name, payoffMonth: month });
        }
      }
      if (availableExtra <= 0) break;
    }

    monthlyData.push({ month, totalBalance: Math.round(balances.reduce((a, b) => a + b, 0)) });
  }

  // Calculate minimum-only interest for comparison
  const minOnlyDebts = debts.map((d) => d.balance);
  const minOnlyRates = debts.map((d) => d.interestRate / 100 / 12);
  const minOnlyMinimums = debts.map((d) => d.minimumPayment);
  let minOnlyInterest = 0;
  let minMonth = 0;

  while (minOnlyDebts.some((b) => b > 0) && minMonth < 360) {
    minMonth++;
    for (let i = 0; i < minOnlyDebts.length; i++) {
      if (minOnlyDebts[i] <= 0) continue;
      const interest = minOnlyDebts[i] * minOnlyRates[i];
      minOnlyInterest += interest;
      minOnlyDebts[i] += interest;
      const payment = Math.min(minOnlyDebts[i], minOnlyMinimums[i]);
      minOnlyDebts[i] -= payment;
      if (minOnlyDebts[i] <= 0) minOnlyDebts[i] = 0;
    }
  }

  return {
    method,
    totalInterestPaid: Math.round(totalInterestPaid),
    totalTimeline: month,
    interestSaved: Math.round(minOnlyInterest - totalInterestPaid),
    payoffOrder,
    monthlyData,
  };
}

// --- Net Worth ---

export function calculateNetWorth(
  assets: { name: string; amount: number }[],
  liabilities: { name: string; amount: number }[]
): { totalAssets: number; totalLiabilities: number; netWorth: number } {
  const totalAssets = assets.reduce((sum, a) => sum + a.amount, 0);
  const totalLiabilities = liabilities.reduce((sum, l) => sum + l.amount, 0);
  return {
    totalAssets,
    totalLiabilities,
    netWorth: totalAssets - totalLiabilities,
  };
}

// --- Tax Calculator (Indian) ---

export function calculateTax(input: TaxInput): TaxResult {
  const { annualIncome, regime, deductions } = input;

  let taxableIncome: number;
  const slabBreakdown: { slab: string; rate: number; tax: number }[] = [];

  if (regime === 'new') {
    taxableIncome = Math.max(0, annualIncome - STANDARD_DEDUCTION_NEW);
    const slabs = NEW_TAX_SLABS;

    let remainingIncome = taxableIncome;
    for (const slab of slabs) {
      const slabWidth = slab.max === Infinity ? remainingIncome : Math.min(remainingIncome, slab.max - slab.min);
      if (slabWidth <= 0) break;
      const tax = (slabWidth * slab.rate) / 100;
      slabBreakdown.push({
        slab: slab.max === Infinity
          ? `Above ₹${(slab.min / 100000).toFixed(1)}L`
          : `₹${(slab.min / 100000).toFixed(1)}L – ₹${(slab.max / 100000).toFixed(1)}L`,
        rate: slab.rate,
        tax: Math.round(tax),
      });
      remainingIncome -= slabWidth;
    }
  } else {
    const totalDeductions =
      STANDARD_DEDUCTION_OLD +
      Math.min(deductions.section80C, 150000) +
      Math.min(deductions.section80D, 75000) +
      deductions.hra +
      deductions.lta +
      Math.min(deductions.homeLoanInterest, 200000) +
      Math.min(deductions.nps, 50000) +
      deductions.otherDeductions;

    taxableIncome = Math.max(0, annualIncome - totalDeductions);
    const slabs = OLD_TAX_SLABS;

    let remainingIncome = taxableIncome;
    for (const slab of slabs) {
      const slabWidth = slab.max === Infinity ? remainingIncome : Math.min(remainingIncome, slab.max - slab.min);
      if (slabWidth <= 0) break;
      const tax = (slabWidth * slab.rate) / 100;
      slabBreakdown.push({
        slab: slab.max === Infinity
          ? `Above ₹${(slab.min / 100000).toFixed(1)}L`
          : `₹${(slab.min / 100000).toFixed(1)}L – ₹${(slab.max / 100000).toFixed(1)}L`,
        rate: slab.rate,
        tax: Math.round(tax),
      });
      remainingIncome -= slabWidth;
    }
  }

  const totalTaxBeforeCess = slabBreakdown.reduce((sum, s) => sum + s.tax, 0);
  
  // Apply rebate under section 87A for new regime (income up to 7L)
  let taxAfterRebate = totalTaxBeforeCess;
  if (regime === 'new' && taxableIncome <= 700000) {
    taxAfterRebate = 0;
  } else if (regime === 'old' && taxableIncome <= 500000) {
    taxAfterRebate = 0;
  }

  const cess = Math.round(taxAfterRebate * CESS_RATE / 100);
  const totalTax = taxAfterRebate + cess;

  return {
    taxableIncome,
    totalTax,
    effectiveRate: annualIncome > 0 ? Math.round((totalTax / annualIncome) * 10000) / 100 : 0,
    cess,
    slabBreakdown,
  };
}

// --- Insurance Estimator ---

export function calculateInsurance(
  age: number,
  annualIncome: number,
  dependents: number,
  existingCover: number
): {
  recommendedLife: number;
  recommendedHealth: number;
  gap: number;
  reasoning: string;
} {
  // Life insurance: 10-15x annual income
  const multiplier = age < 30 ? 15 : age < 40 ? 12 : age < 50 ? 10 : 8;
  const recommendedLife = annualIncome * multiplier;

  // Health insurance: base + per dependent
  const baseHealth = 500000;
  const perDependent = 300000;
  const recommendedHealth = baseHealth + dependents * perDependent;

  const gap = Math.max(0, recommendedLife - existingCover);

  const reasoning = `At age ${age} with ${dependents} dependent${dependents !== 1 ? 's' : ''}, ` +
    `a ${multiplier}x income cover ensures your family's financial security for ` +
    `${Math.round(multiplier * 0.8)}-${multiplier} years. ` +
    `Health cover of ₹${(recommendedHealth / 100000).toFixed(0)}L accounts for rising medical costs.`;

  return { recommendedLife, recommendedHealth, gap, reasoning };
}

// --- Credit Score Simulator ---

export function calculateCreditScore(
  paymentHistory: number, // 0-100
  creditUtilization: number, // 0-100
  creditAge: number, // years
  creditMix: number, // 0-100
  recentEnquiries: number // count
): number {
  // CIBIL-style score: 300-900
  const maxScore = 900;
  const minScore = 300;
  const range = maxScore - minScore;

  const score =
    minScore +
    range *
      (paymentHistory / 100 * 0.35 +
        (1 - creditUtilization / 100) * 0.30 +
        Math.min(creditAge / 15, 1) * 0.15 +
        creditMix / 100 * 0.10 +
        Math.max(0, 1 - recentEnquiries / 10) * 0.10);

  return Math.round(Math.min(maxScore, Math.max(minScore, score)));
}
