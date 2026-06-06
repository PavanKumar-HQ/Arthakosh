"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SVGFlower } from "@/components/preeti/generative/SVGFlower";

const SCRIPT = [
  "",
  "There was always one thing I wanted to say.",
  "For years I thought I would say it later.",
  "Then later became months.",
  "And months became years.",
  "One of the reasons I came for the farewell was to tell you something.",
  "I wanted to apologize.",
  "There was a day when I argued instead of listening.",
  "At the time I thought I was right.",
  "Looking back, I understand things differently.",
  "Some lessons take years to learn.",
  "And respect is one of them.",
  "I never found the right moment.",
  "So I am saying it now.",
  "I'm sorry.",
  "And thank you for continuing to teach, guide, and care even when we didn't always make it easy.",
];

export function Chapter10_GoldenFlower({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0); 

  useEffect(() => {
    let currentPhase = 0;
    const interval = setInterval(() => {
      currentPhase++;
      if (currentPhase <= SCRIPT.length) {
        setPhase(currentPhase);
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 5000); // Wait 5 seconds after blooming before finishing
      }
    }, 4000); // 4 seconds per line

    return () => clearInterval(interval);
  }, [onComplete]);

  const isBlooming = phase >= SCRIPT.length;

  return (
    <div className={`w-full h-full relative transition-colors duration-[3000ms] flex flex-col items-center justify-center overflow-hidden ${isBlooming ? 'bg-gradient-to-b from-[#faf8f5] to-amber-100' : 'bg-[#faf8f5]'}`}>
      
      {/* Background glow when blooming */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,224,71,0.3)_0%,transparent_50%)]"
        animate={isBlooming ? { scale: [1, 3], opacity: [0, 0.8] } : { scale: 1, opacity: 0 }}
        transition={{ duration: 4, ease: "easeOut" }}
      />

      {/* The Typewriter Sequence */}
      <div className="absolute top-1/4 text-center z-20 px-8 w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {phase > 0 && phase < SCRIPT.length && (
            <motion.p 
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1 }}
              className={`font-playfair text-2xl md:text-4xl text-slate-800 leading-relaxed ${phase === 14 ? 'text-rose-800 font-bold text-5xl md:text-6xl' : ''}`}
            >
              {SCRIPT[phase]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* The White Flower */}
      <motion.div 
        className="absolute bottom-[10%] drop-shadow-xl"
        initial={{ scale: 0.8 }}
        animate={
          isBlooming 
            ? { scale: 1.5, y: -50 } 
            : { y: [0, -5, 0] }
        }
        transition={
          isBlooming 
            ? { duration: 3, ease: "easeOut" }
            : { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <div className="scale-[3] drop-shadow-[0_0_50px_rgba(253,224,71,0.5)]">
          <SVGFlower isBlooming={isBlooming} color="stroke-amber-100" />
        </div>
      </motion.div>

      {/* Falling Petals when blooming */}
      {isBlooming && Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute w-4 h-4 bg-white/90 rounded-full blur-[1px] z-30 drop-shadow-sm"
          style={{ left: `${Math.random() * 100}%`, bottom: "10%" }}
          initial={{ y: 0, x: 0, opacity: 0, scale: 0 }}
          animate={{ 
            y: "-120vh", 
            x: (Math.random() - 0.5) * 400,
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
            rotate: [0, 720] 
          }}
          transition={{ duration: 5 + Math.random() * 5, ease: "easeOut" }}
        />
      ))}

      {/* Returning Butterflies when blooming */}
      {isBlooming && Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`butterfly-${i}`}
          className="absolute z-20"
          style={{ left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 60}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, x: [0, 30, -30, 0], y: [0, -30, 30, 0] }}
          transition={{ opacity: { duration: 2 }, x: { duration: 3, repeat: Infinity }, y: { duration: 4, repeat: Infinity } }}
        >
          <img src="/real-butterfly.png" alt="Butterfly" className="w-10 h-10 object-contain mix-blend-multiply" />
        </motion.div>
      ))}

    </div>
  );
}
