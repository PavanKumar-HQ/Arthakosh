"use client";

import { motion } from "framer-motion";

export function SVGSprout({ isGrowing }: { isGrowing: boolean }) {
  return (
    <div className="relative w-32 h-48 flex items-end justify-center drop-shadow-xl">
      <svg viewBox="0 0 100 150" className="w-full h-full overflow-visible">
        
        {/* The Stem */}
        <motion.path
          d="M 50 150 C 45 120, 55 90, 50 50"
          fill="none"
          stroke="#22c55e"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isGrowing ? 1 : 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Left Leaf */}
        <motion.path
          d="M 50 70 C 20 70, 0 50, 10 30 C 20 10, 40 30, 50 50 Z"
          fill="#4ade80"
          stroke="#166534"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0, transformOrigin: "50px 70px" }}
          animate={{ scale: isGrowing ? 1 : 0, opacity: isGrowing ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
        />

        {/* Right Leaf */}
        <motion.path
          d="M 50 60 C 80 50, 100 30, 90 10 C 80 -10, 60 10, 50 40 Z"
          fill="#4ade80"
          stroke="#166534"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0, transformOrigin: "50px 60px" }}
          animate={{ scale: isGrowing ? 1 : 0, opacity: isGrowing ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 1.8, ease: "easeOut" }}
        />

      </svg>
      
      {/* Magical Glow around the sprout */}
      <motion.div
        className="absolute bottom-10 w-24 h-24 bg-green-400 rounded-full blur-3xl z-[-1]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isGrowing ? 0.3 : 0, scale: isGrowing ? 1 : 0 }}
        transition={{ duration: 3, delay: 1 }}
      />
    </div>
  );
}
