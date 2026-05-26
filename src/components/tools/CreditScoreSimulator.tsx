"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Shield, AlertTriangle, Activity, Info, TrendingUp, Sparkles } from "lucide-react";

export function CreditScoreSimulator() {
  // Inputs
  const [repayment, setRepayment] = useState<"on_time" | "missed_1" | "missed_multiple">("on_time");
  const [utilization, setUtilization] = useState<number>(20); // percentage
  const [inquiries, setInquiries] = useState<number>(0);
  const [creditMix, setCreditMix] = useState<"unsecured_only" | "healthy_mix">("healthy_mix");

  // Calculate score
  let baseScore = 750;

  // Repayment impact
  if (repayment === "missed_1") baseScore -= 45;
  if (repayment === "missed_multiple") baseScore -= 120;

  // Utilization impact (Optimal: <30%, Average: 30-50%, High: >50%)
  if (utilization <= 30) {
    baseScore += (30 - utilization) * 0.8; // small boost for low utilization
  } else if (utilization <= 50) {
    baseScore -= (utilization - 30) * 1.2;
  } else {
    baseScore -= 24 + (utilization - 50) * 2.2;
  }

  // Inquiry impact (Standard: -5 to -10 points per inquiry)
  if (inquiries > 0) {
    baseScore -= inquiries * 8;
  }

  // Credit Mix impact
  if (creditMix === "unsecured_only") {
    baseScore -= 15;
  } else {
    baseScore += 15;
  }

  const finalScore = Math.max(300, Math.min(900, Math.round(baseScore)));

  // Score tier
  let scoreTier: "Excellent" | "Good" | "Fair" | "Poor" = "Good";
  let scoreColor = "text-blue";
  let scoreBg = "bg-blue/10";
  if (finalScore >= 775) {
    scoreTier = "Excellent";
    scoreColor = "text-emerald";
    scoreBg = "bg-emerald/10";
  } else if (finalScore >= 725) {
    scoreTier = "Good";
    scoreColor = "text-blue";
    scoreBg = "bg-blue/10";
  } else if (finalScore >= 650) {
    scoreTier = "Fair";
    scoreColor = "text-amber";
    scoreBg = "bg-amber/10";
  } else {
    scoreTier = "Poor";
    scoreColor = "text-rose";
    scoreBg = "bg-rose/10";
  }

  // Generate 12-month simulator data
  const trendData = Array.from({ length: 12 }).map((_, idx) => {
    let monthScore = finalScore;
    // Simulate recovery or decay behavior over time
    if (idx > 0) {
      if (repayment === "on_time" && utilization <= 30 && inquiries === 0) {
        // Safe behavior builds score slowly
        monthScore = Math.min(900, finalScore + idx * 6);
      } else if (repayment === "missed_multiple" || utilization > 70) {
        // Sustained bad behavior decays score further
        monthScore = Math.max(300, finalScore - idx * 4);
      }
    }
    return {
      month: `Month ${idx + 1}`,
      Score: monthScore
    };
  });

  return (
    <div className="space-y-8">
      <div>
        <Badge variant="secondary" className="mb-2">Credit Behavior Simulation</Badge>
        <h1 className="text-3xl font-bold tracking-tight">Credit Score Simulator</h1>
        <p className="text-muted-foreground text-sm max-w-xl">
          Learn how financial choices affect your CIBIL rating. Move sliders to check credit score shifts over a 12-month outlook.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Inputs */}
        <Card className="p-6 lg:col-span-5 space-y-6 bg-surface">
          <h3 className="font-semibold text-sm border-b border-border/40 pb-2 text-foreground">
            1. Simulation Parameters
          </h3>

          {/* Repayment */}
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Payment History Consistency</span>
            <div className="flex flex-col gap-2">
              {[
                { id: "on_time", label: "All Payments On Time" },
                { id: "missed_1", label: "Missed 1 payment recently" },
                { id: "missed_multiple", label: "Multiple missed payments / Default" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setRepayment(item.id as any)}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                    repayment === item.id ? "border-foreground bg-foreground text-background font-semibold" : "border-border hover:bg-surface-raised"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Utilization Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Credit Card Utilization Rate</span>
              <span className="font-semibold text-foreground">{utilization}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={utilization}
              onChange={(e) => setUtilization(Number(e.target.value))}
              className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-foreground"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>0% (Ideal)</span>
              <span>30% (Recommended Max)</span>
              <span>100% (Maxed Out)</span>
            </div>
          </div>

          {/* Inquiries */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Hard Inquiries (Last 6 Months)</span>
              <span className="font-semibold text-foreground">{inquiries} applications</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={inquiries}
              onChange={(e) => setInquiries(Number(e.target.value))}
              className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-foreground"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>0 (Soft search)</span>
              <span>5 (High Risk)</span>
              <span>10 (Spamming)</span>
            </div>
          </div>

          {/* Credit Mix */}
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Credit Mix Composition</span>
            <div className="flex gap-2">
              {[
                { id: "unsecured_only", label: "Credit Cards / Personal only" },
                { id: "healthy_mix", label: "Healthy Mix (Secured + Unsecured)" }
              ].map((mix) => (
                <button
                  key={mix.id}
                  onClick={() => setCreditMix(mix.id as any)}
                  className={`flex-1 py-2 px-1.5 rounded-lg border text-[10px] font-semibold transition-all leading-none ${
                    creditMix === mix.id ? "border-foreground bg-foreground text-background" : "border-border hover:bg-surface-raised"
                  }`}
                >
                  {mix.label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Right Side: Projections & Chart */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Dial result */}
          <Card className="p-6 text-center space-y-3 bg-surface">
            <span className="text-xs text-muted-foreground uppercase tracking-wider block">Estimated Credit Score</span>
            <div className="flex justify-center items-baseline gap-2">
              <span className="text-5xl font-extrabold font-tabular tracking-tight">{finalScore}</span>
              <span className="text-xs text-muted-foreground">/ 900</span>
            </div>
            <Badge className={`text-xs px-3 py-1 rounded-full ${scoreBg} ${scoreColor} border-none font-semibold mt-1`}>
              {scoreTier} Rating
            </Badge>

            <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden mt-4">
              <div
                className={`h-full transition-all duration-300 ${
                  scoreTier === "Excellent" ? "bg-emerald" :
                  scoreTier === "Good" ? "bg-blue" :
                  scoreTier === "Fair" ? "bg-amber" : "bg-rose"
                }`}
                style={{ width: `${((finalScore - 300) / 600) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
              <span>300 (Poor)</span>
              <span>750 (Good)</span>
              <span>900 (Excellent)</span>
            </div>
          </Card>

          {/* 12-month Trend Line */}
          <Card className="p-5 bg-surface">
            <h3 className="text-sm font-semibold mb-4 text-foreground flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-violet" />
              12-Month Score Outlook (Based on simulated behavior)
            </h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.4} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[300, 900]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "11px" }} />
                  <Line type="monotone" dataKey="Score" stroke="var(--foreground)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Recommendation Reports */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Missed payment warning */}
            <Card className="p-4 bg-surface space-y-2 border-l-2 border-rose/70">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose" />
                Vulnerability Note
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {repayment !== "on_time"
                  ? "A single missed credit card bill drop stays on your report for up to 36 months, instantly signaling payment default risks to premium Indian banks."
                  : inquiries > 4
                  ? "Too many loan applications (hard inquiries) signals credit hunger. Financial institutions view this as highly risky planning behavior."
                  : "Your clean payment track is the foundation of high credit scores. Keep this consistent."}
              </p>
            </Card>

            {/* Practical next steps */}
            <Card className="p-4 bg-surface space-y-2 border-l-2 border-emerald/70">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald" />
                Recovery Strategy
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {utilization > 30
                  ? `Try to clear card statements before the generation date to keep your utilization under 30% (ideally under 15%). This gives an immediate score lift.`
                  : "Your card utilization is in the optimal zone. To maximize score gains further, consider expanding credit limits while holding spend flat."}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
