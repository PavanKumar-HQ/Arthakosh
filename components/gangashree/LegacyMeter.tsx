"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Users, Smile, HelpCircle, Shield, Clock } from "lucide-react";

export function LegacyMeter() {
  const [stats, setStats] = useState({
    livesTouched: 0,
    smilesCreated: 0,
    questionsAnswered: 0,
    confidenceBuilt: 0,
    patienceUsed: 0
  });

  useEffect(() => {
    // Animate stats ticking up
    const duration = 10000; // 10 seconds to fill
    const fps = 30;
    const interval = 1000 / fps;
    const steps = duration / interval;
    
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      setStats({
        livesTouched: Math.floor(easeProgress * 1420),
        smilesCreated: Math.floor(easeProgress * 8500),
        questionsAnswered: Math.floor(easeProgress * 24000),
        confidenceBuilt: Math.floor(easeProgress * 100) + "%",
        patienceUsed: "Infinite"
      } as any);

      if (currentStep >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 2 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 bg-transparent/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl hidden md:flex flex-col gap-6"
    >
      <h3 className="font-playfair text-white text-xl tracking-widest uppercase border-b border-white/20 pb-2 mb-2">Legacy Meter</h3>
      
      <StatItem icon={<Users />} value={stats.livesTouched} label="Lives Touched" />
      <StatItem icon={<Smile />} value={stats.smilesCreated} label="Smiles Created" />
      <StatItem icon={<HelpCircle />} value={stats.questionsAnswered} label="Questions Answered" />
      <StatItem icon={<Shield />} value={stats.confidenceBuilt} label="Confidence Built" />
      <StatItem icon={<Clock />} value={stats.patienceUsed} label="Patience Used" />

    </motion.div>
  );
}

function StatItem({ icon, value, label }: { icon: React.ReactNode, value: string | number, label: string }) {
  return (
    <div className="flex items-center gap-4 text-gray-300">
      <div className="text-indigo-400">
        {icon}
      </div>
      <div>
        <div className="font-mono text-2xl text-white font-bold">{value}</div>
        <div className="text-xs uppercase tracking-widest opacity-60">{label}</div>
      </div>
    </div>
  );
}
