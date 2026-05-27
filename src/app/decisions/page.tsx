"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Split, Scale, TrendingUp, AlertTriangle } from "lucide-react";
import { TradeoffScenario, calculate10YearValue } from "@/lib/engines/decisionEngine";
import { formatCurrency } from "@/lib/constants";

const DEFAULT_SCENARIO_A: TradeoffScenario = {
  id: "buy_home",
  name: "Buy $500k Home",
  baseCost: 100000, // Downpayment
  monthlyCost: 2500, // Mortgage + Insurance
  annualGrowthRate: 0.04, // 4% property appreciation
  maintenanceCostPercent: 0.015, // 1.5% maintenance
  opportunityCostRate: 0.08, // 8% stock market return lost
};

const DEFAULT_SCENARIO_B: TradeoffScenario = {
  id: "rent_invest",
  name: "Rent & Invest Difference",
  baseCost: 100000, // Invest the downpayment
  monthlyCost: 1800, // Rent
  annualGrowthRate: 0.08, // 8% stock market return
  maintenanceCostPercent: 0, // No maintenance
  opportunityCostRate: 0, // Baseline comparison
};

export default function DecisionsDashboard() {
  const [scenarioA, setScenarioA] = useState<TradeoffScenario>(DEFAULT_SCENARIO_A);
  const [scenarioB, setScenarioB] = useState<TradeoffScenario>(DEFAULT_SCENARIO_B);

  const valueA = calculate10YearValue(scenarioA);
  const valueB = calculate10YearValue(scenarioB);

  // Calculate tilt angle (-15 deg to +15 deg max)
  const maxDiff = 500000; // Cap visual tilt at half a million diff
  const rawDiff = valueA - valueB;
  const tiltAngle = Math.max(-15, Math.min(15, (rawDiff / maxDiff) * 15));

  const handleUpdateA = (key: keyof TradeoffScenario, value: number) => {
    setScenarioA(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container-page py-8 sm:py-12">
      <AnimatedSection>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
              <Split className="w-8 h-8 text-indigo-500" />
              Strategic Tradeoffs
            </h1>
            <p className="text-muted-foreground">The Scale of Justice: Weigh the 10-year compounding reality of major life decisions.</p>
          </div>
        </div>

        {/* The Scale UI */}
        <div className="py-16 mb-8 flex flex-col items-center justify-center bg-surface-raised/30 border border-border/50 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/5 via-background to-background opacity-50" />
          
          {/* Base Pivot */}
          <div className="relative z-10 flex flex-col items-center">
            
            {/* The Beam */}
            <div 
              className="w-80 sm:w-[500px] h-3 bg-zinc-800 dark:bg-zinc-200 rounded-full relative transition-transform duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{ transform: `rotate(${tiltAngle}deg)` }}
            >
              {/* Left Pan Line */}
              <div className="absolute left-0 top-3 w-0.5 h-16 bg-zinc-400 dark:bg-zinc-600 -ml-[1px]" />
              {/* Right Pan Line */}
              <div className="absolute right-0 top-3 w-0.5 h-16 bg-zinc-400 dark:bg-zinc-600 -mr-[1px]" />
              
              {/* Left Pan (Scenario A) */}
              <div 
                className="absolute -left-16 top-16 w-32 p-3 bg-surface border border-border shadow-lg rounded-xl flex flex-col items-center justify-center transition-transform duration-1000"
                style={{ transform: `rotate(${-tiltAngle}deg)` }} // Counter-rotate to stay upright
              >
                <p className="text-xs font-bold text-muted-foreground text-center mb-1">{scenarioA.name}</p>
                <p className={`text-sm font-bold font-tabular ${valueA > valueB ? 'text-green-500' : 'text-red-500'}`}>
                  {valueA > 0 ? '+' : ''}{(valueA / 1000).toFixed(0)}k Net
                </p>
              </div>

              {/* Right Pan (Scenario B) */}
              <div 
                className="absolute -right-16 top-16 w-32 p-3 bg-surface border border-border shadow-lg rounded-xl flex flex-col items-center justify-center transition-transform duration-1000"
                style={{ transform: `rotate(${-tiltAngle}deg)` }} // Counter-rotate to stay upright
              >
                <p className="text-xs font-bold text-muted-foreground text-center mb-1">{scenarioB.name}</p>
                <p className={`text-sm font-bold font-tabular ${valueB > valueA ? 'text-green-500' : 'text-red-500'}`}>
                  {valueB > 0 ? '+' : ''}{(valueB / 1000).toFixed(0)}k Net
                </p>
              </div>
            </div>

            {/* The Stand */}
            <div className="w-4 h-32 bg-zinc-800 dark:bg-zinc-200 mt-0 rounded-b-md z-0" />
            <div className="w-16 h-4 bg-zinc-800 dark:bg-zinc-200 rounded-t-md" />
            <Scale className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-zinc-500" />
          </div>

          <div className="mt-20 text-center relative z-10">
            <h3 className="text-lg font-bold">
              {rawDiff > 0 
                ? `${scenarioA.name} wins by ${formatCurrency(Math.abs(rawDiff))}`
                : `${scenarioB.name} wins by ${formatCurrency(Math.abs(rawDiff))}`
              }
            </h3>
            <p className="text-sm text-muted-foreground mt-1">Net compounding edge over 10 years</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Editor A */}
          <Card className="p-6 bg-surface border-border/50">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-500" />
              {scenarioA.name}
            </h2>
            <div className="space-y-6">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Property Appreciation Rate ({(scenarioA.annualGrowthRate * 100).toFixed(1)}%)</label>
                <input 
                  type="range" min="0" max="0.10" step="0.005"
                  value={scenarioA.annualGrowthRate}
                  onChange={(e) => handleUpdateA("annualGrowthRate", Number(e.target.value))}
                  className="w-full accent-indigo-500 mt-2"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Annual Maintenance Cost ({(scenarioA.maintenanceCostPercent * 100).toFixed(1)}% of value)</label>
                <input 
                  type="range" min="0" max="0.05" step="0.005"
                  value={scenarioA.maintenanceCostPercent}
                  onChange={(e) => handleUpdateA("maintenanceCostPercent", Number(e.target.value))}
                  className="w-full accent-red-500 mt-2"
                />
              </div>
              <div className="p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                <div className="flex items-start gap-2 text-sm text-indigo-400">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>A higher maintenance cost severely drags down compounding over a 10-year horizon.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Editor B (Read Only / Fixed for this demo) */}
          <Card className="p-6 bg-surface border-border/50 opacity-70">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-zinc-500" />
              {scenarioB.name} (Baseline)
            </h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Initial Capital Invested</span>
                <span className="font-tabular font-medium">{formatCurrency(scenarioB.baseCost)}</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Monthly Rent (Sunk)</span>
                <span className="font-tabular font-medium text-red-400">-{formatCurrency(scenarioB.monthlyCost)}</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Stock Market Return</span>
                <span className="font-tabular font-medium text-green-400">+{(scenarioB.annualGrowthRate * 100).toFixed(1)}% / yr</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-6 text-center italic">
              Baseline metrics are locked for accurate comparison against Scenario A.
            </p>
          </Card>

        </div>
      </AnimatedSection>
    </div>
  );
}
