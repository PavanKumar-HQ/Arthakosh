"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedSection, StaggerChildren, StaggerItem } from "@/components/shared/AnimatedSection";
import {
  ArrowRight,
  TrendingUp,
  CreditCard,
  PiggyBank,
  Shield,
  BarChart3,
  Wallet,
  Activity,
  Layers,
  Sparkles,
  Clock,
  Gauge
} from "lucide-react";

interface ToolItem {
  id: string;
  name: string;
  description: string;
  emotionalContext: string;
  category: "planning" | "debt" | "investing" | "daily" | "emergency";
  icon: React.ReactNode;
  color: string;
  completionTime: string;
  complexity: "Low" | "Medium" | "High";
  pressure: "Calm" | "Moderate" | "High Stress";
  outcomePreview: string;
}

const tools: ToolItem[] = [
  {
    id: "emi-calculator",
    name: "EMI Stress Analysis",
    description: "Go beyond basic EMIs. Analyze stress probability, emergency vulnerability, and monthly breathing room before borrowing.",
    emotionalContext: "Understand whether your future EMI will create financial anxiety before committing to a loan.",
    category: "debt",
    icon: <CreditCard className="w-5 h-5" />,
    color: "#3B82F6",
    completionTime: "3 min analysis",
    complexity: "Medium",
    pressure: "Moderate",
    outcomePreview: "Stress Score & Budget Impact"
  },
  {
    id: "emergency-fund",
    name: "Financial Safety Simulator",
    description: "Compute custom safety nets. Simulate job loss, delayed salary, or medical expenses to see your survival buffer.",
    emotionalContext: "Visualize how long you can comfortably survive without income during life emergencies.",
    category: "emergency",
    icon: <Shield className="w-5 h-5" />,
    color: "#D97706",
    completionTime: "4 min simulator",
    complexity: "Medium",
    pressure: "High Stress",
    outcomePreview: "Survival Window & Vulnerability Audit"
  },
  {
    id: "debt-snowball",
    name: "Debt Recovery System",
    description: "Organize education, card, and personal loans. Compare Snowball vs Avalanche methods to design a burnout-free payoff plan.",
    emotionalContext: "Formulate a concrete, stress-aware path to escape debt compound cycles.",
    category: "debt",
    icon: <BarChart3 className="w-5 h-5" />,
    color: "#EF4444",
    completionTime: "5 min system",
    complexity: "High",
    pressure: "High Stress",
    outcomePreview: "Structured Payoff Timeline"
  },
  {
    id: "credit-simulator",
    name: "Credit Score Simulator",
    description: "Learn credit psychology. Simulate missed payments, debt utilization ratio shifts, and hard inquiries on your score timeline.",
    emotionalContext: "See how small financial choices today alter your future creditworthiness.",
    category: "debt",
    icon: <Activity className="w-5 h-5" />,
    color: "#10B981",
    completionTime: "3 min play",
    complexity: "Low",
    pressure: "Calm",
    outcomePreview: "Score projection & best habits"
  },
  {
    id: "inflation-calculator",
    name: "Inflation Impact Simulator",
    description: "Visualize how purchasing power decays. See the compounding impact of inflation on future education, rent, and goals.",
    emotionalContext: "See how much ₹50,000 today is actually worth in 5, 10, or 20 years.",
    category: "planning",
    icon: <PiggyBank className="w-5 h-5" />,
    color: "#EC4899",
    completionTime: "2 min simulator",
    complexity: "Low",
    pressure: "Calm",
    outcomePreview: "Purchasing Power Timeline"
  },
  {
    id: "sip-calculator",
    name: "SIP & Wealth Builder",
    description: "Simulate systematic investments with step-up allocations and real-time inflation-adjusted projections.",
    emotionalContext: "Forecast how persistent, small habits grow long-term purchasing power.",
    category: "investing",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "#8B5CF6",
    completionTime: "3 min planner",
    complexity: "Low",
    pressure: "Calm",
    outcomePreview: "Wealth accumulation curves"
  },
  {
    id: "net-worth",
    name: "Net Worth & Liquidity Tracker",
    description: "Calculate assets vs liabilities. Track liquidity ratios and financial buffer health rather than just static spreadsheet totals.",
    emotionalContext: "Measure your overall resilience, stability, and growth trends over time.",
    category: "planning",
    icon: <Wallet className="w-5 h-5" />,
    color: "#6366F1",
    completionTime: "3 min tracker",
    complexity: "Medium",
    pressure: "Calm",
    outcomePreview: "Liquidity Ratio & Trend Audit"
  },
  {
    id: "insurance-estimator",
    name: "Insurance & Risk Estimator",
    description: "Estimate required life and health insurance coverage based on dependency exposure, without fear-based sales pitches.",
    emotionalContext: "Map your safety net to protect your dependents from unpredictable risk.",
    category: "planning",
    icon: <Layers className="w-5 h-5" />,
    color: "#06B6D4",
    completionTime: "3 min guide",
    complexity: "Medium",
    pressure: "Moderate",
    outcomePreview: "Safety Checklist & Coverage Totals"
  }
];

