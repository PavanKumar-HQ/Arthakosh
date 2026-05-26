"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SliderInput } from "@/components/shared/SliderInput";
import { ResultCard } from "@/components/shared/ResultCard";
import { calculateInflationAdjusted } from "@/lib/calculators";
import { formatCurrency } from "@/lib/constants";

export function InflationCalculator() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(10);

  const futureValue = calculateInflationAdjusted(amount, years, rate);
  const purchasingPower = Math.round(amount / Math.pow(1 + rate / 100, years));

  const milestones = [5, 10, 15, 20, 25].map((y) => ({
    year: y,
    value: calculateInflationAdjusted(amount, y, rate),
    ratio: (calculateInflationAdjusted(amount, y, rate) / amount).toFixed(1),
  }));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Inflation Calculator</h1>
        <p className="text-sm text-muted-foreground">See how inflation silently erodes your money&apos;s value</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="p-6 lg:col-span-2 space-y-6">
          <SliderInput label="Current Amount" value={amount} onChange={setAmount} min={10000} max={10000000} step={10000} prefix="₹" />
          <SliderInput label="Expected Inflation Rate" value={rate} onChange={setRate} min={2} max={12} step={0.5} suffix="% p.a." />
          <SliderInput label="Time Period" value={years} onChange={setYears} min={1} max={30} suffix=" years" />
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <ResultCard
              label="Future Cost"
              value={futureValue}
              subtitle={`What ${formatCurrency(amount)} will cost in ${years} years`}
            />
            <ResultCard
              label="Purchasing Power"
              value={purchasingPower}
              subtitle={`What ${formatCurrency(amount)} will feel like`}
            />
          </div>

          <Card className="p-6">
            <h3 className="text-sm font-semibold mb-4">Inflation Impact Over Time</h3>
            <div className="space-y-3">
              {milestones.map((m) => (
                <div key={m.year} className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground w-16">In {m.year} years</span>
                  <div className="flex-1 h-6 bg-secondary rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-rose/60 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (m.value / milestones[milestones.length - 1].value) * 100)}%` }}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold font-tabular">
                      {formatCurrency(m.value)}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground w-12 text-right">{m.ratio}×</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 bg-accent/30 border-border/30">
            <p className="text-sm leading-relaxed">
              <span className="font-semibold">💡 Reality check:</span>{" "}
              Your {formatCurrency(amount)} today will need to be{" "}
              <span className="font-bold">{formatCurrency(futureValue)}</span> in {years} years just to buy the same things.
              If your savings earn less than {rate}%, you&apos;re actually losing money.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
