"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Brain, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import { FinancialConfidenceScore } from "@/types/labs";

interface ConfidenceDashboardProps {
  score: FinancialConfidenceScore;
  totalCompleted: number;
}

export function ConfidenceDashboard({ score, totalCompleted }: ConfidenceDashboardProps) {
  const chartData = [
    { subject: "Consistency", score: score.consistency, fullMark: 100 },
    { subject: "Resilience", score: score.resilience, fullMark: 100 },
    { subject: "Recovery Ability", score: score.recovery, fullMark: 100 },
    { subject: "Adaptability", score: score.adaptability, fullMark: 100 },
    { subject: "Strategic Awareness", score: score.strategicAwareness, fullMark: 100 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Radar Chart Visual */}
      <Card className="lg:col-span-5 p-6 bg-background/50 border-border/40 backdrop-blur-xl h-[400px] flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-violet" />
            <h3 className="font-bold text-sm">Financial Confidence Matrix</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            A comprehensive mapping of your financial decision profile based on labs completed ({totalCompleted}).
          </p>
        </div>

        <div className="w-full h-[220px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
              <PolarGrid stroke="rgba(124, 58, 237, 0.15)" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: 'var(--muted-foreground)', fontSize: 9, fontWeight: 500 }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={{ fill: 'var(--muted-foreground)', fontSize: 8 }}
                axisLine={false}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="var(--violet)"
                fill="var(--violet)"
                fillOpacity={0.25}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-between items-center text-[10px] text-muted-foreground uppercase font-bold pt-2 border-t border-border/20">
          <span>Decisions Evaluated</span>
          <span>Matrix Active</span>
        </div>
      </Card>

      {/* Narrative & Diagnostic Feedback */}
      <Card className="lg:col-span-7 p-6 bg-background/50 border-border/40 backdrop-blur-xl space-y-6">
        <div>
          <Badge className="bg-violet/10 text-violet border-none px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2">
            Decision Performance Metrics
          </Badge>
          <h2 className="text-xl font-bold tracking-tight">Your Behavioral Evaluation</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">Crisis Resilience</span>
              <span className="text-sm font-semibold">{score.resilience >= 70 ? "Resilient Buffer" : "Vulnerable Margin"}</span>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Your ability to preserve cash buffers during sudden stress shocks.
              </p>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">Strategic Awareness</span>
              <span className="text-sm font-semibold">{score.strategicAwareness >= 70 ? "High Focus" : "Priority Conflict"}</span>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Your performance in allocating capital to essential targets first.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">Decision Adaptability</span>
              <span className="text-sm font-semibold">{score.adaptability >= 70 ? "Flexible Planner" : "Rigid Allocation"}</span>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Your willingness to alter timelines to secure baseline survival margins.
              </p>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider block">Recovery Efficiency</span>
              <span className="text-sm font-semibold">{score.recovery >= 70 ? "Fast Rebuild" : "Persistent Load"}</span>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                How rapidly your plan reconstructs buffers post-emergency.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-violet/5 border border-violet/10 flex gap-3 items-start">
          <Sparkles className="w-4 h-4 text-violet shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-violet uppercase tracking-wider mb-1">Diagnostic Guidance</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {score.resilience < 60 
                ? "Your profile tends to compromise emergency buffers during shocks. We suggest prioritizing Emergency Readiness in the toolkit before investing." 
                : "You maintain exceptional defensive margins. Focus now on optimizing your Compound wealth channels."}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Simple fallback Badge if imports are stripped
function Badge({ children, className }: any) {
  return (
    <span className={`px-2 py-0.5 text-xs rounded-full ${className}`}>
      {children}
    </span>
  );
}
