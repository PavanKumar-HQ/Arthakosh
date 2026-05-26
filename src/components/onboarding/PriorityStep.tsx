"use client";

import React from "react";
import { motion } from "framer-motion";
import { OnboardingPriority } from "@/types/onboarding";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  Heart, 
  Coins, 
  TrendingUp, 
  Users, 
  Award, 
  Sparkles, 
  Briefcase, 
  Scale, 
  Activity, 
  Hourglass
} from "lucide-react";

interface PriorityOption {
  id: OnboardingPriority;
  label: string;
  desc: string;
  icon: React.ReactNode;
}

const PRIORITIES_OPTIONS: PriorityOption[] = [
  {
    id: "emergency-stability",
    label: "Emergency Stability",
    desc: "Building a buffer to absorb life's unexpected turns.",
    icon: <ShieldCheck className="w-4 h-4 text-emerald" />
  },
  {
    id: "reducing-stress",
    label: "Reducing Money Anxiety",
    desc: "Removing dread from bank balance checks and statements.",
    icon: <Heart className="w-4 h-4 text-rose" />
  },
  {
    id: "paying-debt",
    label: "Paying Off Debt",
    desc: "Strategically freeing up income from liabilities.",
    icon: <Coins className="w-4 h-4 text-amber" />
  },
  {
    id: "building-savings",
    label: "Building Savings",
    desc: "Growing a consistent nest egg for future desires.",
    icon: <TrendingUp className="w-4 h-4 text-blue-accent" />
  },
  {
    id: "improving-confidence",
    label: "Improving Confidence",
    desc: "Learning to make financial choices with clarity.",
    icon: <Award className="w-4 h-4 text-violet" />
  },
  {
    id: "learning-investing",
    label: "Learning to Invest",
    desc: "Understanding compounding, assets, and risk markets.",
    icon: <Sparkles className="w-4 h-4 text-amber-500" />
  },
  {
    id: "supporting-family",
    label: "Supporting Family",
    desc: "Securing plans for dependents and older parents.",
    icon: <Users className="w-4 h-4 text-teal" />
  },
  {
    id: "career-flexibility",
    label: "Career Flexibility",
    desc: "Building margin to pivot jobs, start ventures, or pause.",
    icon: <Briefcase className="w-4 h-4 text-indigo" />
  },
  {
    id: "lifestyle-balance",
    label: "Improving Lifestyle Balance",
    desc: "Enjoying the present without feeling future guilt.",
    icon: <Scale className="w-4 h-4 text-purple-400" />
  },
  {
    id: "long-term-wealth",
    label: "Long-term Wealth",
    desc: "Planning for retirement and future freedom years.",
    icon: <Activity className="w-4 h-4 text-emerald-600" />
  },
  {
    id: "preparing-uncertainty",
    label: "Preparing for Uncertainty",
    desc: "Planning for broader economic or industry shifts.",
    icon: <Hourglass className="w-4 h-4 text-sky" />
  }
];

interface PriorityStepProps {
  selected: OnboardingPriority[];
  onChange: (val: OnboardingPriority[]) => void;
}

export function PriorityStep({ selected, onChange }: PriorityStepProps) {
  const togglePriority = (id: OnboardingPriority) => {
    if (selected.includes(id)) {
      onChange(selected.filter((p) => p !== id));
    } else {
      if (selected.length < 4) {
        onChange([...selected, id]);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 max-w-3xl mx-auto px-4"
    >
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-2">
          What matters most right now?
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm max-w-md mx-auto">
          Select between 2 and 4 priorities. We will focus your dashboard and guide pathways around these.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PRIORITIES_OPTIONS.map((opt) => {
          const isSelected = selected.includes(opt.id);
          const isDisabled = !isSelected && selected.length >= 4;

          return (
            <button
              key={opt.id}
              onClick={() => togglePriority(opt.id)}
              disabled={isDisabled}
              className={`text-left p-4 rounded-xl border transition-all duration-200 flex gap-3.5 items-start hover:scale-[1.01] hover:shadow-md active:scale-[0.99] cursor-pointer group w-full ${
                isSelected
                  ? "border-violet bg-violet/[0.03] ring-2 ring-violet"
                  : isDisabled
                  ? "border-border/30 opacity-40 cursor-not-allowed"
                  : "border-border/60 hover:border-violet/40 hover:bg-accent/20"
              }`}
            >
              <div className="p-2 rounded-lg bg-accent/60 shrink-0 mt-0.5">
                {opt.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-foreground truncate">{opt.label}</h4>
                  {isSelected ? (
                    <Badge className="bg-violet text-white border-none text-[8px] h-3.5 px-1 py-0 select-none shrink-0">Selected</Badge>
                  ) : isDisabled ? null : (
                    <Badge variant="outline" className="text-[8px] h-3.5 px-1 py-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0">Add</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {opt.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        {selected.length} of 4 selected (Choose at least 2)
      </p>
    </motion.div>
  );
}
