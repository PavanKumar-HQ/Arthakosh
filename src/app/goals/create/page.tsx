"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useGoalsStore } from "@/lib/store/goals";
import { GoalCategory, GoalPriority, RiskComfort } from "@/types";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/constants";
import { ArrowLeft, ArrowRight, Shield, Plane, GraduationCap, Rocket, Heart, Home, Smartphone, Palmtree, Briefcase } from "lucide-react";

// --- TEMPLATES ---
const goalTemplates = [
  { id: "emergency-fund", name: "Emergency Fund", icon: "🛡️", color: "#059669", desc: "Build financial safety for unexpected situations." },
  { id: "travel", name: "Travel Fund", icon: "✈️", color: "#2563EB", desc: "Plan your dream trip without credit card debt." },
  { id: "education", name: "Education / MBA", icon: "🎓", color: "#7C3AED", desc: "Invest in your career growth and skills." },
  { id: "career_break", name: "Career Break", icon: "💼", color: "#4F46E5", desc: "Plan time away from work without financial stress." },
  { id: "wedding", name: "Wedding", icon: "💍", color: "#E11D48", desc: "Celebrate your big day with clarity." },
  { id: "home", name: "Home Down Payment", icon: "🏠", color: "#059669", desc: "Build equity for your dream home." },
  { id: "gadgets", name: "Laptop / Gadgets", icon: "💻", color: "#6B7280", desc: "Upgrade tech without relying on EMIs." },
  { id: "parents", name: "Parents Support", icon: "❤️", color: "#D97706", desc: "Ensure medical and living security for parents." },
  { id: "retirement", name: "Retirement", icon: "🌴", color: "#0F766E", desc: "Long-term financial independence." },
  { id: "startup", name: "Startup Runway", icon: "🚀", color: "#EA580C", desc: "Capital to launch your own venture." },
];

export default function CreateGoalPage() {
  const router = useRouter();
  const addGoal = useGoalsStore((state) => state.addGoal);

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);

  // Form State for Step 2
  const [targetAmount, setTargetAmount] = useState<number>(500000);
  const [timeline, setTimeline] = useState<number>(24);
  const [currentSavings, setCurrentSavings] = useState<number>(0);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(10000);
  const [priority, setPriority] = useState<GoalPriority>("important");
  const [riskComfort, setRiskComfort] = useState<RiskComfort>("balanced");

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    // Set sensible defaults based on template
    if (template.id === "emergency-fund") {
      setTargetAmount(300000);
      setTimeline(12);
      setRiskComfort("conservative");
      setPriority("essential");
    } else if (template.id === "retirement") {
      setTargetAmount(20000000);
      setTimeline(360);
      setRiskComfort("growth_oriented");
      setPriority("essential");
    } else if (template.id === "travel") {
      setTargetAmount(150000);
      setTimeline(12);
      setRiskComfort("conservative");
      setPriority("aspirational");
    }
    setStep(2);
  };

  const handleSaveGoal = () => {
    if (!selectedTemplate) return;
    addGoal({
      name: selectedTemplate.name,
      category: selectedTemplate.id as GoalCategory,
      targetAmount,
      currentSavings,
      monthlyContribution,
      timeline,
      priority,
      riskComfort,
      inflationRate: 6, // Default India inflation
      color: selectedTemplate.color,
      icon: selectedTemplate.icon,
    });
    router.push("/goals");
  };

  return (
    <div className="container-page py-8 sm:py-12 max-w-4xl mx-auto">
      <div className="mb-8">
        <button 
          onClick={() => step === 1 ? router.push("/goals") : setStep(1)}
          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {step === 1 ? "Back to Dashboard" : "Back to Categories"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedSection>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">What are you planning for?</h1>
              <p className="text-muted-foreground mb-8">Financial clarity starts with one meaningful goal.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {goalTemplates.map((template) => (
                  <Card 
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className="p-5 card-hover cursor-pointer border border-border/50 hover:border-foreground/20 flex flex-col items-start text-left bg-surface-raised/30"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3" style={{ backgroundColor: `${template.color}15` }}>
                      {template.icon}
                    </div>
                    <h3 className="font-semibold mb-1">{template.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{template.desc}</p>
                  </Card>
                ))}
              </div>
            </AnimatedSection>
          </motion.div>
        )}

        {step === 2 && selectedTemplate && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border/50">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ backgroundColor: `${selectedTemplate.color}15` }}>
                {selectedTemplate.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{selectedTemplate.name}</h1>
                <p className="text-muted-foreground text-sm mt-1">Configure your target and timeline</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                {/* Inputs */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold">Target Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₹</span>
                    <input 
                      type="number"
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(Number(e.target.value))}
                      className="w-full bg-surface-raised/50 border border-border rounded-xl py-3 pl-8 pr-4 font-tabular focus-ring"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold">Timeline (Months)</label>
                  <input 
                    type="range"
                    min="1" max="360"
                    value={timeline}
                    onChange={(e) => setTimeline(Number(e.target.value))}
                    className="w-full accent-foreground"
                  />
                  <div className="flex justify-between text-xs font-medium text-muted-foreground">
                    <span>{timeline} months</span>
                    <span>{timeline >= 12 ? `${(timeline / 12).toFixed(1)} years` : ''}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold">Current Savings</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₹</span>
                    <input 
                      type="number"
                      value={currentSavings}
                      onChange={(e) => setCurrentSavings(Number(e.target.value))}
                      className="w-full bg-surface-raised/50 border border-border rounded-xl py-3 pl-8 pr-4 font-tabular focus-ring"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold">Monthly Contribution</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₹</span>
                    <input 
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                      className="w-full bg-surface-raised/50 border border-border rounded-xl py-3 pl-8 pr-4 font-tabular focus-ring"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">How much can you comfortably save each month?</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Behavioral Inputs */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold">Priority Level</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "essential", label: "Essential" },
                      { id: "important", label: "Important" },
                      { id: "aspirational", label: "Aspirational" },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPriority(p.id as GoalPriority)}
                        className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                          priority === p.id 
                            ? "bg-foreground text-background border-foreground" 
                            : "bg-surface-raised/30 border-border/50 text-muted-foreground hover:bg-surface-raised"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold">Risk Comfort</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: "conservative", label: "Conservative", desc: "Protect capital. Safe instruments like FDs." },
                      { id: "balanced", label: "Balanced", desc: "Moderate growth with some market exposure." },
                      { id: "growth_oriented", label: "Growth-Oriented", desc: "Maximize returns via equities. Higher volatility." },
                    ].map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setRiskComfort(r.id as RiskComfort)}
                        className={`p-3 text-left rounded-xl border transition-all ${
                          riskComfort === r.id 
                            ? "bg-accent/50 border-foreground/30 ring-1 ring-foreground/20" 
                            : "bg-surface-raised/30 border-border/50 hover:bg-surface-raised"
                        }`}
                      >
                        <p className={`text-sm font-semibold ${riskComfort === r.id ? "text-foreground" : "text-foreground/80"}`}>{r.label}</p>
                        <p className="text-xs text-muted-foreground mt-1">{r.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <button 
                    onClick={handleSaveGoal}
                    className="w-full py-4 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-foreground/10 flex items-center justify-center gap-2"
                  >
                    Start Planning
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    You can adjust these values anytime. Our intelligent engine will guide you along the way.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
