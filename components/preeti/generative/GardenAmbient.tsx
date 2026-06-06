"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface GardenAmbientProps {
  chapter?: number; // 1-11, controls palette
}

function randomBetween(min: number, max: number, seed: number) {
  // Deterministic "random" based on seed so it doesn't re-randomize on render
  const x = Math.sin(seed + 1) * 10000;
  return min + ((x - Math.floor(x)) * (max - min));
}

export function GardenAmbient({ chapter = 1 }: GardenAmbientProps) {
  // Palette shifts based on chapter
  const palette = chapter <= 3
    ? { bg: "from-[#f0fdf4] to-[#fef9f0]", orb1: "bg-emerald-100", orb2: "bg-amber-100", ray: "from-amber-100/30" }
    : chapter <= 6
    ? { bg: "from-[#fdf4ff] to-[#fff7ed]", orb1: "bg-purple-100", orb2: "bg-rose-100", ray: "from-rose-100/30" }
    : { bg: "from-[#eff6ff] to-[#f0fdf4]", orb1: "bg-sky-100", orb2: "bg-emerald-100", ray: "from-sky-100/30" };

  const pollenSeeds = useMemo(() => Array.from({ length: 40 }, (_, i) => i), []);
  const orbSeeds = useMemo(() => Array.from({ length: 8 }, (_, i) => i), []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none bg-gradient-to-br ${palette.bg}`}>

      {/* Large atmospheric orbs that drift slowly */}
      {orbSeeds.map((i) => (
        <motion.div
          key={`orb-${i}`}
          className={`absolute rounded-full ${i % 2 === 0 ? palette.orb1 : palette.orb2} opacity-40 blur-[80px]`}
          style={{
            width: `${randomBetween(200, 500, i * 3)}px`,
            height: `${randomBetween(200, 500, i * 3 + 1)}px`,
            left: `${randomBetween(-10, 100, i * 3 + 2)}%`,
            top: `${randomBetween(-10, 90, i * 3 + 3)}%`,
          }}
          animate={{
            x: [0, randomBetween(-60, 60, i * 5), 0],
            y: [0, randomBetween(-40, 40, i * 5 + 1), 0],
            scale: [1, randomBetween(1.05, 1.2, i * 5 + 2), 1],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: randomBetween(10, 20, i * 7),
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Dynamic crepuscular god rays */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-tr ${palette.ray} via-transparent to-transparent`}
        animate={{ opacity: [0.4, 0.8, 0.4], rotate: [-3, 3, -3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "top right" }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-bl from-white/10 via-transparent to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3], rotate: [2, -2, 2] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{ transformOrigin: "bottom left" }}
      />

      {/* Floating pollen dots */}
      {pollenSeeds.map((i) => (
        <motion.div
          key={`pollen-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${randomBetween(2, 5, i * 11)}px`,
            height: `${randomBetween(2, 5, i * 11)}px`,
            background: i % 3 === 0 ? "rgba(251, 191, 36, 0.6)" : i % 3 === 1 ? "rgba(244, 114, 182, 0.4)" : "rgba(167, 243, 208, 0.5)",
            left: `${randomBetween(0, 100, i * 13)}%`,
            top: `${randomBetween(10, 90, i * 13 + 1)}%`,
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, randomBetween(-120, -60, i * 17)],
            x: [0, randomBetween(-30, 30, i * 17 + 1)],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.3],
          }}
          transition={{
            duration: randomBetween(5, 12, i * 19),
            repeat: Infinity,
            ease: "easeInOut",
            delay: randomBetween(0, 6, i * 23),
          }}
        />
      ))}

      {/* Subtle grass gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-emerald-50/60 to-transparent" />
    </div>
  );
}
