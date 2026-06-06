"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
// We will use a generated image for the real butterfly, but for now we'll put a placeholder img tag that we will fill in later.

export function GardenOpening({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<"seed" | "memory" | "inspiration" | "emerge">("seed");

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 4000));
      setStage("memory");

      await new Promise(r => setTimeout(r, 4000));
      setStage("inspiration");

      await new Promise(r => setTimeout(r, 4000));
      setStage("emerge");

      await new Promise(r => setTimeout(r, 2000));
      onComplete();
    };

    sequence();
  }, [onComplete]);

  return (
    <section className="absolute inset-0 bg-white flex items-center justify-center z-50 overflow-hidden">
      
      <AnimatePresence mode="wait">
        {stage === "seed" && (
          <motion.div
            key="seed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, filter: "blur(5px)" }}
            transition={{ duration: 1.5 }}
            className="text-center"
          >
            <p className="font-playfair text-2xl md:text-4xl text-emerald-800 tracking-wider">
              Every garden begins with a seed.
            </p>
          </motion.div>
        )}

        {stage === "memory" && (
          <motion.div
            key="memory"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, filter: "blur(5px)" }}
            transition={{ duration: 1.5 }}
            className="text-center relative"
          >
            <motion.div 
              className="absolute -top-32 left-1/2 -translate-x-1/2 text-7xl drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]"
              initial={{ scale: 0, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotate: [-10, 10, -10] }}
              transition={{ duration: 2, rotate: { repeat: Infinity, duration: 3 } }}
            >
              🦋
            </motion.div>
            <p className="font-playfair text-2xl md:text-4xl text-amber-700 tracking-wider">
              Some seeds become memories.
            </p>
          </motion.div>
        )}

        {stage === "inspiration" && (
          <motion.div
            key="inspiration"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5 }}
            className="text-center"
          >
            <p className="font-playfair text-3xl md:text-5xl text-orange-600 tracking-[0.2em] uppercase font-bold drop-shadow-sm">
              Some become inspiration.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "emerge" && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </section>
  );
}
