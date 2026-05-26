"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CurrencyInput } from "@/components/shared/CurrencyInput";
import { SliderInput } from "@/components/shared/SliderInput";
import { calculateDebtPayoff } from "@/lib/calculators";
import { formatCurrency, formatMonths } from "@/lib/constants";
import type { DebtItem } from "@/types";
import { Plus, Trash2, Shield, AlertTriangle, Lightbulb, Compass, Award } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export function DebtSnowballPlanner() {
  const [debts, setDebts] = useState<DebtItem[]>([
    { id: "1", name: "Credit Card CC", balance: 80000, interestRate: 36, minimumPayment: 4000 },
    { id: "2", name: "Education Loan", balance: 500000, interestRate: 8.5, minimumPayment: 8000 },
    { id: "3", name: "Personal Loan", balance: 150000, interestRate: 14, minimumPayment: 6000 },
  ]);
  
  const [monthlyIncome, setMonthlyIncome] = useState(80000);
  const [extraPayment, setExtraPayment] = useState(5000);

  const snowball = calculateDebtPayoff(debts, extraPayment, "snowball");
  const avalanche = calculateDebtPayoff(debts, extraPayment, "avalanche");

  const totalBalance = debts.reduce((sum, d) => sum + d.balance, 0);
  const totalMinPayment = debts.reduce((sum, d) => sum + d.minimumPayment, 0);
  const totalMonthlyCommitment = totalMinPayment + extraPayment;

  // Psychological pressure index calculation
  const totalCCBalance = debts.filter(d => d.interestRate >= 28).reduce((sum, d) => sum + d.balance, 0);
  let pressureScore = 0;
  if (totalCCBalance > 0) pressureScore += 35; // CC debt adds heavy emotional pressure
  if (debts.length > 3) pressureScore += 20; // tracking multiple accounts is mentally fatiguing
  const commitmentRatio = (totalMonthlyCommitment / monthlyIncome) * 100;
  pressureScore += Math.min(45, (commitmentRatio / 50) * 45); // higher outgoings vs income increases anxiety

  let pressureLevel: "Calm" | "Moderate" | "Severe Stress" | "Burnout Risk" = "Calm";
  let pressureColor = "text-emerald border-emerald/30 bg-emerald/5";

  if (pressureScore > 75 || commitmentRatio > 55) {
    pressureLevel = "Burnout Risk";
    pressureColor = "text-rose border-rose/30 bg-rose/5";
  } else if (pressureScore > 45 || commitmentRatio > 35) {
    pressureLevel = "Severe Stress";
    pressureColor = "text-amber border-amber/30 bg-amber/5";
  } else if (pressureScore > 20) {
    pressureLevel = "Moderate";
    pressureColor = "text-blue border-blue/30 bg-blue/5";
  }

  const addDebt = () => {
    setDebts((prev) => [...prev, { id: Date.now().toString(), name: "", balance: 10000, interestRate: 12, minimumPayment: 1000 }]);
  };

  const removeDebt = (id: string) => {
    setDebts((prev) => prev.filter((d) => d.id !== id));
  };

  const updateDebt = (id: string, field: keyof DebtItem, value: string | number) => {
    setDebts((prev) => prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  const chartStep = Math.max(1, Math.floor(avalanche.monthlyData.length / 30));
  const chartData = avalanche.monthlyData.filter((_, i) => i % chartStep === 0 || i === avalanche.monthlyData.length - 1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Badge variant="secondary" className="mb-2">Debt Management & Restructuring</Badge>
        <h1 className="text-3xl font-bold tracking-tight">Debt Recovery System</h1>
        <p className="text-muted-foreground text-sm max-w-xl">
          Create a sustainable, burnout-free repayment plan. Compare snowball vs avalanche strategies to find the right balance of financial savings and psychological momentum.
        </p>
      </div>

      {/* Debt inputs */}
      <Card className="p-6 bg-surface space-y-6">
        <div className="flex items-center justify-between border-b border-border/40 pb-3">
          <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
            <Compass className="w-4 h-4 text-violet" />
            1. Your Active Obligations
          </h3>
          <button onClick={addDebt} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-foreground text-background hover:opacity-90 transition-opacity">
            <Plus className="w-3.5 h-3.5" /> Add Liability
          </button>
        </div>

        <div className="space-y-3">
          {debts.map((debt) => (
            <div key={debt.id} className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end p-4 rounded-xl border border-border/50 bg-surface/50">
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground font-semibold">Creditor / Loan Name</span>
                <input type="text" value={debt.name} onChange={(e) => updateDebt(debt.id, "name", e.target.value)} placeholder="Credit card, Auto loan..." className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs font-medium focus:outline-none focus:ring-2 focus:ring-ring/30" />
              </div>
              <CurrencyInput label="Outstanding Balance" value={debt.balance} onChange={(v) => updateDebt(debt.id, "balance", v)} />
              <div className="space-y-1">
                <label className="text-[10px] text-muted-foreground font-semibold block">Interest Rate (% p.a.)</label>
                <input type="number" value={debt.interestRate} onChange={(e) => updateDebt(debt.id, "interestRate", Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-xs font-tabular focus:outline-none focus:ring-2 focus:ring-ring/30" />
              </div>
              <CurrencyInput label="Min Monthly Outgoing" value={debt.minimumPayment} onChange={(v) => updateDebt(debt.id, "minimumPayment", v)} />
              <button onClick={() => removeDebt(debt.id)} className="p-2.5 rounded-lg text-muted-foreground hover:text-rose hover:bg-rose/10 transition-all self-end flex justify-center border border-transparent hover:border-rose/20">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <Separator className="my-2 border-border/30" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SliderInput label="Your Monthly Income" value={monthlyIncome} onChange={setMonthlyIncome} min={20000} max={400000} step={2000} prefix="₹" />
          <SliderInput label="Extra Monthly Payoff Contribution" value={extraPayment} onChange={setExtraPayment} min={0} max={100000} step={500} prefix="₹" />
        </div>
      </Card>

      {/* Stress & Burnout Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <Card className="p-4 bg-surface flex flex-col justify-between">
          <span className="text-[11px] text-muted-foreground block mb-1">Total Outstanding Debt</span>
          <span className="text-xl font-bold font-tabular text-foreground">{formatCurrency(totalBalance)}</span>
          <span className="text-[10px] text-muted-foreground mt-2 block">
            Across {debts.length} active liabilities
          </span>
        </Card>

        <Card className="p-4 bg-surface flex flex-col justify-between">
          <span className="text-[11px] text-muted-foreground block mb-1">Total Monthly Repayments</span>
          <span className="text-xl font-bold font-tabular text-foreground">{formatCurrency(totalMonthlyCommitment)}</span>
          <div className="w-full bg-secondary h-1 rounded-full overflow-hidden mt-3">
            <div className="bg-foreground h-full" style={{ width: `${Math.min(100, commitmentRatio)}%` }} />
          </div>
        </Card>

        <Card className="p-4 bg-surface flex flex-col justify-between">
          <span className="text-[11px] text-muted-foreground block mb-1">Mental Fatigue Score</span>
          <span className={`text-xs font-semibold px-2.5 py-1.5 rounded border inline-block mx-auto mt-1.5 ${pressureColor}`}>
            {pressureLevel} ({pressureScore.toFixed(0)}/100)
          </span>
        </Card>
      </div>

      {/* Snowball vs Avalanche Strategies Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Snowball card */}
        <Card className="p-5 bg-surface space-y-4">
          <div className="flex items-center justify-between border-b border-border/30 pb-2">
            <h3 className="font-semibold text-sm flex items-center gap-1.5">
              <Award className="w-4 h-4 text-violet" />
              Snowball Strategy
            </h3>
            <Badge variant="secondary" className="text-[10px]">Smallest balance first</Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Eliminates smallest balances first. Highly recommended if you feel overwhelmed by tracking multiple cards or bills, as it provides rapid psychological "wins."
          </p>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Repayment Duration:</span>
              <span className="font-bold text-foreground font-tabular">{formatMonths(snowball.totalTimeline)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Interest paid:</span>
              <span className="font-medium text-foreground font-tabular">{formatCurrency(snowball.totalInterestPaid)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Interest saved:</span>
              <span className="font-semibold text-emerald font-tabular">{formatCurrency(snowball.interestSaved)}</span>
            </div>
          </div>
        </Card>

        {/* Avalanche card */}
        <Card className={`p-5 bg-surface space-y-4 border ${avalanche.totalInterestPaid <= snowball.totalInterestPaid ? "border-emerald/40" : ""}`}>
          <div className="flex items-center justify-between border-b border-border/30 pb-2">
            <h3 className="font-semibold text-sm flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald" />
              Avalanche Strategy
            </h3>
            <Badge className="bg-emerald/10 text-emerald border-emerald/30 text-[10px]">Math-optimized (Saves more)</Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Tackles highest interest rate debts first. Minimizes total interest cash out of pocket. Best choice if you are disciplined and want the mathematically optimal route.
          </p>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Repayment Duration:</span>
              <span className="font-bold text-foreground font-tabular">{formatMonths(avalanche.totalTimeline)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Interest paid:</span>
              <span className="font-medium text-foreground font-tabular">{formatCurrency(avalanche.totalInterestPaid)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Interest saved:</span>
              <span className="font-semibold text-emerald font-tabular">{formatCurrency(avalanche.interestSaved)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Timeline Chart */}
      <Card className="p-6 bg-surface">
        <h3 className="text-sm font-semibold mb-4 text-foreground">Debt Balance Decay Outlook</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <defs>
                <linearGradient id="debtFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.4} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickFormatter={(m: number) => m >= 12 ? `${Math.round(m / 12)}y` : `${m}m`} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickFormatter={(v: number) => v >= 100000 ? `${(v / 100000).toFixed(0)}L` : `${(v / 1000).toFixed(0)}K`} axisLine={false} tickLine={false} width={45} />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "11px" }} formatter={(v: any) => [formatCurrency(Number(v))]} labelFormatter={(m: any) => `Month ${m}`} />
              <Area type="monotone" dataKey="totalBalance" stroke="#EF4444" strokeWidth={2} fill="url(#debtFill)" name="Outstanding Balance" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Behavioral Warnings & restructures advice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Burnout caution */}
        <Card className="p-4 bg-surface space-y-2 border-l-2 border-rose/70">
          <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose" />
            Repayment Sustainability Note
          </span>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {commitmentRatio > 50
              ? "WARNING: Your monthly debt commitments exceed 50% of your earnings. Attempting to allocate high extra payments right now increases default or borrowing risks. Keep a cash buffer."
              : "Your monthly debt outgoings are in a healthy, sustainable range relative to your earnings. Keep allocating extra surplus to accelerate debt-free timelines."}
          </p>
        </Card>

        {/* Behavioral Nudges */}
        <Card className="p-4 bg-surface space-y-2 border-l-2 border-emerald/70">
          <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-emerald" />
            Psychological Recommendation
          </span>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Avoid credit cards entirely while clearing debt. If you pay interest on credit card cash cycles (often 36-42% in India), any savings from mutual fund investments are immediately cancelled out. Secure emergency cash first.
          </p>
        </Card>
      </div>
    </div>
  );
}
