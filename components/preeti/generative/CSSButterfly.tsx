"use client";

import { motion } from "framer-motion";

interface CSSButterflyProps {
  color?: string;
  size?: number;
}

// Iridescent color sets for wings
const WING_SETS = [
  { upper: "#93c5fd", lower: "#60a5fa", vein: "#1d4ed8", body: "#1e3a5f" },      // Blue
  { upper: "#f9a8d4", lower: "#f472b6", vein: "#be185d", body: "#500724" },      // Pink
  { upper: "#fde68a", lower: "#fbbf24", vein: "#b45309", body: "#451a03" },      // Amber
  { upper: "#a78bfa", lower: "#8b5cf6", vein: "#5b21b6", body: "#2e1065" },      // Purple
  { upper: "#6ee7b7", lower: "#34d399", vein: "#065f46", body: "#022c22" },      // Emerald
];

let wingSetIdx = 0;

export function CSSButterfly({ size = 64 }: CSSButterflyProps) {
  const wings = WING_SETS[wingSetIdx++ % WING_SETS.length];
  const s = size / 80;

  return (
    <motion.div
      className="relative pointer-events-none select-none"
      style={{ width: size * 2, height: size * 1.4 }}
    >
      <svg
        viewBox="0 0 160 110"
        width={size * 2}
        height={size * 1.4}
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id={`wg-upper-${wings.upper}`} cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor={wings.upper} stopOpacity="1" />
          </radialGradient>
          <radialGradient id={`wg-lower-${wings.lower}`} cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor={wings.lower} stopOpacity="0.9" />
          </radialGradient>
          <filter id="wingshadow">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* LEFT Upper Wing */}
        <motion.path
          d="M 80 55 C 60 50, 10 30, 5 55 C 0 80, 40 90, 80 70 Z"
          fill={`url(#wg-upper-${wings.upper})`}
          stroke={wings.vein}
          strokeWidth="0.5"
          filter="url(#wingshadow)"
          style={{ transformOrigin: "80px 55px" }}
          animate={{ rotateY: [0, -60, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* LEFT Upper Wing veins */}
        <motion.g
          style={{ transformOrigin: "80px 55px" }}
          animate={{ rotateY: [0, -60, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M 80 55 C 55 52, 30 40, 10 48" fill="none" stroke={wings.vein} strokeWidth="0.6" opacity="0.5" />
          <path d="M 80 55 C 60 58, 35 65, 20 75" fill="none" stroke={wings.vein} strokeWidth="0.5" opacity="0.4" />
          <path d="M 80 55 C 65 52, 45 45, 30 38" fill="none" stroke={wings.vein} strokeWidth="0.4" opacity="0.3" />
        </motion.g>

        {/* LEFT Lower Wing */}
        <motion.path
          d="M 80 65 C 65 60, 20 65, 15 85 C 10 105, 50 108, 80 80 Z"
          fill={`url(#wg-lower-${wings.lower})`}
          stroke={wings.vein}
          strokeWidth="0.5"
          filter="url(#wingshadow)"
          style={{ transformOrigin: "80px 65px" }}
          animate={{ rotateY: [0, -55, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.02 }}
        />

        {/* RIGHT Upper Wing */}
        <motion.path
          d="M 80 55 C 100 50, 150 30, 155 55 C 160 80, 120 90, 80 70 Z"
          fill={`url(#wg-upper-${wings.upper})`}
          stroke={wings.vein}
          strokeWidth="0.5"
          filter="url(#wingshadow)"
          style={{ transformOrigin: "80px 55px" }}
          animate={{ rotateY: [0, 60, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* RIGHT Upper Wing veins */}
        <motion.g
          style={{ transformOrigin: "80px 55px" }}
          animate={{ rotateY: [0, 60, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M 80 55 C 105 52, 130 40, 150 48" fill="none" stroke={wings.vein} strokeWidth="0.6" opacity="0.5" />
          <path d="M 80 55 C 100 58, 125 65, 140 75" fill="none" stroke={wings.vein} strokeWidth="0.5" opacity="0.4" />
          <path d="M 80 55 C 115 52, 135 45, 150 38" fill="none" stroke={wings.vein} strokeWidth="0.4" opacity="0.3" />
        </motion.g>

        {/* RIGHT Lower Wing */}
        <motion.path
          d="M 80 65 C 95 60, 140 65, 145 85 C 150 105, 110 108, 80 80 Z"
          fill={`url(#wg-lower-${wings.lower})`}
          stroke={wings.vein}
          strokeWidth="0.5"
          filter="url(#wingshadow)"
          style={{ transformOrigin: "80px 65px" }}
          animate={{ rotateY: [0, 55, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.02 }}
        />

        {/* Body segments */}
        <ellipse cx="80" cy="55" rx="3.5" ry="22" fill={wings.body} />
        {/* Head */}
        <circle cx="80" cy="33" r="5" fill={wings.body} />
        {/* Antennae */}
        <path d="M 80 33 C 72 22, 65 14, 62 8" fill="none" stroke={wings.body} strokeWidth="1" strokeLinecap="round" />
        <circle cx="62" cy="8" r="2" fill={wings.body} />
        <path d="M 80 33 C 88 22, 95 14, 98 8" fill="none" stroke={wings.body} strokeWidth="1" strokeLinecap="round" />
        <circle cx="98" cy="8" r="2" fill={wings.body} />
      </svg>
    </motion.div>
  );
}
