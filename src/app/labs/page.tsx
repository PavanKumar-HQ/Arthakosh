"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection, StaggerChildren, StaggerItem } from "@/components/shared/AnimatedSection";
import { LAB_SCENARIOS } from "@/data/labsScenarios";
import { UserLabsProfile, FinancialConfidenceScore } from "@/types/labs";
import { Clock, ArrowRight, Brain, ShieldAlert, Sparkles, Activity } from "lucide-react";

const defaultScore: FinancialConfidenceScore = {
  consistency: 60,
  resilience: 50,
  recovery: 45,
  adaptability: 55,
  strategicAwareness: 50
};

export default function LabsHubPage() {
  const [profile, setProfile] = useState<UserLabsProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("user_labs_profile");
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Error reading labs profile", e);
      }
    } else {
      // Seed initial blank profile
      const initial: UserLabsProfile = {
        completedLabs: [],
        confidence: defaultScore,
        lastSimulatedDate: "Not simulated yet"
      };
      setProfile(initial);
      localStorage.setItem("user_labs_profile", JSON.stringify(initial));
    }
  }, []);

  const labItems = [
    { id: "first-salary", title: "First Salary Allocation", cat: "foundation", desc: "Balance filial support, savings, and peer outings.", icon: "💰", status: "active" },
    { id: "basic-emergency", title: "Emergency runway setups", cat: "foundation", desc: "Build early buffers from scratch.", icon: "🛡️", status: "active" },
    { id: "budget-flex", title: "Budget Flexing", cat: "foundation", desc: "Manage minor cash flow pinches.", icon: "📋", status: "active" },
    
    { id: "job-loss", title: "Sudden Job Loss", cat: "pressure", desc: "Survive income stops with fixed liabilities.", icon: "🏥", status: "active" },
    { id: "debt-recovery", title: "Debt Snowball Recovery", cat: "pressure", desc: "Clear multiple compound liabilities.", icon: "🔓", status: "active" },
    { id: "income-instability", title: "Freelance Instability", cat: "pressure", desc: "Smooth out volatile client streams.", icon: "💻", status: "active" },
    { id: "family-dependency", title: "Family Responsibility", cat: "pressure", desc: "Support parents without losing your margins.", icon: "🏠", status: "active" },
    
    { id: "wealth-compounding", title: "SIP Compound Growth", cat: "growth", desc: "Understand risk curves and returns.", icon: "📈", status: "active" },
    { id: "career-growth", title: "Career Negotiation", desc: "Negotiate packages with recruiters.", icon: "🤝", status: "active", cat: "growth" },
    
    { id: "sabbatical-plan", title: "Sabbatical Runway", cat: "strategic", desc: "Plan a career break safely.", icon: "🌴", status: "active" },
    { id: "startup-risk", title: "Startup Failure Shock", cat: "strategic", desc: "Manage liabilities after venture failure.", icon: "🏢", status: "active" },
    { id: "lifestyle-inflation", title: "Lifestyle Inflation", cat: "strategic", desc: "Upgrading your life creep post-promotion.", icon: "📈", status: "active" }
  ];

  const activeProfile = profile || { completedLabs: [] as string[], confidence: defaultScore };

  return (
    <div className="container-page py-8 sm:py-12 space-y-10 relative">
      {/* Background decoration */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-tr from-violet-500/5 to-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <AnimatedSection>
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-violet/10 text-violet border-none hover:bg-violet/25 flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full">
            <Activity className="w-3.5 h-3.5" /> Decision Practice Environments
          </Badge>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
          Financial Decision Labs
        </h1>
        <p className="text-muted-foreground max-w-xl text-sm sm:text-base leading-relaxed">
          Financial intelligence compounds through decisions, not textbooks. Enter a lab to practice handling job losses, paycheck allocations, and compound tradeoffs.
        </p>
      </AnimatedSection>


      {/* Lab index grid (Part 9: Categories) */}
      <div className="space-y-6">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">
          Lab Environments Portal
        </h3>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {labItems.map((lab) => {
            const isPlayable = lab.status === "active";
            const isCompleted = activeProfile.completedLabs.includes(lab.id);

            return (
              <StaggerItem key={lab.id}>
                {isPlayable ? (
                  <Link href={`/labs/${lab.id}`}>
                    <Card className="p-6 h-full border border-border/40 hover:border-violet hover:bg-violet/[0.01] transition-all duration-200 group cursor-pointer flex flex-col justify-between min-h-[160px] relative">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-2xl">{lab.icon}</span>
                          <div className="flex gap-1.5">
                            {isCompleted && (
                              <Badge className="bg-emerald/10 text-emerald border-none text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                Done
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-[9px] border-border/40 text-muted-foreground px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                              {lab.cat}
                            </Badge>
                          </div>
                        </div>
                        <h4 className="text-sm font-bold text-foreground group-hover:text-violet transition-colors">
                          {lab.title}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {lab.desc}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground group-hover:text-foreground mt-4">
                        Enter Lab environment <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Card>
                  </Link>
                ) : (
                  <Card className="p-6 h-full border border-border/20 bg-accent/10 opacity-60 flex flex-col justify-between min-h-[160px] relative cursor-not-allowed select-none">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl filter grayscale">{lab.icon}</span>
                        <Badge variant="outline" className="text-[9px] border-border/20 text-muted-foreground px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          Locked
                        </Badge>
                      </div>
                      <h4 className="text-sm font-bold text-muted-foreground">
                        {lab.title}
                      </h4>
                      <p className="text-xs text-muted-foreground/80 leading-relaxed">
                        {lab.desc}
                      </p>
                    </div>
                    <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider mt-4">
                      Coming soon to portal
                    </span>
                  </Card>
                )}
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </div>
  );
}
