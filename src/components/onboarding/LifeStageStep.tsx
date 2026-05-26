"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OnboardingLifeStage } from "@/types/onboarding";
import { 
  GraduationCap, 
  Briefcase, 
  Laptop, 
  Building2, 
  Shuffle, 
  Heart, 
  Home, 
  BookOpen, 
  ShieldAlert, 
  Activity, 
  Calendar,
  Compass
} from "lucide-react";

interface LifeStageOption {
  id: OnboardingLifeStage;
  label: string;
  desc: string;
  context: string;
  icon: React.ReactNode;
}

const STAGES: LifeStageOption[] = [
  {
    id: "student",
    label: "Student",
    desc: "Managing studies and pockets",
    context: "Entering financial independence soon. Let's make the basics feel second nature.",
    icon: <GraduationCap className="w-5 h-5 text-blue-500" />
  },
  {
    id: "first-job",
    label: "First Job",
    desc: "Just started earning",
    context: "Figuring out budgets and saving patterns. Let's start with a strong, simple foundation.",
    icon: <Briefcase className="w-5 h-5 text-emerald" />
  },
  {
    id: "professional",
    label: "Working Professional",
    desc: "Established income",
    context: "Focusing on optimization, lifestyle balance, and mid-term growth strategies.",
    icon: <Activity className="w-5 h-5 text-violet" />
  },
  {
    id: "freelancer",
    label: "Freelancer / Self-Employed",
    desc: "Irregular income structures",
    context: "Managing cash flow unpredictability. We will design systems to build financial buffers.",
    icon: <Laptop className="w-5 h-5 text-rose" />
  },
  {
    id: "entrepreneur",
    label: "Entrepreneur",
    desc: "Building a venture",
    context: "High risk, high stress. Let's separate personal stability from company growth.",
    icon: <Building2 className="w-5 h-5 text-amber" />
  },
  {
    id: "career-transition",
    label: "Career Transition",
    desc: "Between jobs or pivots",
    context: "Temporary cash flow pauses require defensive planning. Let's prioritize survival margin.",
    icon: <Shuffle className="w-5 h-5 text-teal-500" />
  },
  {
    id: "married",
    label: "Married / Partnered",
    desc: "Aligning joint finances",
    context: "Combining goals, communication, and planning. Let's align perspectives without friction.",
    icon: <Heart className="w-5 h-5 text-rose-500" />
  },
  {
    id: "supporting-parents",
    label: "Supporting Parents / Dependents",
    desc: "Multigenerational support",
    context: "Balancing support for others alongside your own goals. Let's plan with care.",
    icon: <Home className="w-5 h-5 text-amber-600" />
  },
  {
    id: "higher-studies",
    label: "Planning Higher Studies",
    desc: "Financing education",
    context: "Preparing for major course expenses and potential temporary income drops.",
    icon: <BookOpen className="w-5 h-5 text-indigo-500" />
  },
  {
    id: "recovering-debt",
    label: "Recovering from Debt",
    desc: "Eliminating liabilities",
    context: "Taking control of debts strategically. No judgement, just structured healing.",
    icon: <ShieldAlert className="w-5 h-5 text-red-500" />
  },
  {
    id: "building-stability",
    label: "Building Stability",
    desc: "Creating initial security",
    context: "Focusing on emergency savings and cash control to reduce monthly anxiety.",
    icon: <Compass className="w-5 h-5 text-emerald-600" />
  },
  {
    id: "retirement",
    label: "Planning Retirement",
    desc: "Long-term legacy focus",
    context: "Shifting from active income growth to wealth preservation and passive cash flow.",
    icon: <Calendar className="w-5 h-5 text-sky-500" />
  }
];

interface LifeStageStepProps {
  value: OnboardingLifeStage | null;
  onChange: (val: OnboardingLifeStage) => void;
  onNext: () => void;
}

export function LifeStageStep({ value, onChange, onNext }: LifeStageStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 max-w-4xl mx-auto px-4"
    >
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-2">
          Where are you in your life's journey?
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm max-w-md mx-auto">
          Select the stage that closest fits your current day-to-day reality.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {STAGES.map((stage) => {
          const selected = value === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => {
                onChange(stage.id);
                // Auto-advance slightly delayed to give feedback click
                setTimeout(onNext, 400);
              }}
              className={`text-left p-4 rounded-xl border transition-all duration-200 relative group flex flex-col justify-between min-h-[130px] hover:scale-[1.01] hover:shadow-md active:scale-[0.99] cursor-pointer ${
                selected
                  ? "border-violet bg-violet/[0.03] ring-2 ring-violet shadow-sm"
                  : "border-border/60 hover:border-violet/40 hover:bg-accent/10"
              }`}
            >
              <div className="flex justify-between items-start w-full">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/60 shrink-0">
                    {stage.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{stage.label}</h4>
                    <p className="text-[10px] text-muted-foreground">{stage.desc}</p>
                  </div>
                </div>
                {selected ? (
                  <Badge className="bg-violet text-white border-none shadow-sm text-[8px] h-3.5 px-1.5 py-0 select-none shrink-0">
                    Selected
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-[8px] h-3.5 px-1.5 py-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    Choose
                  </Badge>
                )}
              </div>

              <p className="text-[11px] text-muted-foreground mt-3 leading-relaxed">
                {stage.context}
              </p>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
