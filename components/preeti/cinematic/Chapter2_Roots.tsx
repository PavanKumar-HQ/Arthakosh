"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const ROOTS = [
  { id: 1, name: "Patience", memory: "When I struggled with the basics, you never rushed me.", color: "from-amber-400 to-orange-500", path: "M 500 0 C 450 100, 300 200, 200 400" },
  { id: 2, name: "Guidance", memory: "You showed me the path when I was completely lost.", color: "from-yellow-300 to-amber-500", path: "M 500 0 C 550 150, 450 300, 500 500" },
  { id: 3, name: "Encouragement", memory: "Your belief in me made me believe in myself.", color: "from-orange-300 to-red-400", path: "M 500 0 C 600 100, 800 250, 850 450" },
  { id: 4, name: "Discipline", memory: "You taught me the value of hard work and focus.", color: "from-amber-600 to-orange-700", path: "M 500 0 C 400 150, 450 250, 350 450" },
  { id: 5, name: "Care", memory: "You noticed when I was having a bad day, every single time.", color: "from-yellow-400 to-orange-400", path: "M 500 0 C 650 100, 600 300, 700 400" },
];

function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const MINERALS = Array.from({ length: 40 }, (_, i) => ({
  left: (sr(i * 7) * 100).toFixed(2),
  top: (sr(i * 11) * 100).toFixed(2),
  size: 1 + sr(i * 13) * 3,
  duration: 4 + sr(i * 17) * 6,
  color: ["bg-amber-300", "bg-orange-300", "bg-yellow-100", "bg-amber-500"][i % 4],
}));

export function Chapter2_Roots({ onComplete }: { onComplete: () => void }) {
  const [activeRoot, setActiveRoot] = useState<number | null>(null);

  return (
    <div className="w-full h-full relative bg-[#1c110a] flex items-center justify-center overflow-hidden">
      
      {/* Background Soil Magic Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#3a2212_0%,#1c110a_70%)]" />
        
        {/* Animated Soil Glow */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,224,71,0.05)_0%,transparent_60%)]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating Minerals in the Soil */}
        {MINERALS.map((m, i) => (
          <motion.div
            key={`mineral-${i}`}
            className={`absolute rounded-full blur-[1px] ${m.color}`}
            style={{ 
              left: `${m.left}%`, 
              top: `${m.top}%`, 
              width: m.size, 
              height: m.size 
            }}
            animate={{ 
              y: [-10, 10, -10], 
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: m.duration, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: sr(i) * 5
            }}
          />
        ))}
      </div>

      <div className="text-center absolute top-16 z-20">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-4xl md:text-5xl font-playfair text-amber-200 tracking-widest mb-2"
          style={{ textShadow: "0 2px 10px rgba(253,224,71,0.3)" }}
        >
          Roots of Kindness
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-amber-400/80 font-sans tracking-widest uppercase text-sm font-semibold"
        >
          Hover over each root to reveal memories. Click 'Continue' below when ready.
        </motion.p>
      </div>

      {/* SVG Roots System */}
      <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMin slice">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* The Base Trunk connection at top */}
        <motion.path 
          d="M 480 -50 L 520 -50 L 550 50 L 450 50 Z" 
          fill="#4a2e1b"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* The Roots */}
        {ROOTS.map((root, i) => (
          <motion.g 
            key={root.id}
            onHoverStart={() => setActiveRoot(root.id)}
            onHoverEnd={() => setActiveRoot(null)}
            className="cursor-pointer"
          >
            <motion.path
              d={root.path}
              fill="none"
              stroke={activeRoot === root.id ? "#fde047" : "#8a5232"}
              strokeWidth={activeRoot === root.id ? "8" : "4"}
              strokeLinecap="round"
              filter={activeRoot === root.id ? "url(#glow)" : ""}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 1 + i * 0.5, ease: "easeOut" }}
            />
            {/* Pulsing light traveling down the root */}
            <motion.circle
              r="4"
              fill="#fef08a"
              filter="url(#glow)"
              animate={{
                offsetDistance: ["0%", "100%"],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + (i * 0.4) * 2,
                repeat: Infinity,
                delay: i,
                ease: "linear"
              }}
              style={{
                offsetPath: `path('${root.path}')`,
              }}
            />
          </motion.g>
        ))}
      </svg>

      {/* Hover Memory Reveal */}
      <AnimatePresence>
        {activeRoot && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute z-30 bottom-32 max-w-lg bg-black/40 backdrop-blur-md border border-amber-500/30 p-8 rounded-2xl text-center shadow-[0_0_50px_rgba(253,224,71,0.1)]"
          >
            <h3 className="text-3xl font-playfair text-amber-300 mb-4 tracking-wider">
              {ROOTS.find(r => r.id === activeRoot)?.name}
            </h3>
            <p className="text-lg font-sans text-amber-100/90 leading-relaxed italic">
              &quot;{ROOTS.find(r => r.id === activeRoot)?.memory}&quot;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5 }}
        onClick={onComplete}
        className="absolute bottom-10 px-8 py-3 bg-amber-900/50 hover:bg-amber-800 text-amber-200 border border-amber-700/50 rounded-full font-sans tracking-widest text-sm z-30 transition-all hover:scale-105"
      >
        Continue to the Surface
      </motion.button>
    </div>
  );
}
