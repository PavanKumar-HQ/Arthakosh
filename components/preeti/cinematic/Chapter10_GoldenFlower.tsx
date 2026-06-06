"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function Chapter10_GoldenFlower({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0); // 0: unbloomed, 1: blooming, 2: msg1, 3: msg2, 4: msg3, 5: finish

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2000);
    const t2 = setTimeout(() => setPhase(2), 5000); // "Some lessons take years..."
    const t3 = setTimeout(() => setPhase(3), 9000); // "Some teachers..."
    const t4 = setTimeout(() => setPhase(4), 13000); // "Thank you..."
    const t5 = setTimeout(() => setPhase(5), 18000);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); 
      clearTimeout(t4); clearTimeout(t5);
    };
  }, []);

  useEffect(() => {
    if (phase === 5) {
      setTimeout(onComplete, 1000);
    }
  }, [phase, onComplete]);

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-[#faf8f5] to-[#fef9c3] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background radial glow that expands when blooming */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,224,71,0.3)_0%,transparent_50%)]"
        animate={phase >= 1 ? { scale: [1, 3], opacity: [0.3, 0.8] } : { scale: 1, opacity: 0.3 }}
        transition={{ duration: 4, ease: "easeOut" }}
      />

      <div className="absolute top-1/3 text-center z-20 px-4 w-full">
        {phase >= 2 && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-2xl md:text-4xl text-amber-900 mb-6"
          >
            Some lessons take years to understand.
          </motion.p>
        )}
        {phase >= 3 && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-2xl md:text-4xl text-amber-800 mb-6"
          >
            Some teachers take years to appreciate.
          </motion.p>
        )}
        {phase >= 4 && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-2xl md:text-4xl text-amber-700 italic"
          >
            Thank you for staying patient while we grew.
          </motion.p>
        )}
      </div>

      {/* The Golden Flower */}
      <motion.div 
        className="absolute bottom-[20%] text-7xl md:text-9xl drop-shadow-[0_0_50px_rgba(253,224,71,1)]"
        initial={{ scale: 0.8, filter: "grayscale(100%) brightness(0.5)" }}
        animate={
          phase >= 1 
            ? { scale: 1.2, filter: "grayscale(0%) brightness(1.2)", rotate: [0, 5, -5, 0] } 
            : { y: [0, -10, 0] }
        }
        transition={
          phase >= 1 
            ? { filter: { duration: 3 }, scale: { duration: 3 }, rotate: { duration: 4, repeat: Infinity } }
            : { duration: 3, repeat: Infinity }
        }
      >
        <img src="/real-golden-flower.png" alt="Golden Flower" className="w-64 h-64 object-contain mix-blend-multiply" />
      </motion.div>

    </div>
  );
}
