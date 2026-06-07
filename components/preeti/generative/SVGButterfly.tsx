"use client";

import { motion } from "framer-motion";

interface SVGButterflyProps {
  color?: string; // Hex color for the wings e.g. "#60a5fa"
  size?: number; // width in px
  delay?: number;
}

export function SVGButterfly({ color = "#f472b6", size = 64, delay = 0 }: SVGButterflyProps) {
  // A beautiful, realistic butterfly shape without the expensive GPU filters 
  // (no heavy drop-shadows or complex overlapping radial gradients).
  
  return (
    <div 
      className="relative flex items-center justify-center pointer-events-none"
      style={{ width: size, height: size }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        style={{ width: size, height: size, overflow: "visible" }}
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <defs>
          <linearGradient id={`wingGrad-${color.replace("#", "")}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Central Body (Thorax/Abdomen) */}
        <ellipse cx="50" cy="50" rx="3" ry="18" fill="#1e293b" opacity="0.8" />
        
        {/* Head */}
        <circle cx="50" cy="30" r="4" fill="#1e293b" opacity="0.9" />
        
        {/* Antennae */}
        <path d="M 48 28 C 44 15, 38 10, 35 15" fill="none" stroke="#1e293b" strokeWidth="1" strokeLinecap="round" />
        <circle cx="35" cy="15" r="1.5" fill="#1e293b" />
        
        <path d="M 52 28 C 56 15, 62 10, 65 15" fill="none" stroke="#1e293b" strokeWidth="1" strokeLinecap="round" />
        <circle cx="65" cy="15" r="1.5" fill="#1e293b" />

        {/* Left Wings */}
        <motion.g
          style={{ transformOrigin: "50px 50px" }}
          animate={{ scaleX: [1, 0.2, 1], rotateY: [0, 60, 0] }}
          transition={{ duration: 0.15 + (delay % 0.1), repeat: Infinity, ease: "easeInOut", delay }}
        >
          {/* Forewing */}
          <path 
            d="M 49 40 C 35 25, 10 20, 5 40 C 0 60, 20 70, 48 55 Z" 
            fill={`url(#wingGrad-${color.replace("#", "")})`} 
            stroke={color}
            strokeWidth="0.5"
          />
          {/* Hindwing */}
          <path 
            d="M 48 55 C 30 65, 15 85, 25 95 C 35 105, 45 80, 49 65 Z" 
            fill={`url(#wingGrad-${color.replace("#", "")})`}
            stroke={color}
            strokeWidth="0.5"
          />
          {/* Wing Veins */}
          <path d="M 48 45 C 30 35, 15 35, 10 40" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
          <path d="M 48 60 C 35 75, 25 85, 25 90" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
        </motion.g>

        {/* Right Wings */}
        <motion.g
          style={{ transformOrigin: "50px 50px" }}
          animate={{ scaleX: [1, 0.2, 1], rotateY: [0, -60, 0] }}
          transition={{ duration: 0.15 + (delay % 0.1), repeat: Infinity, ease: "easeInOut", delay }}
        >
          {/* Forewing */}
          <path 
            d="M 51 40 C 65 25, 90 20, 95 40 C 100 60, 80 70, 52 55 Z" 
            fill={`url(#wingGrad-${color.replace("#", "")})`} 
            stroke={color}
            strokeWidth="0.5"
          />
          {/* Hindwing */}
          <path 
            d="M 52 55 C 70 65, 85 85, 75 95 C 65 105, 55 80, 51 65 Z" 
            fill={`url(#wingGrad-${color.replace("#", "")})`}
            stroke={color}
            strokeWidth="0.5"
          />
          {/* Wing Veins */}
          <path d="M 52 45 C 70 35, 85 35, 90 40" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
          <path d="M 52 60 C 65 75, 75 85, 75 90" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
        </motion.g>

      </motion.svg>
    </div>
  );
}
