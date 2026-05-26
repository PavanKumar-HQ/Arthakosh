"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SliderInput } from "@/components/shared/SliderInput";
import { ResultCard } from "@/components/shared/ResultCard";
import { InfoTooltip } from "@/components/shared/InfoTooltip";
import { calculateSIP } from "@/lib/calculators";
import { formatCurrency } from "@/lib/constants";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export function SIPCalculator() {
  const [monthly, setMonthly] = useState(10000);
  const [returnRate, setReturnRate] = useState(12);
  const [years, setYears] = useState(10);
  const [stepUp, setStepUp] = useState(false);
  const [stepUpRate, setStepUpRate] = useState(10);

  const result = calculateSIP(monthly, returnRate, years, stepUp ? stepUpRate : 0);

  const chartData = result.monthlyData.filter(
    (_, i) => i % Math.max(1, Math.floor(result.monthlyData.length / 30)) === 0 ||
      i === result.monthlyData.length - 1
  );

  const earlyStart = calculateSIP(monthly, returnRate, years + 2, stepUp ? stepUpRate : 0);
  const earlyBenefit = earlyStart.maturityAmount - result.maturityAmount;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">SIP Calculator</h1>
        <p className="text-sm text-muted-foreground">
          Calculate returns on your Systematic Investment Plan
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Inputs */}
        <Card className="p-6 lg:col-span-2 space-y-6">
          <SliderInput
            label="Monthly Investment"
            value={monthly}
            onChange={setMonthly}
            min={500}
            max={100000}
            step={500}
            prefix="₹"
          />
          <SliderInput
            label="Expected Annual Return"
            value={returnRate}
            onChange={setReturnRate}
            min={1}
            max={30}
            step={0.5}
            suffix="%"
          />
          <SliderInput
            label="Time Period"
            value={years}
            onChange={setYears}
            min={1}
            max={40}
            suffix=" years"
          />

          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <div className="flex items-center gap-2">
              <Label htmlFor="step-up" className="text-sm font-medium cursor-pointer">
                Step-Up SIP
              </Label>
              <InfoTooltip content="Increase your SIP amount annually to match salary growth. A 10% step-up means your ₹10K SIP becomes ₹11K next year." />
            </div>
            <Switch id="step-up" checked={stepUp} onCheckedChange={setStepUp} />
          </div>

          {stepUp && (
            <SliderInput
              label="Annual Step-Up Rate"
              value={stepUpRate}
              onChange={setStepUpRate}
              min={5}
              max={25}
              step={1}
              suffix="%"
            />
          )}
        </Card>

        {/* Results */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Invested" value={result.totalInvested} />
            <ResultCard label="Returns" value={result.wealthGained} highlight />
            <ResultCard label="Total Value" value={result.maturityAmount} />
          </div>

          <Card className="p-6">
            <h3 className="text-sm font-semibold mb-4">Growth Over Time</h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                  <defs>
                    <linearGradient id="sipValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="sipInvested" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6B7280" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#6B7280" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.5} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickFormatter={(m: number) => `${Math.round(m / 12)}y`} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} tickFormatter={(v: number) => v >= 100000 ? `${(v / 100000).toFixed(0)}L` : `${(v / 1000).toFixed(0)}K`} axisLine={false} tickLine={false} width={45} />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }} formatter={(v: any) => [formatCurrency(Number(v))]} labelFormatter={(m: any) => `Year ${Math.round(Number(m) / 12)}`} />
                  <Area type="monotone" dataKey="value" stroke="#059669" strokeWidth={2} fill="url(#sipValue)" name="Portfolio Value" />
                  <Area type="monotone" dataKey="invested" stroke="#6B7280" strokeWidth={1.5} fill="url(#sipInvested)" name="Total Invested" strokeDasharray="4 4" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Insight */}
          <Card className="p-4 bg-accent/30 border-border/30">
            <p className="text-sm leading-relaxed">
              <span className="font-semibold">💡 Insight:</span>{" "}
              Starting 2 years earlier with the same SIP would give you{" "}
              <span className="font-bold text-emerald">{formatCurrency(earlyBenefit)}</span> more.
              Time is your biggest asset in investing.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
