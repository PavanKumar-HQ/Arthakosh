"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const MEMORIES = [
  "You gave me the courage to speak up.",
  "Your kindness changed the trajectory of my life.",
  "I always felt safe in your classroom.",
  "Thank you for noticing when I was quietly struggling."
];

export function Chapter6_Fountain({ onComplete }: { onComplete: () => void }) {
  const [ripples, setRipples] = useState<{ id: number, x: number, y: number }[]>([]);
  const [activeMemory, setActiveMemory] = useState<string | null>(null);
  const fountainRef = useRef<HTMLDivElement>(null);
  let rippleCount = useRef(0);

  const handleFountainClick = (e: React.MouseEvent) => {
    if (fountainRef.current) {
      const rect = fountainRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newRipple = { id: rippleCount.current++, x, y };
      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter(r => r.id !== newRipple.id));
      }, 2000);

      // Show memory
      setActiveMemory(MEMORIES[Math.floor(Math.random() * MEMORIES.length)]);
    }
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-[#faf8f5] to-[#e0f2fe] flex flex-col items-center justify-center overflow-hidden">
      
      <div className="text-center absolute top-16 z-20 pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-playfair text-cyan-900 mb-2"
        >
          The Fountain of Wishes
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-cyan-700 italic font-serif text-lg"
        >
          Touch the water to reveal a hidden thought.
        </motion.p>
      </div>

      {/* The Fountain Area */}
      <motion.div 
        ref={fountainRef}
        className="relative w-96 h-96 mt-20 cursor-pointer rounded-full border-8 border-slate-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.1),inset_0_0_50px_rgba(56,189,248,0.5)] overflow-hidden bg-gradient-to-br from-cyan-100 to-blue-300"
        onClick={handleFountainClick}
        whileHover={{ scale: 1.02 }}
      >
        {/* Water Surface Animation */}
        <motion.div 
          className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMjAgQSAyMCAyMCAwIDAgMSAyMCAwIEEgMjAgMjAgMCAwIDEgNDAgMjAgQSAyMCAyMCAwIDAgMSAyMCA0MCBBIDIwIDIwIDAgMCAxIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')]"
          animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Coins sparkling */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,1)]"
            style={{ left: `${20 + Math.random() * 60}%`, top: `${20 + Math.random() * 60}%` }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
          />
        ))}

        {/* Ripples */}
        <AnimatePresence>
          {ripples.map(ripple => (
            <motion.div
              key={ripple.id}
              className="absolute border-2 border-white/60 rounded-full"
              style={{ left: ripple.x, top: ripple.y, x: "-50%", y: "-50%" }}
              initial={{ width: 0, height: 0, opacity: 1 }}
              animate={{ width: 200, height: 200, opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Revealed Memory */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute bottom-40 text-center max-w-md px-6 py-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-cyan-100"
          >
            <p className="font-playfair text-xl text-cyan-900 italic">
              &quot;{activeMemory}&quot;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: activeMemory ? 1 : 0 }}
        onClick={handleContinue}
        className="absolute bottom-12 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-sans tracking-widest text-sm z-30 transition-all hover:scale-105 shadow-xl"
      >
        Follow the Birds
      </motion.button>
    </div>
  );
}
