"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { SliderInput } from "@/components/shared/SliderInput";
import { calculateEMI } from "@/lib/calculators";
import { formatCurrency } from "@/lib/constants";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Shield, AlertTriangle, CheckCircle, Info, DollarSign, Wallet } from "lucide-react";

export function EMICalculator() {
  // Principal and loan terms
  const [principal, setPrincipal] = useState(2500000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(180); // in months

  // User financial profile
  const [monthlyIncome, setMonthlyIncome] = useState(120000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(40000);
  const [existingEMI, setExistingEMI] = useState(10000);
  const [dependents, setDependents] = useState(2);
  const [jobStability, setJobStability] = useState<"stable" | "variable" | "high_risk">("stable");
  const [hasEmergencyFund, setHasEmergencyFund] = useState<"yes_6" | "yes_3" | "no">("yes_3");

  // Calculations
  const emiResult = calculateEMI(principal, rate, tenure);
  const monthlyEMI = emiResult.monthlyEMI;
  
  const totalObligations = monthlyExpenses + existingEMI + monthlyEMI;
  const breathingRoom = Math.max(0, monthlyIncome - totalObligations);
  const debtToIncomeRatio = ( (existingEMI + monthlyEMI) / monthlyIncome ) * 100;

  // Affordability Logic
  let affordabilityScore = 100;
  
  // DTI deductions
  if (debtToIncomeRatio > 50) affordabilityScore -= 45;
  else if (debtToIncomeRatio > 40) affordabilityScore -= 30;
  else if (debtToIncomeRatio > 30) affordabilityScore -= 15;
  else if (debtToIncomeRatio > 15) affordabilityScore -= 5;

  // Dependent deductions
  affordabilityScore -= dependents * 4;

  // Job stability deductions
  if (jobStability === "variable") affordabilityScore -= 10;
  if (jobStability === "high_risk") affordabilityScore -= 25;

  // Emergency fund deductions
  if (hasEmergencyFund === "yes_3") affordabilityScore -= 5;
  if (hasEmergencyFund === "no") affordabilityScore -= 20;

  affordabilityScore = Math.max(0, Math.min(100, affordabilityScore));

  // Determine stress zone
  let stressLevel: "Calm" | "Moderate" | "High Stress" = "Calm";
  let stressColor = "text-emerald";
  let stressBg = "bg-emerald/10";
  if (affordabilityScore < 50 || debtToIncomeRatio > 45) {
    stressLevel = "High Stress";
    stressColor = "text-rose";
    stressBg = "bg-rose/10";
  } else if (affordabilityScore < 75 || debtToIncomeRatio > 30) {
    stressLevel = "Moderate";
    stressColor = "text-amber";
    stressBg = "bg-amber/10";
  }

  // Chart data
  const chartData = [
    {
      name: "Income & Cashflow Allocation",
      "Breathing Room": breathingRoom,
      "New EMI": monthlyEMI,
      "Fixed Expenses": monthlyExpenses,
      "Existing Debt EMIs": existingEMI,
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <Badge variant="secondary" className="mb-2">Debt & Commitment Analysis</Badge>
        <h1 className="text-3xl font-bold tracking-tight">EMI Stress Companion</h1>
        <p className="text-muted-foreground text-sm max-w-xl">
          Evaluate how adding a new loan payment affects your monthly breathing room, financial anxiety risk, and emergency safety limits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Inputs */}
        <Card className="p-6 lg:col-span-5 space-y-6 bg-surface">
          <h3 className="font-semibold text-sm border-b border-border/40 pb-2 text-foreground">
            1. Loan Parameters
          </h3>
          <SliderInput label="Loan Amount" value={principal} onChange={setPrincipal} min={100000} max={20000000} step={100000} prefix="₹" />
          <SliderInput label="Interest Rate" value={rate} onChange={setRate} min={5} max={18} step={0.1} suffix="% p.a." />
          <SliderInput
            label="Tenure"
            value={tenure}
            onChange={setTenure}
            min={12}
            max={360}
            step={12}
            valueLabel={`${Math.round(tenure / 12)} years`}
          />

          <h3 className="font-semibold text-sm border-b border-border/40 pb-2 pt-2 text-foreground">
            2. Your Monthly Cashflow
          </h3>
          <SliderInput label="Monthly Take-home Income" value={monthlyIncome} onChange={setMonthlyIncome} min={20000} max={500000} step={5000} prefix="₹" />
          <SliderInput label="Current Monthly Expenses" value={monthlyExpenses} onChange={setMonthlyExpenses} min={5000} max={200000} step={2000} prefix="₹" />
          <SliderInput label="Existing Debt EMIs" value={existingEMI} onChange={setExistingEMI} min={0} max={150000} step={1000} prefix="₹" />

          <h3 className="font-semibold text-sm border-b border-border/40 pb-2 pt-2 text-foreground">
            3. Household Resilience
          </h3>
          
          {/* Dependents selector */}
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Number of Dependents</span>
            <div className="flex gap-2">
              {[0, 1, 2, 3, "4+"].map((num, i) => {
                const isSelected = dependents === (typeof num === "string" ? 4 : num);
                return (
                  <button
                    key={i}
                    onClick={() => setDependents(typeof num === "string" ? 4 : num)}
                    className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                      isSelected ? "border-foreground bg-foreground text-background" : "border-border hover:bg-surface-raised"
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Job Stability Selector */}
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Job Stability</span>
            <div className="flex gap-2">
              {[
                { id: "stable", label: "Stable Salary" },
                { id: "variable", label: "Variable Income" },
                { id: "high_risk", label: "High Volatility" },
              ].map((job) => {
                const isSelected = jobStability === job.id;
                return (
                  <button
                    key={job.id}
                    onClick={() => setJobStability(job.id as any)}
                    className={`flex-1 py-2 px-1.5 rounded-lg border text-[10px] font-semibold transition-all leading-none ${
                      isSelected ? "border-foreground bg-foreground text-background" : "border-border hover:bg-surface-raised"
                    }`}
                  >
                    {job.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Emergency Fund Selector */}
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Emergency Buffer Availability</span>
            <div className="flex gap-2">
              {[
                { id: "yes_6", label: "6+ Months Safety" },
                { id: "yes_3", label: "3 Months Safety" },
                { id: "no", label: "No Buffer" },
              ].map((buf) => {
                const isSelected = hasEmergencyFund === buf.id;
                return (
                  <button
                    key={buf.id}
                    onClick={() => setHasEmergencyFund(buf.id as any)}
                    className={`flex-1 py-2 px-1.5 rounded-lg border text-[10px] font-semibold transition-all leading-none ${
                      isSelected ? "border-foreground bg-foreground text-background" : "border-border hover:bg-surface-raised"
                    }`}
                  >
                    {buf.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Right Side: Analysis */}
        <div className="lg:col-span-7 space-y-6">
          {/* Analysis Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <Card className="p-4 bg-surface flex flex-col justify-between">
              <span className="text-[11px] text-muted-foreground block mb-1">Monthly New EMI</span>
              <span className="text-xl font-bold font-tabular text-foreground">{formatCurrency(monthlyEMI)}</span>
              <span className="text-[10px] text-muted-foreground mt-2 block">
                Total interest: {formatCurrency(emiResult.totalInterest)}
              </span>
            </Card>

            <Card className="p-4 bg-surface flex flex-col justify-between">
              <span className="text-[11px] text-muted-foreground block mb-1">Affordability Score</span>
              <span className="text-2xl font-bold font-tabular text-foreground">{affordabilityScore}/100</span>
              <div className="w-full bg-secondary h-1 rounded-full overflow-hidden mt-3">
                <div className="bg-foreground h-full" style={{ width: `${affordabilityScore}%` }} />
              </div>
            </Card>

            <Card className="p-4 bg-surface flex flex-col justify-between">
              <span className="text-[11px] text-muted-foreground block mb-1">Stress Zone</span>
              <span className={`text-base font-bold px-2 py-1 rounded inline-block mx-auto mt-1 ${stressBg} ${stressColor}`}>
                {stressLevel}
              </span>
              <span className="text-[10px] text-muted-foreground mt-3 block">
                DTI Ratio: {debtToIncomeRatio.toFixed(1)}%
              </span>
            </Card>
          </div>

          {/* Visualizing post-EMI breathing room */}
          <Card className="p-5 bg-surface">
            <h3 className="text-sm font-semibold mb-4 text-foreground flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-violet" />
              Cashflow Breathing Room
            </h3>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" stackOffset="expand">
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" hide />
                  <Tooltip
                    formatter={(value: any, name: any) => [formatCurrency(Number(value)), name]}
                    contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "10px", fontSize: "11px" }}
                  />
                  <Bar dataKey="Existing Debt EMIs" stackId="a" fill="#EF4444" />
                  <Bar dataKey="Fixed Expenses" stackId="a" fill="#9CA3AF" />
                  <Bar dataKey="New EMI" stackId="a" fill="#3B82F6" />
                  <Bar dataKey="Breathing Room" stackId="a" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-[11px] text-muted-foreground mt-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-rose" />
                <span>Existing Debts: {formatCurrency(existingEMI)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-gray-400" />
                <span>Fixed Outgoings: {formatCurrency(monthlyExpenses)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-blue" />
                <span>New EMI: {formatCurrency(monthlyEMI)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-emerald" />
                <span>Surplus: {formatCurrency(breathingRoom)}</span>
              </div>
            </div>
          </Card>

          {/* Consequence & Recommendation Layers */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              Stress Analysis Reports & Guidance
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Consequence */}
              <Card className="p-4 bg-surface space-y-2 border-l-2 border-amber/70">
                <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber" />
                  Vulnerability Analysis
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {debtToIncomeRatio > 40
                    ? `Your loan commitment consumes ${debtToIncomeRatio.toFixed(0)}% of your monthly cash intake. If you experience an income interruption, you will face severe financial strain within 30 days.`
                    : `Your total debt commitments are within a manageable limit (${debtToIncomeRatio.toFixed(0)}% DTI). Your cash surplus is healthy enough to handle regular minor emergencies.`}
                </p>
              </Card>

              {/* Recommendation */}
              <Card className="p-4 bg-surface space-y-2 border-l-2 border-emerald/70">
                <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald" />
                  Behavioral Nudge
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {hasEmergencyFund === "no"
                    ? "CRITICAL: Build at least 3 months of emergency savings before taking on this loan. An EMI obligation with zero safety net increases default risks exponentially."
                    : jobStability === "variable"
                    ? "Freelancer/Variable Income advice: Try to keep your DTI ratio below 25% to account for dry periods in monthly earnings."
                    : "You are in a healthy position. Consider setting up auto-debit payments aligned with your salary credit date."}
                </p>
              </Card>
            </div>
            
            {/* Quick tips */}
            <div className="p-4 bg-accent/40 rounded-xl border border-border/30 text-xs">
              <span className="font-semibold block mb-1 text-foreground flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-violet" />
                Wealth Strategy Alternative
              </span>
              <p className="text-muted-foreground leading-relaxed">
                If you decrease the loan amount by just 10% (from {formatCurrency(principal)} to {formatCurrency(principal * 0.9)}), your monthly EMI drops to {formatCurrency(calculateEMI(principal * 0.9, rate, tenure).monthlyEMI)}, giving you {formatCurrency(monthlyEMI - calculateEMI(principal * 0.9, rate, tenure).monthlyEMI)} extra cash flexibility every single month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
