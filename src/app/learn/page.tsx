"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection, StaggerChildren, StaggerItem } from "@/components/shared/AnimatedSection";
import { SliderInput } from "@/components/shared/SliderInput";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { formatCurrency } from "@/lib/constants";
import { calculateCreditScore } from "@/lib/calculators";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ArrowRight,
  PieChart,
  BarChart3,
  TrendingDown,
  Wallet,
  Shield,
  Clock,
  AlertTriangle,
  Zap,
  Info,
  TrendingUp,
  CheckCircle2,
  X,
} from "lucide-react";
import { ResponsiveContainer, PieChart as RPieChart, Pie, Cell, Tooltip, AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";

const simulators = [
  { id: "budget-allocator", title: "Budget Allocator", description: "Drag sliders to allocate your monthly income across categories. See how your split compares to recommendations.", category: "budgeting", icon: <PieChart className="w-5 h-5" />, color: "#059669", time: "5 min", status: "available" as const },
  { id: "credit-score", title: "Credit Score Simulator", description: "Adjust factors and see their impact on your CIBIL score in real-time.", category: "credit", icon: <BarChart3 className="w-5 h-5" />, color: "#2563EB", time: "5 min", status: "available" as const },
  { id: "debt-spiral", title: "Debt Spiral Simulator", description: "See how minimum payments and compound interest create a debt trap.", category: "debt", icon: <TrendingDown className="w-5 h-5" />, color: "#E11D48", time: "7 min", status: "available" as const },
  { id: "investment-allocation", title: "Investment Allocation", description: "Build a portfolio across asset classes and see historical performance.", category: "investing", icon: <Wallet className="w-5 h-5" />, color: "#7C3AED", time: "8 min", status: "available" as const },
  { id: "emergency-drill", title: "Emergency Spending Drill", description: "Simulate an unexpected expense and test your financial preparedness.", category: "emergency", icon: <Shield className="w-5 h-5" />, color: "#D97706", time: "5 min", status: "available" as const },
];

export default function LearnPage() {
  const [activeSimulator, setActiveSimulator] = useState<string | null>(null);

  return (
    <div className="container-page py-8 sm:py-12">
      <AnimatedSection className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Learn by Doing</h1>
        <p className="text-muted-foreground max-w-xl text-sm sm:text-base">
          Interactive simulators that teach financial concepts through experience — not lectures.
        </p>
      </AnimatedSection>

      <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {simulators.map((sim) => {
          const isSelected = activeSimulator === sim.id;
          return (
            <StaggerItem key={sim.id}>
              {sim.status === "available" ? (
                <button
                  onClick={() => setActiveSimulator(sim.id)}
                  className={`text-left w-full h-full flex flex-col justify-between p-5 rounded-xl border transition-all duration-200 hover:scale-[1.01] hover:shadow-md active:scale-[0.99] cursor-pointer group focus:outline-none focus:ring-2 focus:ring-violet focus:ring-offset-2 ${
                    isSelected
                      ? "ring-2 ring-violet border-violet bg-violet/[0.01]"
                      : "border-border/60 hover:border-violet/40"
                  }`}
                >
                  <div className="w-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${sim.color}15`, color: sim.color }}>
                        {sim.icon}
                      </div>
                      <div className="flex items-center gap-2">
                        {isSelected ? (
                          <Badge className="bg-violet text-white border-none shadow-sm text-[10px] shrink-0">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:border-violet/30 transition-opacity shrink-0">
                            Launch
                          </Badge>
                        )}
                        <span className="flex items-center gap-1 text-xs text-muted-foreground ml-1.5">
                          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                          {sim.time}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-sm font-bold mb-1 text-foreground">{sim.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{sim.description}</p>
                  </div>
                </button>
              ) : (
                <div className="p-5 h-full opacity-60 flex flex-col justify-between border border-border/40 bg-accent/10 rounded-xl">
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${sim.color}15`, color: sim.color }}>
                        {sim.icon}
                      </div>
                      <Badge variant="outline" className="text-xs">Coming Soon</Badge>
                    </div>
                    <h3 className="text-sm font-semibold mb-1 text-muted-foreground">{sim.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{sim.description}</p>
                  </div>
                </div>
              )}
            </StaggerItem>
          );
        })}
      </StaggerChildren>

      {/* Active simulator container */}
      {activeSimulator && (
        <div className="mt-12 pt-8 border-t border-border/45 relative animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">
              Simulator Workspace
            </h3>
            <button
              onClick={() => setActiveSimulator(null)}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/45 hover:bg-accent transition-colors cursor-pointer"
            >
              Close Simulator <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {activeSimulator === "budget-allocator" && <BudgetAllocator />}
          {activeSimulator === "credit-score" && <CreditScoreSimulator />}
          {activeSimulator === "debt-spiral" && <DebtSpiralSimulator />}
          {activeSimulator === "investment-allocation" && <InvestmentAllocationSimulator />}
          {activeSimulator === "emergency-drill" && <EmergencyDrillSimulator />}
        </div>
      )}
    </div>
  );
}

// --- Budget Allocator ---
function BudgetAllocator() {
  const [income, setIncome] = useState(50000);
  const [allocation, setAllocation] = useState({
    rent: 30,
    food: 15,
    transport: 5,
    insurance: 5,
    savings: 20,
    investment: 10,
    fun: 10,
    emi: 5,
  });

  const recommended = {
    rent: 30, food: 15, transport: 5, insurance: 10, savings: 15, investment: 15, fun: 5, emi: 5,
  };

  const categories = [
    { key: "rent", label: "Rent / Housing", color: "#2563EB" },
    { key: "food", label: "Food & Groceries", color: "#059669" },
    { key: "transport", label: "Transport", color: "#6B7280" },
    { key: "insurance", label: "Insurance", color: "#D97706" },
    { key: "savings", label: "Savings", color: "#7C3AED" },
    { key: "investment", label: "Investments", color: "#059669" },
    { key: "fun", label: "Lifestyle & Fun", color: "#E11D48" },
    { key: "emi", label: "EMI / Debt", color: "#EF4444" },
  ];

  const total = Object.values(allocation).reduce((a, b) => a + b, 0);
  const pieData = categories.map((c) => ({
    name: c.label,
    value: allocation[c.key as keyof typeof allocation],
    color: c.color,
  }));

  const updateAllocation = (key: string, value: number) => {
    setAllocation((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AnimatedSection>
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-1">Budget Allocator</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Allocate your ₹{income.toLocaleString("en-IN")} monthly income. Aim for 100%.
        </p>

        <SliderInput label="Monthly Income" value={income} onChange={setIncome} min={15000} max={300000} step={5000} prefix="₹" className="mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.key}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-sm font-medium">{cat.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Rec: {recommended[cat.key as keyof typeof recommended]}%</span>
                    <span className="text-sm font-bold font-tabular w-16 text-right">
                      {formatCurrency(Math.round(income * allocation[cat.key as keyof typeof allocation] / 100))}
                    </span>
                  </div>
                </div>
                <input
                  type="range" min={0} max={50} value={allocation[cat.key as keyof typeof allocation]}
                  onChange={(e) => updateAllocation(cat.key, Number(e.target.value))}
                  className="w-full h-1.5 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                  style={{ accentColor: cat.color }}
                />
              </div>
            ))}
            <div className={`text-sm font-semibold text-center p-2 rounded-lg ${total === 100 ? "bg-emerald/10 text-emerald" : total > 100 ? "bg-rose/10 text-rose" : "bg-amber/10 text-amber"}`}>
              Total: {total}% {total === 100 ? "✓ Perfect" : total > 100 ? "⚠ Over budget" : "↑ Under allocated"}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-[250px] w-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RPieChart>
                  <Pie data={pieData.filter((d) => d.value > 0)} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value" stroke="none">
                    {pieData.filter((d) => d.value > 0).map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: any) => [`${v}%`]} contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }} />
                </RPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Card>
    </AnimatedSection>
  );
}

// --- Credit Score Simulator ---
function CreditScoreSimulator() {
  const [paymentHistory, setPaymentHistory] = useState(85);
  const [utilization, setUtilization] = useState(40);
  const [creditAge, setCreditAge] = useState(3);
  const [creditMix, setCreditMix] = useState(60);
  const [enquiries, setEnquiries] = useState(2);

  const score = calculateCreditScore(paymentHistory, utilization, creditAge, creditMix, enquiries);

  const getScoreColor = (s: number) => {
    if (s >= 750) return "#059669";
    if (s >= 650) return "#D97706";
    return "#E11D48";
  };

  const getScoreLabel = (s: number) => {
    if (s >= 800) return "Excellent";
    if (s >= 750) return "Good";
    if (s >= 650) return "Fair";
    if (s >= 550) return "Poor";
    return "Very Poor";
  };

  return (
    <AnimatedSection>
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-1">Credit Score Simulator</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Adjust factors to see how they impact your CIBIL score (300–900 range).
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <SliderInput label="Payment History" value={paymentHistory} onChange={setPaymentHistory} min={0} max={100} suffix="%" valueLabel={`${paymentHistory}% on-time`} />
            <p className="text-xs text-muted-foreground -mt-3">Weight: 35% — Pay all bills on time, every time</p>

            <SliderInput label="Credit Utilization" value={utilization} onChange={setUtilization} min={0} max={100} suffix="%" valueLabel={`${utilization}% used`} />
            <p className="text-xs text-muted-foreground -mt-3">Weight: 30% — Keep below 30% of your credit limit</p>

            <SliderInput label="Credit Age" value={creditAge} onChange={setCreditAge} min={0} max={20} suffix=" years" />
            <p className="text-xs text-muted-foreground -mt-3">Weight: 15% — Don&apos;t close old credit cards</p>

            <SliderInput label="Credit Mix" value={creditMix} onChange={setCreditMix} min={0} max={100} suffix="%" />
            <p className="text-xs text-muted-foreground -mt-3">Weight: 10% — Mix of credit card, loan types</p>

            <SliderInput label="Recent Enquiries" value={enquiries} onChange={setEnquiries} min={0} max={10} suffix={enquiries === 1 ? " enquiry" : " enquiries"} />
            <p className="text-xs text-muted-foreground -mt-3">Weight: 10% — Fewer hard enquiries = better</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <ProgressRing
              progress={(score - 300) / 6}
              size={180}
              strokeWidth={12}
              color={getScoreColor(score)}
            >
              <div className="text-center">
                <p className="text-4xl font-bold font-tabular" style={{ color: getScoreColor(score) }}>
                  {score}
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  {getScoreLabel(score)}
                </p>
              </div>
            </ProgressRing>
            <div className="mt-6 text-center max-w-xs">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {score >= 750
                  ? "Great score! You'll get the best loan rates and instant credit card approvals."
                  : score >= 650
                  ? "Decent score, but room to improve. Focus on lowering utilization and maintaining payments."
                  : "Needs work. Priority: pay all bills on time and reduce credit card usage below 30%."}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </AnimatedSection>
  );
}

// --- Debt Spiral Simulator ---
function DebtSpiralSimulator() {
  const [balance, setBalance] = useState(50000);
  const [apr, setApr] = useState(36);
  const [payment, setPayment] = useState(2500);

  const monthlyRate = apr / 12 / 100;
  const monthlyInterest = balance * monthlyRate;
  const minPayment = Math.max(500, Math.round(monthlyInterest + (balance * 0.01)));

  const isInfinite = payment <= monthlyInterest;

  let monthsToPay = 0;
  let totalInterest = 0;
  const chartData: any[] = [];

  if (isInfinite) {
    let currentBalance = balance;
    for (let m = 0; m <= 24; m++) {
      chartData.push({
        month: `Mo ${m}`,
        balance: Math.round(currentBalance),
      });
      currentBalance = currentBalance * (1 + monthlyRate) - payment;
    }
  } else {
    let currentBalance = balance;
    let m = 0;
    chartData.push({ month: `Start`, balance: Math.round(currentBalance) });
    while (currentBalance > 0 && m < 120) {
      m++;
      const interest = currentBalance * monthlyRate;
      totalInterest += interest;
      currentBalance = currentBalance + interest - payment;
      chartData.push({
        month: `Mo ${m}`,
        balance: Math.max(0, Math.round(currentBalance)),
      });
      if (currentBalance <= 0) break;
    }
    monthsToPay = m;
  }

  const recommendedPayment = payment + 1500;
  let recMonths = 0;
  let recInterest = 0;
  if (recommendedPayment > monthlyInterest) {
    let currentBalance = balance;
    let m = 0;
    while (currentBalance > 0 && m < 120) {
      m++;
      const interest = currentBalance * monthlyRate;
      recInterest += interest;
      currentBalance = currentBalance + interest - recommendedPayment;
      if (currentBalance <= 0) break;
    }
    recMonths = m;
  }

  return (
    <AnimatedSection>
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-1">Debt Spiral Simulator</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Simulate how paying only the minimum on credit cards or loans traps you in compounding interest cycles.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <SliderInput
              label="Outstanding Credit Card Balance"
              value={balance}
              onChange={setBalance}
              min={10000}
              max={300000}
              step={5000}
              prefix="₹"
            />

            <SliderInput
              label="Annual Interest Rate (APR)"
              value={apr}
              onChange={setApr}
              min={12}
              max={48}
              step={1}
              suffix="%"
              valueLabel={`${apr}% APR (Typical Credit Card)`}
            />

            <SliderInput
              label="Your Monthly Payment"
              value={payment}
              onChange={setPayment}
              min={500}
              max={25000}
              step={250}
              prefix="₹"
              valueLabel={`₹${payment.toLocaleString("en-IN")}/mo`}
            />

            <div className="p-4 rounded-xl bg-accent/20 border border-border/40 text-xs space-y-1.5">
              <div className="flex justify-between font-medium">
                <span className="text-muted-foreground">Monthly Interest Accrued:</span>
                <span className="text-rose-500 font-bold">₹{Math.round(monthlyInterest).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-muted-foreground">Minimum Payment Required:</span>
                <span className="text-foreground font-bold">₹{minPayment.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {isInfinite ? (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
                <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Infinite Debt Spiral Alert!</span>
                </div>
                <p className="text-xs text-rose-500/90 leading-relaxed">
                  Your payment of <b>₹{payment.toLocaleString("en-IN")}</b> is less than or equal to the interest accrued monthly (<b>₹{Math.round(monthlyInterest).toLocaleString("en-IN")}</b>). The remaining interest will compound, and your debt balance will grow forever.
                </p>
              </div>
            ) : (
              payment < minPayment && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-amber font-bold text-sm">
                    <Info className="w-5 h-5" />
                    <span>Below Minimum Payment</span>
                  </div>
                  <p className="text-xs text-amber/90 leading-relaxed">
                    Paying less than the card issuer&apos;s required minimum (<b>₹{minPayment.toLocaleString("en-IN")}</b>) triggers late fees and damages your credit score.
                  </p>
                </div>
              )
            )}
          </div>

          <div className="flex flex-col justify-between space-y-6">
            {!isInfinite ? (
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 bg-background/50 border-border/40">
                  <span className="block text-[10px] text-muted-foreground uppercase font-bold">Months to Pay Off</span>
                  <span className="text-2xl font-extrabold text-foreground">{monthsToPay} <span className="text-xs font-normal text-muted-foreground">months</span></span>
                  {recMonths > 0 && recMonths < monthsToPay && (
                    <span className="block text-[10px] text-emerald mt-1 font-semibold">
                      Save {monthsToPay - recMonths} months by adding ₹1,500/mo!
                    </span>
                  )}
                </Card>
                <Card className="p-4 bg-background/50 border-border/40">
                  <span className="block text-[10px] text-muted-foreground uppercase font-bold">Total Interest Cost</span>
                  <span className="text-2xl font-extrabold text-rose-500">₹{Math.round(totalInterest).toLocaleString("en-IN")}</span>
                  {recInterest > 0 && recInterest < totalInterest && (
                    <span className="block text-[10px] text-emerald mt-1 font-semibold">
                      Save ₹{Math.round(totalInterest - recInterest).toLocaleString("en-IN")} in interest!
                    </span>
                  )}
                </Card>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-rose-500/5 border border-rose-500/15 text-center space-y-2">
                <span className="text-4xl">📉</span>
                <h3 className="font-bold text-rose-500 text-sm">Debt Never Paid Off</h3>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                  Your payments do not cover the interest. To clear this balance, you must pay at least <b>₹{(Math.round(monthlyInterest) + 100).toLocaleString("en-IN")}</b>.
                </p>
              </div>
            )}

            <div className="h-[220px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={isInfinite ? "var(--rose)" : "var(--violet)"} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={isInfinite ? "var(--rose)" : "var(--violet)"} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                  <Tooltip
                    formatter={(value: any) => [`₹${value.toLocaleString("en-IN")}`, "Balance"]}
                    contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "11px" }}
                  />
                  <Area type="monotone" dataKey="balance" stroke={isInfinite ? "var(--rose)" : "var(--violet)"} strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Card>
    </AnimatedSection>
  );
}

// --- Investment Allocation Simulator ---
function InvestmentAllocationSimulator() {
  const [initial, setInitial] = useState(50000);
  const [sip, setSip] = useState(5000);
  const [years, setYears] = useState(10);

  const [equity, setEquity] = useState(60);
  const [debt, setDebt] = useState(20);
  const [gold, setGold] = useState(10);
  const [cash, setCash] = useState(10);

  const totalAllocation = equity + debt + gold + cash;
  
  const blendedReturn = (equity * 12 + debt * 7 + gold * 9 + cash * 4) / 100;
  
  const r = blendedReturn / 12 / 100;

  let totalInvested = initial;
  let portfolioValue = initial;
  const chartData = [{ year: 0, invested: initial, value: initial }];

  if (totalAllocation === 100) {
    for (let y = 1; y <= years; y++) {
      for (let m = 1; m <= 12; m++) {
        totalInvested += sip;
        portfolioValue = (portfolioValue + sip) * (1 + r);
      }
      chartData.push({
        year: y,
        invested: Math.round(totalInvested),
        value: Math.round(portfolioValue),
      });
    }
  }

  const wealthGained = Math.max(0, Math.round(portfolioValue - totalInvested));
  const inflationAdjusted = Math.round(portfolioValue / Math.pow(1.06, years));

  const getRiskProfile = () => {
    if (equity >= 75) return { name: "Aggressive Growth", desc: "Designed for high long-term returns. Volatility will be high. You must be comfortable seeing portfolio values drop 20%+ in corrections without panic selling." };
    if (equity >= 35) return { name: "Balanced Moderate", desc: "A blend of growth and debt safety. Offers smoother compounding with smaller corrections. Good for intermediate horizons (5-10 years)." };
    return { name: "Conservative Preserver", desc: "Focuses on capital protection. Returns will rarely beat inflation, but your capital remains highly liquid and secure during market downturns." };
  };

  const riskProfile = getRiskProfile();

  return (
    <AnimatedSection>
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-1">Investment Allocation Simulator</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Construct your ideal portfolio across asset classes and project long-term wealth growth under average expected returns.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <SliderInput label="Initial Capital" value={initial} onChange={setInitial} min={5000} max={500000} step={5000} prefix="₹" />
              <SliderInput label="Monthly SIP" value={sip} onChange={setSip} min={1000} max={50000} step={1000} prefix="₹" />
            </div>

            <SliderInput label="Time Horizon" value={years} onChange={setYears} min={1} max={25} step={1} suffix=" Years" />

            <div className="space-y-4 pt-3 border-t border-border/20">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Asset Allocation</h4>
              
              <SliderInput
                label="Equity (Expected return: 12%)"
                value={equity}
                onChange={setEquity}
                min={0}
                max={100}
                suffix="%"
                className="[&_span]:text-emerald"
              />
              <SliderInput
                label="Debt/Fixed Income (Expected return: 7%)"
                value={debt}
                onChange={setDebt}
                min={0}
                max={100}
                suffix="%"
                className="[&_span]:text-blue-500"
              />
              <SliderInput
                label="Gold/Alternative (Expected return: 9%)"
                value={gold}
                onChange={setGold}
                min={0}
                max={100}
                suffix="%"
                className="[&_span]:text-amber"
              />
              <SliderInput
                label="Cash (Expected return: 4%)"
                value={cash}
                onChange={setCash}
                min={0}
                max={100}
                suffix="%"
                className="[&_span]:text-slate-400"
              />

              <div className={`p-2.5 rounded-lg text-xs font-bold text-center ${
                totalAllocation === 100 ? "bg-emerald/10 text-emerald" : "bg-rose/10 text-rose"
              }`}>
                Total Allocation: {totalAllocation}% {totalAllocation === 100 ? "✓ Perfect" : `(Allocated ${totalAllocation}%, must equal 100%)`}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-6">
            {totalAllocation === 100 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-background/50 border-border/40">
                    <span className="block text-[10px] text-muted-foreground uppercase font-bold">Total Portfolio Value</span>
                    <span className="text-xl font-extrabold text-foreground">₹{Math.round(portfolioValue).toLocaleString("en-IN")}</span>
                    <span className="block text-[9px] text-muted-foreground mt-1">
                      Invested: ₹{Math.round(totalInvested).toLocaleString("en-IN")}
                    </span>
                  </Card>
                  <Card className="p-4 bg-background/50 border-border/40">
                    <span className="block text-[10px] text-muted-foreground uppercase font-bold">Wealth Gained</span>
                    <span className="text-xl font-extrabold text-emerald">₹{wealthGained.toLocaleString("en-IN")}</span>
                    <span className="block text-[9px] text-muted-foreground mt-1">
                      Blended CAGR: {blendedReturn.toFixed(1)}%
                    </span>
                  </Card>
                </div>

                <div className="p-3.5 rounded-xl bg-accent/30 border border-border/40 text-xs">
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-muted-foreground">Inflation-Adjusted Value (6% inflation):</span>
                    <span className="text-foreground">₹{inflationAdjusted.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-normal">
                    Due to purchasing power loss, ₹{Math.round(portfolioValue).toLocaleString("en-IN")} in {years} years will buy what ₹{inflationAdjusted.toLocaleString("en-IN")} buys today.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-violet-500/[0.02] border border-violet/10 text-xs space-y-1">
                  <span className="font-bold text-violet text-[10px] uppercase tracking-wider block">Risk Profile: {riskProfile.name}</span>
                  <p className="text-muted-foreground leading-normal text-[11px]">{riskProfile.desc}</p>
                </div>

                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6B7280" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#6B7280" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--emerald)" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="var(--emerald)" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="year" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} tickFormatter={(v) => `Yr ${v}`} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                      <Tooltip
                        formatter={(value: any) => `₹${value.toLocaleString("en-IN")}`}
                        contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "11px" }}
                      />
                      <Area type="monotone" dataKey="value" name="Portfolio Value" stroke="var(--emerald)" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                      <Area type="monotone" dataKey="invested" name="Invested Capital" stroke="#6B7280" strokeWidth={1} fillOpacity={1} fill="url(#colorInvested)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-accent/20 border border-border/40 text-center flex flex-col justify-center items-center h-full space-y-2">
                <span className="text-4xl text-rose">⚡</span>
                <h3 className="font-bold text-sm">Incomplete Allocation</h3>
                <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                  Please adjust the Equity, Debt, Gold, and Cash sliders so that they sum to exactly 100% to run the compound growth projections.
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </AnimatedSection>
  );
}

// --- Emergency Spending Drill ---
function EmergencyDrillSimulator() {
  const [income, setIncome] = useState(50000);
  const [expenses, setExpenses] = useState(30000);
  const [savings, setSavings] = useState(50000);
  const [selectedShock, setSelectedShock] = useState("medical");

  const runwayMonths = expenses > 0 ? Number((savings / expenses).toFixed(1)) : 0;
  
  const shockOptions: Record<string, { label: string; costText: string; costVal: number; desc: string }> = {
    medical: {
      label: "Critical Health Surgery",
      costText: "₹1,50,000",
      costVal: 150000,
      desc: "A sudden hospitalization is not covered by your basic health insurance policy. You must settle the bill in full before discharge."
    },
    repair: {
      label: "Major Vehicle & Home Repair",
      costText: "₹45,000",
      costVal: 45000,
      desc: "A water pipe bursts causing immediate home damage, and your bike engine seizes. Both demand immediate cash payment."
    },
    jobLoss: {
      label: "Sudden Layoff & Job Search",
      costText: `₹${(expenses * 3).toLocaleString("en-IN")}`,
      costVal: expenses * 3,
      desc: "Your startup downshifts. You receive no severance and need to cover survival expenses for at least 3 months of job hunting."
    },
    family: {
      label: "Urgent Family Support Request",
      costText: "₹80,000",
      costVal: 80000,
      desc: "A close dependent faces a commercial crisis. Declining to support would cause severe distress in your household dynamics."
    }
  };

  const shock = shockOptions[selectedShock];
  const shockCost = shock.costVal;
  const shortfall = Math.max(0, shockCost - savings);
  const remainingReserves = Math.max(0, savings - shockCost);

  const ccAPR = 0.36;
  const ccMonthlyRate = ccAPR / 12;
  const loanTenure = 12;
  
  let monthlyEMI = 0;
  let totalInterest = 0;
  if (shortfall > 0) {
    monthlyEMI = Math.round(
      (shortfall * ccMonthlyRate * Math.pow(1 + ccMonthlyRate, loanTenure)) /
      (Math.pow(1 + ccMonthlyRate, loanTenure) - 1)
    );
    totalInterest = Math.round(monthlyEMI * loanTenure - shortfall);
  }

  const getResilienceRating = () => {
    if (runwayMonths >= 6) return { label: "Resilient Buffer", color: "text-emerald bg-emerald/10 border-emerald/20", desc: "You have a solid financial cushion of 6+ months. You can absorb most real-life shocks without selling investments or taking debt." };
    if (runwayMonths >= 3) return { label: "Cautionary Buffer", color: "text-amber bg-amber/10 border-amber/20", desc: "You have 3-5 months of expenses saved. You can absorb minor shocks, but larger emergencies will deplete your reserves and leave you highly vulnerable." };
    return { label: "Vulnerable Buffer", color: "text-rose-500 bg-rose-500/10 border-rose-500/20", desc: "You have less than 3 months of emergency runway. Even small shocks will wipe out your savings and force you into high-interest debt traps." };
  };

  const resilience = getResilienceRating();

  return (
    <AnimatedSection>
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-1">Emergency Spending Drill</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Simulate an unexpected crisis to test if your emergency fund is built to handle the real world.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <SliderInput label="Monthly Take-Home Income" value={income} onChange={setIncome} min={15000} max={300000} step={5000} prefix="₹" />
            <SliderInput label="Monthly Essential Expenses" value={expenses} onChange={setExpenses} min={10000} max={200000} step={5000} prefix="₹" />
            
            <SliderInput
              label="Your Current Emergency Savings"
              value={savings}
              onChange={setSavings}
              min={0}
              max={300000}
              step={5000}
              prefix="₹"
              valueLabel={`₹${savings.toLocaleString("en-IN")} saved`}
            />

            <div className="space-y-2 pt-3 border-t border-border/20">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Select Shock Event</h4>
              <div className="grid grid-cols-2 gap-2.5">
                {Object.entries(shockOptions).map(([key, opt]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedShock(key)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      selectedShock === key
                        ? "border-violet bg-violet/5 font-semibold text-foreground"
                        : "border-border/60 text-muted-foreground hover:border-border hover:bg-accent/20"
                    }`}
                  >
                    <span className="block font-bold">{opt.label}</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block">{opt.costText}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-border/20">
                <div>
                  <span className="block text-[10px] text-muted-foreground uppercase font-bold">Emergency Runway</span>
                  <span className="text-2xl font-extrabold text-foreground">{runwayMonths} <span className="text-xs font-normal text-muted-foreground">months</span></span>
                </div>
                <Badge className={`text-xs px-2.5 py-1 font-bold rounded-full border ${resilience.color}`}>
                  {resilience.label}
                </Badge>
              </div>
              
              <p className="text-[11px] text-muted-foreground leading-relaxed -mt-1">
                {resilience.desc}
              </p>

              <Card className="p-4 bg-background/40 border-border/30 space-y-3">
                <span className="font-bold text-xs uppercase tracking-wider text-muted-foreground block">Shock Analysis</span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {shock.desc}
                </p>
                <div className="p-3 rounded-lg bg-accent/40 border border-border/30 flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Shock Cost:</span>
                  <span className="text-foreground font-bold">₹{shockCost.toLocaleString("en-IN")}</span>
                </div>

                {shortfall === 0 ? (
                  <div className="p-3 rounded-lg bg-emerald/10 border border-emerald/20 text-xs text-emerald space-y-1">
                    <span className="font-bold flex items-center gap-1">✓ Shock Safely Absorbed</span>
                    <p className="text-[11px] leading-relaxed opacity-90">
                      Your emergency fund covered the entire ₹{shockCost.toLocaleString("en-IN")} cost. You have <b>₹{remainingReserves.toLocaleString("en-IN")}</b> remaining in your savings ({(remainingReserves / expenses).toFixed(1)} months runway) and took on <b>no debt</b>.
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-500 space-y-2">
                    <span className="font-bold flex items-center gap-1">⚠️ Deficit Shortfall of ₹{shortfall.toLocaleString("en-IN")}</span>
                    <p className="text-[11px] leading-relaxed opacity-95">
                      Your savings were wiped out, leaving a deficit of <b>₹{shortfall.toLocaleString("en-IN")}</b>. Borrowing this shortfall on a credit card at 36% APR for 12 months will add:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-foreground border-t border-rose-500/20 pt-2">
                      <div>
                        <span className="block text-[9px] text-muted-foreground uppercase font-bold">Monthly EMI</span>
                        <span className="font-extrabold text-rose-500">₹{monthlyEMI.toLocaleString("en-IN")}/mo</span>
                      </div>
                      <div>
                        <span className="block text-[9px] text-muted-foreground uppercase font-bold">Interest Drag</span>
                        <span className="font-extrabold text-rose-500">₹{totalInterest.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </div>
            
            <div className="p-3 rounded-lg bg-violet-500/[0.02] border border-violet/10 text-[10px] text-muted-foreground leading-normal">
              <b>India Tip:</b> Consider storing your emergency fund in a mix of high-interest savings accounts and liquid mutual funds for instant redemption during real-life shocks.
            </div>
          </div>
        </div>
      </Card>
    </AnimatedSection>
  );
}
