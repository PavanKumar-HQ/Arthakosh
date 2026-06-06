"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Chapter1_TheSeed({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0); // 0: sky, 1: seed falling, 2: landed, 3: typewriter 1, 4: typewriter 2, 5: sprout grows, 6: finish

  useEffect(() => {
    // Cinematic timeline
    const t1 = setTimeout(() => setPhase(1), 1000); // Seed starts falling
    const t2 = setTimeout(() => setPhase(2), 3500); // Seed lands
    const t3 = setTimeout(() => setPhase(3), 5000); // "Every garden..."
    const t4 = setTimeout(() => setPhase(4), 8000); // "Every student..."
    const t5 = setTimeout(() => setPhase(5), 11000); // Sprout grows
    const t6 = setTimeout(() => setPhase(6), 14000); // Transition out

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); 
      clearTimeout(t4); clearTimeout(t5); clearTimeout(t6);
    };
  }, []);

  useEffect(() => {
    if (phase === 6) {
      setTimeout(onComplete, 1000);
    }
  }, [phase, onComplete]);

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-orange-50 to-[#faf8f5] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Soft sunrise god rays */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.1)_0%,transparent_60%)]"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* The Ground */}
      <motion.div 
        className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-[#8B4513]/10 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* The Seed */}
      <motion.div 
        className="absolute w-3 h-4 bg-[#6b4c3a] rounded-full shadow-sm"
        style={{ top: "-5%" }}
        animate={
          phase >= 1 ? { top: "75%", rotate: 180 } : {}
        }
        transition={{ duration: 2.5, ease: "easeIn" }}
      />

      {/* The Sprout */}
      {phase >= 5 && (
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 bottom-[25%] flex flex-col items-center origin-bottom"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          {/* Stem */}
          <div className="w-1 h-12 bg-green-600 rounded-full" />
          {/* Leaves */}
          <div className="flex gap-2 -mt-4">
            <div className="w-4 h-6 bg-green-500 rounded-full rotate-45 origin-bottom-left" />
            <div className="w-4 h-6 bg-green-500 rounded-full -rotate-45 origin-bottom-right" />
          </div>
        </motion.div>
      )}

      {/* Typography */}
      <div className="absolute top-1/3 text-center z-10 w-full px-4">
        {phase >= 3 && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-2xl md:text-4xl text-[#6d5b3d] tracking-wide mb-6"
          >
            Every garden begins with a single seed.
          </motion.p>
        )}

        {phase >= 4 && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-2xl md:text-4xl text-[#8a734e] tracking-wide"
          >
            Every student begins with a single lesson.
          </motion.p>
        )}
      </div>

    </div>
  );
}
