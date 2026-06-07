"use client";

import { motion } from "framer-motion";

export function CSSBird({ isFlying = true }: { isFlying?: boolean }) {
  return (
    <div className="relative w-16 h-16 pointer-events-none drop-shadow-md">
      <motion.svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        animate={{ y: isFlying ? [-2, 2, -2] : 0 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="birdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* Body */}
        <path 
          d="M 30 50 C 40 40, 70 45, 80 50 C 70 60, 40 60, 30 50 Z" 
          fill="url(#birdGrad)" 
        />
        
        {/* Head */}
        <circle cx="28" cy="48" r="6" fill="#38bdf8" />
        
        {/* Beak */}
        <path d="M 22 48 L 15 48 L 22 51 Z" fill="#f59e0b" />

        {/* Left Wing (Back) */}
        <motion.path 
          d="M 50 48 C 45 30, 60 10, 75 15 C 65 25, 60 40, 50 48 Z" 
          fill="#0284c7"
          style={{ transformOrigin: "50px 48px" }}
          animate={{ rotateX: isFlying ? [0, 60, 0] : 0, rotateZ: isFlying ? [0, -20, 0] : 0 }}
          transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
        />

        {/* Right Wing (Front) */}
        <motion.path 
          d="M 50 52 C 45 70, 60 90, 75 85 C 65 75, 60 60, 50 52 Z" 
          fill="#7dd3fc"
          style={{ transformOrigin: "50px 52px" }}
          animate={{ rotateX: isFlying ? [0, -60, 0] : 0, rotateZ: isFlying ? [0, 20, 0] : 0 }}
          transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Tail */}
        <path d="M 80 50 L 95 45 L 92 52 L 95 55 Z" fill="#0369a1" />
        
      </motion.svg>
    </div>
  );
}
