"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Activity, Sparkles, ArrowRight } from "lucide-react";

export default function ScenariosRedirectPage() {
  return (
    <div className="container-page py-16 sm:py-24 text-center min-h-[calc(100vh-6rem)] flex flex-col justify-center items-center relative">
      {/* Background decoration */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-tr from-violet-500/5 to-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <AnimatedSection className="max-w-md space-y-6">
        <div className="w-16 h-16 bg-violet/10 text-violet rounded-3xl flex items-center justify-center mx-auto shadow-inner">
          <Activity className="w-8 h-8 animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 justify-center">
            <Sparkles className="w-3.5 h-3.5 text-amber" />
            <Badge className="bg-violet/10 text-violet border-none px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Environment Upgrade
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Decision Labs Active
          </h1>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed">
          Real-Life Scenarios have evolved into the **Financial Decision Labs** portal. Explore branching scenarios, consequence telemetries, and your dynamic **Confidence Matrix**.
        </p>

        <Link href="/labs" className="block">
          <Button className="w-full h-11 bg-violet hover:bg-violet-hover text-white rounded-xl shadow-lg shadow-violet/15 flex items-center justify-center gap-2">
            Enter Decision Labs Portal <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </AnimatedSection>
    </div>
  );
}
