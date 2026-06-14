"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const lines = [
  "Energy cannot be destroyed.",
  "It only changes form.",
  "What if every life you touched...",
  "...left behind energy?"
];

export function EnergyOpening({ onComplete }: { onComplete: () => void }) {
  const [lineIndex, setLineIndex] = useState(-1);
  const [shootingStars, setShootingStars] = useState<{ id: number, top: string, duration: number, delay: number, repeatDelay: number }[]>(() => 
    Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 8,
      top: `${5 + Math.random() * 60}%`,
      duration: 1.5 + Math.random() * 1.5,
      repeatDelay: 3 + Math.random() * 5
    }))
  );
  const [exploding, setExploding] = useState(false);

  useEffect(() => {

    const sequence = async () => {
      await new Promise(r => setTimeout(r, 2000));
      setLineIndex(0);
      
      await new Promise(r => setTimeout(r, 4000));
      setLineIndex(1);
      
      await new Promise(r => setTimeout(r, 4000));
      setLineIndex(2);
      
      await new Promise(r => setTimeout(r, 4000));
      setLineIndex(3);

      await new Promise(r => setTimeout(r, 3000));
      setExploding(true); // Trigger massive explosion

      await new Promise(r => setTimeout(r, 1500));
      onComplete();
    };

    sequence();
  }, [onComplete]);

  return (
    <section className="absolute inset-0 bg-transparent z-50 flex items-center justify-center overflow-hidden">
      
      {/* Shooting Stars Effect */}
      {shootingStars.map(star => (
        <motion.div
          key={star.id}
          initial={{ x: "110vw", y: "-50vw", rotate: 30, opacity: 0 }}
          animate={{ x: "-40vw", y: "36.6vw", opacity: [0, 1, 1, 0] }}
          transition={{ 
            duration: star.duration, 
            delay: star.delay, 
            repeat: Infinity, 
            repeatDelay: star.repeatDelay,
            ease: "linear"
          }}
          className="absolute w-32 h-[2px] bg-gradient-to-r from-white via-indigo-500/40 to-transparent origin-left"
          style={{ top: star.top, left: 0 }}
        >
          {/* Star Head */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_#ffffff,0_0_20px_#818cf8]" />
        </motion.div>
      ))}

      {/* The Text Sequence */}
      <div className="z-10 text-center px-4">
        <AnimatePresence mode="wait">
          {lineIndex >= 0 && !exploding && (
            <motion.h2
              key={lineIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="font-playfair font-light text-2xl md:text-5xl text-white tracking-[0.2em] uppercase"
            >
              {lines[lineIndex]}
            </motion.h2>
          )}
        </AnimatePresence>
      </div>

      {/* The Final Explosion */}
      <AnimatePresence>
        {exploding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeIn" }}
            className="absolute inset-0 bg-white z-20"
          />
        )}
      </AnimatePresence>

    </section>
  );
}
