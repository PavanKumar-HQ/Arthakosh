"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SVGFlowerProps {
  isBlooming: boolean;
  color?: string; // e.g. "stroke-rose-500"
  delay?: number;
  text?: string;
  isShaking?: boolean;
}

export function SVGFlower({ isBlooming, color = "stroke-white", delay = 0, text, isShaking }: SVGFlowerProps) {
  // A simple parametric flower using SVG paths
  // We'll draw 8 petals
  const petals = Array.from({ length: 8 });

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      
      {/* The organic text that floats out when blooming */}
      <AnimatePresence>
        {isBlooming && text && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -60, scale: 1 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 2, delay: delay + 1, ease: "easeOut" }}
            className="absolute whitespace-nowrap text-amber-900 font-playfair text-lg drop-shadow-[0_2px_10px_rgba(255,255,255,1)] z-30 pointer-events-none"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Light Particles */}
      {isBlooming && Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 bg-yellow-200 rounded-full blur-[1px] z-20"
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            y: -50 - Math.random() * 50,
            x: (Math.random() - 0.5) * 60
          }}
          transition={{ duration: 2 + Math.random() * 2, delay: delay + 0.5 + Math.random() }}
        />
      ))}

      {/* Center Glow */}
      <motion.div 
        className="absolute w-12 h-12 bg-yellow-300 rounded-full blur-xl z-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={isBlooming ? { opacity: 0.6, scale: 1.5 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 1.5, delay }}
      />

      <motion.svg 
        viewBox="0 0 100 100" 
        className="w-full h-full overflow-visible drop-shadow-md z-10"
        animate={isShaking ? { x: [-2, 2, -2, 2, 0], y: [-1, 1, -1, 1, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        
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
      </motion.svg>
    </div>
  );
}
