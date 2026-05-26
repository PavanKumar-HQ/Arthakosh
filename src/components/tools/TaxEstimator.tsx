"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SliderInput } from "@/components/shared/SliderInput";
import { ResultCard } from "@/components/shared/ResultCard";
import { CurrencyInput } from "@/components/shared/CurrencyInput";
import { calculateTax } from "@/lib/calculators";
import { formatCurrency, formatPercentage } from "@/lib/constants";
import type { TaxInput } from "@/types";

export function TaxEstimator() {
  const [income, setIncome] = useState(1200000);
  const [deductions, setDeductions] = useState({
    section80C: 150000,
    section80D: 25000,
    hra: 0,
    lta: 0,
    homeLoanInterest: 0,
    nps: 50000,
    otherDeductions: 0,
  });

  const newRegime = calculateTax({ annualIncome: income, regime: "new", deductions });
  const oldRegime = calculateTax({ annualIncome: income, regime: "old", deductions });
  const betterRegime = newRegime.totalTax <= oldRegime.totalTax ? "new" : "old";
  const savings = Math.abs(newRegime.totalTax - oldRegime.totalTax);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Tax Estimator</h1>
        <p className="text-sm text-muted-foreground">Compare Old vs New regime — find what saves you more</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="p-6 lg:col-span-2 space-y-5">
          <SliderInput label="Annual Income (CTC)" value={income} onChange={setIncome} min={300000} max={5000000} step={50000} prefix="₹" />

          <div className="border-t border-border/30 pt-4">
            <h4 className="text-sm font-semibold mb-3">Deductions (Old Regime)</h4>
            <div className="space-y-4">
              <CurrencyInput label="Section 80C (PPF, ELSS, etc.)" value={deductions.section80C} onChange={(v) => setDeductions((d) => ({ ...d, section80C: v }))} max={150000} />
              <CurrencyInput label="Section 80D (Health Insurance)" value={deductions.section80D} onChange={(v) => setDeductions((d) => ({ ...d, section80D: v }))} max={75000} />
              <CurrencyInput label="NPS (Section 80CCD)" value={deductions.nps} onChange={(v) => setDeductions((d) => ({ ...d, nps: v }))} max={50000} />
              <CurrencyInput label="HRA Exemption" value={deductions.hra} onChange={(v) => setDeductions((d) => ({ ...d, hra: v }))} max={500000} />
              <CurrencyInput label="Home Loan Interest (Sec 24)" value={deductions.homeLoanInterest} onChange={(v) => setDeductions((d) => ({ ...d, homeLoanInterest: v }))} max={200000} />
            </div>
          </div>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          {/* Regime Comparison */}
          <div className="grid grid-cols-2 gap-4">
            <Card className={`p-5 ${betterRegime === "new" ? "ring-2 ring-emerald" : ""}`}>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-semibold">New Regime</h3>
                {betterRegime === "new" && <Badge className="bg-emerald/10 text-emerald border-emerald/30 text-xs">Better ✓</Badge>}
              </div>
              <p className="text-2xl font-bold font-tabular">{formatCurrency(newRegime.totalTax)}</p>
              <p className="text-xs text-muted-foreground mt-1">Effective rate: {formatPercentage(newRegime.effectiveRate)}</p>
              <div className="mt-4 space-y-1">
                {newRegime.slabBreakdown.map((slab, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{slab.slab}</span>
                    <span className="font-tabular">{formatCurrency(slab.tax)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-xs pt-1 border-t border-border/30">
                  <span className="text-muted-foreground">Cess (4%)</span>
                  <span className="font-tabular">{formatCurrency(newRegime.cess)}</span>
                </div>
              </div>
            </Card>

            <Card className={`p-5 ${betterRegime === "old" ? "ring-2 ring-emerald" : ""}`}>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-semibold">Old Regime</h3>
                {betterRegime === "old" && <Badge className="bg-emerald/10 text-emerald border-emerald/30 text-xs">Better ✓</Badge>}
              </div>
              <p className="text-2xl font-bold font-tabular">{formatCurrency(oldRegime.totalTax)}</p>
              <p className="text-xs text-muted-foreground mt-1">Effective rate: {formatPercentage(oldRegime.effectiveRate)}</p>
              <div className="mt-4 space-y-1">
                {oldRegime.slabBreakdown.map((slab, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{slab.slab}</span>
                    <span className="font-tabular">{formatCurrency(slab.tax)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-xs pt-1 border-t border-border/30">
                  <span className="text-muted-foreground">Cess (4%)</span>
                  <span className="font-tabular">{formatCurrency(oldRegime.cess)}</span>
                </div>
              </div>
            </Card>
          </div>

          {savings > 0 && (
            <Card className="p-4 bg-emerald/5 border-emerald/20">
              <p className="text-sm leading-relaxed">
                <span className="font-semibold text-emerald">
                  You save {formatCurrency(savings)}
                </span>{" "}
                by choosing the <span className="font-semibold">{betterRegime === "new" ? "New" : "Old"} Regime</span>.
                {betterRegime === "new"
                  ? " The new regime works better when you don't have significant deductions (80C, HRA, home loan)."
                  : " The old regime benefits you because your deductions exceed the standard deduction benefit of the new regime."}
              </p>
            </Card>
          )}

          <Card className="p-4 bg-accent/30 border-border/30">
            <p className="text-sm leading-relaxed">
              <span className="font-semibold">💡 Tip:</span>{" "}
              If your total deductions (80C + 80D + HRA + NPS) exceed ₹3.75L, the old regime usually wins.
              Below that, the new regime&apos;s higher exemption limit and lower slab rates are better.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