const categories = [
  { id: "all", label: "All Companions" },
  { id: "planning", label: "Stability & Planning" },
  { id: "debt", label: "Debt & Recovery" },
  { id: "investing", label: "Investing & Growth" },
  { id: "emergency", label: "Emergency Readiness" }
];

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <div className="container-page py-8">
      {/* Title section */}
      <AnimatedSection className="mb-10">
        <Badge variant="secondary" className="mb-3 px-3 py-1 text-xs">
          <Sparkles className="w-3.5 h-3.5 mr-1 text-violet animate-pulse" />
          Interactive Money Companions
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Everyday Money Toolkit
        </h1>
        <p className="text-muted-foreground text-sm max-w-2xl">
          We believe financial tools should help you make choices, not just compute equations. Explore interactive tools designed to map decisions to real life stability.
        </p>
      </AnimatedSection>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-10 overflow-x-auto scrollbar-hide flex w-full justify-start border-none bg-transparent h-auto p-1 gap-3">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat.id}
              value={cat.id}
              className="px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wide transition-all duration-300 whitespace-nowrap data-[state=active]:bg-violet data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-violet/25 bg-accent/50 text-muted-foreground hover:bg-accent hover:text-foreground shrink-0 border-none"
            >
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat.id} value={cat.id}>
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools
                .filter((t) => cat.id === "all" || t.category === cat.id)
                .map((tool) => (
                  <StaggerItem key={tool.id}>
                    <Link href={`/tools/${tool.id}`}>
                      <Card className="p-6 h-full border border-border/50 hover:border-border card-hover flex flex-col justify-between group cursor-pointer bg-surface overflow-hidden relative">
                        {/* Subtle background decoration */}
                        <div
                          className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-[0.03] transition-all duration-300 group-hover:scale-125"
                          style={{ backgroundColor: tool.color }}
                        />
                        
                        <div>
                          {/* Top Meta info */}
                          <div className="flex items-center justify-between mb-4">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: `${tool.color}12`, color: tool.color }}
                            >
                              {tool.icon}
                            </div>
                            
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                              <span className="flex items-center gap-0.5">
                                <Clock className="w-3 h-3" />
                                {tool.completionTime}
                              </span>
                            </div>
                          </div>

                          {/* Body */}
                          <h3 className="text-base font-semibold mb-2 group-hover:text-foreground transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                            {tool.description}
                          </p>
                          <p className="text-[11px] text-violet italic font-medium mb-4 bg-violet/5 p-2 rounded-lg border border-violet/10">
                            " {tool.emotionalContext} "
                          </p>
                        </div>

                        {/* Bottom Telemetry indicators */}
                        <div className="mt-auto space-y-3">
                          <div className="h-px bg-border/40 my-2" />
                          <div className="flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-1.5">
                              <span className="text-muted-foreground">Complexity:</span>
                              <span className="font-semibold text-foreground">{tool.complexity}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-muted-foreground">Pressure:</span>
                              <span
                                className={`font-semibold px-1.5 py-0.5 rounded ${
                                  tool.pressure === "Calm"
                                    ? "bg-emerald/10 text-emerald"
                                    : tool.pressure === "Moderate"
                                    ? "bg-amber/10 text-amber"
                                    : "bg-rose/10 text-rose"
                                }`}
                              >
                                {tool.pressure}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs pt-1">
                            <span className="text-[11px] font-semibold text-muted-foreground tracking-wide truncate max-w-[80%]">
                              Outcome: {tool.outcomePreview}
                            </span>
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </StaggerItem>
                ))}
            </StaggerChildren>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
