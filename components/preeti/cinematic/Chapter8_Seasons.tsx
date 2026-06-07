"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChapterControls } from "@/components/preeti/ui/ChapterControls";
import { useState } from "react";
import { DynamicWeatherSystem } from "@/components/preeti/generative/DynamicWeatherSystem";

const SEASONS = [
  { id: "spring", name: "Spring", bg: "from-green-100 to-emerald-50", text: "text-emerald-100", buttonText: "text-emerald-200", msg: "When you first planted the seeds of knowledge.", color: "from-green-900 to-emerald-950" },
  { id: "summer", name: "Summer", bg: "from-yellow-100 to-amber-50", text: "text-amber-100", buttonText: "text-amber-200", msg: "When you helped us shine our brightest.", color: "from-amber-900 to-orange-950" },
  { id: "autumn", name: "Autumn", bg: "from-orange-100 to-red-50", text: "text-orange-100", buttonText: "text-orange-200", msg: "When you taught us that letting go of mistakes is part of growing.", color: "from-orange-900 to-red-950" },
  { id: "winter", name: "Winter", bg: "from-blue-100 to-slate-50", text: "text-blue-100", buttonText: "text-blue-200", msg: "When you protected us from the cold, hard lessons of the world.", color: "from-slate-900 to-blue-950" },
  { id: "renewal", name: "Spring Again", bg: "from-pink-100 to-rose-50", text: "text-rose-100", buttonText: "text-rose-200", msg: "When we finally bloomed.", color: "from-pink-900 to-rose-950" }
];

export function Chapter8_Seasons({ onComplete }: { onComplete: () => void }) {
  const [activeSeason, setActiveSeason] = useState(0);

  const nextSeason = () => {
    if (activeSeason < SEASONS.length - 1) {
      setActiveSeason(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className={`w-full h-full relative overflow-hidden transition-colors duration-2000 bg-gradient-to-br ${SEASONS[activeSeason].color}`}>
      {/* Generative Weather Layer */}
      <DynamicWeatherSystem season={activeSeason} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSeason}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 bg-transparent flex flex-col items-center justify-center px-4 text-center`}
        >
          <motion.h2 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className={`text-5xl md:text-7xl font-playfair mb-8 ${SEASONS[activeSeason].text}`}
          >
            {SEASONS[activeSeason].name}
          </motion.h2>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className={`text-2xl md:text-3xl font-playfair italic max-w-2xl leading-relaxed ${SEASONS[activeSeason].text} opacity-80`}
          >
            &quot;{SEASONS[activeSeason].msg}&quot;
          </motion.p>

        </motion.div>
      </AnimatePresence>

      {/* The Central Tree / Element to Anchor the Scene */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="w-1 h-[40vh] bg-gradient-to-t from-[#1a1c1a] to-transparent opacity-80"
          style={{ transformOrigin: "bottom" }}
        />
      </div>

      <ChapterControls 
        instruction={activeSeason === 3 ? "The cycle is complete." : "Click the background to advance the seasons..."} 
        onSkip={() => {
          if (activeSeason < 3) {
            setActiveSeason(3);
          } else {
            onComplete();
          }
        }} 
      />
      
      {/* Progress Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {SEASONS.map((s, i) => (
          <div 
            key={i} 
            className={`w-3 h-3 rounded-full transition-all duration-500 ${i === activeSeason ? 'bg-white scale-125 shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-white/30'}`} 
          />
        ))}
      </div>
    </div>
  );
}
