"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useJourneyStore } from "@/lib/store";

const lines = [
  "You thought you were teaching lessons.",
  "But you were creating energy.",
  "Energy that still exists.",
  "Energy that still guides.",
  "Energy that still inspires."
];

import { MotionValue } from "framer-motion";

export function FinalBossClimax({ 
  scrollProgress, 
  climaxStart, 
  climaxEnd 
}: { 
  scrollProgress: MotionValue<number>; 
  climaxStart: number; 
  climaxEnd: number; 
}) {
  const [lineIndex, setLineIndex] = useState(-1);
  const [explosion, setExplosion] = useState(false);
  const increaseEnergy = useJourneyStore(state => state.increaseEnergy);

  // Trigger text sequence based on scroll depth of the global progress
  useEffect(() => {
    if (!scrollProgress) return;

    const unsubscribe = scrollProgress.on("change", (v: number) => {
      const startTrigger = climaxStart;
      const endTrigger = climaxEnd;
      
      if (v < startTrigger) {
        // Reset if they scroll backward past this chapter
        if (lineIndex >= 0) {
          setLineIndex(-1);
        }
        return;
      }
      
      const localProgress = Math.min((v - startTrigger) / (endTrigger - startTrigger), 1);
      
      if (localProgress > 0.1 && lineIndex < 0) setLineIndex(0);
      if (localProgress > 0.3 && lineIndex < 1) setLineIndex(1);
      if (localProgress > 0.5 && lineIndex < 2) setLineIndex(2);
      if (localProgress > 0.7 && lineIndex < 3) setLineIndex(3);
      if (localProgress > 0.85 && lineIndex < 4) setLineIndex(4);
      
      if (localProgress >= 0.95 && !explosion) {
        setExplosion(true);
        increaseEnergy(50); // Massive energy boost for final core size
      }
    });

    return () => unsubscribe();
  }, [scrollProgress, lineIndex, explosion, increaseEnergy, climaxStart, climaxEnd]);

  return (
    <div className="w-[300vw] h-full flex items-center relative shrink-0 border-l border-white/5 bg-[#010103]">
      
      {/* Background massive explosion state */}
      <AnimatePresence>
        {explosion && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.1)_0%,_transparent_100%)] mix-blend-screen pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="w-[100vw] shrink-0 h-full flex items-center justify-center relative z-10 px-32">
        <div className="flex flex-col gap-12 text-center max-w-4xl">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: lineIndex >= i ? 1 : 0, y: lineIndex >= i ? 0 : 20 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="font-playfair font-light text-2xl md:text-4xl text-gray-200 tracking-[0.2em] uppercase"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>

      {/* FINAL BIRTHDAY REVEAL */}
      <div className="w-[200vw] shrink-0 h-full flex items-center justify-center relative z-20">
        <AnimatePresence>
          {explosion && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 4, ease: "easeOut" }}
              className="text-center"
            >
              <h1 className="text-6xl md:text-[8rem] font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 tracking-[0.3em] uppercase leading-tight mb-8 animate-pulse">
                Happy <br/> Birthday
              </h1>
              <div className="w-px h-32 bg-gradient-to-b from-transparent via-white/50 to-transparent mx-auto mb-8" />
              <p className="text-2xl md:text-4xl font-sans text-gray-400 tracking-[0.5em] uppercase font-light">
                Meghana Ma'am
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
