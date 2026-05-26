"use client";

import React from "react";
import { motion } from "framer-motion";
import { OnboardingFinancialReality } from "@/types/onboarding";

interface RealityStepProps {
  value: OnboardingFinancialReality;
  onChange: (val: OnboardingFinancialReality) => void;
}

export function RealityStep({ value, onChange }: RealityStepProps) {
  const updateMetric = (key: keyof OnboardingFinancialReality, val: any) => {
    onChange({
      ...value,
      [key]: val
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 max-w-2xl mx-auto px-4"
    >
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-2">
          Your Financial Reality
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm max-w-md mx-auto">
          Provide rough ranges to help us tailor tool templates. These values are completely private and you can skip or adjust them later.
        </p>
      </div>

      <div className="space-y-5">
        {/* Income Range */}
        <div className="space-y-2">
          <label className="text-xs uppercase font-bold text-muted-foreground tracking-wider">
            Approximate Monthly Income
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { label: "< ₹25K", val: "below-25k" },
              { label: "₹25K–50K", val: "25k-50k" },
              { label: "₹50K–1L", val: "50k-1l" },
              { label: "₹1L–2L", val: "1l-2l" },
              { label: "₹2L+", val: "above-2l" }
            ].map((opt) => (
              <button
                key={opt.val}
                type="button"
                onClick={() => updateMetric("incomeRange", opt.val)}
                className={`px-3 py-2 text-xs rounded-xl border font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-sm active:scale-[0.98] cursor-pointer ${
                  value.incomeRange === opt.val
                    ? "border-violet bg-violet/5 text-foreground ring-2 ring-violet"
                    : "border-border/50 hover:border-violet/40 text-muted-foreground hover:text-foreground bg-accent/25"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Expense Pressure */}
        <div className="space-y-2">
          <label className="text-xs uppercase font-bold text-muted-foreground tracking-wider">
            Monthly Expense Pressure
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { label: "Low (Plenty of savings surplus)", val: "low" },
              { label: "Medium (Comfortable surplus, regular buys)", val: "medium" },
              { label: "High (Barely scraping by, tight margins)", val: "high" }
            ].map((opt) => (
              <button
                key={opt.val}
                type="button"
                onClick={() => updateMetric("expensePressure", opt.val as any)}
                className={`p-3 text-xs rounded-xl border text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-sm active:scale-[0.98] cursor-pointer ${
                  value.expensePressure === opt.val
                    ? "border-violet bg-violet/5 text-foreground ring-2 ring-violet"
                    : "border-border/50 hover:border-violet/40 text-muted-foreground hover:text-foreground bg-accent/25"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Savings Consistency */}
        <div className="space-y-2">
          <label className="text-xs uppercase font-bold text-muted-foreground tracking-wider">
            Savings Habit
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { label: "Save regularly every month", val: "regular" },
              { label: "Save occasionally when possible", val: "occasional" },
              { label: "No current savings habit", val: "none" }
            ].map((opt) => (
              <button
                key={opt.val}
                type="button"
                onClick={() => updateMetric("savingsRate", opt.val as any)}
                className={`p-3 text-xs rounded-xl border text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-sm active:scale-[0.98] cursor-pointer ${
                  value.savingsRate === opt.val
                    ? "border-violet bg-violet/5 text-foreground ring-2 ring-violet"
                    : "border-border/50 hover:border-violet/40 text-muted-foreground hover:text-foreground bg-accent/25"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Debt Obligations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold text-muted-foreground tracking-wider block">
              Active Debt or EMIs?
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  updateMetric("hasDebt", true);
                  updateMetric("debtType", "home-personal");
                }}
                className={`flex-1 py-2 text-xs rounded-xl border font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-sm active:scale-[0.98] cursor-pointer ${
                  value.hasDebt
                    ? "border-rose-500 bg-rose-500/[0.03] text-foreground ring-2 ring-rose-500"
                    : "border-border/50 hover:border-rose-500/40 text-muted-foreground hover:text-foreground bg-accent/25"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => {
                  updateMetric("hasDebt", false);
                  updateMetric("debtType", "none");
                }}
                className={`flex-1 py-2 text-xs rounded-xl border font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-sm active:scale-[0.98] cursor-pointer ${
                  !value.hasDebt
                    ? "border-emerald bg-emerald/[0.03] text-foreground ring-2 ring-emerald"
                    : "border-border/50 hover:border-emerald/40 text-muted-foreground hover:text-foreground bg-accent/25"
                }`}
              >
                No Debt
              </button>
            </div>
          </div>

          {value.hasDebt && (
            <div className="space-y-2">
              <label className="text-xs uppercase font-bold text-muted-foreground tracking-wider block">
                Primary Debt Category
              </label>
              <select
                value={value.debtType}
                onChange={(e) => updateMetric("debtType", e.target.value)}
                className="w-full bg-accent/25 border border-border/50 text-xs h-9 rounded-xl px-2 text-foreground focus:outline-none focus:ring-1 focus:ring-violet cursor-pointer hover:border-violet/40 transition-colors"
              >
                <option value="credit-card">Credit Card balances</option>
                <option value="student">Student / Education loan</option>
                <option value="home-personal">Home / Car / Personal EMI</option>
              </select>
            </div>
          )}
        </div>

        {/* Dependents */}
        <div className="space-y-2">
          <label className="text-xs uppercase font-bold text-muted-foreground tracking-wider block">
            How many family members rely on your income?
          </label>
          <div className="flex gap-2 max-w-xs">
            {[0, 1, 2, 3].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => updateMetric("dependents", num)}
                className={`flex-1 py-2 text-xs rounded-xl border font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-sm active:scale-[0.98] cursor-pointer ${
                  value.dependents === num
                    ? "border-violet bg-violet/5 text-foreground ring-2 ring-violet"
                    : "border-border/50 hover:border-violet/40 text-muted-foreground hover:text-foreground bg-accent/25"
                }`}
              >
                {num === 3 ? "3+" : num}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
