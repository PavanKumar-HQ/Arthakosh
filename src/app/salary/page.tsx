"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { SCENARIOS, getDialogueFlow, PRESSURE_RESPONSES } from "@/lib/engines/salaryScenarios";
import { Scenario, RecruiterArchetype, DialogueNodeId, Compensation, UserChoice } from "@/types/salary";
import {
  TrendingUp,
  MessageSquare,
  Users,
  Shield,
  Lightbulb,
  ArrowRight,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  DollarSign,
  Heart,
  Calendar,
  Layers,
  ArrowUpRight,
  CheckCircle,
  HelpCircle
} from "lucide-react";

export default function SalaryNegotiationPage() {
  // Game state
  const [phase, setPhase] = useState<"setup" | "simulating" | "outcome">("setup");
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [selectedRecruiter, setSelectedRecruiter] = useState<RecruiterArchetype>(SCENARIOS[0].recruiters[0]);
  
  // Simulation live state
  const [currentNodeId, setCurrentNodeId] = useState<DialogueNodeId>("intro");
  const [messages, setMessages] = useState<{ sender: "recruiter" | "user"; text: string; strategyLabel?: string }[]>([]);
  const [leverage, setLeverage] = useState<number>(50);
  const [sentiment, setSentiment] = useState<"Warm" | "Professional" | "Skeptical" | "Annoyed" | "Impatient">("Warm");
  const [stress, setStress] = useState<number>(30);
  const [offeredComp, setOfferedComp] = useState<Compensation>({ base: 0, milestoneReview: false, benefits: [] });
  const [isTyping, setIsTyping] = useState<boolean>(false);
  
  // History for replay
  const [choiceHistory, setChoiceHistory] = useState<{ nodeMessage: string; choice: UserChoice }[]>([]);
  
  // Active selected choice in chat UI (for preview)
  const [previewChoice, setPreviewChoice] = useState<UserChoice | null>(null);

  // Initialize recruiter options when scenario changes
  useEffect(() => {
    setSelectedRecruiter(selectedScenario.recruiters[0]);
  }, [selectedScenario]);

  // Dialogue flow database for current recruiter
  const dialogueFlow = getDialogueFlow(selectedRecruiter);
  const currentNode = dialogueFlow[currentNodeId];

  // Start Simulation
  const startSimulation = () => {
    setPhase("simulating");
    setCurrentNodeId("intro");
    setLeverage(selectedRecruiter.baseLeverage);
    setSentiment("Warm");
    setStress(30);
    setOfferedComp({ ...selectedRecruiter.initialOffer });
    setChoiceHistory([]);
    setPreviewChoice(null);
    setMessages([]);
    
    // Trigger recruiter typing
    setIsTyping(true);
    setTimeout(() => {
      setMessages([
        {
          sender: "recruiter",
          text: dialogueFlow.intro.recruiterMessage
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  // Handle choice submission
  const selectChoice = (choice: UserChoice) => {
    // Add user response to chat log
    setMessages(prev => [...prev, { sender: "user", text: choice.text, strategyLabel: choice.strategyLabel }]);
    setChoiceHistory(prev => [...prev, { nodeMessage: currentNode.recruiterMessage, choice }]);
    
    // Apply metrics impact
    const { leverageChange, sentimentChange, stressChange, baseChange, bonusChange, milestoneSecured, benefitsAdded } = choice.impact;
    
    setLeverage(prev => Math.min(100, Math.max(0, prev + leverageChange)));
    setStress(prev => Math.min(100, Math.max(0, prev + stressChange)));
    
    // Update sentiment
    const newSentiment = determineSentiment(sentiment, sentimentChange);
    setSentiment(newSentiment);

    // Update offered compensation
    setOfferedComp(prev => {
      const nextComp = { ...prev };
      if (baseChange) nextComp.base = Number((nextComp.base + baseChange).toFixed(1));
      if (bonusChange) nextComp.bonus = Number(((nextComp.bonus || 0) + bonusChange).toFixed(1));
      if (milestoneSecured !== undefined) nextComp.milestoneReview = milestoneSecured;
      if (benefitsAdded) {
        nextComp.benefits = Array.from(new Set([...nextComp.benefits, ...benefitsAdded]));
      }
      return nextComp;
    });

    // Reset preview
    setPreviewChoice(null);

    // Branch logic
    if (choice.nextNodeId === "outcome") {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setPhase("outcome");
      }, 1500);
    } else {
      const nextId = choice.nextNodeId as DialogueNodeId;
      setCurrentNodeId(nextId);
      setIsTyping(true);
      
      // Recruiter response delay
      setTimeout(() => {
        const nextNode = dialogueFlow[nextId];
        setMessages(prev => [
          ...prev,
          {
            sender: "recruiter",
            text: nextNode.recruiterMessage
          }
        ]);
        setSentiment(nextNode.recruiterSentiment);
        setIsTyping(false);
      }, 1500);
    }
  };

  // Helper to change sentiment based on delta
  const determineSentiment = (
    current: "Warm" | "Professional" | "Skeptical" | "Annoyed" | "Impatient",
    change: number
  ): "Warm" | "Professional" | "Skeptical" | "Annoyed" | "Impatient" => {
    const scale: ("Annoyed" | "Impatient" | "Skeptical" | "Professional" | "Warm")[] = [
      "Annoyed",
      "Impatient",
      "Skeptical",
      "Professional",
      "Warm"
    ];
    let currentIndex = scale.indexOf(current as any);
    if (change > 15) currentIndex = Math.min(4, currentIndex + 2);
    else if (change > 0) currentIndex = Math.min(4, currentIndex + 1);
    else if (change < -15) currentIndex = Math.max(0, currentIndex - 2);
    else if (change < 0) currentIndex = Math.max(0, currentIndex - 1);
    
    return scale[currentIndex];
  };

  // Helper to color metrics
  const getSentimentColor = (s: string) => {
    switch (s) {
      case "Warm": return "bg-emerald text-emerald-foreground dark:text-emerald";
      case "Professional": return "bg-blue text-blue-foreground dark:text-blue";
      case "Skeptical": return "bg-amber text-amber-foreground dark:text-amber";
      case "Impatient": return "bg-rose text-rose-foreground dark:text-rose";
      case "Annoyed": return "bg-rose text-rose-foreground dark:text-rose font-bold";
      default: return "bg-muted text-muted-foreground";
    }
  };

  // Calculate lifetime compound gains
  const initialBase = selectedRecruiter.initialOffer.base;
  const rawBaseIncrease = Math.max(0, offeredComp.base - initialBase);
  const years = 30;
  const annualCompoundRate = 1.10; // 10% average raise compounding
  const lifetimeValue = Math.round(rawBaseIncrease * ((Math.pow(annualCompoundRate, years) - 1) / 0.10));

  return (
    <div className="container-page py-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <Badge variant="secondary" className="mb-2 px-3 py-1 text-xs">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-violet animate-pulse" />
            Interactive Negotiation Practice
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">Salary Dialogue Simulator</h1>
          <p className="text-muted-foreground text-sm max-w-xl">
            Test strategic messaging and emotional composure against realistic recruiter archetypes.
          </p>
        </div>
        {phase !== "setup" && (
          <button
            onClick={() => setPhase("setup")}
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground border border-border px-3 py-1.5 rounded-lg bg-surface-raised transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Simulator
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* Setup Phase */}
        {phase === "setup" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Select Scenario */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                  1. Select Your Career Scenario
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SCENARIOS.map((scenario) => (
                    <Card
                      key={scenario.id}
                      onClick={() => setSelectedScenario(scenario)}
                      className={`p-5 cursor-pointer border transition-all duration-200 hover:scale-[1.01] hover:shadow-md active:scale-[0.99] group ${
                        selectedScenario.id === scenario.id
                          ? "border-violet ring-2 ring-violet bg-violet/[0.01]"
                          : "border-border hover:border-violet/40"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge variant="outline" className="mb-2 text-xs">
                            {scenario.companyType}
                          </Badge>
                          <h4 className="font-semibold text-base mb-1">{scenario.title}</h4>
                          <p className="text-xs text-muted-foreground mb-4">
                            {scenario.role} • {scenario.experience}
                          </p>
                        </div>
                        {selectedScenario.id === scenario.id ? (
                          <Badge className="bg-violet text-white border-none shadow-sm text-[10px] shrink-0">
                            Active Scenario
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:border-violet/30 transition-opacity shrink-0">
                            Select Scenario
                          </Badge>
                        )}
                      </div>
                      <Separator className="my-3" />
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Initial Offer:</span>
                          <p className="font-medium text-foreground">₹{scenario.initialBase} LPA Base</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Market Range:</span>
                          <p className="font-medium text-foreground">{scenario.marketRange}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Right Column: Select Recruiter */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                  2. Choose Recruiter Archetype
                </h3>
                <div className="space-y-3">
                  {selectedScenario.recruiters.map((recruiter) => (
                    <Card
                      key={recruiter.id}
                      onClick={() => setSelectedRecruiter(recruiter)}
                      className={`p-4 cursor-pointer border transition-all duration-200 hover:scale-[1.01] hover:shadow-md active:scale-[0.99] group ${
                        selectedRecruiter.id === recruiter.id
                          ? "border-violet ring-2 ring-violet bg-violet/[0.01]"
                          : "border-border hover:border-violet/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{recruiter.avatar}</span>
                          <div>
                            <h4 className="font-semibold text-sm">
                              {recruiter.name} — <span className="font-normal text-muted-foreground">{recruiter.role}</span>
                            </h4>
                            <span className="text-xs text-muted-foreground block">{recruiter.company}</span>
                          </div>
                        </div>
                        {selectedRecruiter.id === recruiter.id ? (
                          <Badge className="bg-violet text-white border-none shadow-sm text-[10px] shrink-0">
                            Selected
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] text-muted-foreground opacity-60 group-hover:opacity-100 group-hover:border-violet/30 transition-opacity shrink-0">
                            Choose
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-2.5 bg-accent/40 p-2 rounded-lg">
                        {recruiter.description}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-3 pt-2 border-t border-border/30">
                        <span>Tone: {recruiter.tone.split(",")[0]}</span>
                        <Badge variant="outline" className="text-[10px]">
                          Base Leverage: {recruiter.baseLeverage}%
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Launch Action */}
            <div className="flex justify-center pt-4">
              <button
                onClick={startSimulation}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 active:scale-95 transition-all text-sm shadow-md cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                Start Negotiation Simulation
              </button>
            </div>

            {/* "What should I say" Helper */}
            <div className="border-t border-border/60 pt-8">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-violet" />
                Response Improvement Engine
              </h3>
              <p className="text-muted-foreground text-xs mb-6">
                Understand the psychological impact of different responses to standard high-pressure tactics.
              </p>
              <div className="grid grid-cols-1 gap-6">
                {PRESSURE_RESPONSES.map((item, i) => (
                  <Card key={i} className="p-6 overflow-hidden">
                    <h4 className="font-semibold text-sm text-foreground mb-4 bg-accent/50 p-2.5 rounded-lg border-l-2 border-foreground">
                      {item.situation}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                      <div className="space-y-1">
                        <span className="text-rose font-medium block">❌ Weak Response</span>
                        <p className="text-muted-foreground bg-rose/5 p-3 rounded-lg border border-rose/10">{item.weak}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-amber font-medium block">⚠️ Average Response</span>
                        <p className="text-muted-foreground bg-amber/5 p-3 rounded-lg border border-amber/10">{item.average}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-blue font-medium block">🛡️ Strong Response</span>
                        <p className="text-foreground bg-blue/5 p-3 rounded-lg border border-blue/10 font-medium">{item.strong}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-emerald font-semibold flex items-center gap-1">
                          ✨ Best Strategy
                        </span>
                        <p className="text-foreground bg-emerald/5 p-3 rounded-lg border border-emerald/20 font-medium">{item.best}</p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-surface-raised rounded-lg border border-border/40 text-xs">
                      <span className="font-semibold block mb-1">Why this strategy wins:</span>
                      <p className="text-muted-foreground leading-relaxed">{item.why}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Simulating Phase */}
        {phase === "simulating" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Left Column: Conversational Chat Logs (8 Cols) */}
            <div className="lg:col-span-7 flex flex-col h-[650px] border border-border rounded-2xl bg-surface overflow-hidden shadow-sm">
              {/* Recruiter Header */}
              <div className="flex items-center gap-3 p-4 border-b border-border bg-surface-raised">
                <span className="text-3xl p-1 bg-surface rounded-xl border border-border">{selectedRecruiter.avatar}</span>
                <div>
                  <h4 className="font-semibold text-sm">{selectedRecruiter.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {selectedRecruiter.role} at {selectedRecruiter.company}
                  </p>
                </div>
                <div className="ml-auto">
                  <Badge variant="outline" className="text-xs flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                    Live Interview
                  </Badge>
                </div>
              </div>

              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="max-w-[85%] flex items-start gap-2.5">
                      {msg.sender === "recruiter" && (
                        <span className="text-xl shrink-0 mt-1">{selectedRecruiter.avatar}</span>
                      )}
                      <div>
                        {msg.sender === "user" && msg.strategyLabel && (
                          <span className="text-[10px] text-muted-foreground text-right block mb-1">
                            {msg.strategyLabel}
                          </span>
                        )}
                        <div
                          className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                            msg.sender === "user"
                              ? "bg-foreground text-background rounded-tr-none"
                              : "bg-surface-raised text-foreground rounded-tl-none border border-border/50"
                          }`}
                        >
                          <p>{msg.text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground bg-surface-raised px-4 py-2.5 rounded-full border border-border/40">
                      <span className="animate-bounce">●</span>
                      <span className="animate-bounce delay-100">●</span>
                      <span className="animate-bounce delay-200">●</span>
                      <span>{selectedRecruiter.name} is writing...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Active Choices Selection Area */}
              <div className="border-t border-border p-4 bg-surface-raised/40">
                {!isTyping && currentNode && (
                  <div className="space-y-4">
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                      Choose Your Strategy & Response:
                    </p>
                    <div className="grid grid-cols-1 gap-2.5">
                      {currentNode.choices.map((choice) => (
                        <button
                          key={choice.id}
                          onClick={() => setPreviewChoice(choice)}
                          className={`text-left p-3.5 rounded-xl border text-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-sm active:scale-[0.99] cursor-pointer group ${
                            previewChoice?.id === choice.id
                              ? "border-violet ring-2 ring-violet bg-violet/[0.01] font-medium"
                              : "border-border/60 hover:border-violet/40 hover:bg-surface/50"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-violet font-semibold tracking-wide">
                              {choice.strategyLabel}
                            </span>
                            {previewChoice?.id === choice.id ? (
                              <Badge className="bg-violet text-white border-none text-[9px] h-4 py-0 px-1.5">
                                Active Selection
                              </Badge>
                            ) : (
                              <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                Click to preview
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{choice.text}</p>
                        </button>
                      ))}
                    </div>

                    {/* Preview details and action button */}
                    <AnimatePresence>
                      {previewChoice && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-3 border-t border-border mt-3 space-y-3"
                        >
                          <div className="bg-accent/40 p-3 rounded-lg text-xs leading-relaxed border border-border/40">
                            <span className="font-semibold block mb-0.5 text-foreground">Strategic Analysis:</span>
                            <p className="text-muted-foreground">{previewChoice.feedback}</p>
                          </div>
                          <div className="flex justify-end">
                            <button
                              onClick={() => selectChoice(previewChoice)}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity"
                            >
                              Send Message
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Telemetry Dashboard & Comp Breakdown (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Telemetry Metrics */}
              <Card className="p-5 space-y-4">
                <h3 className="font-bold text-sm border-b border-border/40 pb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-violet" />
                  Psychological Telemetry
                </h3>
                
                {/* Sentiment */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Recruiter Sentiment</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getSentimentColor(sentiment)}`}>
                      {sentiment}
                    </span>
                  </div>
                  <Progress
                    value={
                      sentiment === "Warm" ? 100 :
                      sentiment === "Professional" ? 75 :
                      sentiment === "Skeptical" ? 50 :
                      sentiment === "Impatient" ? 25 : 10
                    }
                    className="h-1.5"
                  />
                </div>

                {/* Leverage */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">User Leverage</span>
                    <span className="font-tabular font-semibold">
                      {leverage}% ({leverage > 75 ? "Dominant" : leverage > 50 ? "Strong" : leverage > 30 ? "Fair" : "Weak"})
                    </span>
                  </div>
                  <Progress value={leverage} className="h-1.5 bg-secondary" />
                </div>

                {/* Stress */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Emotional Stress</span>
                    <span className="font-tabular font-semibold">{stress}%</span>
                  </div>
                  <Progress value={stress} className="h-1.5 bg-secondary" />
                </div>
              </Card>

              {/* Offer Details */}
              <Card className="p-5 space-y-4">
                <h3 className="font-bold text-sm border-b border-border/40 pb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald" />
                    Offered Compensation
                  </span>
                  {offeredComp.base > initialBase && (
                    <Badge className="bg-emerald/10 text-emerald border-emerald/30 text-[10px]">
                      +₹{(offeredComp.base - initialBase).toFixed(1)} LPA
                    </Badge>
                  )}
                </h3>

                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Annual Base Salary:</span>
                    <span className="font-bold text-foreground font-tabular text-sm">
                      ₹{offeredComp.base} LPA
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">One-time Joining Bonus:</span>
                    <span className="font-semibold text-foreground font-tabular">
                      {offeredComp.bonus ? `₹${offeredComp.bonus} Lakh` : "None"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Equity/ESOP Value:</span>
                    <span className="font-semibold text-foreground">
                      {offeredComp.equity || "None"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">6-Month Review Target:</span>
                    <Badge variant={offeredComp.milestoneReview ? "default" : "outline"} className="text-[10px]">
                      {offeredComp.milestoneReview ? "Secured" : "None"}
                    </Badge>
                  </div>

                  <div>
                    <span className="text-muted-foreground block mb-1.5">Standard Perks & Benefits:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {offeredComp.benefits.map((b, i) => (
                        <Badge key={i} variant="secondary" className="text-[10px]">
                          {b}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Interactive Strategy Map indicator */}
              <Card className="p-5">
                <h3 className="font-bold text-sm border-b border-border/40 pb-2 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-violet" />
                  Strategy Map
                </h3>
                <div className="flex flex-col gap-2 text-xs">
                  {[
                    { id: "intro", label: " Psychological Anchoring" },
                    { id: "react_to_offer", label: " Countering Base cash & Justification" },
                    { id: "negotiate_benefits", label: " Pivoting to Perks & Milestone reviews" },
                    { id: "handling_deadline", label: " Composure Under Deadline Pressure" }
                  ].map((phaseItem, index) => {
                    const isActive = currentNodeId === phaseItem.id;
                    const isCompleted = index < ["intro", "react_to_offer", "negotiate_benefits", "handling_deadline"].indexOf(currentNodeId);
                    return (
                      <div
                        key={phaseItem.id}
                        className={`flex items-center gap-2 p-2 rounded-lg border transition-all ${
                          isActive
                            ? "bg-foreground/5 border-foreground/30 font-medium"
                            : isCompleted
                            ? "border-border/30 opacity-60"
                            : "border-transparent opacity-40"
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${isActive ? "bg-violet" : isCompleted ? "bg-emerald" : "bg-muted"}`} />
                        <span className={isActive ? "text-foreground" : "text-muted-foreground"}>
                          {phaseItem.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Outcome Phase */}
        {phase === "outcome" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Negotiation Outcomes & Compound gains (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">Negotiation Summary</h3>
                    <Badge
                      variant="outline"
                      className={
                        offeredComp.base > initialBase + 1.5
                          ? "border-emerald/30 text-emerald bg-emerald/5"
                          : offeredComp.base > initialBase
                          ? "border-blue/30 text-blue bg-blue/5"
                          : "border-rose/30 text-rose bg-rose/5"
                      }
                    >
                      {offeredComp.base > initialBase + 1.5 ? "Master Negotiator" : offeredComp.base > initialBase ? "Optimal Deal" : "Underpaid"}
                    </Badge>
                  </div>
                  
                  {/* Financial results details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center my-6">
                    <div className="p-4 bg-surface-raised rounded-xl border border-border/40">
                      <span className="text-[11px] text-muted-foreground block mb-1">Starting Offer</span>
                      <span className="text-xl font-bold font-tabular text-muted-foreground">₹{initialBase} LPA</span>
                    </div>
                    <div className="p-4 bg-surface-raised rounded-xl border border-border/40">
                      <span className="text-[11px] text-muted-foreground block mb-1">Negotiated Offer</span>
                      <span className="text-xl font-bold font-tabular text-foreground">₹{offeredComp.base} LPA</span>
                    </div>
                    <div className="p-4 bg-emerald/5 rounded-xl border border-emerald/10">
                      <span className="text-[11px] text-emerald block mb-1">Base Cash Increase</span>
                      <span className="text-xl font-bold font-tabular text-emerald">
                        +₹{rawBaseIncrease.toFixed(1)} LPA
                      </span>
                    </div>
                  </div>

                  <Separator className="my-5" />

                  {/* Compounding lifetime math logic details */}
                  <div className="p-4 bg-accent/40 rounded-xl border border-border/30 space-y-2">
                    <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <ArrowUpRight className="w-4 h-4 text-violet" />
                      Lifetime Compound Wealth Impact
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Securing <span className="font-semibold text-foreground">₹{rawBaseIncrease.toFixed(1)} LPA extra</span> now, assuming a standard 10% annual salary growth compounded over a 30-year career, results in a lifetime value of approx:
                    </p>
                    <p className="text-2xl font-bold text-violet font-tabular mt-2">
                      ₹{(lifetimeValue / 100).toFixed(2)} Crores
                    </p>
                    <span className="text-[10px] text-muted-foreground block">
                      *Calculated assuming 10% year-on-year compound raise impact.
                    </span>
                  </div>

                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      onClick={startSimulation}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Practice Again
                    </button>
                    <button
                      onClick={() => setPhase("setup")}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-xs font-semibold text-foreground hover:bg-surface-raised transition-colors"
                    >
                      Choose Another Recruiter
                    </button>
                  </div>
                </Card>
              </div>

              {/* Right Column: Dynamic Replay Timeline Audit (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="p-5">
                  <h3 className="font-bold text-sm border-b border-border/40 pb-2 mb-4 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-violet" />
                    Negotiation Replay Audit
                  </h3>
                  
                  <div className="space-y-5 text-xs">
                    {choiceHistory.map((history, i) => (
                      <div key={i} className="relative pl-4 border-l border-border/60">
                        <div className="absolute top-1 -left-[4.5px] w-2 h-2 rounded-full bg-violet" />
                        <span className="text-[10px] font-semibold text-violet block mb-1">
                          TURN {i + 1}: {history.choice.strategyLabel}
                        </span>
                        <p className="text-muted-foreground italic mb-2">
                          Recruiter: "{history.nodeMessage.length > 60 ? history.nodeMessage.substring(0, 60) + "..." : history.nodeMessage}"
                        </p>
                        <p className="font-medium text-foreground mb-2">
                          Your response: "{history.choice.text}"
                        </p>
                        <div className="bg-surface-raised p-2.5 rounded border border-border/40">
                          <span className="font-semibold block mb-0.5 text-foreground text-[10px]">Feedback Audit:</span>
                          <p className="text-muted-foreground leading-normal">{history.choice.feedback}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Philosophy Footnote */}
      <Card className="p-6 bg-surface-raised border-border/40 max-w-3xl mx-auto mt-12">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-background text-sm font-semibold shrink-0">
            💡
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-1 text-foreground">The Power of Composure</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Negotiation isn't an aggressive wrestling match — it's a collaborative problem-solving exercise. Good recruiters respect candidates who can assertively detail their value, remain composed under pressure, and manage communication timelines professionally.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
