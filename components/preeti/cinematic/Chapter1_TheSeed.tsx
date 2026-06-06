"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function Chapter1_TheSeed({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0); // 0: sky/pan down, 1: land, 2: sprout, 3: text 1, 4: text 2, 5: exit

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
    <div className="w-full h-full relative overflow-hidden bg-black">
      
      {/* Rich, Photorealistic Background Environment */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: "url('/soil-macro-bg.png')" }}
        initial={{ scale: 1.2, y: "-10vh" }}
        animate={{ scale: 1, y: "0vh" }}
        transition={{ duration: 15, ease: "easeOut" }}
      />

      <div className="absolute inset-0 bg-black/40 z-0" /> {/* Darken soil slightly for text readability */}

      {/* Sun rays overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-amber-200/20 to-transparent mix-blend-overlay z-10 pointer-events-none"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* The Seed Falling */}
      <AnimatePresence>
        {phase === 0 && (
          <motion.div 
            key="seed"
            className="absolute left-1/2 top-0 w-3 h-4 bg-amber-800 rounded-full drop-shadow-xl z-20"
            style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%" }}
            initial={{ y: "-20vh", x: "-50%", opacity: 0 }}
            animate={{ y: "60vh", x: "-50%", opacity: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 4, ease: "easeIn" }}
          />
        )}
      </AnimatePresence>

      {/* The Realistic Sprout */}
      <AnimatePresence>
        {phase >= 2 && phase < 5 && (
          <motion.div 
            className="absolute left-1/2 bottom-[15%] -translate-x-1/2 z-20"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            <img 
              src="/realistic-sprout.png" 
              alt="Sprout" 
              className="w-64 h-64 object-contain mix-blend-screen drop-shadow-[0_0_30px_rgba(253,224,71,0.6)]" 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Text - Glassmorphic for readability */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-30 pointer-events-none">
        <AnimatePresence mode="wait">
          {phase === 3 && (
            <motion.div
              key="text1"
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
              transition={{ duration: 1.5 }}
              className="px-8 py-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl mx-auto w-max shadow-2xl"
            >
              <p className="font-playfair text-3xl md:text-5xl text-amber-50 drop-shadow-md">
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
              className="px-8 py-4 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl mx-auto w-max shadow-2xl"
            >
              <p className="font-playfair text-3xl md:text-5xl text-amber-50 drop-shadow-md">
                So does every student.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
