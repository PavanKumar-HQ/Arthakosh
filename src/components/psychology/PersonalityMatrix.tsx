"use client";

import React from "react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  HelpCircle,
  Lightbulb,
  Sparkles
} from "lucide-react";
import { UserPsychologyProfile, MoneyPersonalityScore } from "@/types/psychology";

interface PersonalityMatrixProps {
  profile: UserPsychologyProfile;
  onRetake: () => void;
}

export function PersonalityMatrix({ profile, onRetake }: PersonalityMatrixProps) {
  const { scores, dominantTrait, lastAssessmentDate } = profile;

  const chartData = [
    { subject: "Discipline", score: scores.discipline, fullMark: 100 },
    { subject: "Anxiety", score: scores.anxiety, fullMark: 100 },
    { subject: "Social Influences", score: scores.social, fullMark: 100 },
    { subject: "Reward Seeking", score: scores.reward, fullMark: 100 },
  ];

  const traitDetails = {
    disciplined: {
      title: "The Strategic Guardian",
      subtitle: "Secures the future, but risks under-living the present.",
      description: "You excel at saving, tracking, and delaying gratification. Your discipline protects you from market cycles, but a high score here can sometimes translate into scarcity fear or hesitation to invest in experiences that enrich your life.",
      strengths: ["Highly structured", "Frictionless impulse control", "Strong compound awareness"],
      challenges: ["Guilt when spending", "Analysis paralysis in investments", "Reflexive frugality"],
      cognitiveShift: "Shift from 'How much can I save?' to 'How can this money build a life I don't need to escape from?'"
    },
    anxious: {
      title: "The Vigilant Sentinel",
      subtitle: "Vigilance driven by worry. Systems are your therapy.",
      description: "Money occupies significant mental energy for you. Whether you have ₹10,000 or ₹10 Lakhs, checking balances feels stressful. You are risk-aware, but anxiety can cause you to hold excessive cash in low-yield accounts or avoid key decisions.",
      strengths: ["Emergency-prepared", "Conservative planner", "High detail orientation"],
      challenges: ["Avoidance behaviors", "Inflation-drag on idle cash", "Sleep-affecting financial stress"],
      cognitiveShift: "Shift from 'What if everything goes wrong?' to 'I have automated safety nets to absorb shocks.'"
    },
    social: {
      title: "The Connection Catalyst",
      subtitle: "Community-driven spending. Vulnerable to lifestyle comparison.",
      description: "You view money as a tool for connection and relationship building. While generous and social, you are susceptible to peer pressure and lifestyle comparison (online or offline), occasionally spending to maintain alignment with others.",
      strengths: ["Generous friend", "Highly collaborative", "Values shared experiences"],
      challenges: ["FOMO spend spikes", "Splitting bills to avoid friction", "Social lifestyle creep"],
      cognitiveShift: "Shift from 'What will they think of my choices?' to 'True friends value my presence, not my spending capacity.'"
    },
    "reward-driven": {
      title: "The Dopamine Explorer",
      subtitle: "Seeks immediate enrichment. Balance joy with structural boundaries.",
      description: "You prioritize present-day joy and experiences. Money flows easily to purchase treats, comfort, and experiences. You value living fully, but are vulnerable to emotional shopping spikes when stressed or celebrating.",
      strengths: ["Lives in the present", "Values self-investment", "Low scarcity stress"],
      challenges: ["Inconsistent savings", "Credit balance accumulation", "Post-purchase dopamine drop"],
      cognitiveShift: "Shift from 'I earned this reward today' to 'My future self also deserves security and freedom.'"
    },
    balanced: {
      title: "The Adaptive Mind",
      subtitle: "Maintains a fluid, healthy relationship with money.",
      description: "You show balanced indicators. You save without excessive guilt, treat yourself without long-term damage, and manage social spending pressures reasonably well. Your task is to continue refining and automating systems.",
      strengths: ["Flexibility", "Low emotional volatility", "Intentional spending"],
      challenges: ["Compromising system rules", "Lack of high-conviction goals", "Potential drift"],
      cognitiveShift: "Shift from 'I am doing fine' to 'How can I optimize and build generational leverage?'"
    }
  };

  const details = traitDetails[dominantTrait];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Visual Chart Card */}
      <Card className="lg:col-span-5 p-6 bg-background/50 border-border/40 backdrop-blur-xl h-[420px] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-violet" />
              <h3 className="font-bold text-sm">Mindset Matrix</h3>
            </div>
            <span className="text-[10px] text-muted-foreground">Updated: {lastAssessmentDate}</span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Your scores mapped across four behavioral dimensions. A balanced shape indicates high adaptability.
          </p>
        </div>

        <div className="w-full h-[220px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
              <PolarGrid stroke="rgba(124, 58, 237, 0.15)" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: 'var(--muted-foreground)', fontSize: 10, fontWeight: 500 }}
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

        <div className="flex justify-between items-center text-xs mt-4">
          <button 
            onClick={onRetake}
            className="text-muted-foreground hover:text-foreground underline underline-offset-4"
          >
            Retake assessment
          </button>
          <div className="flex gap-2">
            {Object.entries(scores).map(([key, val]) => (
              <span key={key} className="text-[10px] bg-accent/60 px-1.5 py-0.5 rounded border border-border/40">
                <span className="capitalize text-muted-foreground">{key[0]}:</span> {val}
              </span>
            ))}
          </div>
        </div>
      </Card>

      {/* Narrative Card */}
      <Card className="lg:col-span-7 p-6 bg-background/50 border-border/40 backdrop-blur-xl space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <Badge className="bg-violet/10 text-violet border-none px-3 py-1 rounded-full text-xs font-semibold">
              Dominant Archetype
            </Badge>
          </div>
          <h2 className="text-xl font-bold tracking-tight">{details.title}</h2>
          <p className="text-xs text-muted-foreground italic mt-0.5">{details.subtitle}</p>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {details.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Behavioral Strengths</h4>
            <ul className="space-y-1.5">
              {details.strengths.map((str, idx) => (
                <li key={idx} className="text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0" />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Subconscious Friction</h4>
            <ul className="space-y-1.5">
              {details.challenges.map((chal, idx) => (
                <li key={idx} className="text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
                  <span>{chal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-violet/5 border border-violet/10 flex gap-3 items-start">
          <Sparkles className="w-4 h-4 text-violet shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-violet uppercase tracking-wider mb-1">Cognitive Intervention</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{details.cognitiveShift}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
