"use client";

import { motion } from "framer-motion";

interface SVGBirdProps {
  isFlying?: boolean;
  color?: string; // body color
  delay?: number;
}

export function SVGBird({ isFlying = true, color = "#0ea5e9", delay = 0 }: SVGBirdProps) {
  // A beautiful side-profile bird with an animated wing
  return (
    <div className="relative w-16 h-16 pointer-events-none drop-shadow-md">
      <motion.svg 
        viewBox="0 0 100 100" 
        className="w-full h-full overflow-visible"
        animate={isFlying ? { y: [-2, 2, -2] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <defs>
          <linearGradient id="birdBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
          <linearGradient id="birdWing" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Tail */}
        <path d="M 20 50 L 5 45 L 10 55 Z" fill={color} opacity="0.8" />
        
        {/* Body */}
        <path 
          d="M 20 50 C 30 65, 60 70, 75 50 C 85 40, 95 45, 95 45 C 95 45, 85 30, 70 35 C 50 20, 30 40, 20 50 Z" 
          fill="url(#birdBody)" 
        />
        
        {/* Beak */}
        <path d="M 95 45 L 100 48 L 92 49 Z" fill="#fbbf24" />
        
        {/* Eye */}
        <circle cx="80" cy="40" r="1.5" fill="#1e293b" />

        {/* Back Wing (Darker, smaller) */}
        <motion.g
          style={{ transformOrigin: "50px 45px" }}
          animate={isFlying ? { rotateZ: [-20, 20, -20], scaleY: [1, -0.5, 1] } : { rotateZ: 0 }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut", delay: delay + 0.1 }}
        >
          <path 
            d="M 50 45 C 40 20, 60 10, 70 30 C 75 40, 60 45, 50 45 Z" 
            fill={color} 
            opacity="0.5"
          />
        </motion.g>

        {/* Front Wing (Lighter, larger) */}
        <motion.g
          style={{ transformOrigin: "50px 45px" }}
          animate={isFlying ? { rotateZ: [-30, 30, -30], scaleY: [1, -0.8, 1] } : { rotateZ: -10 }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <path 
            d="M 45 45 C 30 10, 65 0, 80 25 C 85 40, 60 45, 45 45 Z" 
            fill="url(#birdWing)" 
            stroke={color}
            strokeWidth="0.5"
          />
        </motion.g>

      </motion.svg>
    </div>
  );
}
