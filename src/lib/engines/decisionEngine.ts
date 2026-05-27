export interface TradeoffScenario {
  id: string;
  name: string;
  baseCost: number;
  monthlyCost: number;
  annualGrowthRate: number; // e.g. 0.05 for 5%
  maintenanceCostPercent: number; // e.g. 0.01 for 1% of baseCost annually
  opportunityCostRate: number; // e.g. 0.07 for 7% (what the money could have earned if invested)
}

export function calculate10YearValue(scenario: TradeoffScenario): number {
  let totalValue = scenario.baseCost;
  let totalSunkCost = 0;

  for (let year = 1; year <= 10; year++) {
    // Asset appreciation
    totalValue *= (1 + scenario.annualGrowthRate);
    
    // Yearly maintenance costs (sunk)
    const yearlyMaintenance = scenario.baseCost * scenario.maintenanceCostPercent;
    totalSunkCost += yearlyMaintenance + (scenario.monthlyCost * 12);
  }

  // Calculate the opportunity cost of the base capital and monthly cashflow
  // If this money was just put in the market instead.
  let opportunityValue = scenario.baseCost;
  for (let year = 1; year <= 10; year++) {
    opportunityValue *= (1 + scenario.opportunityCostRate);
    // Add the yearly cashflow (maintenance + monthly cost) that wasn't spent, and grow it
    opportunityValue += ((scenario.baseCost * scenario.maintenanceCostPercent) + (scenario.monthlyCost * 12)) * (1 + scenario.opportunityCostRate);
  }

  // The "Net Edge" of this scenario over doing absolutely nothing but investing in the market
  const netEdge = totalValue - totalSunkCost - opportunityValue;
  
  return netEdge;
}
