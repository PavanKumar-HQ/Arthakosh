"use client";

import { motion } from "framer-motion";

interface SVGFlowerProps {
  isBlooming: boolean;
  color?: string; // e.g. "stroke-rose-500"
  delay?: number;
}

export function SVGFlower({ isBlooming, color = "stroke-white", delay = 0 }: SVGFlowerProps) {
  // A simple parametric flower using SVG paths
  // We'll draw 8 petals
  const petals = Array.from({ length: 8 });

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-md">
        
        {/* The center bud */}
        <motion.circle 
          cx="50" cy="50" r="5" 
          className="fill-amber-400"
          initial={{ scale: 0 }}
          animate={{ scale: isBlooming ? 1 : 0.2 }}
          transition={{ duration: 1, delay }}
        />

        {/* The petals */}
        {petals.map((_, i) => {
          const angle = (i * 45) * (Math.PI / 180);
          // End point of the petal
          const ex = 50 + Math.cos(angle) * 40;
          const ey = 50 + Math.sin(angle) * 40;
          // Control points for bezier curve to make a petal shape
          const cx1 = 50 + Math.cos(angle - 0.5) * 30;
          const cy1 = 50 + Math.sin(angle - 0.5) * 30;
          const cx2 = 50 + Math.cos(angle + 0.5) * 30;
          const cy2 = 50 + Math.sin(angle + 0.5) * 30;

          const pathD = `M 50 50 C ${cx1} ${cy1}, ${ex} ${ey}, ${ex} ${ey} C ${ex} ${ey}, ${cx2} ${cy2}, 50 50`;

          return (
            <motion.path
              key={i}
              d={pathD}
              fill="rgba(255,255,255,0.2)"
              className={color}
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isBlooming ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2, delay: delay + i * 0.1, ease: "easeInOut" }}
            />
          );
        })}
      </svg>
    </div>
  );
}
