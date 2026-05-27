"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { AnimatedSection, StaggerChildren, StaggerItem } from "@/components/shared/AnimatedSection";
import { formatCurrency } from "@/lib/constants";
import { TrendingUp, AlertTriangle, Activity, ChevronDown, ChevronUp } from "lucide-react";

// ─── Engine ─────────────────────────────────────────────────────────────────

function computeSIP(monthly: number, years: number, annualReturn: number, behaviorMultiplier: number) {
  const r = annualReturn / 12;
  let corpus = 0;
  for (let m = 0; m < years * 12; m++) {
    corpus = (corpus + monthly * behaviorMultiplier) * (1 + r);
  }
  return corpus;
}

function lumpSumCompound(amount: number, years: number, annualReturn: number) {
  return amount * Math.pow(1 + annualReturn, years);
}

function inflationAdjust(value: number, years: number, inflation = 0.06) {
  return value / Math.pow(1 + inflation, years);
}

// ─── Constants ───────────────────────────────────────────────────────────────

const BEHAVIORS = [
  {
    id: "disciplined",
    label: "Disciplined SIP",
    description: "Invests fixed amount every month, never misses, never withdraws early. Benchmark behavior.",
    multiplier: 1.0,
    color: "text-green-600",
    tag: "Optimal",
    tagColor: "bg-green-50 text-green-700",
  },
  {
    id: "panic_seller",
    label: "Panic Seller",
    description: "Stops SIP and liquidates portfolio on every 15%+ drawdown. Re-enters when market recovers. Misses 28% of gains historically.",
    multiplier: 0.72,
    color: "text-red-500",
    tag: "Destructive",
    tagColor: "bg-red-50 text-red-700",
  },
  {
    id: "irregular",
    label: "Irregular Investor",
    description: "Invests when convenient — skips 3-4 months a year during lifestyle expenses. 80% consistency.",
    multiplier: 0.80,
    color: "text-orange-500",
    tag: "Common",
    tagColor: "bg-orange-50 text-orange-700",
  },
  {
    id: "lump_sum",
    label: "Annual Lump Sum",
    description: "Saves cash for 12 months then invests once. Misses rupee cost averaging benefits (~6% drag vs SIP).",
    multiplier: 0.94,
    color: "text-amber-600",
    tag: "Suboptimal",
    tagColor: "bg-amber-50 text-amber-700",
  },
];

