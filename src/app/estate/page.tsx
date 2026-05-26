"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AnimatedSection, StaggerChildren, StaggerItem } from "@/components/shared/AnimatedSection";
import {
  Shield,
  FileText,
  Users,
  Heart,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Phone,
  Building,
  Smartphone,
} from "lucide-react";

const checklist = [
  { id: "1", title: "Write a Will", category: "essential" as const, description: "A will ensures your assets go to whom you intend. Without one, Indian succession laws decide — which may not match your wishes.", actionItems: ["Consult a lawyer or use a registered will service", "List all assets: bank accounts, property, investments, digital assets", "Name an executor who you trust", "Register the will (recommended but not mandatory in India)", "Store copies with executor and a trusted family member"], completed: false },
  { id: "2", title: "Update All Nominees", category: "essential" as const, description: "Nominees are NOT the same as legal heirs. They're custodians of your assets until legal heirs claim them. Still, correct nominees prevent delays.", actionItems: ["Bank accounts — update nominee in passbook/net banking", "Mutual funds — update via AMC or registrar", "Insurance policies — verify nominee details", "PPF / EPF / NPS — check and update if needed", "Demat account — update nominee via your broker"], completed: false },
  { id: "3", title: "Life Insurance Review", category: "essential" as const, description: "Do you have enough cover? A pure term plan is the cheapest way to protect your family's financial future.", actionItems: ["Calculate coverage needed: 10-15× annual income", "Review existing policies — are they adequate?", "Get a term plan if you don't have one", "Ensure your spouse/parents know about the policies", "Keep policy documents accessible"], completed: false },
  { id: "4", title: "Health Insurance for Family", category: "essential" as const, description: "Medical emergencies are the #1 cause of financial distress in Indian families.", actionItems: ["Get a family floater of at least ₹10L", "Consider a super top-up for extra coverage", "Add parents under a separate policy if needed", "Keep cashless hospital list bookmarked", "Review policy annually during renewal"], completed: false },
  { id: "5", title: "Emergency Contact Document", category: "important" as const, description: "A single document that your family can access in case of emergency. Think of it as a 'break glass' document.", actionItems: ["List all bank accounts with branch and contact details", "List all insurance policies with claim numbers", "Include login credentials for critical accounts (in sealed envelope)", "Add contact details of lawyer, CA, financial advisor", "Include a brief summary of all assets and liabilities"], completed: false },
  { id: "6", title: "Digital Asset Inventory", category: "important" as const, description: "Email accounts, social media, crypto wallets, online banking — your digital life needs a succession plan too.", actionItems: ["List all email accounts", "Document important subscriptions and services", "Set up Google Inactive Account Manager or Apple Digital Legacy", "If you hold crypto, document wallet access procedures", "Share access instructions with a trusted person"], completed: false },
  { id: "7", title: "Power of Attorney", category: "recommended" as const, description: "A PoA allows a trusted person to manage your finances if you're incapacitated. Essential for NRIs and elderly parents.", actionItems: ["Decide between General PoA and Specific PoA", "Choose someone you trust completely", "Get it notarized and registered", "Review and update periodically"], completed: false },
];

export default function EstatePage() {
  const [items, setItems] = useState(checklist);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => item.id === id ? { ...item, completed: !item.completed } : item)
    );
  };

  const completedCount = items.filter((i) => i.completed).length;
  const progress = Math.round((completedCount / items.length) * 100);

  const categoryColors = {
    essential: "text-rose border-rose/30 bg-rose/10",
    important: "text-amber border-amber/30 bg-amber/10",
    recommended: "text-blue-accent border-blue-accent/30 bg-blue-accent/10",
  };

  return (
    <div className="container-page py-8 sm:py-12">
      <AnimatedSection className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Estate & Legacy Planning</h1>
        <p className="text-muted-foreground max-w-xl">
          Simple, practical steps to protect your family and assets. It&apos;s not about wealth — it&apos;s about responsibility.
        </p>
      </AnimatedSection>

      {/* Progress */}
      <AnimatedSection className="mb-8">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Your Checklist Progress</h3>
            <span className="text-sm font-bold font-tabular">{completedCount}/{items.length}</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {progress === 100
              ? "🎉 All items checked! Review annually."
              : `${items.length - completedCount} items remaining. Start with essentials.`}
          </p>
        </Card>
      </AnimatedSection>

      {/* Checklist */}
      <StaggerChildren className="space-y-3">
        {items.map((item) => (
          <StaggerItem key={item.id}>
            <Card className={`overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.005] border-border/60 hover:border-violet/40 ${item.completed ? "opacity-70" : ""}`}>
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                      item.completed ? "bg-emerald border-emerald" : "border-border hover:border-foreground"
                    }`}
                  >
                    {item.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </button>
                  <div 
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="flex-1 cursor-pointer select-none group"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`text-sm font-semibold group-hover:text-violet transition-colors ${item.completed ? "line-through" : ""}`}>
                        {item.title}
                      </h3>
                      <Badge className={`text-xs ${categoryColors[item.category]}`}>
                        {item.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                  <button
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="p-1.5 rounded-md hover:bg-accent transition-colors shrink-0 cursor-pointer"
                  >
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expandedId === item.id ? "rotate-180" : ""}`} />
                  </button>
                </div>

                {expandedId === item.id && (
                  <div className="mt-4 ml-9 pt-4 border-t border-border/30">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Action Items
                    </h4>
                    <div className="space-y-2">
                      {item.actionItems.map((action, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-muted-foreground mt-0.5 shrink-0">{i + 1}.</span>
                          <span className="text-muted-foreground">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>

      {/* Key message */}
      <AnimatedSection className="mt-8">
        <Card className="p-5 bg-accent/30 border-border/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold mb-1">Why This Matters at Every Age</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Estate planning isn&apos;t just for the wealthy or elderly. If you have a bank account, a phone, or people who depend on you — you need a plan. The average time to settle an intestate estate in India is 5-10 years. A simple will and updated nominees can reduce this to weeks.
              </p>
            </div>
          </div>
        </Card>
      </AnimatedSection>
    </div>
  );
}
