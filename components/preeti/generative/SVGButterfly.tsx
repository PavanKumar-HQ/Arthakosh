"use client";

import { motion } from "framer-motion";

interface SVGButterflyProps {
  color?: string; // Hex color for the wings e.g. "#60a5fa"
  size?: number; // width in px
  delay?: number;
}

export function SVGButterfly({ color = "#f472b6", size = 64, delay = 0 }: SVGButterflyProps) {
  // Ultra-lightweight CSS-only butterfly to maximize performance
  // No SVG paths or gradients, just 2 simple div wings!
  
  return (
    <div 
      className="relative flex items-center justify-center pointer-events-none"
      style={{ width: size, height: size }}
    >
      <motion.div
        className="absolute flex items-center justify-center gap-0.5"
        animate={{ y: [-2, 2, -2] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {/* Left Wing */}
        <motion.div
          style={{ 
            width: size * 0.45, 
            height: size * 0.7, 
            backgroundColor: color,
            borderRadius: "100% 0% 100% 50%",
            transformOrigin: "right center",
            boxShadow: `inset 0 0 10px rgba(255,255,255,0.6), 0 0 8px ${color}80`
          }}
          animate={{ rotateY: [0, 60, 0] }}
          transition={{ duration: 0.2 + (delay % 0.1), repeat: Infinity, ease: "easeInOut", delay }}
        />
        
        {/* Right Wing */}
        <motion.div
          style={{ 
            width: size * 0.45, 
            height: size * 0.7, 
            backgroundColor: color,
            borderRadius: "0% 100% 50% 100%",
            transformOrigin: "left center",
            boxShadow: `inset 0 0 10px rgba(255,255,255,0.6), 0 0 8px ${color}80`
          }}
          animate={{ rotateY: [0, -60, 0] }}
          transition={{ duration: 0.2 + (delay % 0.1), repeat: Infinity, ease: "easeInOut", delay }}
        />
      </motion.div>
    </div>
  );
}
