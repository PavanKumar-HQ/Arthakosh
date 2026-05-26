"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SliderInput } from "@/components/shared/SliderInput";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/constants";
import { Shield, AlertTriangle, Play, HelpCircle, Activity, Crosshair, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function EmergencyFundPlanner() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(40000);
  const [currentSavings, setCurrentSavings] = useState(120000);
  const [monthlySavings, setMonthlySavings] = useState(10000);
  
  // Custom context profile
  const [employmentType, setEmploymentType] = useState<"salaried" | "freelancer">("salaried");
  const [dependents, setDependents] = useState<number>(1);
  const [medicalObligations, setMedicalObligations] = useState<boolean>(false);
  const [cityCost, setCityCost] = useState<"high" | "medium" | "low">("medium");

  // Emergency scenario toggles
  const [activeScenario, setActiveScenario] = useState<"none" | "job_loss" | "medical" | "delayed_salary">("none");

  // Dynamic calculations based on user profile
  let recommendedMonths = 3;
  if (employmentType === "freelancer") recommendedMonths += 3;
  if (dependents > 2) recommendedMonths += 2;
  else if (dependents > 0) recommendedMonths += 1;
  if (medicalObligations) recommendedMonths += 2;
  if (cityCost === "high") recommendedMonths += 1;

  const targetFund = monthlyExpenses * recommendedMonths;

  // Scenario effects
  let simulatedSavings = currentSavings;
  let simulatedExpenses = monthlyExpenses;
  let scenarioFeedback = "";

  if (activeScenario === "medical") {
    simulatedSavings = Math.max(0, currentSavings - 150000);
    scenarioFeedback = "A ₹1.5 Lakh medical emergency occurred. Your savings dropped immediately. Note how your survival window shrank.";
  } else if (activeScenario === "job_loss") {
    simulatedExpenses = monthlyExpenses * 1.15; // Inflation or moving costs
    scenarioFeedback = "Job loss event. Outgoings increased by 15% to cover medical insurance COBRA or job hunt costs. Contribution toward savings paused.";
  } else if (activeScenario === "delayed_salary") {
    simulatedSavings = Math.max(0, currentSavings - (monthlyExpenses * 2));
    scenarioFeedback = "Salary delayed by 60 days. You had to pull 2 months of expenses to pay bills. Your emergency buffer absorbed the shock, preventing high-interest credit card debt.";
  }

  // Live Metrics
  const survivalDurationMonths = simulatedExpenses > 0 ? (simulatedSavings / simulatedExpenses) : 0;
  const fundingProgress = Math.min(100, Math.round((currentSavings / targetFund) * 100));

  // Vulnerability Score (0-100)
  let vulnerabilityScore = 100;
  vulnerabilityScore -= Math.min(50, (survivalDurationMonths / recommendedMonths) * 50);
  if (hasMedicalInsurance()) vulnerabilityScore -= 20;
  if (employmentType === "salaried") vulnerabilityScore -= 10;
  vulnerabilityScore = Math.max(0, Math.min(100, vulnerabilityScore));

  function hasMedicalInsurance() {
    return !medicalObligations;
  }

  // Get vulnerability tier
  let vulnerabilityTier: "Low" | "Medium" | "High" = "Medium";
  let vulnerabilityColor = "text-amber border-amber/30 bg-amber/5";
  if (vulnerabilityScore > 70) {
    vulnerabilityTier = "High";
    vulnerabilityColor = "text-rose border-rose/30 bg-rose/5";
  } else if (vulnerabilityScore < 35) {
    vulnerabilityTier = "Low";
    vulnerabilityColor = "text-emerald border-emerald/30 bg-emerald/5";
  }

  return (
    <div className="space-y-8">
      <div>
        <Badge variant="secondary" className="mb-2">Emergency Planning & Stability</Badge>
        <h1 className="text-3xl font-bold tracking-tight">Financial Safety Simulator</h1>
        <p className="text-muted-foreground text-sm max-w-xl">
          Don't just calculate — simulate. Test your emergency fund against real-life stress situations to audit your survival capacity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Inputs */}
        <Card className="p-6 lg:col-span-5 space-y-6 bg-surface">
          <h3 className="font-semibold text-sm border-b border-border/40 pb-2 text-foreground">
            1. Core Variables
          </h3>
          <SliderInput label="Your Average Monthly Outgoings" value={monthlyExpenses} onChange={setMonthlyExpenses} min={10000} max={250000} step={5000} prefix="₹" />
          <SliderInput label="Current Liquid Savings" value={currentSavings} onChange={setCurrentSavings} min={0} max={1500000} step={10000} prefix="₹" />
          <SliderInput label="Monthly Contribution to Savings" value={monthlySavings} onChange={setMonthlySavings} min={1000} max={100000} step={1000} prefix="₹" />

          <h3 className="font-semibold text-sm border-b border-border/40 pb-2 pt-2 text-foreground">
            2. Personal Risk Context
          </h3>

          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Employment Type</span>
            <div className="flex gap-2">
              {[
                { id: "salaried", label: "Salaried (Consistent)" },
                { id: "freelancer", label: "Freelancer / Business" },
              ].map((emp) => (
                <button
                  key={emp.id}
                  onClick={() => setEmploymentType(emp.id as any)}
                  className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                    employmentType === emp.id ? "border-foreground bg-foreground text-background" : "border-border hover:bg-surface-raised"
                  }`}
                >
                  {emp.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Dependents (Family obligations)</span>
            <div className="flex gap-2">
              {[0, 1, 2, "3+"].map((dep, idx) => {
                const isSelected = dependents === (typeof dep === "string" ? 3 : dep);
                return (
                  <button
                    key={idx}
                    onClick={() => setDependents(typeof dep === "string" ? 3 : dep)}
                    className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                      isSelected ? "border-foreground bg-foreground text-background" : "border-border hover:bg-surface-raised"
                    }`}
                  >
                    {dep}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between py-1">
            <div>
              <span className="text-xs font-semibold block text-foreground">Ongoing Medical Obligations</span>
              <span className="text-[10px] text-muted-foreground">E.g., monthly therapy, eldercare bills</span>
            </div>
            <button
              onClick={() => setMedicalObligations(!medicalObligations)}
              className={`px-3 py-1 rounded-lg border text-xs font-semibold transition-all ${
                medicalObligations ? "border-rose bg-rose/10 text-rose" : "border-border text-muted-foreground"
              }`}
            >
              {medicalObligations ? "Yes" : "No"}
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">City Cost Level</span>
            <div className="flex gap-2">
              {[
                { id: "high", label: "Tier 1 Metro (High)" },
                { id: "medium", label: "Tier 2 City" },
                { id: "low", label: "Tier 3 / Rural" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCityCost(c.id as any)}
                  className={`flex-1 py-1.5 rounded-lg border text-[10px] font-semibold transition-all leading-none ${
                    cityCost === c.id ? "border-foreground bg-foreground text-background" : "border-border hover:bg-surface-raised"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Right Side: Simulator and Projections */}
        <div className="lg:col-span-7 space-y-6">
          {/* Simulator Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <Card className="p-4 bg-surface flex flex-col justify-between">
              <span className="text-[11px] text-muted-foreground block mb-1">Recommended Safety Net</span>
              <span className="text-xl font-bold text-foreground font-tabular">{recommendedMonths} Months</span>
              <span className="text-[10px] text-muted-foreground mt-2 block">
                Target: {formatCurrency(targetFund)}
              </span>
            </Card>

            <Card className="p-4 bg-surface flex flex-col justify-between">
              <span className="text-[11px] text-muted-foreground block mb-1">Current Survival Window</span>
              <span className="text-2xl font-bold font-tabular text-foreground">
                {survivalDurationMonths.toFixed(1)} Months
              </span>
              <div className="w-full bg-secondary h-1 rounded-full overflow-hidden mt-3">
                <div className="bg-foreground h-full" style={{ width: `${Math.min(100, (survivalDurationMonths / recommendedMonths) * 100)}%` }} />
              </div>
            </Card>

            <Card className="p-4 bg-surface flex flex-col justify-between">
              <span className="text-[11px] text-muted-foreground block mb-1">Vulnerability Rating</span>
              <span className={`text-xs font-semibold px-2.5 py-1.5 rounded border inline-block mx-auto mt-1.5 ${vulnerabilityColor}`}>
                {vulnerabilityTier} Vulnerability ({vulnerabilityScore.toFixed(0)}/100)
              </span>
            </Card>
          </div>

          {/* Interactive Simulation Dashboard */}
          <Card className="p-5 bg-surface border-2 border-foreground/5 relative overflow-hidden">
            <h3 className="text-sm font-semibold mb-3 text-foreground flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-violet animate-pulse" />
              Interactive Safety Testing Room
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Select a financial shock event to see if your current savings absorbs the damage or causes stress.
            </p>
            
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: "job_loss", label: "Simulate Job Loss", icon: "💼" },
                { id: "medical", label: "Simulate Medical Cost", icon: "🏥" },
                { id: "delayed_salary", label: "Delayed Pay (60d)", icon: "⏳" }
              ].map((scen) => (
                <button
                  key={scen.id}
                  onClick={() => setActiveScenario(activeScenario === scen.id ? "none" : scen.id as any)}
                  className={`p-3 rounded-xl border text-[11px] font-semibold transition-all flex flex-col items-center text-center gap-2 ${
                    activeScenario === scen.id
                      ? "border-rose bg-rose/5 text-rose shadow-sm"
                      : "border-border hover:bg-surface-raised"
                  }`}
                >
                  <span className="text-lg">{scen.icon}</span>
                  <span>{scen.label}</span>
                </button>
              ))}
            </div>

            {/* Simulation feedback */}
            <AnimatePresence>
              {activeScenario !== "none" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-border/50 text-xs bg-rose/5 p-3 rounded-lg border border-rose/10 space-y-1.5"
                >
                  <span className="font-semibold text-rose flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Shockwave Consequence Audit:
                  </span>
                  <p className="text-muted-foreground leading-relaxed">{scenarioFeedback}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Savings progress track */}
          <Card className="p-5 bg-surface space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Crosshair className="w-4 h-4 text-violet" />
              Accumulation & Savings Track
            </h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Fund Goal: {formatCurrency(targetFund)}</span>
                <span className="font-semibold text-foreground">{fundingProgress}% Funded</span>
              </div>
              <Progress value={fundingProgress} className="h-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-surface-raised p-3 rounded-lg border border-border/40 text-xs">
                <span className="text-muted-foreground block mb-0.5">Timeline to completion:</span>
                {currentSavings >= targetFund ? (
                  <span className="font-semibold text-emerald">Fully funded! Outstanding safety net.</span>
                ) : monthlySavings > 0 ? (
                  <span className="font-semibold text-foreground">
                    {Math.ceil((targetFund - currentSavings) / monthlySavings)} months left at {formatCurrency(monthlySavings)}/mo.
                  </span>
                ) : (
                  <span className="text-rose font-medium">Add monthly contribution to build buffer.</span>
                )}
              </div>

              <div className="bg-surface-raised p-3 rounded-lg border border-border/40 text-xs flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <div>
                  <span className="text-[10px] text-muted-foreground block">Household dependents risk:</span>
                  <span className="font-medium text-foreground">
                    {dependents > 0 ? `Requires +${dependents * 1.5} Lakh safety cushion` : "Self-dependent structure (Optimal)"}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
