"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SVGFlowerProps {
  isBlooming: boolean;
  petalColor?: string;
  coreColor?: string;
  strokeColor?: string;
  size?: number;
  text?: string;
  isShaking?: boolean;
  delay?: number;
}

export function SVGFlower({ 
  isBlooming,
  petalColor = "#f472b6", 
  coreColor = "#facc15",  
  strokeColor = "rgba(255,255,255,0.5)",
  size = 120,
  text,
  isShaking,
  delay = 0
}: SVGFlowerProps) {
  
  // Math for procedural petals
  const numPetals = 12;
  const petals = Array.from({ length: numPetals }).map((_, i) => {
    const angle = (i * 360) / numPetals;
    return { id: i, angle };
  });

  const numInnerPetals = 8;
  const innerPetals = Array.from({ length: numInnerPetals }).map((_, i) => {
    const angle = (i * 360) / numInnerPetals + 22.5; // offset
    return { id: i, angle };
  });

  return (
    <div 
      className="relative flex items-center justify-center drop-shadow-2xl"
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

      <motion.svg
        viewBox="-100 -100 200 200"
        style={{ width: size, height: size, overflow: "visible" }}
        initial={{ rotate: -45, scale: 0 }}
        animate={isShaking 
          ? { x: [-3, 3, -3, 3, -2, 2, 0], y: [-1, 1, -1, 1, 0], rotate: 0 } 
          : isBlooming ? { rotate: 0, scale: 1 } : { rotate: -45, scale: 0 }
        }
        transition={isShaking ? { duration: 0.5 } : { duration: 2, ease: "easeOut" }}
      >
        <defs>
          <radialGradient id={`petalGrad-${petalColor.replace(/[^a-zA-Z0-9]/g, '')}`} cx="50%" cy="100%" r="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor={petalColor} stopOpacity="0.95" />
            <stop offset="100%" stopColor={petalColor} stopOpacity="0.7" />
          </radialGradient>
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor={coreColor} />
            <stop offset="100%" stopColor="#ca8a04" />
          </radialGradient>
        </defs>
        <g transform="translate(70, 90)">
        {/* Outer Petals */}
        {petals.map((p) => (
          <motion.g
            key={`outer-${p.id}`}
            style={{ originX: 0, originY: 0 }}
            initial={{ rotate: p.angle, scale: 0 }}
            animate={{ 
              rotate: p.angle, 
              scale: isBlooming ? 1 : 0 
            }}
            transition={{ duration: 1.5, delay: delay + 0.5 + (p.id % 3) * 0.2, type: "spring" }}
          >
            <path
              d="M 0 0 C 30 -50, 70 -50, 0 -90 C -70 -50, -30 -50, 0 0"
              fill={`url(#petalGrad-${petalColor.replace(/[^a-zA-Z0-9]/g, '')})`}
              stroke={strokeColor}
              strokeWidth="1"
            />
          </motion.g>
        ))}

        {/* Inner Petals */}
        {innerPetals.map((p) => (
          <motion.g
            key={`inner-${p.id}`}
            style={{ originX: 0, originY: 0 }}
            initial={{ rotate: p.angle, scale: 0 }}
            animate={{ 
              rotate: p.angle, 
              scale: isBlooming ? 0.7 : 0 
            }}
            transition={{ duration: 1.5, delay: delay + 1 + (p.id % 2) * 0.2, type: "spring" }}
          >
            <path
              d="M 0 0 C 20 -40, 50 -40, 0 -70 C -50 -40, -20 -40, 0 0"
              fill={`url(#petalGrad-${petalColor.replace(/[^a-zA-Z0-9]/g, '')})`}
              stroke={strokeColor}
              strokeWidth="1"
            />
          </motion.g>
        ))}

        {/* Flower Core */}
        <motion.circle
          cx="-70"
          cy="-90"
          r="15"
          fill="url(#coreGrad)"
          initial={{ scale: 0 }}
          animate={{ scale: isBlooming ? 1 : 0 }}
          transition={{ duration: 1, delay: delay + 1.5 }}
        />
        
        {/* Core details (pistils) */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.circle
            key={`pistil-${i}`}
            cx={-70 + Math.cos((i * 360) / 12 * (Math.PI/180)) * 8}
            cy={-90 + Math.sin((i * 360) / 12 * (Math.PI/180)) * 8}
            r="1.5"
            fill="#fff"
            initial={{ opacity: 0 }}
            animate={{ opacity: isBlooming ? 1 : 0 }}
            transition={{ duration: 1, delay: delay + 2 + i * 0.05 }}
          />
        ))}
        </g>
      </motion.svg>
    </div>
  );
}
