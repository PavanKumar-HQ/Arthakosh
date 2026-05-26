"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBag, 
  Smile, 
  TrendingUp, 
  ArrowRight, 
  HelpCircle, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  TrendingDown, 
  Zap 
} from "lucide-react";
import { ReflectionLog, EmotionalState } from "@/types/psychology";

// Default initial logs to populate the visualization
const initialLogs: ReflectionLog[] = [
  {
    id: "1",
    date: "2026-05-24",
    item: "Designer Smart Watch",
    amount: 18500,
    prePurchaseEmotion: "stressed",
    postPurchaseEmotion: "inadequate",
    regretLevel: "high",
    wasPlanned: false,
    notes: "Had a rough review cycle. Bought it to feel professional, but now dreading the credit card bill."
  },
  {
    id: "2",
    date: "2026-05-20",
    item: "Premium Leather Shoes",
    amount: 6500,
    prePurchaseEmotion: "bored",
    postPurchaseEmotion: "neutral",
    regretLevel: "moderate",
    wasPlanned: false,
    notes: "Scrolled through Instagram during a slow Sunday afternoon."
  },
  {
    id: "3",
    date: "2026-05-18",
    item: "Mutual Fund Investment",
    amount: 15000,
    prePurchaseEmotion: "neutral",
    postPurchaseEmotion: "happy",
    regretLevel: "none",
    wasPlanned: true,
    notes: "Monthly SIP. Always feels reassuring to pay my future self."
  },
  {
    id: "4",
    date: "2026-05-15",
    item: "Celebratory Dinner",
    amount: 5400,
    prePurchaseEmotion: "celebratory",
    postPurchaseEmotion: "happy",
    regretLevel: "none",
    wasPlanned: true,
    notes: "Celebrated promotions with friends. Planned for in monthly social budget."
  }
];

