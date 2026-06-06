"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LSystemTree } from "@/components/preeti/generative/LSystemTree";
import { CSSButterfly } from "@/components/preeti/generative/CSSButterfly";

export function Finale_Tree() {
  const [phase, setPhase] = useState(0); // 0: tree growing, 1: butterflies, 2: type 1, 3: type 2, 4: glow, 5: happy birthday

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 3000);
    const t2 = setTimeout(() => setPhase(2), 6000); // "A flower never remembers..."
    const t3 = setTimeout(() => setPhase(3), 10000); // "But it always carries..."
    const t4 = setTimeout(() => setPhase(4), 14000); // Glow
    const t5 = setTimeout(() => setPhase(5), 18000); // Happy birthday

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); 
      clearTimeout(t4); clearTimeout(t5);
    };
  }, []);

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-blue-50 to-emerald-50 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Intense Sunrise God Rays */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,224,71,0.4)_0%,transparent_70%)]"
        animate={phase >= 4 ? { opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] } : { opacity: 0.2 }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* The Giant Tree */}
      <motion.div 
        className="absolute bottom-[-10%] flex flex-col items-center origin-bottom z-10"
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: phase >= 4 ? 1.2 : 1, opacity: 1 }}
        transition={{ duration: 5, ease: "easeOut" }}
      >
        <LSystemTree growthPhase={phase >= 4 ? 1 : phase / 4} width={800} height={800} />
      </motion.div>

      {/* Falling Petals */}
      {phase >= 1 && Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-6 bg-pink-300/80 drop-shadow-sm z-20"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: "-5%",
            borderRadius: "50% 0 50% 50%" 
          }}
          animate={{ 
            y: ["0vh", "120vh"], 
            x: [0, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200],
            rotate: [0, 180, 360, 720] 
          }}
          transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Gathering Butterflies */}
      {phase >= 1 && Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`b-${i}`}
          className="absolute text-2xl z-20"
          style={{ 
            left: `${20 + Math.random() * 60}%`, 
            bottom: `${20 + Math.random() * 50}%` 
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, x: [0, 30, -30, 0], y: [0, -30, 30, 0] }}
          transition={{ 
            opacity: { duration: 2 }, 
            x: { duration: 3 + Math.random() * 2, repeat: Infinity },
            y: { duration: 4 + Math.random() * 2, repeat: Infinity }
          }}
        >
          <CSSButterfly color="bg-cyan-400" />
        </motion.div>
      ))}

      {/* Typography Sequence */}
      <div className="absolute top-1/4 text-center z-30 px-4 w-full">
        {phase >= 2 && phase < 5 && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-playfair text-2xl md:text-5xl text-emerald-950 mb-6 drop-shadow-[0_2px_10px_rgba(255,255,255,1)]"
          >
            A flower never remembers the day it was planted.
          </motion.p>
        )}
        {phase >= 3 && phase < 5 && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-playfair text-2xl md:text-5xl text-emerald-900 drop-shadow-[0_2px_10px_rgba(255,255,255,1)]"
          >
            But it always carries the gift of the gardener.
          </motion.p>
        )}
      </div>

      {/* Happy Birthday Finale */}
      {phase >= 5 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-40 bg-white/40 backdrop-blur-sm flex flex-col items-center justify-center p-8"
        >
          <h1 className="text-6xl md:text-8xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-12 drop-shadow-lg text-center">
            HAPPY BIRTHDAY<br/>PREETI MA&apos;AM
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl w-full">
            {/* Hanging Memories / Photos */}
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.2 }}
                className="bg-white/90 p-4 rounded-xl shadow-xl border border-emerald-100 flex flex-col items-center"
              >
                <div className="w-full aspect-square bg-emerald-50 rounded-lg mb-4 flex items-center justify-center text-emerald-300">
                  📷 Photo {i+1}
                </div>
                <p className="font-playfair text-emerald-800 text-sm">Class of 2023</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

    </div>
  );
}
