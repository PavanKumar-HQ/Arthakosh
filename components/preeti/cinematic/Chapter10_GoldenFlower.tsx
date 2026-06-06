"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

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
      if (currentPhase >= SCRIPT.length + 1) { // extra phase for bloom
        clearInterval(interval);
        setTimeout(onComplete, 5000); // give time for the final bloom to be enjoyed
      }
    }, 5000); // Every 5 seconds, progress phase
    return () => clearInterval(interval);
  }, [onComplete]);

  const isBlooming = phase >= SCRIPT.length - 1;

  return (
    <div className="w-full h-full relative overflow-hidden bg-black flex flex-col items-center justify-center">
      
      {/* Photorealistic Dark Cinematic Pond */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/golden-flower-bg.png')" }}
        initial={{ scale: 1.3, filter: "brightness(0.1) grayscale(100%) blur(10px)" }}
        animate={{ 
          scale: 1, 
          filter: isBlooming 
            ? "brightness(1) grayscale(0%) blur(0px)" 
            : "brightness(0.3) grayscale(80%) blur(5px)"
        }}
        transition={{ duration: 15, ease: "easeInOut" }}
      />

      {/* Vignette to darken edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] z-10 pointer-events-none" />

      {/* Floating Light Particles from Pond */}
      {isBlooming && Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-yellow-200 rounded-full blur-[2px] z-20 mix-blend-screen"
          style={{ 
            left: `${10 + Math.random() * 80}%`, 
            bottom: `${20 + Math.random() * 20}%`
          }}
          initial={{ y: 0, x: 0, opacity: 0, scale: 0 }}
          animate={{ 
            y: -200 - Math.random() * 200, 
            x: (Math.random() - 0.5) * 100,
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Glassmorphic Text Engine */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 text-center z-30 pointer-events-none">
        <AnimatePresence mode="wait">
          {phase > 0 && phase < SCRIPT.length && (
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
              transition={{ duration: 2 }}
              className="px-8 py-5 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl mx-auto shadow-2xl"
            >
              <p className="font-playfair text-3xl md:text-5xl text-amber-50 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] leading-relaxed">
                {SCRIPT[phase]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
