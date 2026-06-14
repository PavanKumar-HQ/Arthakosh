"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";

export function StarExplosionOpening({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<"dark" | "stars-appear" | "text" | "explode">("dark");

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 1000));
      setStage("stars-appear");

      await new Promise(r => setTimeout(r, 3000));
      setStage("text");

      await new Promise(r => setTimeout(r, 5000));
      setStage("explode");

      await new Promise(r => setTimeout(r, 1500));
      onComplete();
    };

    sequence();
  }, [onComplete]);

  return (
    <section className="absolute inset-0 flex items-center justify-center bg-transparent z-50 overflow-hidden">
      
      {/* Background small stars */}
      <AnimatePresence>
        {(stage === "stars-appear" || stage === "text") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-50"
                style={{
                  left: `${Math.random() * 100}vw`,
                  top: `${Math.random() * 100}vh`,
                  animation: `twinkle ${2 + Math.random() * 3}s infinite alternate`
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Bright Star */}
      <AnimatePresence>
        {(stage === "stars-appear" || stage === "text") && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 100, opacity: 0 }}
            transition={{ duration: 3, ease: "easeIn" }}
            className="absolute z-10"
          >
            <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_50px_20px_rgba(255,255,255,0.8)]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text Sequence */}
      <AnimatePresence mode="wait">
        {stage === "text" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5 }}
            className="z-20 text-center px-4"
          >
            <p className="font-playfair text-2xl md:text-4xl text-gray-300 tracking-[0.1em] mb-4">
              Every sibling carries a little light.
            </p>
            <p className="font-playfair text-3xl md:text-5xl text-white tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
              Some sisters create it.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Flash */}
      <AnimatePresence>
        {stage === "explode" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeIn" }}
            className="absolute inset-0 bg-white z-50"
          />
        )}
      </AnimatePresence>
    </section>
  );
}
