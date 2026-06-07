"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BackgroundGreenhouse } from "@/components/preeti/generative/BackgroundGreenhouse";
import { useState, useEffect, useMemo } from "react";
import { SVGSprout } from "@/components/preeti/generative/SVGSprout";
import { ChapterControls } from "@/components/preeti/ui/ChapterControls";

// Deterministic seed-based random — same value on server and client
function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// Pre-compute stable pollen data (30 particles)
const POLLEN = Array.from({ length: 30 }, (_, i) => ({
  left: (sr(i * 17) * 100).toFixed(2),
  top: (sr(i * 19) * 100).toFixed(2),
  yEnd: -(100 + sr(i * 23) * 50),
  xEnd: (sr(i * 29) - 0.5) * 50,
  duration: 5 + sr(i * 31) * 5,
}));

export function Chapter1_TheSeed({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0); 

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 4000));
      setPhase(1); // Seed lands
      await new Promise(r => setTimeout(r, 2000));
      setPhase(2); // Sprout emerges
      await new Promise(r => setTimeout(r, 2000));
      setPhase(3); // Typewriter 1
      await new Promise(r => setTimeout(r, 4000));
      setPhase(4); // Typewriter 2
      await new Promise(r => setTimeout(r, 4000));
      setPhase(5); // Fade out to next
      await new Promise(r => setTimeout(r, 2000));
      onComplete();
    };
    sequence();
  }, [onComplete]);

  return (
    <div className="w-full h-full relative bg-transparent flex items-center justify-center overflow-hidden">
      
      {/* Dynamic Greenhouse Background */}
      <BackgroundGreenhouse chapterProgress={1} />
      
      {/* Ambient Generative Background (fills empty space) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft floating morning mist/glows */}
        <motion.div 
          className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-[100px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-green-50/50 rounded-full blur-[120px]"
          animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating pollen particles — stable positions via deterministic seed */}
        {POLLEN.map((p, i) => (
          <motion.div
            key={`pollen-${i}`}
            className="absolute w-1 h-1 bg-amber-400/40 rounded-full blur-[1px]"
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
            animate={{ 
              y: [0, p.yEnd],
              x: [0, p.xEnd],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
          />
        ))}

        {/* Dynamic God Rays using CSS */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-200/10 to-transparent mix-blend-overlay"
          style={{ transformOrigin: "top right" }}
          animate={{ rotate: [-5, 5, -5], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* The Seed Falling */}
      <AnimatePresence>
        {phase === 0 && (
          <motion.div 
            key="seed"
            className="absolute left-1/2 top-0 w-3 h-4 bg-amber-800 rounded-full drop-shadow-md z-20"
            style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }}
            initial={{ y: "-20vh", x: "-50%", opacity: 0 }}
            animate={{ y: "60vh", x: "-50%", opacity: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 4, ease: "easeIn" }}
          />
        )}
        
        {/* Magical Dust Burst on Impact */}
        {phase === 1 && (
          <motion.div 
            key="burst"
            className="absolute left-1/2 top-[60vh] -translate-x-1/2 -translate-y-1/2 z-20"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`burst-${i}`}
                className="absolute w-1.5 h-1.5 bg-yellow-200 rounded-full"
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ 
                  x: Math.cos(i * (Math.PI / 6)) * 60, 
                  y: Math.sin(i * (Math.PI / 6)) * 60 - 20, 
                  opacity: 0, 
                  scale: 0 
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Generative SVG Sprout */}
      <AnimatePresence>
        {phase >= 2 && phase < 5 && (
          <motion.div 
            className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-full z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 1.2 }}
            transition={{ duration: 2 }}
          >
            <SVGSprout isGrowing={true} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Text (No Glassmorphism needed since background is soft) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full text-center z-30 pointer-events-none">
        <AnimatePresence mode="wait">
          {phase === 3 && (
            <motion.div
              key="text1"
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
              transition={{ duration: 1.5 }}
            >
              <p className="font-playfair text-3xl md:text-5xl text-emerald-900 drop-shadow-sm">
                Every garden begins with a seed.
              </p>
            </motion.div>
          )}
          {phase === 4 && (
            <motion.div
              key="text2"
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
              transition={{ duration: 1.5 }}
            >
              <p className="font-playfair text-3xl md:text-5xl text-emerald-900 drop-shadow-sm">
                So does every student.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ChapterControls 
        instruction="Watch the seed take root..." 
        onSkip={onComplete} 
      />
    </div>
  );
}
