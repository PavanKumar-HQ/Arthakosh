"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGoalsStore } from "@/lib/store/goals";
import { GoalCard } from "@/components/goals/GoalCard";
import { RecommendationBanner } from "@/components/goals/RecommendationBanner";
import { AnimatedSection, StaggerChildren, StaggerItem } from "@/components/shared/AnimatedSection";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/constants";
import { Target, Plus, AlertCircle, ArrowRight, ShieldAlert, Shield, Wallet, Home, GraduationCap, Plane } from "lucide-react";
import { useState } from "react";
import { MultiGoalConflict } from "@/lib/engines/multiGoal";

export default function GoalsDashboard() {
  const router = useRouter();
  const { goals, monthlyIncome, conflicts, setMonthlyIncome } = useGoalsStore();
  const [isSettingIncome, setIsSettingIncome] = useState(monthlyIncome === null);
  const [tempIncome, setTempIncome] = useState(monthlyIncome || "");

  const totalMonthlySIP = goals.reduce((sum, g) => sum + g.monthlyContribution, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalSavings = goals.reduce((sum, g) => sum + g.currentSavings, 0);

  const handleSaveIncome = () => {
    if (tempIncome) {
      setMonthlyIncome(Number(tempIncome));
      setIsSettingIncome(false);
    }
  };

  const GOAL_TEMPLATES = [
    {
      icon: Shield,
      emoji: "🛡️",
      title: "Emergency Fund",
      description: "Build 3–6 months of expenses as a financial safety net.",
      color: "text-red-500",
      bg: "bg-red-50",
      href: "/tools/emergency-fund",
      tag: "Priority #1",
      tagColor: "bg-red-100 text-red-600",
    },
    {
      icon: Home,
      emoji: "🏠",
      title: "Buy a Home",
      description: "Plan for down payment, EMI capacity, and registration costs.",
      color: "text-blue-500",
      bg: "bg-blue-50",
      href: "/goals/create",
      tag: "Long-term",
      tagColor: "bg-blue-100 text-blue-600",
    },
    {
      icon: GraduationCap,
      emoji: "🎓",
      title: "Education / Upskilling",
      description: "Save for a course, degree, or career transition fund.",
      color: "text-purple-500",
      bg: "bg-purple-50",
      href: "/goals/create",
      tag: "Career",
      tagColor: "bg-purple-100 text-purple-600",
    },
    {
      icon: Plane,
      emoji: "✈️",
      title: "Dream Trip",
      description: "Set a target, timeline, and monthly savings for travel.",
      color: "text-green-500",
      bg: "bg-green-50",
      href: "/goals/create",
      tag: "Lifestyle",
      tagColor: "bg-green-100 text-green-600",
    },
    {
      icon: Wallet,
      emoji: "💰",
      title: "Custom Goal",
      description: "Anything else — retirement corpus, wedding, car, or sabbatical.",
      color: "text-amber-500",
      bg: "bg-amber-50",
      href: "/goals/create",
      tag: "Flexible",
      tagColor: "bg-amber-100 text-amber-600",
    },
  ];

  if (goals.length === 0) {
    return (
      <div className="container-page py-10 sm:py-16">
        <AnimatedSection className="mb-10">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6 text-3xl">
            🎯
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-3">Financial clarity starts with one goal.</h1>
          <p className="text-muted-foreground max-w-lg text-base mb-2">
            Pick a goal below or create your own. We&apos;ll help you build a realistic savings plan.
          </p>
        </AnimatedSection>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {GOAL_TEMPLATES.map((tmpl) => {
            const Icon = tmpl.icon;
            return (
              <StaggerItem key={tmpl.title}>
                <Link href={tmpl.href} className="group block">
                  <Card className="p-5 h-full border-border/60 hover:border-foreground/30 hover:shadow-md transition-all duration-200 bg-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl ${tmpl.bg} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${tmpl.color}`} />
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tmpl.tagColor}`}>{tmpl.tag}</span>
                    </div>
                    <h3 className="font-bold text-base mb-1">{tmpl.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tmpl.description}</p>
                    <div className="flex items-center gap-1 text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                      Start planning <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    );
  }

  return (
    <div className="container-page py-8 sm:py-12">
      <AnimatedSection>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Goal Portfolio</h1>
            <p className="text-muted-foreground">Your financial objectives, analyzed intelligently.</p>
          </div>
          <Link 
            href="/goals/create" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-semibold hover:opacity-90 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Goal
          </Link>
        </div>

        {/* Global Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-5 bg-surface-raised/30 border-border/50">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Total Monthly SIP</p>
            <p className="text-3xl font-bold font-tabular">{formatCurrency(totalMonthlySIP)}</p>
          </Card>
          <Card className="p-5 bg-surface-raised/30 border-border/50">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Total Accumulated</p>
            <p className="text-3xl font-bold font-tabular">{formatCurrency(totalSavings)}</p>
          </Card>
          <Card className="p-5 bg-surface-raised/30 border-border/50 flex flex-col justify-center">
            {isSettingIncome ? (
              <div className="flex gap-2">
                <input 
                  type="number"
                  placeholder="Monthly Income"
                  value={tempIncome}
                  onChange={(e) => setTempIncome(e.target.value)}
                  className="flex-1 bg-background border border-border rounded-lg px-3 py-1.5 text-sm font-tabular"
                />
                <button onClick={handleSaveIncome} className="text-xs font-semibold bg-foreground text-background px-3 rounded-lg">Save</button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Monthly Income</p>
                  <p className="text-lg font-bold font-tabular">{monthlyIncome ? formatCurrency(monthlyIncome) : "Not set"}</p>
                </div>
                <button onClick={() => setIsSettingIncome(true)} className="text-xs text-blue-accent font-medium hover:underline">Edit</button>
              </div>
            )}
          </Card>
        </div>

        {/* Conflict & Warning Banners */}
        {conflicts.length > 0 && (
          <div className="mb-8 space-y-3">
            {conflicts.map((conflict, i) => (
              <RecommendationBanner 
                key={i} 
                type={conflict.severity === "high" ? "warning" : "insight"} 
                message={conflict.message} 
              />
            ))}
          </div>
        )}

        <h2 className="text-lg font-semibold mb-4">Active Goals</h2>
        
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {goals.map((goal) => (
            <StaggerItem key={goal.id}>
              <GoalCard 
                goal={goal} 
                onClick={() => router.push(`/goals/${goal.id}`)} 
              />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </AnimatedSection>
    </div>
  );
}
