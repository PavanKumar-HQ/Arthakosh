"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { AnimatedSection, StaggerChildren, StaggerItem } from "@/components/shared/AnimatedSection";
import { ArrowRight, GitBranch, ShieldAlert, Brain, TrendingUp, Activity, Split } from "lucide-react";

const SCENARIOS = [
  {
    href: "/labs",
    icon: Brain,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    title: "Financial Decision Labs",
    description: "Face simulated financial dilemmas — job loss, medical emergencies, salary negotiations — and learn from every choice.",
    tag: "Interactive",
  },
  {
    href: "/emergency",
    icon: ShieldAlert,
    color: "text-red-500",
    bg: "bg-red-500/10",
    title: "Emergency Survival Sim",
    description: "Simulate total income collapse. How long do your reserves last? What drastic actions can extend your runway?",
    tag: "High-Stakes",
  },
  {
    href: "/investing",
    icon: TrendingUp,
    color: "text-green-500",
    bg: "bg-green-500/10",
    title: "Investing Behavior Simulator",
    description: "See how investor behavior (panic selling, consistent SIPs) creates massive divergence in 20-year outcomes.",
    tag: "Long-Term",
  },
  {
    href: "/decisions",
    icon: Split,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    title: "Tradeoff Scale",
    description: "Weigh major life decisions: Buy vs Rent, Startup vs Salary. The scale tips based on hidden 10-year costs.",
    tag: "Strategic",
  },
  {
    href: "/behavior",
    icon: Activity,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    title: "Behavioral Stress Test",
    description: "Map your financial mindset and simulate cognitive load to see how your decision quality degrades under pressure.",
    tag: "Psychology",
  },
];

export default function ScenariosHubPage() {
  return (
    <div className="container-page py-8 sm:py-12">
      <AnimatedSection>
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <GitBranch className="w-8 h-8 text-muted-foreground" />
            <h1 className="text-3xl font-bold tracking-tight">Simulation Hub</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Five immersive financial scenarios. No textbook theory — just real decisions with real consequences. Choose a simulation to begin.
          </p>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SCENARIOS.map((scenario) => {
            const Icon = scenario.icon;
            return (
              <StaggerItem key={scenario.href}>
                <Link href={scenario.href} className="block h-full group">
                  <Card className="p-6 h-full bg-surface border-border/50 hover:border-border hover:shadow-lg transition-all duration-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Icon className="w-20 h-20" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl ${scenario.bg} ${scenario.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-accent text-muted-foreground">
                          {scenario.tag}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{scenario.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{scenario.description}</p>
                      <div className="flex items-center gap-1.5 text-sm font-medium group-hover:text-foreground text-muted-foreground transition-colors">
                        Launch Simulation
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </AnimatedSection>
    </div>
  );
}
