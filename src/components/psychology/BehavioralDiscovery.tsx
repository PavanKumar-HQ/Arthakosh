"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  ArrowRight, 
  Sparkles, 
  Coins, 
  AlertCircle, 
  Users, 
  Compass, 
  ShieldAlert, 
  Smile, 
  ArrowLeft 
} from "lucide-react";
import { UserPsychologyProfile, MoneyPersonalityScore } from "@/types/psychology";

interface BehavioralDiscoveryProps {
  onComplete: (profile: UserPsychologyProfile) => void;
}

interface Question {
  id: number;
  type: "scenario" | "slider" | "multi-select";
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export function BehavioralDiscovery({ onComplete }: BehavioralDiscoveryProps) {
  const [step, setStep] = useState(0); // 0: Intro, 1-5: Questions, 6: Calculating
  const [allocation, setAllocation] = useState<number>(50); // For Q1: Save vs Spend split
  const [anxietyScore, setAnxietyScore] = useState<number>(50); // For Q2: bank checking anxiety
  const [socialPath, setSocialPath] = useState<string | null>(null); // For Q3: peer pressure
  const [triggers, setTriggers] = useState<string[]>([]); // For Q4: emotional triggers
  const [saleMindset, setSaleMindset] = useState<string | null>(null); // For Q5: sale mindset

  const totalSteps = 5;

  const handleTriggerToggle = (trigger: string) => {
    if (triggers.includes(trigger)) {
      setTriggers(triggers.filter((t) => t !== trigger));
    } else {
      setTriggers([...triggers, trigger]);
    }
  };

  const handleNext = () => {
    if (step === totalSteps) {
      setStep(totalSteps + 1);
      // Simulate calculation
      setTimeout(() => {
        calculateResults();
      }, 2000);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const calculateResults = () => {
    // Math to determine scores based on user choices
    // scores range 0-100: discipline, anxiety, social, reward
    
    // Q1: allocation (0 is save all, 100 is spend all)
    // High save -> high discipline
    // High spend -> high reward
    const q1Discipline = 100 - allocation;
    const q1Reward = allocation;

    // Q2: anxietyScore (0 is dread, 100 is confident)
    // Low score -> high anxiety
    const q2Anxiety = 100 - anxietyScore;
    const q2Discipline = anxietyScore * 0.5; // confidence correlates slightly with structure

    // Q3: socialPath
    // 'split' -> moderate social (50), low anxiety
    // 'no-regret' -> low social (20), high discipline (80)
    // 'compromise' -> moderate social (40), balanced (50)
    // 'credit' -> high social (90), high reward (80), high anxiety (60)
    let q3Social = 50;
    let q3Discipline = 50;
    let q3Reward = 50;
    let q3Anxiety = 50;

    if (socialPath === "split") {
      q3Social = 70;
      q3Anxiety = 40;
    } else if (socialPath === "no-regret") {
      q3Social = 20;
      q3Discipline = 80;
    } else if (socialPath === "compromise") {
      q3Social = 50;
      q3Discipline = 60;
    } else if (socialPath === "credit") {
      q3Social = 90;
      q3Reward = 80;
      q3Anxiety = 70;
      q3Discipline = 20;
    }

    // Q4: triggers (Boredom, Stress, FOMO, Celebrating, Inadequacy, Marketing)
    // Each selected trigger adds to reward and/or anxiety and/or social
    let q4Reward = 40;
    let q4Anxiety = 30;
    let q4Social = 30;
    
    if (triggers.includes("Boredom")) q4Reward += 15;
    if (triggers.includes("Stress")) q4Anxiety += 20;
    if (triggers.includes("FOMO")) q4Social += 25;
    if (triggers.includes("Celebrating")) q4Reward += 15;
    if (triggers.includes("Inadequacy")) { q4Anxiety += 15; q4Reward += 15; }
    if (triggers.includes("Marketing")) q4Reward += 10;

    // Q5: saleMindset
    // 'buy-now' -> reward (85), discipline (30)
    // 'ignore' -> discipline (90), reward (15)
    // 'cart-wait' -> discipline (75), reward (40)
    // 'worry' -> anxiety (80), discipline (50)
    let q5Reward = 50;
    let q5Discipline = 50;
    let q5Anxiety = 30;

    if (saleMindset === "buy-now") {
      q5Reward = 85;
      q5Discipline = 30;
    } else if (saleMindset === "ignore") {
      q5Discipline = 90;
      q5Reward = 15;
    } else if (saleMindset === "cart-wait") {
      q5Discipline = 80;
      q5Reward = 45;
    } else if (saleMindset === "worry") {
      q5Anxiety = 80;
      q5Discipline = 60;
    }

    // Average them out and cap at 100
    const discipline = Math.min(100, Math.max(10, Math.round((q1Discipline + q2Discipline + q3Discipline + q5Discipline) / 4)));
    const anxiety = Math.min(100, Math.max(10, Math.round((q2Anxiety + q3Anxiety + q4Anxiety + q5Anxiety) / 4)));
    const social = Math.min(100, Math.max(10, Math.round((q3Social + q4Social) / 2)));
    const reward = Math.min(100, Math.max(10, Math.round((q1Reward + q3Reward + q4Reward + q5Reward) / 4)));

    const scores: MoneyPersonalityScore = { discipline, anxiety, social, reward };

    // Determine dominant trait
    let dominantTrait: UserPsychologyProfile["dominantTrait"] = "balanced";
    const maxScore = Math.max(discipline, anxiety, social, reward);
    
    if (maxScore - Math.min(discipline, anxiety, social, reward) < 15) {
      dominantTrait = "balanced";
    } else if (maxScore === discipline) {
      dominantTrait = "disciplined";
    } else if (maxScore === anxiety) {
      dominantTrait = "anxious";
    } else if (maxScore === social) {
      dominantTrait = "social";
    } else if (maxScore === reward) {
      dominantTrait = "reward-driven";
    }

    const profile: UserPsychologyProfile = {
      scores,
      dominantTrait,
      lastAssessmentDate: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    onComplete(profile);
  };

  return (
    <Card className="relative w-full max-w-2xl mx-auto overflow-hidden bg-background/50 border-border/40 backdrop-blur-xl shadow-2xl p-6 sm:p-10 flex flex-col min-h-[500px]">
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      {step > 0 && step <= totalSteps && (
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-violet">{step}</span>
            <span className="text-xs text-muted-foreground">/</span>
            <span className="text-xs text-muted-foreground">{totalSteps}</span>
          </div>
          <div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-violet"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col items-center justify-center text-center my-auto py-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-violet/10 text-violet flex items-center justify-center mb-6">
              <Brain className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Discover Your Money Personality
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md mb-8 leading-relaxed">
              We all carry unconscious scripts, emotions, and habits around money. Take this 3-minute interactive reflection to understand your core drivers without judgement.
            </p>
            <Button
              onClick={handleNext}
              className="h-11 px-6 bg-violet hover:bg-violet-hover text-white rounded-xl shadow-lg shadow-violet/20 flex items-center gap-2 group transition-all"
            >
              Begin Discovery Flow
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="q1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col flex-grow"
          >
            <div className="flex items-center gap-2 mb-2 text-violet">
              <Coins className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">The Windfall Test</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">
              You receive an unexpected ₹20,000 cash bonus.
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              How does your brain instinctively want to divide it? Drag the slider to adjust your split.
            </p>

            <div className="bg-accent/40 border border-border/50 rounded-2xl p-6 mb-8 mt-4">
              <div className="flex items-center justify-between mb-8">
                <div className="text-left">
                  <span className="block text-xs text-muted-foreground font-medium uppercase mb-1">Save & Invest</span>
                  <span className="text-2xl font-bold text-emerald">₹{((100 - allocation) * 200).toLocaleString("en-IN")}</span>
                  <span className="block text-[10px] text-muted-foreground mt-1">({100 - allocation}%)</span>
                </div>
                <div className="text-right">
                  <span className="block text-xs text-muted-foreground font-medium uppercase mb-1">Spend & Celebrate</span>
                  <span className="text-2xl font-bold text-violet">₹{(allocation * 200).toLocaleString("en-IN")}</span>
                  <span className="block text-[10px] text-muted-foreground mt-1">({allocation}%)</span>
                </div>
              </div>

              <Slider
                value={[allocation]}
                onValueChange={(val) => {
                  const value = Array.isArray(val) ? val[0] : val;
                  setAllocation(value);
                }}
                max={100}
                step={5}
                className="my-6"
              />

              <div className="text-xs text-muted-foreground text-center italic">
                {allocation <= 20 && "Prioritizing long-term safety and financial growth."}
                {allocation > 20 && allocation <= 50 && "Balanced mix of building leverage and rewarding yourself."}
                {allocation > 50 && allocation <= 80 && "Prioritizing present experience and life enrichment."}
                {allocation > 80 && "Leaning heavily into immediate celebration and lifestyle joy."}
              </div>
            </div>

            <Button
              onClick={handleNext}
              className="mt-auto h-11 bg-violet hover:bg-violet-hover text-white rounded-xl flex items-center gap-2 justify-center"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="q2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col flex-grow"
          >
            <div className="flex items-center gap-2 mb-2 text-violet">
              <ShieldAlert className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">The Balance Check</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">
              How do you feel when opening your banking app?
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Drag the slider to represent your typical emotional state when checking your finances.
            </p>

            <div className="bg-accent/40 border border-border/50 rounded-2xl p-6 mb-8 mt-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-semibold text-muted-foreground">ANXIETY & AVOIDANCE</span>
                <span className="text-xs font-semibold text-muted-foreground">CALM & CONTROL</span>
              </div>

              <Slider
                value={[anxietyScore]}
                onValueChange={(val) => {
                  const value = Array.isArray(val) ? val[0] : val;
                  setAnxietyScore(value);
                }}
                max={100}
                step={1}
                className="my-6"
              />

              <div className="flex justify-between items-center text-[10px] text-muted-foreground mt-2">
                <span>"I avoid looking for weeks"</span>
                <span>"I know my numbers exactly"</span>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-background/50 border border-border/40 text-center">
                <p className="text-sm font-semibold text-foreground">
                  {anxietyScore < 30 && "Anxiety / Avoidance Script"}
                  {anxietyScore >= 30 && anxietyScore <= 70 && "Healthy awareness with minor friction"}
                  {anxietyScore > 70 && "Vigilant / Highly Organized"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {anxietyScore < 30 && "Thinking about balances causes stress, leading to delays in checking statements."}
                  {anxietyScore >= 30 && anxietyScore <= 70 && "You check as needed but it is not a defining part of your mood."}
                  {anxietyScore > 70 && "You track numbers closely, deriving comfort from structure and order."}
                </p>
              </div>
            </div>

            <Button
              onClick={handleNext}
              className="mt-auto h-11 bg-violet hover:bg-violet-hover text-white rounded-xl flex items-center gap-2 justify-center"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="q3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col flex-grow"
          >
            <div className="flex items-center gap-2 mb-2 text-violet">
              <Users className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">The Social Scenario</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">
              Your close group suggests a weekend getaway.
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              The cost will push you past your comfortable monthly budget limit. What is your actual choice?
            </p>

            <div className="space-y-2 mb-6">
              {[
                {
                  id: "split",
                  title: "Go and split expenses equally",
                  desc: "Say yes immediately. You don't want to miss out or look stingy, even if it hurts your bank statement later.",
                  icon: <Smile className="w-4 h-4 text-violet" />
                },
                {
                  id: "no-regret",
                  title: "Politely decline the trip",
                  desc: "Say 'I can't make this one, budget is tight right now'. You prioritize financial boundaries over peer FOMO.",
                  icon: <Coins className="w-4 h-4 text-emerald" />
                },
                {
                  id: "compromise",
                  title: "Propose a budget-friendly option",
                  desc: "Offer an alternative or ask to skip the high-end dinner but join the rest. You seek a middle ground.",
                  icon: <Compass className="w-4 h-4 text-amber" />
                },
                {
                  id: "credit",
                  title: "Go and charge it to credit",
                  desc: "Go and ignore the stress. You'll deal with the debt next month. The memories are worth the stress.",
                  icon: <AlertCircle className="w-4 h-4 text-rose" />
                }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSocialPath(opt.id)}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-150 flex gap-3 items-start ${
                    socialPath === opt.id
                      ? "border-violet bg-violet/5 ring-1 ring-violet"
                      : "border-border/60 hover:border-border hover:bg-accent/30"
                  }`}
                >
                  <div className="mt-0.5 shrink-0">{opt.icon}</div>
                  <div>
                    <span className="font-semibold block mb-0.5">{opt.title}</span>
                    <span className="text-xs text-muted-foreground leading-relaxed">{opt.desc}</span>
                  </div>
                </button>
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={!socialPath}
              className="mt-auto h-11 bg-violet hover:bg-violet-hover text-white rounded-xl flex items-center gap-2 justify-center"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="q4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col flex-grow"
          >
            <div className="flex items-center gap-2 mb-2 text-violet">
              <Brain className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">The Emotional Triggers</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">
              Which triggers lead to your unexpected spending?
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Select all that apply to you honestly. This represents how external events affect your internal math.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { name: "Boredom", desc: "Browsing apps/stores when empty" },
                { name: "Stress", desc: "A bad day at work or tough meeting" },
                { name: "FOMO", desc: "Seeing others post trips or upgrades" },
                { name: "Celebrating", desc: "Any win means spending money" },
                { name: "Inadequacy", desc: "Splurging to feel valuable or confident" },
                { name: "Marketing", desc: "Limited-time offers or discount emails" }
              ].map((trigger) => {
                const selected = triggers.includes(trigger.name);
                return (
                  <button
                    key={trigger.name}
                    onClick={() => handleTriggerToggle(trigger.name)}
                    className={`text-left p-4 rounded-xl border text-sm transition-all duration-150 ${
                      selected
                        ? "border-violet bg-violet/5 ring-1 ring-violet"
                        : "border-border/60 hover:border-border hover:bg-accent/20"
                    }`}
                  >
                    <span className="font-semibold block mb-0.5">{trigger.name}</span>
                    <span className="text-xs text-muted-foreground">{trigger.desc}</span>
                  </button>
                );
              })}
            </div>

            <Button
              onClick={handleNext}
              className="mt-auto h-11 bg-violet hover:bg-violet-hover text-white rounded-xl flex items-center gap-2 justify-center"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="q5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col flex-grow"
          >
            <div className="flex items-center gap-2 mb-2 text-violet">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">The Sale Illusion</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">
              A ₹5,000 item you've desired has a 24h flash sale for ₹3,000.
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              What is the dominant internal voice driving your action?
            </p>

            <div className="space-y-2 mb-6">
              {[
                {
                  id: "buy-now",
                  title: "Buy immediately. I just saved ₹2,000!",
                  desc: "Focus on the savings and the excitement of the deal rather than the net ₹3,000 outflow."
                },
                {
                  id: "ignore",
                  title: "Ignore it. If I didn't plan it, it's a ₹3,000 cost",
                  desc: "Strict logical boundary. Saving ₹2,000 on something unplanned is still spending ₹3,000."
                },
                {
                  id: "cart-wait",
                  title: "Add to cart, wait 24 hours",
                  desc: "Create a friction buffer. If the desire is still there tomorrow, proceed. If the sale ends, so be it."
                },
                {
                  id: "worry",
                  title: "Buy it, then feel guilt about it later",
                  desc: "You yield to the flash sale pressure but immediately experience transaction regret."
                }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSaleMindset(opt.id)}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-150 ${
                    saleMindset === opt.id
                      ? "border-violet bg-violet/5 ring-1 ring-violet"
                      : "border-border/60 hover:border-border hover:bg-accent/30"
                  }`}
                >
                  <span className="font-semibold block mb-0.5">{opt.title}</span>
                  <span className="text-xs text-muted-foreground leading-relaxed">{opt.desc}</span>
                </button>
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={!saleMindset}
              className="mt-auto h-11 bg-violet hover:bg-violet-hover text-white rounded-xl flex items-center gap-2 justify-center"
            >
              Analyze Behavioral Patterns <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {step === 6 && (
          <motion.div
            key="calculating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center my-auto py-12"
          >
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full border-4 border-violet/20 border-t-violet animate-spin" />
              <Brain className="w-6 h-6 text-violet absolute inset-0 m-auto" />
            </div>
            <h3 className="text-lg font-bold mb-2">Analyzing Money Mindset Matrix...</h3>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              Evaluating cognitive biases, emotional thresholds, and systemic behaviors.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
