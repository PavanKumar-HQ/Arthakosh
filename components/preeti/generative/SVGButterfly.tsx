"use client";

import { motion } from "framer-motion";

interface SVGButterflyProps {
  color?: string; // Hex color for the wings e.g. "#60a5fa"
  size?: number; // width in px
  delay?: number;
}

export function SVGButterfly({ color = "#f472b6", size = 64, delay = 0 }: SVGButterflyProps) {
  // We use scaleX on the wings to simulate 3D flapping.
  
  return (
    <div 
      className="relative flex items-center justify-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
      style={{ width: size, height: size }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        style={{ width: size, height: size, overflow: "visible" }}
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <defs>
          <radialGradient id={`wingGrad-${color.replace("#", "")}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="70%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.4" />
          </radialGradient>
          <radialGradient id={`wingGrad-${color.replace("#", "")}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="70%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.4" />
          </radialGradient>
        </defs>

        {/* Central Body */}
        <path d="M 48 20 C 48 10, 52 10, 52 20 L 52 80 C 52 90, 48 90, 48 80 Z" fill="#475569" />
        {/* Antennae */}
        <path d="M 49 20 C 45 10, 40 5, 35 10" fill="none" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
        <path d="M 51 20 C 55 10, 60 5, 65 10" fill="none" stroke="#475569" strokeWidth="1" strokeLinecap="round" />

        {/* Left Wing */}
        <motion.g
          style={{ transformOrigin: "50px 50px" }}
          animate={{ scaleX: [1, 0.1, 1], rotateY: [0, 45, 0] }}
          transition={{ duration: 0.3 + (delay % 0.1), repeat: Infinity, ease: "easeInOut", delay }}
        >
          {/* Top Left Wing */}
          <path 
            d="M 49 30 C 20 10, 5 30, 15 55 C 25 70, 45 60, 49 50 Z" 
            fill={`url(#wingGrad-${color.replace("#", "")})`} 
            stroke={color}
            strokeWidth="0.5"
          />
          {/* Bottom Left Wing */}
          <path 
            d="M 49 50 C 35 60, 20 80, 30 95 C 40 105, 48 80, 49 70 Z" 
            fill={`url(#wingGrad-${color.replace("#", "")})`}
            stroke={color}
            strokeWidth="0.5"
          />
        </motion.g>

        {/* Right Wing */}
        <motion.g
          style={{ transformOrigin: "50px 50px" }}
          animate={{ scaleX: [1, 0.1, 1], rotateY: [0, -45, 0] }}
          transition={{ duration: 0.3 + (delay % 0.1), repeat: Infinity, ease: "easeInOut", delay }}
        >
          {/* Top Right Wing */}
          <path 
            d="M 51 30 C 80 10, 95 30, 85 55 C 75 70, 55 60, 51 50 Z" 
            fill={`url(#wingGrad-${color.replace("#", "")})`} 
            stroke={color}
            strokeWidth="0.5"
          />
          {/* Bottom Right Wing */}
          <path 
            d="M 51 50 C 65 60, 80 80, 70 95 C 60 105, 52 80, 51 70 Z" 
            fill={`url(#wingGrad-${color.replace("#", "")})`}
            stroke={color}
            strokeWidth="0.5"
          />
        </motion.g>

      </motion.svg>
    </div>
  );
}
