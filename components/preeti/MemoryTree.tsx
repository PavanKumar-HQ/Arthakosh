"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { useJourneyStore } from "@/lib/store";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FIREFLIES = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}vw`,
  top: `${Math.random() * 100}vh`,
  duration: 2 + Math.random() * 3,
  delay: Math.random() * 5
}));

export function MemoryTree({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const completePreeti = useJourneyStore(state => state.completePreeti);
  const [isCompleted, setIsCompleted] = useState(false);

  // Tree grows as you scroll to the bottom (0.8 to 1.0)
  const treeScale = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  const treeOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      if (v > 0.95 && !isCompleted) {
        setIsCompleted(true);
        completePreeti();
      }
    });
    return () => unsub();
  }, [scrollYProgress, isCompleted, completePreeti]);

  return (
    <section className="min-h-screen relative flex flex-col items-center justify-end pb-32 bg-gradient-to-t from-pink-900 via-pink-800 to-transparent">
      
      {/* Background Fireflies (only show at the end) */}
      {isCompleted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {FIREFLIES.map((f) => (
            <motion.div
              key={f.id}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_10px_#fde047]"
              style={{
                left: f.left,
                top: f.top,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: f.duration,
                repeat: Infinity,
                delay: f.delay
              }}
            />
          ))}
        </div>
      )}

      {/* The Tree */}
      <motion.div 
        style={{ scale: treeScale, opacity: treeOpacity, transformOrigin: "bottom center" }}
        className="relative z-10 w-full max-w-2xl aspect-square flex flex-col items-center justify-end"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
          {/* Trunk */}
          <path d="M90 200 Q95 100 100 80 Q105 100 110 200 Z" fill="#451a03" />
          
          {/* Canopy */}
          <circle cx="100" cy="80" r="60" fill="#f472b6" className="opacity-80" />
          <circle cx="70" cy="90" r="40" fill="#ec4899" className="opacity-80" />
          <circle cx="130" cy="90" r="40" fill="#ec4899" className="opacity-80" />
          <circle cx="100" cy="40" r="45" fill="#db2777" className="opacity-80" />
        </svg>

        {/* Final Message */}
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute top-1/2 -translate-y-1/2 text-center w-full px-4"
          >
            <p className="font-playfair text-2xl md:text-4xl text-white drop-shadow-md mb-2">
              Great teachers leave footprints.
            </p>
            <p className="font-playfair text-3xl md:text-5xl text-pink-200 font-bold drop-shadow-md">
              You left a forest.
            </p>
            
            <Link href="/" className="inline-block mt-12">
              <button className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white font-sans flex items-center gap-2 transition-colors">
                Return to the Book <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
