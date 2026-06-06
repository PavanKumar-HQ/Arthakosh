"use client";

import { motion } from "framer-motion";

export function CSSButterfly({ color = "bg-blue-400" }: { color?: string }) {
  // Map Tailwind color classes to hex/rgba for SVG fills if needed, or just use CSS classes
  // However, tailwind classes on SVG paths can be tricky without `fill-current`.
  // We will use the color prop to set a text color and use currentColor for fill.
  const textColor = color.replace("bg-", "text-");

  return (
    <div className={`relative w-16 h-16 flex items-center justify-center pointer-events-none drop-shadow-xl ${textColor}`} style={{ perspective: "1000px" }}>
      
      {/* Left Wing using realistic SVG Path */}
      <motion.div
        className="absolute w-8 h-12 left-0 origin-right drop-shadow-md"
        animate={{ rotateY: [0, 70, 0] }}
        transition={{ duration: 0.2 + Math.random() * 0.1, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 50 100" className="w-full h-full fill-current opacity-90">
          <path d="M50 20 C 30 0, 0 10, 5 40 C 10 60, 20 50, 25 70 C 30 90, 45 100, 50 80 Z" />
          <path d="M50 25 C 35 10, 15 20, 20 40 C 25 55, 30 50, 35 65 C 40 80, 45 85, 50 75 Z" fill="rgba(255,255,255,0.4)" />
        </svg>
      </motion.div>
      
      {/* Body */}
      <div className="absolute w-1.5 h-8 bg-slate-800 rounded-full z-10 shadow-[0_0_5px_rgba(0,0,0,0.5)]" />

      {/* Right Wing using realistic SVG Path */}
      <motion.div
        className="absolute w-8 h-12 right-0 origin-left drop-shadow-md"
        animate={{ rotateY: [0, -70, 0] }}
        transition={{ duration: 0.2 + Math.random() * 0.1, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 50 100" className="w-full h-full fill-current opacity-90">
          <path d="M0 20 C 20 0, 50 10, 45 40 C 40 60, 30 50, 25 70 C 20 90, 5 100, 0 80 Z" />
          <path d="M0 25 C 15 10, 35 20, 30 40 C 25 55, 20 50, 15 65 C 10 80, 5 85, 0 75 Z" fill="rgba(255,255,255,0.4)" />
        </svg>
      </motion.div>
    </div>
  );
}
