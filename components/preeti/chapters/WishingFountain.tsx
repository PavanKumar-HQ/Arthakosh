"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FOUNTAIN_MEMORIES = [
  "I'll always remember the day you stayed after school to help me understand calculus.",
  "Your classroom was the only place I felt truly safe to be myself.",
  "I still use the advice you gave me during my senior year.",
  "You didn't just teach a subject, you taught us how to love learning.",
  "The impact you've had on my life is immeasurable."
];

export function WishingFountain() {
  const [activeCoin, setActiveCoin] = useState<string | null>(null);

  const tossCoin = () => {
    const randomMemory = FOUNTAIN_MEMORIES[Math.floor(Math.random() * FOUNTAIN_MEMORIES.length)];
    setActiveCoin(randomMemory);
    setTimeout(() => setActiveCoin(null), 5000);
  };

  return (
    <div className="relative z-20 w-full min-h-[100vh] py-32 flex flex-col items-center justify-center">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-playfair text-cyan-900 mb-4">
          The Wishing Fountain
        </h2>
        <p className="text-lg text-cyan-700 italic">
          Toss a coin to reveal a cherished thought.
        </p>
      </div>

      <div className="relative cursor-pointer group" onClick={tossCoin}>
        <motion.img 
          src="/wishing-fountain.png" 
          alt="Wishing Fountain"
          className="w-full max-w-3xl object-contain mix-blend-darken"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Sparkles on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-center justify-center">
           <motion.div 
             animate={{ rotate: 360 }} 
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             className="w-64 h-64 bg-[radial-gradient(circle_at_center,rgba(253,224,71,0.4)_0%,transparent_70%)] mix-blend-multiply"
           />
        </div>
      </div>

      {/* The Revealed Memory */}
      <AnimatePresence>
        {activeCoin && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-md px-10 py-6 rounded-2xl shadow-2xl border border-cyan-100 max-w-2xl w-[90%]"
          >
            <p className="font-playfair text-cyan-900 text-xl md:text-2xl text-center italic leading-relaxed">
              &quot;{activeCoin}&quot;
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
