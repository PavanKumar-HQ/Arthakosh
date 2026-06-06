"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SVGFlower } from "@/components/preeti/generative/SVGFlower";

const SCRIPT = [
  "",
  "But what about the seed that never bloomed?",
  "The one that took years to understand?",
  "The one who realized your impact only after leaving?",
  "This garden is for you, Preeti Ma'am.",
  "Because even the late bloomers...",
  "Eventually find their light.",
];

export function Chapter10_GoldenFlower({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0); 

  useEffect(() => {
    let currentPhase = 0;
    const interval = setInterval(() => {
      currentPhase++;
      setPhase(currentPhase);
      if (currentPhase >= SCRIPT.length + 1) { 
        clearInterval(interval);
        setTimeout(onComplete, 5000); 
      }
    }, 5000); 
    return () => clearInterval(interval);
  }, [onComplete]);

  const isBlooming = phase >= SCRIPT.length - 1;

  return (
    <div className="w-full h-full relative overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
      
      {/* Dynamic Misty Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900 to-slate-800"
        animate={{ opacity: isBlooming ? [0.8, 1, 0.8] : 1 }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      
      {/* Fog Layers */}
      <motion.div 
        className="absolute bottom-0 w-[150%] h-[50%] bg-blue-100/5 blur-[100px] rounded-full"
        animate={{ x: [-100, 100, -100] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rippling Water Floor */}
      <motion.div 
        className="absolute bottom-0 w-full h-[30%] bg-gradient-to-b from-transparent to-black mix-blend-overlay"
        animate={{ scaleY: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Floating Fireflies */}
      {isBlooming && Array.from({ length: 60 }).map((_, i) => (
        <motion.div
          key={`firefly-${i}`}
          className="absolute w-1 h-1 bg-yellow-300 rounded-full blur-[1px] z-20 mix-blend-screen drop-shadow-[0_0_5px_rgba(253,224,71,1)]"
          style={{ 
            left: `${Math.random() * 100}%`, 
            bottom: `${20 + Math.random() * 40}%`
          }}
          initial={{ y: 0, x: 0, opacity: 0, scale: 0 }}
          animate={{ 
            y: -200 - Math.random() * 300, 
            x: (Math.random() - 0.5) * 150,
            opacity: [0, 1, 0],
            scale: [0.5, 2, 0.5]
          }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
        />
      ))}

      {/* Massive Procedural Golden Flower */}
      <motion.div 
        className="absolute bottom-[20%] left-1/2 -translate-x-1/2 z-10"
        initial={{ filter: "brightness(0.5)", scale: 2 }}
        animate={{ filter: isBlooming ? "brightness(1.5)" : "brightness(0.5)", scale: isBlooming ? 3 : 2 }}
        transition={{ duration: 4 }}
      >
        <SVGFlower isBlooming={isBlooming} color="stroke-amber-200" />
      </motion.div>

      {/* Golden Pond Reflection */}
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[100px] bg-yellow-400/20 blur-[40px] rounded-full z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isBlooming ? 1 : 0, scaleX: isBlooming ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Text Engine */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 text-center z-30 pointer-events-none">
        <AnimatePresence mode="wait">
          {phase > 0 && phase < SCRIPT.length && (
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
              transition={{ duration: 2 }}
            >
              <p className="font-playfair text-3xl md:text-5xl text-blue-50 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] leading-relaxed">
                {SCRIPT[phase]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
