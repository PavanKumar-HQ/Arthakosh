"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Hourglass, 
  Coins, 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  HelpCircle,
  PiggyBank
} from "lucide-react";

interface SavedPurchase {
  id: string;
  item: string;
  amount: number;
  date: string;
}

export function ReflectionMirror() {
  const [itemName, setItemName] = useState("");
  const [cost, setCost] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("50000"); // Default 50k
  const [workingHours, setWorkingHours] = useState(160); // Default 160 hours/month
  const [savedPurchases, setSavedPurchases] = useState<SavedPurchase[]>([
    { id: "1", item: "Premium Coffee Espresso Machine", amount: 14500, date: "2026-05-10" },
    { id: "2", item: "Designer Brand Sunglass", amount: 6000, date: "2026-05-05" }
  ]);

  const [activeItem, setActiveItem] = useState<{ name: string; cost: number } | null>(null);

  const handleStartReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName || !cost) return;
    setActiveItem({ name: itemName, cost: parseFloat(cost) });
  };

  const handleSavePurchase = () => {
    if (!activeItem) return;
    const saved: SavedPurchase = {
      id: Date.now().toString(),
      item: activeItem.name,
      amount: activeItem.cost,
      date: new Date().toISOString().split("T")[0]
    };
    setSavedPurchases([saved, ...savedPurchases]);
    setActiveItem(null);
    setItemName("");
    setCost("");
  };

  const handleDiscardReflection = () => {
    setActiveItem(null);
  };

  // Math conversions
  const monthlySalaryNum = parseFloat(monthlyIncome) || 50000;
  const hoursNum = workingHours || 160;
  const hourlyWage = Math.round(monthlySalaryNum / hoursNum);
  
  const activeCost = activeItem?.cost || 0;
  const laborHoursRequired = hourlyWage > 0 ? Math.round(activeCost / hourlyWage) : 0;

  // Opportunity cost at 10% annual returns in 5 years (multiplier ~ 1.61)
  const opportunityCost5Yr = Math.round(activeCost * Math.pow(1 + 0.10, 5));
  const compoundGain = opportunityCost5Yr - activeCost;

  const totalSaved = savedPurchases.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Interactive Reflection Input */}
      <Card className="lg:col-span-5 p-5 bg-background/50 border-border/40 backdrop-blur-xl space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Hourglass className="w-5 h-5 text-amber" />
          <h3 className="font-bold text-sm">The 48h Impulse Buffer</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Before clicking "Buy" on any non-essential purchase, run it through the cognitive filter to break the instant gratification loop.
        </p>

        {!activeItem ? (
          <form onSubmit={handleStartReflection} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-muted-foreground">Desired Item Name</label>
              <Input
                placeholder="e.g. Wireless Headphones, Mechanical Keyboard"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="bg-accent/40 border-border/50 text-sm h-9 rounded-lg"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-muted-foreground">Estimated Cost (₹)</label>
              <Input
                type="number"
                placeholder="₹"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="bg-accent/40 border-border/50 text-sm h-9 rounded-lg"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">Monthly Take-home</label>
                <Input
                  type="number"
                  placeholder="₹"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  className="bg-accent/40 border-border/50 text-sm h-9 rounded-lg"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">Working Hours/Month</label>
                <Input
                  type="number"
                  placeholder="Hours"
                  value={workingHours}
                  onChange={(e) => setWorkingHours(parseInt(e.target.value) || 160)}
                  className="bg-accent/40 border-border/50 text-sm h-9 rounded-lg"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-9 bg-amber hover:bg-amber-hover text-white rounded-lg flex items-center gap-1.5 justify-center text-xs font-semibold"
            >
              Analyze Desired Purchase <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-accent/40 border border-border/50 rounded-xl text-center">
              <span className="block text-[10px] text-muted-foreground uppercase font-bold">Evaluating</span>
              <span className="block text-sm font-bold mt-0.5">{activeItem.name}</span>
              <span className="text-lg font-extrabold text-amber">₹{activeItem.cost.toLocaleString("en-IN")}</span>
            </div>

            <div className="space-y-3">
              {/* Metric 1: Hourly labor exchange */}
              <div className="p-3.5 rounded-xl bg-background/50 border border-border/40 flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-foreground">The Labor Tradeoff</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">
                    At your take-home rate (₹{hourlyWage}/hr), this item represents spending <b className="text-foreground">{laborHoursRequired} working hours</b> of your life force.
                  </p>
                </div>
              </div>

              {/* Metric 2: Compound potential */}
              <div className="p-3.5 rounded-xl bg-background/50 border border-border/40 flex items-start gap-3">
                <TrendingUp className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-foreground">The Compound Cost</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">
                    If instead you invested this money at a standard 10% rate, it would grow to <b className="text-foreground">₹{opportunityCost5Yr.toLocaleString("en-IN")}</b> in 5 years (a potential gain of ₹{compoundGain.toLocaleString("en-IN")}).
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleSavePurchase}
                className="flex-1 h-9 bg-emerald hover:bg-emerald-hover text-white rounded-lg text-xs font-semibold flex items-center gap-1 justify-center"
              >
                <ShieldCheck className="w-4 h-4" /> I will skip & save it
              </Button>
              <Button
                onClick={handleDiscardReflection}
                variant="outline"
                className="flex-1 h-9 border-border/50 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-accent/40 rounded-lg"
              >
                Reset Filter
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Impulse Saved Dashboard */}
      <Card className="lg:col-span-7 p-5 bg-background/50 border-border/40 backdrop-blur-xl flex flex-col justify-between h-[450px]">
        <div className="space-y-4 flex-grow overflow-y-auto pr-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Impulse Purchases Deflected</h4>
            <Badge className="bg-emerald/10 text-emerald border-none text-xs font-semibold px-2 py-0.5 rounded-full">
              Safe Zone
            </Badge>
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/[0.02] border border-emerald-500/10 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald/10 text-emerald flex items-center justify-center shrink-0">
              <PiggyBank className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Total Deflected Flow</span>
              <span className="text-xl font-extrabold text-emerald">₹{totalSaved.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="space-y-2.5">
            {savedPurchases.length === 0 ? (
              <div className="text-center text-xs text-muted-foreground py-10">
                You have not deferred any items yet. Try running an item through the filter.
              </div>
            ) : (
              savedPurchases.map((p) => (
                <div key={p.id} className="p-3 bg-accent/35 border border-border/40 rounded-xl flex justify-between items-center text-xs">
                  <div>
                    <span className="font-semibold text-foreground block">{p.item}</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5">{p.date}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-emerald">+ ₹{p.amount.toLocaleString("en-IN")}</span>
                    <span className="block text-[9px] text-muted-foreground mt-0.5">Kept in leverage</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-3 bg-accent/40 rounded-xl border border-border/50 text-[11px] text-muted-foreground flex gap-2 items-center">
          <HelpCircle className="w-4 h-4 text-amber shrink-0" />
          <span>Each item deflected prevents instant dopamine fatigue and builds real financial margin.</span>
        </div>
      </Card>
    </div>
  );
}
