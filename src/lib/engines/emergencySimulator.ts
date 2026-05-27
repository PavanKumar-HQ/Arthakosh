export interface EmergencyState {
  cashReserves: number;
  liquidInvestments: number;
  illiquidInvestments: number; // e.g. 401k, PF
  fixedMonthlyExpenses: number;
  variableMonthlyExpenses: number;
  activeActions: Record<string, boolean>;
}

export const EMERGENCY_ACTIONS = [
  { id: "cut_lifestyle", name: "Slash Lifestyle to Zero", type: "expense", impact: "Zeroes out variable expenses", penalty: 0 },
  { id: "liquidate_stocks", name: "Panic Sell Stocks", type: "cash", impact: "+ Liquid Investments", penalty: 0.15 }, // 15% market drop/tax penalty
  { id: "withdraw_401k", name: "Raid Retirement Fund", type: "cash", impact: "+ Illiquid Investments", penalty: 0.30 }, // 30% tax + penalty
  { id: "personal_loan", name: "Take Personal Loan", type: "debt", impact: "+ $20,000 Cash", penalty: 500 }, // Adds 500 to fixed monthly expenses
  { id: "borrow_family", name: "Borrow from Family", type: "social", impact: "+ $10,000 Cash", penalty: -20 }, // -20 Social/Pride score
];

export function calculateEmergencyRunway(state: EmergencyState) {
  let availableCash = state.cashReserves;
  let monthlyBurn = state.fixedMonthlyExpenses + state.variableMonthlyExpenses;
  let longTermPenalty = 0;
  
  if (state.activeActions["cut_lifestyle"]) {
    monthlyBurn = state.fixedMonthlyExpenses; // Variable goes to 0
  }
  
  if (state.activeActions["liquidate_stocks"]) {
    availableCash += state.liquidInvestments * (1 - 0.15);
    longTermPenalty += state.liquidInvestments * 0.15; // Lost capital
  }
  
  if (state.activeActions["withdraw_401k"]) {
    availableCash += state.illiquidInvestments * (1 - 0.30);
    longTermPenalty += state.illiquidInvestments * 0.30;
  }
  
  if (state.activeActions["personal_loan"]) {
    availableCash += 20000;
    monthlyBurn += 500;
    longTermPenalty += (500 * 36) - 20000; // Assuming 3 year loan, rough interest calculation
  }
  
  if (state.activeActions["borrow_family"]) {
    availableCash += 10000;
    // Social penalty is tracked elsewhere, no pure financial penalty here except repayment
  }
  
  const runwayMonths = monthlyBurn > 0 ? availableCash / monthlyBurn : 999;
  
  return {
    availableCash,
    monthlyBurn,
    runwayMonths,
    longTermPenalty
  };
}
