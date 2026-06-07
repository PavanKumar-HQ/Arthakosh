"use client";

import { motion } from "framer-motion";

interface BackgroundGreenhouseProps {
  chapterProgress: number; // 1 to 10
}

function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export function BackgroundGreenhouse({ chapterProgress }: BackgroundGreenhouseProps) {
  // Starts fading in at chapter 6, fully visible by chapter 9
  const visibility = Math.min(1, Math.max(0, (chapterProgress - 5) / 4));
  
  if (visibility <= 0) return null;

  return (
    <div className="absolute top-[20%] right-[15%] w-64 h-64 pointer-events-none z-0">
      <motion.div
        className="w-full h-full relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: visibility * 0.8 }}
        transition={{ duration: 2 }}
      >
        {/* Greenhouse Silhouette / Structure using SVG */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl mix-blend-multiply opacity-50">
          <path d="M 50 10 L 90 40 L 90 90 L 10 90 L 10 40 Z" fill="none" stroke="rgba(20,80,40,0.5)" strokeWidth="2" />
          <path d="M 50 10 L 50 90" fill="none" stroke="rgba(20,80,40,0.5)" strokeWidth="1" />
          <path d="M 10 40 L 90 40" fill="none" stroke="rgba(20,80,40,0.5)" strokeWidth="1" />
          <path d="M 30 25 L 30 90" fill="none" stroke="rgba(20,80,40,0.5)" strokeWidth="1" />
          <path d="M 70 25 L 70 90" fill="none" stroke="rgba(20,80,40,0.5)" strokeWidth="1" />
        </svg>

        {/* The internal glow that gets brighter over time */}
        <motion.div
          className="absolute inset-4 bg-yellow-200 rounded-lg blur-2xl"
          animate={{ 
            opacity: visibility * 0.8,
            scale: 1 + (visibility * 0.2)
          }}
          transition={{ duration: 3 }}
        />

        {/* Little sparks if we are late in the chapters */}
        {chapterProgress > 5 && Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
            style={{ left: `${30 + sr(i * 7) * 40}%`, bottom: "20%" }}
            animate={{ 
              y: [-10, -50], 
              opacity: [0, visibility, 0],
              x: (sr(i * 11) - 0.5) * 20
            }}
            transition={{ duration: 2 + sr(i * 13) * 3, repeat: Infinity }}
          />
        ))}
      </motion.div>
    </div>
  );
}
