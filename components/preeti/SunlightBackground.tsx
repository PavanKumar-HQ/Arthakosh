"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SunlightBackground() {
  const [petals, setPetals] = useState<{ id: number; left: string; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate random falling petals
    const newPetals = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 20,
      duration: Math.random() * 10 + 15,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Sunlight Rays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[80vh] bg-[radial-gradient(ellipse_at_top,rgba(253,224,71,0.15)_0%,transparent_70%)]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[conic-gradient(from_180deg_at_50%_-20%,rgba(253,230,138,0.1)_0deg,transparent_45deg,transparent_315deg,rgba(253,230,138,0.1)_360deg)] opacity-60" />

      {/* Falling Petals */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-[-5%] w-3 h-3 rounded-full bg-pink-300/40 blur-[1px]"
          style={{ left: petal.left }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            rotate: [0, 360],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
