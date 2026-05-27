"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AnimatedSection, StaggerChildren, StaggerItem } from "@/components/shared/AnimatedSection";
import { 
  Brain, 
  ShoppingBag, 
  Hourglass, 
  HelpCircle, 
  Sparkles, 
  RotateCcw,
  BookOpen
} from "lucide-react";
import { BehavioralDiscovery } from "@/components/psychology/BehavioralDiscovery";
import { PersonalityMatrix } from "@/components/psychology/PersonalityMatrix";
import { EmotionalSpendingEngine } from "@/components/psychology/EmotionalSpendingEngine";
import { ReflectionMirror } from "@/components/psychology/ReflectionMirror";
import { UserPsychologyProfile } from "@/types/psychology";

// Mock baseline profile for demo purposes (can be set to null to force survey)
const defaultProfile: UserPsychologyProfile = {
  scores: {
    discipline: 75,
    anxiety: 45,
    social: 55,
    reward: 60
  },
  dominantTrait: "balanced",
  lastAssessmentDate: "26 May 2026"
};

export default function PsychologyPage() {
  const [profile, setProfile] = useState<UserPsychologyProfile | null>(null);
  const [activeTab, setActiveTab] = useState<"matrix" | "spending" | "buffer">("matrix");

  // Load from localStorage if present
  useEffect(() => {
    const saved = localStorage.getItem("user_psychology_profile");
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Error reading profile", e);
      }
    }
  }, []);

  const handleCompleteAssessment = (newProfile: UserPsychologyProfile) => {
    setProfile(newProfile);
    localStorage.setItem("user_psychology_profile", JSON.stringify(newProfile));
  };

  const handleRetake = () => {
    setProfile(null);
    localStorage.removeItem("user_psychology_profile");
  };

  return (
    <div className="container-page py-8 sm:py-12 relative">
      {/* Background decoration */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-tr from-violet-500/5 to-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <AnimatedSection className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <Badge className="bg-violet/10 text-violet border-none hover:bg-violet/25 flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full">
              <Brain className="w-3.5 h-3.5" /> Behavioral Intelligence
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Financial Psychology
          </h1>
          <p className="text-muted-foreground max-w-xl text-sm sm:text-base leading-relaxed">
            Your bank statement reflects your emotions. Explore your cognitive money profile and build systems to manage spending impulses and anxieties.
          </p>
        </div>
      </AnimatedSection>

      {!profile ? (
        <AnimatedSection className="w-full">
          <BehavioralDiscovery onComplete={handleCompleteAssessment} />
        </AnimatedSection>
      ) : (
        <div className="space-y-8">
          {/* Custom Tabs Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/30 pb-4">
            <div className="flex gap-2 sm:gap-3 overflow-x-auto no-scrollbar p-1">
              {[
                { id: "matrix", label: "Mindset Matrix", icon: <Brain className="w-4 h-4" /> },
                { id: "spending", label: "Emotional Journal", icon: <ShoppingBag className="w-4 h-4" /> },
                { id: "buffer", label: "Impulse Buffer", icon: <Hourglass className="w-4 h-4" /> }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap shadow-sm border ${
                      isActive 
                        ? "bg-foreground text-background border-foreground shadow-md" 
                        : "bg-background text-muted-foreground border-border hover:border-violet/40 hover:bg-violet/5 hover:text-foreground"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={handleRetake}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-3 py-1.5 hover:bg-accent/40 rounded-lg transition-all"
              title="Retake Assessment"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Profile</span>
            </button>
          </div>

          {/* Render Tab Content */}
          <div className="transition-all duration-300">
            {activeTab === "matrix" && (
              <AnimatedSection key="matrix">
                <PersonalityMatrix profile={profile} onRetake={handleRetake} />
              </AnimatedSection>
            )}

            {activeTab === "spending" && (
              <AnimatedSection key="spending">
                <EmotionalSpendingEngine />
              </AnimatedSection>
            )}

            {activeTab === "buffer" && (
              <AnimatedSection key="buffer">
                <ReflectionMirror />
              </AnimatedSection>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
