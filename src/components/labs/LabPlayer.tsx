"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ShieldAlert, 
  Coins, 
  Percent, 
  Heart, 
  ArrowRight, 
  RotateCcw,
  Zap,
  Info
} from "lucide-react";
import { LabScenario, LabNode, LabChoice, LabTelemetry } from "@/types/labs";
import { formatCurrency } from "@/lib/constants";

interface LabPlayerProps {
  scenario: LabScenario;
  onComplete: (telemetry: LabTelemetry, pathHistory: string[]) => void;
  onExit: () => void;
}

export function LabPlayer({ scenario, onComplete, onExit }: LabPlayerProps) {
  const [currentNodeId, setCurrentNodeId] = useState("start");
  const [history, setHistory] = useState<string[]>([]);
  const [telemetry, setTelemetry] = useState<LabTelemetry>(scenario.initialTelemetry);
  const [hoveredChoice, setHoveredChoice] = useState<LabChoice | null>(null);

  const currentNode = scenario.nodes.find((n) => n.id === currentNodeId);

  if (!currentNode) return null;

  const handleChoice = (choice: LabChoice) => {
    // Apply changes
    const changes = choice.telemetryChange;
    setTelemetry((prev) => ({
      cashReserves: Math.max(0, prev.cashReserves + (changes.cash || 0)),
      debtPressure: Math.min(100, Math.max(0, prev.debtPressure + (changes.debt || 0))),
      stressLevel: Math.min(100, Math.max(0, prev.stressLevel + (changes.stress || 0))),
      flexibilityMargin: Math.min(100, Math.max(0, prev.flexibilityMargin + (changes.flexibility || 0)))
    }));

    setHistory((prev) => [...prev, currentNodeId]);
    
    if (choice.nextNodeId === "end" || choice.nextNodeId === "finish") {
      // Complete lab
      onComplete(telemetry, [...history, currentNodeId]);
    } else {
      setCurrentNodeId(choice.nextNodeId);
    }
  };

  const handleRestart = () => {
    setHistory([]);
    setCurrentNodeId("start");
    setTelemetry(scenario.initialTelemetry);
    setHoveredChoice(null);
  };

  // Preview helper
  const getPreviewTelemetry = (): LabTelemetry => {
    if (!hoveredChoice) return telemetry;
    const changes = hoveredChoice.telemetryChange;
    return {
      cashReserves: Math.max(0, telemetry.cashReserves + (changes.cash || 0)),
      debtPressure: Math.min(100, Math.max(0, telemetry.debtPressure + (changes.debt || 0))),
      stressLevel: Math.min(100, Math.max(0, telemetry.stressLevel + (changes.stress || 0))),
      flexibilityMargin: Math.min(100, Math.max(0, telemetry.flexibilityMargin + (changes.flexibility || 0)))
    };
  };

  const preview = getPreviewTelemetry();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Left Pane: Decision Node & Storytelling (7 cols) */}
      <Card className="lg:col-span-7 p-6 bg-background/50 border-border/40 backdrop-blur-xl flex flex-col justify-between min-h-[500px]">
        <div>
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/20">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Simulation Node: {currentNode.title}
            </span>
            <button 
              onClick={handleRestart}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Restart Lab
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentNodeId}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {currentNode.narrative}
              </p>

              {/* Dynamic Consequence Block */}
              {currentNode.consequence && (
                <div className="p-4 rounded-xl bg-violet-500/[0.02] border border-violet/10 space-y-3 mt-4">
                  <div className="flex items-center gap-2 text-violet">
                    <Info className="w-4 h-4" />
                    <h4 className="text-xs font-bold uppercase tracking-wider">Consequence Breakdown</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="block text-muted-foreground font-semibold">Immediate:</span>
                      <span className="text-foreground">{currentNode.consequence.financialImpact}</span>
                    </div>
                    <div>
                      <span className="block text-muted-foreground font-semibold">Tradeoff:</span>
                      <span className="text-foreground">{currentNode.consequence.tradeoff}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {currentNode.consequence.explanation}
                  </p>
                  <div className="p-2.5 rounded-lg bg-amber-500/[0.03] border border-amber-500/10 text-xs">
                    <span className="font-bold text-amber">Strategic Rule:</span> {currentNode.consequence.lesson}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Choices buttons container */}
        <div className="mt-8 space-y-3">
          {currentNode.isEnd ? (
            <Button
              onClick={() => onComplete(telemetry, [...history, currentNodeId])}
              className="w-full h-11 bg-emerald hover:bg-emerald-hover text-white rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              Complete Simulation & Review <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                Required Strategic Decision:
              </p>
              {currentNode.choices?.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice)}
                  onMouseEnter={() => setHoveredChoice(choice)}
                  onMouseLeave={() => setHoveredChoice(null)}
                  className="w-full text-left p-4 rounded-xl border transition-all duration-200 hover:border-violet hover:bg-violet/[0.02] flex justify-between items-start gap-4"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-0.5">{choice.label}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{choice.description}</p>
                  </div>
                  <Badge className={`text-[10px] border px-2 py-0.5 rounded-full shrink-0 ${
                    choice.impact === "positive" ? "text-emerald bg-emerald/10 border-emerald/20" :
                    choice.impact === "negative" ? "text-rose-500 bg-rose-500/10 border-rose-500/20" :
                    "text-amber bg-amber/10 border-amber/20"
                  }`}>
                    {choice.impact}
                  </Badge>
                </button>
              ))}
            </>
          )}
        </div>
      </Card>

      {/* Right Pane: Live Telemetry & Consequence Modeler (5 cols) */}
      <Card className="lg:col-span-5 p-6 bg-background/50 border-border/40 backdrop-blur-xl flex flex-col justify-between">
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 pb-4 border-b border-border/20">
            Consequence Simulator
          </h3>
          <p className="text-[11px] text-muted-foreground mb-6">
            Hover over options to preview their strategic impact on your telemetry assets before committing.
          </p>

          <div className="space-y-6">
            {/* Metric 1: Cash */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 text-muted-foreground font-semibold">
                  <Coins className="w-3.5 h-3.5 text-emerald" /> Cash Reserves
                </span>
                <span className="font-extrabold text-foreground">
                  {formatCurrency(preview.cashReserves)}
                  {hoveredChoice?.telemetryChange.cash && (
                    <span className={`text-[10px] ml-1.5 font-bold ${
                      hoveredChoice.telemetryChange.cash > 0 ? "text-emerald" : "text-rose-500"
                    }`}>
                      ({hoveredChoice.telemetryChange.cash > 0 ? "+" : ""}
                      {hoveredChoice.telemetryChange.cash.toLocaleString("en-IN")})
                    </span>
                  )}
                </span>
              </div>
              <Progress value={Math.min(100, (preview.cashReserves / 200000) * 100)} className="h-1 bg-muted" />
            </div>

            {/* Metric 2: Debt */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 text-muted-foreground font-semibold">
                  <Zap className="w-3.5 h-3.5 text-rose-500" /> Debt Pressure
                </span>
                <span className="font-extrabold text-foreground">
                  {preview.debtPressure}/100
                  {hoveredChoice?.telemetryChange.debt !== undefined && (
                    <span className={`text-[10px] ml-1.5 font-bold ${
                      hoveredChoice.telemetryChange.debt > 0 ? "text-rose-500" : "text-emerald"
                    }`}>
                      ({hoveredChoice.telemetryChange.debt > 0 ? "+" : ""}
                      {hoveredChoice.telemetryChange.debt})
                    </span>
                  )}
                </span>
              </div>
              <Progress value={preview.debtPressure} className="h-1 bg-muted" />
            </div>

            {/* Metric 3: Stress */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 text-muted-foreground font-semibold">
                  <Heart className="w-3.5 h-3.5 text-rose" /> Stress Level
                </span>
                <span className="font-extrabold text-foreground">
                  {preview.stressLevel}/100
                  {hoveredChoice?.telemetryChange.stress !== undefined && (
                    <span className={`text-[10px] ml-1.5 font-bold ${
                      hoveredChoice.telemetryChange.stress > 0 ? "text-rose" : "text-emerald"
                    }`}>
                      ({hoveredChoice.telemetryChange.stress > 0 ? "+" : ""}
                      {hoveredChoice.telemetryChange.stress})
                    </span>
                  )}
                </span>
              </div>
              <Progress value={preview.stressLevel} className="h-1 bg-muted" />
            </div>

            {/* Metric 4: Flexibility */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-1.5 text-muted-foreground font-semibold">
                  <Percent className="w-3.5 h-3.5 text-amber" /> Flexibility Margin
                </span>
                <span className="font-extrabold text-foreground">
                  {preview.flexibilityMargin}%
                  {hoveredChoice?.telemetryChange.flexibility !== undefined && (
                    <span className={`text-[10px] ml-1.5 font-bold ${
                      hoveredChoice.telemetryChange.flexibility > 0 ? "text-emerald" : "text-rose-500"
                    }`}>
                      ({hoveredChoice.telemetryChange.flexibility > 0 ? "+" : ""}
                      {hoveredChoice.telemetryChange.flexibility}%)
                    </span>
                  )}
                </span>
              </div>
              <Progress value={preview.flexibilityMargin} className="h-1 bg-muted" />
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-accent/40 border border-border/30 text-[10px] text-muted-foreground mt-8">
          The goal is to maintain balanced levels. Sacrificing long-term flexibility for short-term cash reserves creates systemic vulnerabilities.
        </div>
      </Card>
    </div>
  );
}

// Simple fallback Button if component imports are stripped
function Button({ children, className, ...props }: any) {
  return (
    <button
      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
