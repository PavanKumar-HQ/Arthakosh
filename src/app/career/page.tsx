"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { AnimatedSection, StaggerChildren, StaggerItem } from "@/components/shared/AnimatedSection";
import { formatCurrency } from "@/lib/constants";
import { LineChart, Briefcase, ChevronRight, Zap, Target, BookOpen } from "lucide-react";
import { SkillNode, CareerState, calculateHumanCapitalValue } from "@/lib/engines/careerTrajectory";

const initialCareerState: CareerState = {
  currentRole: "Software Engineer II",
  baseSalary: 120000,
  yearsExperience: 3,
  skills: [
    { id: "s1", name: "React / Frontend", category: "technical", level: 4, marketPremium: 0.10 },
    { id: "s2", name: "System Design", category: "technical", level: 2, marketPremium: 0.15 },
    { id: "s3", name: "Stakeholder Comms", category: "soft", level: 3, marketPremium: 0.05 },
    { id: "s4", name: "Cloud Architecture", category: "domain", level: 1, marketPremium: 0.12 },
  ]
};

export default function CareerGrowthDashboard() {
  const [careerState, setCareerState] = useState<CareerState>(initialCareerState);

  const { projectedSalary, skillPremium, experiencePremium } = calculateHumanCapitalValue(careerState);

  const upgradeSkill = (id: string) => {
    setCareerState(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? { ...s, level: Math.min(5, s.level + 1) } : s)
    }));
  };

  return (
    <div className="container-page py-8 sm:py-12">
      <AnimatedSection>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
              <LineChart className="w-8 h-8 text-blue-500" />
              Career Trajectory
            </h1>
            <p className="text-muted-foreground">Map your human capital asset value and skill stacking premiums.</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity">
            <Target className="w-4 h-4" />
            Set Next Milestone
          </button>
        </div>

        {/* Top Asset Valuation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-5 bg-surface-raised/50 border-border/50 relative overflow-hidden">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Current Base</p>
            <p className="text-3xl font-bold font-tabular">{formatCurrency(careerState.baseSalary)}</p>
            <p className="text-xs text-muted-foreground mt-2">{careerState.yearsExperience} YOE in current trajectory</p>
          </Card>
          <Card className="p-5 bg-surface-raised/50 border-border/50 relative overflow-hidden">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Market Skill Premium</p>
            <p className="text-3xl font-bold font-tabular text-green-400">+{formatCurrency(skillPremium)}</p>
            <p className="text-xs text-muted-foreground mt-2">Value unlocked via active skills</p>
          </Card>
          <Card className="p-5 bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity opacity-0 group-hover:opacity-100" />
            <p className="text-[11px] uppercase tracking-wider text-blue-400 font-semibold mb-2">Projected Market Value</p>
            <p className="text-3xl font-bold font-tabular text-blue-400">{formatCurrency(projectedSalary)}</p>
            <p className="text-xs text-blue-500/70 mt-2">Based on current human capital assets</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Skill Stacking */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Skill Stacking Matrix
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Upgrade your skills to see real-time impact on your projected market value. Compounding skills (e.g. Code + Comms) create exponential premiums.
            </p>
            
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {careerState.skills.map(skill => (
                <StaggerItem key={skill.id}>
                  <Card className="p-4 bg-surface border-border/50 hover:border-border transition-colors group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-semibold">{skill.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{skill.category} • {(skill.marketPremium * 100).toFixed(0)}% Premium Cap</p>
                      </div>
                      <div className="px-2 py-1 bg-accent rounded text-xs font-bold font-tabular">
                        Lvl {skill.level}/5
                      </div>
                    </div>
                    
                    {/* Level Visualizer */}
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map(lvl => (
                        <div 
                          key={lvl} 
                          className={`h-2 flex-1 rounded-sm transition-colors ${lvl <= skill.level ? 'bg-amber-500' : 'bg-accent'}`}
                        />
                      ))}
                    </div>

                    <button 
                      onClick={() => upgradeSkill(skill.id)}
                      disabled={skill.level >= 5}
                      className="w-full py-2 rounded bg-accent/50 hover:bg-accent text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {skill.level >= 5 ? "Maxed Out" : "Invest Time (+Lvl)"}
                    </button>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>

          {/* Right: Milestone Tracker */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 bg-surface-raised/30 border-border/50">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-muted-foreground" />
                Current Position
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">Title</p>
                  <p className="font-medium">{careerState.currentRole}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tenure</p>
                  <p className="font-medium">{careerState.yearsExperience} Years</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-surface-raised/30 border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Target className="w-16 h-16" />
              </div>
              <h3 className="font-semibold mb-4 relative z-10">Next Milestone</h3>
              <div className="space-y-4 relative z-10">
                <div>
                  <p className="font-medium text-sm">Senior / Staff Engineer</p>
                  <p className="text-xs text-muted-foreground">Target: 18-24 months</p>
                </div>
                
                <div className="space-y-2 pt-2 border-t border-border/50">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Missing Requirements</p>
                  <div className="flex items-start gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span>System Design must be Lvl 4+</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span>Cloud Architecture must be Lvl 3+</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
