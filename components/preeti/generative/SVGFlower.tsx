"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SVGFlowerProps {
  isBlooming: boolean;
  color?: string;
  delay?: number;
  text?: string;
  isShaking?: boolean;
  size?: number; // diameter in px
  petalColor?: string; // fill color e.g. "#f9a8d4"
  strokeColor?: string; // stroke e.g. "#e11d48"
}

export function SVGFlower({
  isBlooming,
  delay = 0,
  text,
  isShaking,
  size = 96,
  petalColor = "rgba(251, 207, 232, 0.85)",
  strokeColor = "#f43f5e",
}: SVGFlowerProps) {
  // 8 realistic teardrop petals using cubic bezier
  // Each petal: a smooth leaf-like shape centered at 50,50
  // viewBox 0 0 100 100
  const NUM_PETALS = 8;
  const petalLength = 38;
  const petalWidth = 12;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Organic floating text */}
      <AnimatePresence>
        {isBlooming && text && (
          <motion.p
            initial={{ opacity: 0, y: 8, scale: 0.85, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: -size * 0.8, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -size, filter: "blur(6px)" }}
            transition={{ duration: 2.5, delay: delay + 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute whitespace-nowrap font-playfair text-rose-800 text-base font-semibold z-40 pointer-events-none"
            style={{ textShadow: "0 2px 20px rgba(255,255,255,1), 0 0 40px rgba(255,200,200,0.8)" }}
          >
            {text}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Radial light burst when blooming */}
      <motion.div
        className="absolute rounded-full pointer-events-none z-0 mix-blend-screen"
        style={{ width: size * 1.8, height: size * 1.8, background: "radial-gradient(circle, rgba(253,240,210,0.8) 0%, rgba(253,240,210,0) 70%)" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={isBlooming ? { opacity: [0, 1, 0.6, 0.9], scale: [0, 1.4, 1.2, 1.3] } : { opacity: 0, scale: 0 }}
        transition={{ duration: 4, delay, ease: "easeOut", scale: { repeat: Infinity, duration: 4, repeatType: "mirror" }, opacity: { repeat: Infinity, duration: 3, repeatType: "mirror" } }}
      />

      {/* Particle sparks */}
      {isBlooming && Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * 360;
        return (
          <motion.div
            key={`spark-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full z-30 pointer-events-none"
            style={{ background: i % 2 === 0 ? "#fde68a" : "#fca5a5" }}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.cos((angle * Math.PI) / 180) * (size * 0.8),
              y: Math.sin((angle * Math.PI) / 180) * (size * 0.8),
            }}
            transition={{ duration: 1.5, delay: delay + 0.4 + i * 0.05, ease: "easeOut" }}
          />
        );
      })}

      {/* The SVG Flower */}
      <motion.svg
        viewBox="0 0 100 100"
        style={{ width: size, height: size, overflow: "visible", transformOrigin: "bottom center" }}
        className="z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        animate={isShaking 
          ? { x: [-3, 3, -3, 3, -2, 2, 0], y: [-1, 1, -1, 1, 0], rotate: 0 } 
          : isBlooming ? { rotate: [-2, 3, -1, 2, -2] } : { rotate: 0 }
        }
        transition={isShaking ? { duration: 0.5 } : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <radialGradient id={`petalGrad-${delay}`} cx="50%" cy="70%" r="60%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="100%" stopColor={petalColor} stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* Petals using realistic teardrop bezier paths */}
        {Array.from({ length: NUM_PETALS }).map((_, i) => {
          const angle = (i / NUM_PETALS) * 360;
          const rad = (angle * Math.PI) / 180;
          // Tip of petal
          const tx = 50 + Math.cos(rad) * petalLength;
          const ty = 50 + Math.sin(rad) * petalLength;
          // Left control
          const lRad = rad - Math.PI / 2;
          const lx = 50 + Math.cos(rad) * (petalLength * 0.4) + Math.cos(lRad) * petalWidth;
          const ly = 50 + Math.sin(rad) * (petalLength * 0.4) + Math.sin(lRad) * petalWidth;
          // Right control
          const rx2 = 50 + Math.cos(rad) * (petalLength * 0.4) - Math.cos(lRad) * petalWidth;
          const ry2 = 50 + Math.sin(rad) * (petalLength * 0.4) - Math.sin(lRad) * petalWidth;

          const d = `M 50 50 C ${lx} ${ly}, ${tx} ${ty}, ${tx} ${ty} C ${tx} ${ty}, ${rx2} ${ry2}, 50 50 Z`;

          return (
            <motion.path
              key={i}
              d={d}
              fill={`url(#petalGrad-${delay})`}
              stroke={strokeColor}
              strokeWidth="0.8"
              strokeLinejoin="round"
              initial={{ scale: 0, opacity: 0, transformOrigin: "50px 50px" }}
              animate={isBlooming
                ? { scale: 1, opacity: 1 }
                : { scale: 0.05, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 12,
                delay: delay + i * 0.07,
              }}
            />
          );
        })}

        {/* Inner stamens (small lines radiating from center) */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * 360;
          const rad = (angle * Math.PI) / 180;
          const x2 = 50 + Math.cos(rad) * 8;
          const y2 = 50 + Math.sin(rad) * 8;
          return (
            <motion.line
              key={`stamen-${i}`}
              x1="50" y1="50" x2={x2} y2={y2}
              stroke="#fbbf24"
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isBlooming ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.6, delay: delay + 0.8 + i * 0.03 }}
            />
          );
        })}

        {/* Center disk */}
        <motion.circle
          cx="50" cy="50" r="7"
          fill="#fde68a"
          stroke="#f59e0b"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={isBlooming ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: delay + 0.5 }}
        />

        {/* Center dot */}
        <motion.circle
          cx="50" cy="50" r="3"
          fill="#f59e0b"
          initial={{ scale: 0 }}
          animate={isBlooming ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: delay + 1 }}
        />
      </motion.svg>
    </div>
  );
}
