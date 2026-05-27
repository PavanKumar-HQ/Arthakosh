"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { AnimatedSection, StaggerChildren, StaggerItem } from "@/components/shared/AnimatedSection";
import { formatCurrency } from "@/lib/constants";
import { ShieldAlert, Flame, Activity, TrendingDown, AlertOctagon, HeartPulse, Shield } from "lucide-react";
import { useBudgetStore } from "@/lib/store/budget";
import { EmergencyState, EMERGENCY_ACTIONS, calculateEmergencyRunway } from "@/lib/engines/emergencySimulator";
import { InsuranceEstimator } from "@/components/tools/InsuranceEstimator";

export default function EmergencyWarRoom() {
  const { incomes, expenses } = useBudgetStore();
  
  // Calculate baseline from Budget Store
  const fixedMonthlyExpenses = expenses.filter(e => e.isFixed).reduce((sum, e) => sum + e.amount, 0);
  const variableMonthlyExpenses = expenses.filter(e => !e.isFixed).reduce((sum, e) => sum + e.amount, 0);
  
  // Baseline initial state
  const [activeActions, setActiveActions] = useState<Record<string, boolean>>({});
  
  const state: EmergencyState = {
    cashReserves: 15000, // Mocked savings for now
    liquidInvestments: 40000,
    illiquidInvestments: 120000,
    fixedMonthlyExpenses,
    variableMonthlyExpenses,
    activeActions
  };

  const { availableCash, monthlyBurn, runwayMonths, longTermPenalty } = calculateEmergencyRunway(state);

  const toggleAction = (id: string) => {
    setActiveActions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Visual runway calculation (cap at 12 months for visual scale)
  const visualRunway = Math.min(12, runwayMonths);
  const isCritical = runwayMonths < 3;

  return (
    <div className="container-page py-8 sm:py-12">
      <AnimatedSection>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2 text-red-500">
              <ShieldAlert className="w-8 h-8" />
              Emergency War-Room
            </h1>
            <p className="text-muted-foreground">Simulate a total income collapse. How long can you survive?</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-semibold animate-pulse">
            <AlertOctagon className="w-4 h-4" />
            Income: $0 (Simulated)
          </div>
        </div>

        {/* Burn Rate Terminal */}
        <Card className={`p-8 mb-8 border-2 relative overflow-hidden transition-colors duration-500 ${isCritical ? 'bg-red-950/20 border-red-500/50' : 'bg-surface border-border/50'}`}>
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Flame className="w-32 h-32 text-red-500" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">Available Liquidity</p>
              <p className="text-4xl font-bold font-tabular">{formatCurrency(availableCash)}</p>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">Monthly Burn</p>
              <p className="text-4xl font-bold font-tabular text-orange-400">-{formatCurrency(monthlyBurn)}</p>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">Survival Runway</p>
              <p className={`text-4xl font-bold font-tabular ${isCritical ? 'text-red-500' : 'text-green-500'}`}>
                {runwayMonths === 999 ? 'Infinite' : `${runwayMonths.toFixed(1)} Months`}
              </p>
            </div>
          </div>

          {/* Runway Timeline */}
          <div className="mt-8 pt-8 border-t border-border/50">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Month 0 (Collapse)</span>
              <span>Month 6</span>
              <span>Month 12 (Safe)</span>
            </div>
            <div className="h-4 w-full bg-background rounded-full overflow-hidden border border-border/50 flex">
              {/* Render blocks for each month survived */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div 
                  key={i}
                  className={`h-full flex-1 border-r border-background/20 transition-colors duration-500 ${
                    i < runwayMonths 
                      ? (i < 3 ? 'bg-red-500' : i < 6 ? 'bg-orange-500' : 'bg-green-500') 
                      : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
            {isCritical && (
              <p className="mt-3 text-sm text-red-400 font-medium flex items-center gap-2">
                <HeartPulse className="w-4 h-4 animate-bounce" />
                Critical Threat: Runway is below the 3-month survival threshold.
              </p>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Action Levers */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-500" />
              Crisis Action Protocols
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Toggle drastic measures to extend your runway. Every action has a consequence.
            </p>
            
            <StaggerChildren className="space-y-3">
              {EMERGENCY_ACTIONS.map(action => {
                const isActive = activeActions[action.id];
                return (
                  <StaggerItem key={action.id}>
                    <button 
                      onClick={() => toggleAction(action.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center group ${
                        isActive 
                          ? 'bg-orange-500/10 border-orange-500/50' 
                          : 'bg-surface border-border/50 hover:border-border'
                      }`}
                    >
                      <div>
                        <p className={`font-semibold ${isActive ? 'text-orange-400' : ''}`}>{action.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{action.impact}</p>
                      </div>
                      
                      {/* Toggle switch visual */}
                      <div className={`w-12 h-6 rounded-full transition-colors relative ${isActive ? 'bg-orange-500' : 'bg-accent'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-background transition-transform ${isActive ? 'left-7' : 'left-1'}`} />
                      </div>
                    </button>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </div>

          {/* Consequences Panel */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-500" />
              Long-Term Damage Report
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Surviving today might cost you tomorrow. This calculates the compounded penalty of your crisis actions.
            </p>

            <Card className="p-6 bg-surface-raised/30 border-border/50">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Capital Destroyed (Taxes, Penalties, Interest)</p>
                  <p className="text-3xl font-bold font-tabular text-red-400">
                    {formatCurrency(longTermPenalty)}
                  </p>
                </div>

                <div className="space-y-3 pt-6 border-t border-border/50">
                  <h4 className="font-semibold text-sm">Active Penalties:</h4>
                  {Object.keys(activeActions).filter(k => activeActions[k]).length === 0 ? (
                    <p className="text-sm text-muted-foreground italic">No drastic actions taken yet.</p>
                  ) : (
                    EMERGENCY_ACTIONS.filter(a => activeActions[a.id]).map(action => (
                      <div key={action.id} className="flex justify-between text-sm">
                        <span>{action.name}</span>
                        <span className="text-red-400 font-medium">
                          {action.penalty > 1 
                            ? `-${formatCurrency(action.penalty)}/mo` 
                            : action.penalty < 0 
                              ? `Social Cost` 
                              : `-${(action.penalty * 100).toFixed(0)}% Capital`}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Insurance Coverage Section */}
        <div className="mt-12 pt-12 border-t border-border/50">
          <div className="mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              Insurance Coverage (First Line of Defense)
            </h2>
            <p className="text-sm text-muted-foreground">
              Before touching your emergency fund or selling investments, check if you are adequately covered by insurance.
            </p>
          </div>
          <InsuranceEstimator hideHeader />
        </div>

      </AnimatedSection>
    </div>
  );
}
