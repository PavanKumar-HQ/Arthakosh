"use client";

import { motion } from "framer-motion";

export function SVGSprout({ isGrowing }: { isGrowing: boolean }) {
  return (
    <div className="relative w-32 h-48 flex items-end justify-center drop-shadow-xl">
      <motion.svg 
        viewBox="0 0 100 150" 
        className="w-full h-full overflow-visible"
        style={{ transformOrigin: "bottom center" }}
        animate={{ rotate: isGrowing ? [-2, 2, -2] : 0 }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#166534" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>
          <radialGradient id="leafGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="60%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#166534" />
          </radialGradient>
        </defs>

        {/* The Stem */}
        <motion.path
          d="M 50 150 C 48 120, 52 90, 50 50"
          fill="none"
          stroke="url(#stemGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isGrowing ? 1 : 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />

        {/* Left Leaf (Cotyledon) */}
        <motion.g
          initial={{ scale: 0, opacity: 0, rotate: -20 }}
          animate={{ scale: isGrowing ? 1 : 0, opacity: isGrowing ? 1 : 0, rotate: 0 }}
          transition={{ duration: 1.5, delay: 1.8, type: "spring", bounce: 0.4 }}
          style={{ transformOrigin: "50px 50px" }}
        >
          {/* Leaf Body */}
          <path
            d="M 50 50 C 30 55, 5 40, 15 20 C 25 0, 45 30, 50 50 Z"
            fill="url(#leafGrad)"
            stroke="#14532d"
            strokeWidth="0.5"
          />
          {/* Midrib */}
          <path
            d="M 50 50 C 35 45, 20 30, 15 20"
            fill="none"
            stroke="#14532d"
            strokeWidth="0.7"
            opacity="0.6"
          />
          <path d="M 35 45 C 30 35, 25 35, 20 25" fill="none" stroke="#14532d" strokeWidth="0.4" opacity="0.4" />
        </motion.g>

        {/* Right Leaf (Cotyledon) */}
        <motion.g
          initial={{ scale: 0, opacity: 0, rotate: 20 }}
          animate={{ scale: isGrowing ? 1 : 0, opacity: isGrowing ? 1 : 0, rotate: 0 }}
          transition={{ duration: 1.5, delay: 2.1, type: "spring", bounce: 0.4 }}
          style={{ transformOrigin: "50px 50px" }}
        >
          {/* Leaf Body */}
          <path
            d="M 50 50 C 70 55, 95 40, 85 20 C 75 0, 55 30, 50 50 Z"
            fill="url(#leafGrad)"
            stroke="#14532d"
            strokeWidth="0.5"
          />
          {/* Midrib */}
          <path
            d="M 50 50 C 65 45, 80 30, 85 20"
            fill="none"
            stroke="#14532d"
            strokeWidth="0.7"
            opacity="0.6"
          />
          <path d="M 65 45 C 70 35, 75 35, 80 25" fill="none" stroke="#14532d" strokeWidth="0.4" opacity="0.4" />
        </motion.g>

      </motion.svg>
      
      {/* Magical Glow around the sprout */}
      <motion.div
        className="absolute bottom-10 w-24 h-24 bg-green-400 rounded-full blur-[40px] z-[-1] mix-blend-screen"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isGrowing ? 0.5 : 0, scale: isGrowing ? 1.8 : 0 }}
        transition={{ duration: 3, delay: 1 }}
      />

      {/* Spore particles burst on growth */}
      {isGrowing && Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * 360;
        return (
          <motion.div
            key={`spore-${i}`}
            className="absolute bottom-16 w-1.5 h-1.5 rounded-full z-30 pointer-events-none"
            style={{ background: i % 2 === 0 ? "#86efac" : "#fef08a", boxShadow: "0 0 5px currentColor" }}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: Math.cos((angle * Math.PI) / 180) * 60,
              y: Math.sin((angle * Math.PI) / 180) * 60,
            }}
            transition={{ duration: 2, delay: 2.5 + i * 0.1, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}