export function EmotionalSpendingEngine() {
  const [logs, setLogs] = useState<ReflectionLog[]>(initialLogs);
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [preEmotion, setPreEmotion] = useState<EmotionalState>("neutral");
  const [postEmotion, setPostEmotion] = useState<EmotionalState>("neutral");
  const [wasPlanned, setWasPlanned] = useState<boolean>(false);
  const [notes, setNotes] = useState("");

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item || !amount) return;

    const newLog: ReflectionLog = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      item,
      amount: parseFloat(amount),
      prePurchaseEmotion: preEmotion,
      postPurchaseEmotion: postEmotion,
      regretLevel: postEmotion === "inadequate" || postEmotion === "stressed" ? "high" : 
                    preEmotion === "bored" && postEmotion === "neutral" ? "moderate" : "none",
      wasPlanned,
      notes
    };

    setLogs([newLog, ...logs]);
    setItem("");
    setAmount("");
    setPreEmotion("neutral");
    setPostEmotion("neutral");
    setWasPlanned(false);
    setNotes("");
  };

  const handleDeleteLog = (id: string) => {
    setLogs(logs.filter((l) => l.id !== id));
  };

  // Metrics calculations
  const totalSpent = logs.reduce((acc, curr) => acc + curr.amount, 0);
  const unplannedSpent = logs.filter(l => !l.wasPlanned).reduce((acc, curr) => acc + curr.amount, 0);
  const unplannedPct = totalSpent > 0 ? Math.round((unplannedSpent / totalSpent) * 100) : 0;

  // Emotional spends
  const emotionalSpends = logs.filter(l => !l.wasPlanned && l.prePurchaseEmotion !== "neutral");
  const emotionalSpentAmount = emotionalSpends.reduce((acc, curr) => acc + curr.amount, 0);

  // Group by pre-purchase emotion
  const emotionGroups = logs.reduce((acc, log) => {
    if (!log.wasPlanned) {
      acc[log.prePurchaseEmotion] = (acc[log.prePurchaseEmotion] || 0) + log.amount;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Telemetry metrics bar */}
        <Card className="flex-1 p-4 bg-background/40 border-border/30 backdrop-blur-md grid grid-cols-3 gap-4 text-center">
          <div>
            <span className="block text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Unplanned Drag</span>
            <span className="text-xl font-extrabold text-foreground">₹{unplannedSpent.toLocaleString("en-IN")}</span>
            <span className="block text-[9px] text-rose-400 mt-0.5">({unplannedPct}% of tracked)</span>
          </div>
          <div className="border-x border-border/30">
            <span className="block text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Emotional Spend</span>
            <span className="text-xl font-extrabold text-rose-500">₹{emotionalSpentAmount.toLocaleString("en-IN")}</span>
            <span className="block text-[9px] text-muted-foreground mt-0.5">{emotionalSpends.length} occurrences</span>
          </div>
          <div>
            <span className="block text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Planned Habits</span>
            <span className="text-xl font-extrabold text-emerald">₹{logs.filter(l => l.wasPlanned).reduce((acc, cur) => acc + cur.amount, 0).toLocaleString("en-IN")}</span>
            <span className="block text-[9px] text-emerald-400 mt-0.5">SIP / Needs</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Logger input */}
        <Card className="lg:col-span-5 p-5 bg-background/50 border-border/40 backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingBag className="w-5 h-5 text-rose-500" />
            <h3 className="font-bold text-sm">Emotional Spending Journal</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Log transactions to create a "behavioral mirror" of your shopping habits and feelings.
          </p>

          <form onSubmit={handleAddLog} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-muted-foreground">Purchase Item</label>
              <Input
                placeholder="e.g. Designer Jacket, Online food delivery"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                className="bg-accent/40 border-border/50 text-sm h-9 rounded-lg"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">Amount (₹)</label>
                <Input
                  type="number"
                  placeholder="₹"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-accent/40 border-border/50 text-sm h-9 rounded-lg"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">Planned Buy?</label>
                <div className="flex gap-2 h-9 items-center">
                  <button
                    type="button"
                    onClick={() => setWasPlanned(true)}
                    className={`flex-1 text-xs py-1.5 px-3 rounded-lg border transition-all ${
                      wasPlanned 
                        ? "bg-emerald/10 border-emerald text-emerald font-semibold"
                        : "bg-accent/30 border-border/40 text-muted-foreground"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setWasPlanned(false)}
                    className={`flex-1 text-xs py-1.5 px-3 rounded-lg border transition-all ${
                      !wasPlanned 
                        ? "bg-rose-500/10 border-rose-500 text-rose-500 font-semibold"
                        : "bg-accent/30 border-border/40 text-muted-foreground"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">Pre-buy State</label>
                <select
                  value={preEmotion}
                  onChange={(e) => setPreEmotion(e.target.value as EmotionalState)}
                  className="w-full bg-accent/40 border border-border/50 text-xs h-9 rounded-lg px-2 text-foreground focus:outline-none focus:ring-1 focus:ring-violet"
                >
                  <option value="neutral">😐 Neutral</option>
                  <option value="stressed">😰 Stressed</option>
                  <option value="bored">🥱 Bored</option>
                  <option value="anxious">😟 Anxious</option>
                  <option value="lonely">👤 Lonely</option>
                  <option value="celebratory">🎉 Celebrating</option>
                  <option value="tired">🥱 Tired</option>
                  <option value="inadequate">😔 Inadequate</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">Post-buy State</label>
                <select
                  value={postEmotion}
                  onChange={(e) => setPostEmotion(e.target.value as EmotionalState)}
                  className="w-full bg-accent/40 border border-border/50 text-xs h-9 rounded-lg px-2 text-foreground focus:outline-none focus:ring-1 focus:ring-violet"
                >
                  <option value="neutral">😐 Neutral</option>
                  <option value="happy">😊 Happy / Satisfied</option>
                  <option value="stressed">😰 Stressed / Guilty</option>
                  <option value="inadequate">😔 Regretful / Empty</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-muted-foreground">Self-Reflection Note (Optional)</label>
              <textarea
                placeholder="What triggered this purchase? What were you trying to solve?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-accent/40 border border-border/50 text-xs rounded-lg p-2 text-foreground h-16 focus:outline-none focus:ring-1 focus:ring-violet resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-9 bg-rose-500 hover:bg-rose-600 text-white rounded-lg flex items-center gap-1.5 justify-center text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" /> Log Reflection
            </Button>
          </form>
        </Card>

        {/* Behavioral logs visualization & list */}
        <Card className="lg:col-span-7 p-5 bg-background/50 border-border/40 backdrop-blur-xl flex flex-col justify-between h-[450px]">
          <div className="overflow-y-auto space-y-3.5 flex-grow pr-1">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Logged Purchase Reflections</h4>
            {logs.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center py-12 text-xs text-muted-foreground">
                No logs recorded yet. Begin by writing down your last transaction.
              </div>
            ) : (
              logs.map((log) => {
                const isEmotionalSwing = log.prePurchaseEmotion !== "neutral" && log.postPurchaseEmotion !== "happy";
                return (
                  <div 
                    key={log.id} 
                    className={`p-3.5 rounded-xl border flex justify-between gap-4 transition-all relative group ${
                      log.wasPlanned 
                        ? "bg-emerald-500/[0.02] border-emerald-500/10 hover:border-emerald-500/20"
                        : "bg-rose-500/[0.02] border-rose-500/10 hover:border-rose-500/20"
                    }`}
                  >
                    <div className="space-y-1.5 flex-grow">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-foreground">{log.item}</span>
                        <Badge className={`text-[9px] border-none px-2 py-0.5 rounded-full ${
                          log.wasPlanned ? "bg-emerald/10 text-emerald" : "bg-rose-500/10 text-rose-500"
                        }`}>
                          {log.wasPlanned ? "Planned" : "Unplanned"}
                        </Badge>
                        {isEmotionalSwing && (
                          <Badge className="bg-amber/10 text-amber text-[9px] border-none px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Zap className="w-2.5 h-2.5" /> Dopamine Dip
                          </Badge>
                        )}
                      </div>
                      
                      {log.notes && (
                        <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                          "{log.notes}"
                        </p>
                      )}

                      <div className="flex gap-4 text-[10px] text-muted-foreground pt-1">
                        <span>Pre: <b className="capitalize text-foreground">{log.prePurchaseEmotion}</b></span>
                        <span>Post: <b className="capitalize text-foreground">{log.postPurchaseEmotion}</b></span>
                        <span>Date: <b>{log.date}</b></span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-end shrink-0">
                      <span className="text-xs font-extrabold text-foreground">₹{log.amount.toLocaleString("en-IN")}</span>
                      <button
                        onClick={() => handleDeleteLog(log.id)}
                        className="text-muted-foreground hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 p-1"
                        title="Delete log"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Emotional diagnostics alert */}
          {logs.length > 0 && Object.keys(emotionGroups).length > 0 && (
            <div className="mt-4 p-3 rounded-xl bg-rose-500/[0.03] border border-rose-500/10 flex gap-2 items-center text-xs">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="text-muted-foreground">
                Your highest unplanned spend is triggered when feeling <b className="text-foreground capitalize">{
                  Object.entries(emotionGroups).sort((a, b) => b[1] - a[1])[0]?.[0]
                }</b>.
              </span>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
