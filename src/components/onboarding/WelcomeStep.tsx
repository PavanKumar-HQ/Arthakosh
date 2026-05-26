"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, ShieldCheck, HeartPulse } from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="max-w-xl mx-auto flex flex-col items-center justify-center text-center py-10 px-4 sm:px-6"
    >
      <div className="relative mb-8">
        <div className="w-16 h-16 rounded-3xl bg-violet/10 text-violet flex items-center justify-center">
          <HeartPulse className="w-8 h-8" />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald/10 text-emerald rounded-full flex items-center justify-center">
          <Sparkles className="w-3 h-3 animate-pulse" />
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
        Financial clarity starts with understanding your life.
      </h1>
      
      <p className="text-muted-foreground text-sm sm:text-base mb-8 leading-relaxed max-w-md">
        This platform adapts to your unique financial reality. We focus on goals, emotions, and practical boundaries to build a calm, resilient system.
      </p>

      <div className="w-full max-w-sm space-y-3.5 mb-10 text-left">
        {[
          "No aggressive sales pitches or corporate jargon",
          "Adapts to your current life stage and stress levels",
          "100% confidential. Your data maps your pathway, nothing else."
        ].map((item, idx) => (
          <div key={idx} className="flex gap-3 items-start text-xs text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <Button
        onClick={onNext}
        className="h-11 px-8 bg-violet hover:bg-violet-hover text-white rounded-xl shadow-lg shadow-violet/10 flex items-center gap-2 group transition-all"
      >
        Let's Get Started
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
}
