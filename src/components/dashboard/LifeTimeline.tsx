"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock, Flame, ShieldAlert } from "lucide-react";
import { OnboardingProfile } from "@/types/onboarding";
import { Goal } from "@/types";

interface LifeTimelineProps {
  profile: OnboardingProfile;
  goals: Goal[];
}

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  desc: string;
  type: "success" | "warning" | "info" | "alert";
}

export function LifeTimeline({ profile, goals }: LifeTimelineProps) {
  const getTimelineItems = (): TimelineItem[] => {
    const items: TimelineItem[] = [];

    // Onboarding
    items.push({
      id: "onboarding",
      date: new Date(profile.completedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      title: "Financial Life Mapping Completed",
      desc: `Setup profile with ${profile.lifeStage.replace("-", " ")} framework.`,
      type: "info"
    });

    // Goals milestones
    goals.forEach((g, idx) => {
      items.push({
        id: `goal-${idx}`,
        date: g.createdAt 
          ? new Date(g.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
          : "26 May",
        title: `Goal Added: ${g.name}`,
        desc: `Targeting ${g.targetAmount.toLocaleString("en-IN")} over ${g.timeline} months.`,
        type: "success"
      });

      if (g.currentSavings > g.targetAmount * 0.5) {
        items.push({
          id: `goal-half-${idx}`,
          date: "Recently",
          title: `Halfway Win: ${g.name}`,
          desc: "Accumulated more than 50% of targeted capital reserves.",
          type: "success"
        });
      }
    });

    // Inferred alerts based on profile
    if (profile.behavioralSignals.avoidanceTendency) {
      items.push({
        id: "avoidance-flag",
        date: "Continuous",
        title: "Active Balance Guard Active",
        desc: "Automated guidelines suggested due to statement dread indicators.",
        type: "alert"
      });
    }

    if (profile.behavioralSignals.impulsiveRisk) {
      items.push({
        id: "impulse-flag",
        date: "Recent",
        title: "Impulse Protection Configured",
        desc: "Log shopping items in the Psychology module to cool off gratification loops.",
        type: "warning"
      });
    }

    // Sort or return
    return items;
  };

  const items = getTimelineItems();

  const getIcon = (type: TimelineItem["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-emerald" />;
      case "warning":
        return <Flame className="w-4 h-4 text-amber" />;
      case "alert":
        return <ShieldAlert className="w-4 h-4 text-rose-500" />;
      default:
        return <Clock className="w-4 h-4 text-violet" />;
    }
  };

  return (
    <Card className="p-5 bg-background/50 border-border/40 backdrop-blur-xl space-y-4">
      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
        Financial Life Timeline
      </h3>

      <div className="relative pl-4 border-l border-border/40 space-y-6 ml-2 my-2">
        {items.map((item) => (
          <div key={item.id} className="relative group">
            {/* Dot marker */}
            <div className="absolute -left-[25px] top-1 bg-background border border-border/80 p-0.5 rounded-full z-10 shrink-0">
              {getIcon(item.type)}
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-foreground">{item.title}</span>
                <span className="text-[9px] text-muted-foreground bg-accent px-1.5 py-0.5 rounded">
                  {item.date}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
