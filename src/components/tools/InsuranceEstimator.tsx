"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SliderInput } from "@/components/shared/SliderInput";
import { ResultCard } from "@/components/shared/ResultCard";
import { calculateInsurance } from "@/lib/calculators";
import { formatCurrency } from "@/lib/constants";

interface InsuranceEstimatorProps {
  hideHeader?: boolean;
}

export function InsuranceEstimator({ hideHeader = false }: InsuranceEstimatorProps = {}) {
  const [age, setAge] = useState(28);
  const [income, setIncome] = useState(800000);
  const [dependents, setDependents] = useState(2);
  const [existingCover, setExistingCover] = useState(0);

  const result = calculateInsurance(age, income, dependents, existingCover);

  return (
    <div>
      {!hideHeader && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight mb-1">Insurance Estimator</h1>
          <p className="text-sm text-muted-foreground">Calculate recommended life and health insurance coverage</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="p-6 lg:col-span-2 space-y-6">
          <SliderInput label="Your Age" value={age} onChange={setAge} min={18} max={65} suffix=" years" />
          <SliderInput label="Annual Income" value={income} onChange={setIncome} min={200000} max={5000000} step={100000} prefix="₹" />
          <SliderInput label="Dependents" value={dependents} onChange={setDependents} min={0} max={6} suffix={dependents === 1 ? " person" : " people"} />
          <SliderInput label="Existing Life Cover" value={existingCover} onChange={setExistingCover} min={0} max={50000000} step={500000} prefix="₹" />
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="Recommended Life Cover" value={result.recommendedLife} highlight />
            <ResultCard label="Recommended Health Cover" value={result.recommendedHealth} />
          </div>

          {result.gap > 0 && (
            <Card className="p-5 border-amber/30 bg-amber/5">
              <h3 className="text-sm font-semibold text-amber mb-2">Coverage Gap</h3>
              <p className="text-2xl font-bold font-tabular mb-2">{formatCurrency(result.gap)}</p>
              <p className="text-sm text-muted-foreground">
                You need {formatCurrency(result.gap)} more in life insurance to adequately protect your family.
              </p>
            </Card>
          )}

          <Card className="p-5">
            <h3 className="text-sm font-semibold mb-3">Our Reasoning</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{result.reasoning}</p>
          </Card>

          <Card className="p-4 bg-accent/30 border-border/30">
            <p className="text-sm leading-relaxed">
              <span className="font-semibold">💡 What to buy:</span>{" "}
              Get a <strong>pure term plan</strong> for life insurance (cheapest per crore).
              For health, get a <strong>family floater</strong> with top-up.
              Avoid ULIPs, endowment plans, and money-back policies — they mix insurance with investment poorly.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