const INDICES = [
  { id: "nifty50", label: "Nifty 50", return: 0.12, volatility: "High", risk: "Equity" },
  { id: "nifty500", label: "Nifty 500 (Multicap)", return: 0.13, volatility: "High", risk: "Equity" },
  { id: "gilt", label: "Gilt / G-Sec", return: 0.072, volatility: "Low", risk: "Debt" },
  { id: "hybrid", label: "Balanced Hybrid (60/40)", return: 0.096, volatility: "Medium", risk: "Hybrid" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function InvestingDashboard() {
  const [monthly, setMonthly] = useState(15000);
  const [years, setYears] = useState(20);
  const [selectedIndex, setSelectedIndex] = useState("nifty50");
  const [showAllBehaviors, setShowAllBehaviors] = useState(false);
  const [selectedBehavior, setSelectedBehavior] = useState("disciplined");

  const index = INDICES.find((i) => i.id === selectedIndex)!;
  const behavior = BEHAVIORS.find((b) => b.id === selectedBehavior)!;

  const baseCorpus = computeSIP(monthly, years, index.return, 1.0);
  const behaviorCorpus = computeSIP(monthly, years, index.return, behavior.multiplier);
  const invested = monthly * 12 * years;
  const behaviorCost = baseCorpus - behaviorCorpus;
  const realCorpus = inflationAdjust(behaviorCorpus, years); // Inflation-adjusted
  const xirrApprox = (Math.pow(behaviorCorpus / invested, 1 / years) - 1) * 100;

  const disciplinedCorpus = computeSIP(monthly, years, index.return, 1.0);

  return (
    <div className="container-page py-8 sm:py-12">
      <AnimatedSection>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-green-600" />
            Investing Behavior Simulator
          </h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Investor behavior accounts for up to 40% of the variance in long-term wealth creation. This simulator quantifies the exact rupee cost of your behavioral patterns against a disciplined SIP baseline.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* Left: Controls */}
          <div className="xl:col-span-1 space-y-6">

            {/* Index Selector */}
            <Card className="p-5 border-border/50 bg-surface">
              <h3 className="font-semibold text-sm mb-4">Asset Class</h3>
              <div className="space-y-2">
                {INDICES.map((idx) => (
                  <button
                    key={idx.id}
                    onClick={() => setSelectedIndex(idx.id)}
                    className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                      selectedIndex === idx.id
                        ? "border-foreground bg-foreground/5 font-semibold"
                        : "border-border/50 hover:border-border"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{idx.label}</span>
                      <span className="font-tabular text-xs text-muted-foreground">
                        ~{(idx.return * 100).toFixed(1)}% p.a.
                      </span>
                    </div>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] text-muted-foreground">{idx.risk}</span>
                      <span className="text-[10px] text-muted-foreground">·</span>
                      <span className="text-[10px] text-muted-foreground">{idx.volatility} volatility</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* SIP & Horizon */}
            <Card className="p-5 border-border/50 bg-surface space-y-5">
              <h3 className="font-semibold text-sm">Parameters</h3>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-muted-foreground">Monthly SIP</span>
                  <span className="font-tabular font-bold">{formatCurrency(monthly)}</span>
                </div>
                <input
                  type="range" min="1000" max="150000" step="500"
                  value={monthly}
                  onChange={(e) => setMonthly(Number(e.target.value))}
                  className="w-full accent-green-600"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-muted-foreground">Horizon</span>
                  <span className="font-tabular font-bold">{years} years</span>
                </div>
                <input
                  type="range" min="3" max="40" step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-green-600"
                />
              </div>
            </Card>
          </div>

          {/* Right: Results */}
          <div className="xl:col-span-2 space-y-6">

            {/* KPI Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card className="p-4 border-border/50">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Total Invested</p>
                <p className="text-xl font-bold font-tabular">{formatCurrency(invested)}</p>
              </Card>
              <Card className="p-4 border-green-500/30 bg-green-500/5">
                <p className="text-[10px] uppercase tracking-wider text-green-600 font-semibold mb-1">Gross Corpus</p>
                <p className="text-xl font-bold font-tabular text-green-600">{formatCurrency(behaviorCorpus)}</p>
              </Card>
              <Card className="p-4 border-border/50">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Real Value (6% CPI)</p>
                <p className="text-xl font-bold font-tabular">{formatCurrency(realCorpus)}</p>
              </Card>
              <Card className={`p-4 ${behaviorCost > 0 ? "border-red-400/30 bg-red-500/5" : "border-border/50"}`}>
                <p className="text-[10px] uppercase tracking-wider text-red-500 font-semibold mb-1">
                  {behaviorCost > 0 ? "Behavior Cost" : "Behavior Alpha"}
                </p>
                <p className="text-xl font-bold font-tabular text-red-500">
                  {behaviorCost > 0 ? "-" : "+"}{formatCurrency(Math.abs(behaviorCost))}
                </p>
              </Card>
            </div>

            {/* Behavior Selector */}
            <Card className="p-5 border-border/50 bg-surface">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">Investor Behavior Profile</h3>
                <button
                  onClick={() => setShowAllBehaviors(!showAllBehaviors)}
                  className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  {showAllBehaviors ? "Collapse" : "Compare All"}
                  {showAllBehaviors ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="space-y-2">
                {BEHAVIORS.map((b) => {
                  const corpus = computeSIP(monthly, years, index.return, b.multiplier);
                  const cost = disciplinedCorpus - corpus;
                  return (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBehavior(b.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selectedBehavior === b.id
                          ? "border-foreground bg-foreground/5"
                          : "border-border/50 hover:border-border"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`font-semibold text-sm ${b.color}`}>{b.label}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${b.tagColor}`}>
                              {b.tag}
                            </span>
                          </div>
                          {(showAllBehaviors || selectedBehavior === b.id) && (
                            <p className="text-xs text-muted-foreground leading-relaxed">{b.description}</p>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-tabular font-bold text-sm">{formatCurrency(corpus)}</p>
                          {cost > 0 && (
                            <p className="text-[10px] text-red-500 font-medium">-{formatCurrency(cost)} vs optimal</p>
                          )}
                          {cost <= 0 && (
                            <p className="text-[10px] text-green-600 font-medium">Optimal baseline</p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Compounding waterfall */}
            <Card className="p-5 border-border/50 bg-surface">
              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-muted-foreground" />
                Wealth Composition
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Capital Deployed", value: invested, pct: (invested / behaviorCorpus) * 100, color: "bg-zinc-300" },
                  { label: "Market Returns (Gross)", value: Math.max(0, behaviorCorpus - invested), pct: (Math.max(0, behaviorCorpus - invested) / behaviorCorpus) * 100, color: "bg-green-500" },
                  { label: "Behavior Cost (Lost)", value: behaviorCost, pct: (behaviorCost / behaviorCorpus) * 100, color: "bg-red-400" },
                  { label: "Inflation Erosion (6% CPI)", value: Math.max(0, behaviorCorpus - realCorpus), pct: (Math.max(0, behaviorCorpus - realCorpus) / behaviorCorpus) * 100, color: "bg-orange-400" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-tabular font-medium">{formatCurrency(item.value)}</span>
                    </div>
                    <div className="h-2 w-full bg-accent rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} transition-all duration-700 rounded-full`}
                        style={{ width: `${Math.min(100, Math.max(0, item.pct))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-border/50 flex items-center gap-2 text-xs text-amber-600">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                Returns are based on historical Nifty 50 averages. Past performance does not guarantee future results.
              </div>
            </Card>

          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
