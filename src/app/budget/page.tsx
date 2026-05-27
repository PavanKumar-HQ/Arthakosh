"use client";

import { useState } from "react";
import { useBudgetStore } from "@/lib/store/budget";
import { Card } from "@/components/ui/card";
import { AnimatedSection, StaggerChildren, StaggerItem } from "@/components/shared/AnimatedSection";
import { formatCurrency } from "@/lib/constants";
import { Wallet, Plus, Trash2, AlertTriangle, CheckCircle2, TrendingDown } from "lucide-react";

// ─── Finance Logic ────────────────────────────────────────────────────────────

function classifyHealth(savingsRate: number) {
  if (savingsRate >= 30) return { label: "Excellent", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" };
  if (savingsRate >= 20) return { label: "Healthy", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" };
  if (savingsRate >= 10) return { label: "Marginal", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" };
  return { label: "Critical", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
}

const CATEGORIES = [
  { id: "housing", label: "Housing", benchmark: 30 },
  { id: "food", label: "Food", benchmark: 15 },
  { id: "transportation", label: "Transport", benchmark: 10 },
  { id: "utilities", label: "Utilities", benchmark: 5 },
  { id: "debt", label: "Debt / EMI", benchmark: 15 },
  { id: "lifestyle", label: "Lifestyle", benchmark: 10 },
  { id: "other", label: "Other", benchmark: 5 },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function BudgetDashboard() {
  const { incomes, expenses, addExpense, removeExpense } = useBudgetStore();
  const [squeezePct, setSqueezePct] = useState(0);
  const [stressMultiplier, setStressMultiplier] = useState(0); // 0 = none, 1 = max
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExp, setNewExp] = useState({ name: "", amount: "", category: "lifestyle", isFixed: false });

  // Income
  const grossMonthly = incomes.reduce((sum, i) => {
    return sum + (i.frequency === "monthly" ? i.amount : i.amount / 12);
  }, 0);

  // Stress injection: adds a random unexpected expense
  const stressExpense = stressMultiplier * grossMonthly * 0.2; // up to 20% income shock

  // Expenses
  const fixedTotal = expenses.filter((e) => e.isFixed).reduce((s, e) => s + e.amount, 0);
  const varBase = expenses.filter((e) => !e.isFixed).reduce((s, e) => s + e.amount, 0);
  const varSqueezed = varBase * (1 - squeezePct / 100);
  const totalExpenses = fixedTotal + varSqueezed + stressExpense;
  const freeCashflow = grossMonthly - totalExpenses;
  const savingsRate = grossMonthly > 0 ? (freeCashflow / grossMonthly) * 100 : 0;
  const health = classifyHealth(savingsRate);

  // 50/30/20 analysis
  const needsPct = grossMonthly > 0 ? (fixedTotal / grossMonthly) * 100 : 0;
  const wantsPct = grossMonthly > 0 ? (varSqueezed / grossMonthly) * 100 : 0;
  const savePct = Math.max(0, savingsRate);

  // Category breakdown
  const byCategory = CATEGORIES.map((cat) => {
    const total = expenses.filter((e) => e.category === cat.id).reduce((s, e) => s + e.amount, 0);
    const pct = grossMonthly > 0 ? (total / grossMonthly) * 100 : 0;
    const over = pct > cat.benchmark;
    return { ...cat, total, pct, over };
  });

  const handleAdd = () => {
    if (!newExp.name || !newExp.amount) return;
    addExpense({
      name: newExp.name,
      amount: parseFloat(newExp.amount),
      category: newExp.category as any,
      isFixed: newExp.isFixed,
    });
    setNewExp({ name: "", amount: "", category: "lifestyle", isFixed: false });
    setShowAddExpense(false);
  };

  return (
    <div className="container-page py-8 sm:py-12">
      <AnimatedSection>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">
              <Wallet className="w-7 h-7 text-violet-500" />
              Cashflow Intelligence
            </h1>
            <p className="text-muted-foreground text-sm">
              Zero-based budget analysis with lifestyle squeeze and stress injection.
            </p>
          </div>
          <button
            onClick={() => setShowAddExpense(!showAddExpense)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Expense
          </button>
        </div>

        {/* Add Expense Form */}
        {showAddExpense && (
          <Card className="p-5 mb-6 border-border bg-surface">
            <h3 className="font-semibold text-sm mb-4">New Expense</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <input
                placeholder="Name (e.g. Netflix)"
                value={newExp.name}
                onChange={(e) => setNewExp((p) => ({ ...p, name: e.target.value }))}
                className="col-span-2 md:col-span-1 px-3 py-2 text-sm border border-border rounded-lg bg-background"
              />
              <input
                placeholder="Amount (₹)"
                type="number"
                value={newExp.amount}
                onChange={(e) => setNewExp((p) => ({ ...p, amount: e.target.value }))}
                className="px-3 py-2 text-sm border border-border rounded-lg bg-background"
              />
              <select
                value={newExp.category}
                onChange={(e) => setNewExp((p) => ({ ...p, category: e.target.value }))}
                className="px-3 py-2 text-sm border border-border rounded-lg bg-background"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newExp.isFixed}
                    onChange={(e) => setNewExp((p) => ({ ...p, isFixed: e.target.checked }))}
                    className="accent-foreground"
                  />
                  Fixed
                </label>
                <button onClick={handleAdd} className="px-4 py-2 bg-foreground text-background text-sm font-semibold rounded-lg hover:opacity-90">
                  Add
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 border-border/50">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Gross Income</p>
            <p className="text-2xl font-bold font-tabular">{formatCurrency(grossMonthly)}</p>
          </Card>
          <Card className="p-4 border-border/50">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Total Outflow</p>
            <p className="text-2xl font-bold font-tabular text-red-500">{formatCurrency(totalExpenses)}</p>
          </Card>
          <Card className="p-4 border-border/50">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Free Cashflow</p>
            <p className={`text-2xl font-bold font-tabular ${freeCashflow >= 0 ? "text-green-600" : "text-red-500"}`}>
              {freeCashflow >= 0 ? "" : "-"}{formatCurrency(Math.abs(freeCashflow))}
            </p>
          </Card>
          <Card className={`p-4 border ${health.border} ${health.bg}`}>
            <p className={`text-[10px] uppercase tracking-wider font-semibold mb-1 ${health.color}`}>Savings Rate</p>
            <p className={`text-2xl font-bold font-tabular ${health.color}`}>{savingsRate.toFixed(1)}%</p>
            <p className={`text-[10px] font-bold mt-0.5 ${health.color}`}>{health.label}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* Left: Tools */}
          <div className="space-y-6">

            {/* 50/30/20 */}
            <Card className="p-5 border-border/50 bg-surface">
              <h3 className="font-semibold text-sm mb-5">50/30/20 Allocation</h3>
              <div className="space-y-4">
                {[
                  { label: "Needs (Fixed)", pct: needsPct, target: 50, color: "bg-red-500" },
                  { label: "Wants (Variable)", pct: wantsPct, target: 30, color: "bg-orange-400" },
                  { label: "Savings", pct: savePct, target: 20, color: "bg-green-500" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className={`font-tabular font-bold ${item.pct > item.target * 1.15 ? "text-red-500" : ""}`}>
                        {item.pct.toFixed(1)}% <span className="text-muted-foreground font-normal">/ {item.target}%</span>
                      </span>
                    </div>
                    <div className="h-2 bg-accent rounded-full overflow-hidden relative">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${Math.min(100, item.pct)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Lifestyle Squeeze */}
            <Card className="p-5 border-violet-200 bg-violet-50/50">
              <h3 className="font-semibold text-sm mb-1">Lifestyle Squeeze Test</h3>
              <p className="text-xs text-muted-foreground mb-5">How much can you free up by cutting variable spending?</p>
              <input
                type="range" min="0" max="100" step="5"
                value={squeezePct}
                onChange={(e) => setSqueezePct(Number(e.target.value))}
                className="w-full accent-violet-600 mb-3"
              />
              <div className="flex justify-between text-xs text-muted-foreground mb-4">
                <span>No cut</span>
                <span className="font-bold text-violet-700">{squeezePct}% reduction</span>
                <span>Max</span>
              </div>
              {squeezePct > 0 && (
                <div className="p-3 bg-violet-100 rounded-lg border border-violet-200">
                  <p className="text-xs text-violet-700 font-medium">Extra cashflow generated:</p>
                  <p className="text-xl font-bold font-tabular text-violet-700">+{formatCurrency(varBase - varSqueezed)}</p>
                </div>
              )}
            </Card>

            {/* Stress Injection */}
            <Card className="p-5 border-red-200 bg-red-50/50">
              <h3 className="font-semibold text-sm mb-1 flex items-center gap-2 text-red-700">
                <TrendingDown className="w-4 h-4" />
                Unexpected Expense Shock
              </h3>
              <p className="text-xs text-muted-foreground mb-5">Inject a random emergency to test your resilience.</p>
              <input
                type="range" min="0" max="1" step="0.1"
                value={stressMultiplier}
                onChange={(e) => setStressMultiplier(Number(e.target.value))}
                className="w-full accent-red-500 mb-3"
              />
              <div className="flex justify-between text-xs text-muted-foreground mb-4">
                <span>None</span>
                <span className="font-bold text-red-600">{(stressMultiplier * 20).toFixed(0)}% income shock</span>
                <span>Max</span>
              </div>
              {stressMultiplier > 0 && (
                <div className="p-3 bg-red-100 rounded-lg border border-red-200">
                  <p className="text-xs text-red-700 font-medium">Unexpected expense injected:</p>
                  <p className="text-xl font-bold font-tabular text-red-700">+{formatCurrency(stressExpense)}</p>
                  <p className="text-xs text-red-600 mt-1">
                    {freeCashflow < 0 ? "⚠️ Deficit — you cannot absorb this shock." : "✓ You can absorb this. Emergency fund covers it."}
                  </p>
                </div>
              )}
            </Card>

          </div>

          {/* Right: Expense Table + Category Benchmarks */}
          <div className="xl:col-span-2 space-y-6">

            {/* Category Benchmark Analysis */}
            <Card className="p-5 border-border/50 bg-surface">
              <h3 className="font-semibold text-sm mb-5">Category Benchmark Analysis</h3>
              <div className="divide-y divide-border/40">
                {byCategory.filter((c) => c.total > 0).map((cat) => (
                  <div key={cat.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      {cat.over ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      )}
                      <span className="text-sm font-medium truncate">{cat.label}</span>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 text-right">
                      <span className="font-tabular text-sm">{formatCurrency(cat.total)}</span>
                      <span className={`text-xs font-bold w-16 text-right ${cat.over ? "text-red-500" : "text-green-600"}`}>
                        {cat.pct.toFixed(1)}% <span className="text-muted-foreground font-normal">/ {cat.benchmark}%</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Expenses Table */}
            <Card className="p-5 border-border/50 bg-surface">
              <h3 className="font-semibold text-sm mb-5">Liability Register</h3>
              <div className="space-y-1">
                <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <span>Name</span>
                  <span>Category</span>
                  <span>Type</span>
                  <span className="text-right">Amount</span>
                </div>
                <StaggerChildren className="space-y-1">
                  {expenses.map((exp) => (
                    <StaggerItem key={exp.id}>
                      <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-2 py-2.5 rounded-lg hover:bg-accent/40 transition-colors items-center group">
                        <span className="text-sm font-medium truncate">{exp.name}</span>
                        <span className="text-xs text-muted-foreground capitalize">{exp.category}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${exp.isFixed ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"}`}>
                          {exp.isFixed ? "Fixed" : "Variable"}
                        </span>
                        <div className="flex items-center gap-2 justify-end">
                          <span className="font-tabular text-sm font-semibold">{formatCurrency(exp.amount)}</span>
                          <button
                            onClick={() => removeExpense(exp.id)}
                            className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </div>
            </Card>

          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
