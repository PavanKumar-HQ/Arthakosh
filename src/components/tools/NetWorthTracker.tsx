"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CurrencyInput } from "@/components/shared/CurrencyInput";
import { ResultCard } from "@/components/shared/ResultCard";
import { calculateNetWorth } from "@/lib/calculators";
import { formatCurrency } from "@/lib/constants";
import { Plus, Trash2 } from "lucide-react";

interface Item {
  id: string;
  name: string;
  amount: number;
}

export function NetWorthTracker() {
  const [assets, setAssets] = useState<Item[]>([
    { id: "1", name: "Savings Account", amount: 200000 },
    { id: "2", name: "Mutual Funds", amount: 150000 },
    { id: "3", name: "PPF", amount: 100000 },
  ]);
  const [liabilities, setLiabilities] = useState<Item[]>([
    { id: "1", name: "Education Loan", amount: 300000 },
  ]);

  const result = calculateNetWorth(assets, liabilities);

  const addItem = (type: "asset" | "liability") => {
    const newItem = { id: Date.now().toString(), name: "", amount: 0 };
    if (type === "asset") setAssets((prev) => [...prev, newItem]);
    else setLiabilities((prev) => [...prev, newItem]);
  };

  const removeItem = (type: "asset" | "liability", id: string) => {
    if (type === "asset") setAssets((prev) => prev.filter((i) => i.id !== id));
    else setLiabilities((prev) => prev.filter((i) => i.id !== id));
  };

  const updateItem = (type: "asset" | "liability", id: string, field: "name" | "amount", value: string | number) => {
    const updater = (items: Item[]) => items.map((i) => (i.id === id ? { ...i, [field]: value } : i));
    if (type === "asset") setAssets(updater);
    else setLiabilities(updater);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Net Worth Tracker</h1>
        <p className="text-sm text-muted-foreground">Calculate your total net worth — assets minus liabilities</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <ResultCard label="Total Assets" value={result.totalAssets} />
        <ResultCard label="Total Liabilities" value={result.totalLiabilities} />
        <ResultCard
          label="Net Worth"
          value={result.netWorth}
          highlight={result.netWorth > 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-emerald">Assets (What you own)</h3>
            <button onClick={() => addItem("asset")} className="p-1 rounded-md hover:bg-accent transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {assets.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateItem("asset", item.id, "name", e.target.value)}
                  placeholder="Asset name"
                  className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
                <CurrencyInput
                  value={item.amount}
                  onChange={(v) => updateItem("asset", item.id, "amount", v)}
                  className="w-36"
                />
                <button onClick={() => removeItem("asset", item.id)} className="p-1.5 rounded-md text-muted-foreground hover:text-rose hover:bg-rose/10 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Liabilities */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-rose">Liabilities (What you owe)</h3>
            <button onClick={() => addItem("liability")} className="p-1 rounded-md hover:bg-accent transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {liabilities.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateItem("liability", item.id, "name", e.target.value)}
                  placeholder="Liability name"
                  className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
                <CurrencyInput
                  value={item.amount}
                  onChange={(v) => updateItem("liability", item.id, "amount", v)}
                  className="w-36"
                />
                <button onClick={() => removeItem("liability", item.id)} className="p-1.5 rounded-md text-muted-foreground hover:text-rose hover:bg-rose/10 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {liabilities.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No liabilities — great position! 🎉</p>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-4 bg-accent/30 border-border/30 mt-6">
        <p className="text-sm leading-relaxed">
          <span className="font-semibold">💡 Track this quarterly.</span>{" "}
          Net worth is the single most important number in personal finance.
          If it&apos;s growing every quarter, you&apos;re doing well — regardless of income fluctuations.
        </p>
      </Card>
    </div>
  );
}
