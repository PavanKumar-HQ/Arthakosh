"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FractalRoots } from "@/components/preeti/generative/FractalRoots";
import { useState, useEffect } from "react";

const ROOTS = [
  { id: 1, name: "Patience", memory: "When I struggled with the basics, you never rushed me.", x: 20, y: 40 },
  { id: 2, name: "Guidance", memory: "You showed me the path when I was completely lost.", x: 80, y: 50 },
  { id: 3, name: "Encouragement", memory: "Your belief in me made me believe in myself.", x: 30, y: 70 },
  { id: 4, name: "Discipline", memory: "You taught me the value of hard work and focus.", x: 70, y: 80 },
  { id: 5, name: "Care", memory: "You noticed when I was having a bad day, every single time.", x: 50, y: 90 },
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
  const [growthProgress, setGrowthProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGrowthProgress(1);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const isComplete = growthProgress === 1;

  return (
    <div className="w-full h-full relative bg-[#1c110a] flex flex-col items-center justify-center overflow-hidden">
      
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

      <div className="absolute top-16 text-center z-20 px-4 pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-4xl md:text-5xl font-playfair text-amber-100 tracking-widest mb-4 drop-shadow-md"
        >
          Strong Foundations
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="text-amber-200/80 font-sans tracking-widest uppercase text-sm font-semibold"
        >
          {isComplete ? "Hover over the glowing nodes to reveal memories." : "The roots reach deep..."}
        </motion.p>
      </div>

      {/* The Fractal L-System Roots growing downwards */}
      <div className="absolute top-[20%] w-[800px] h-[800px] z-10 pointer-events-none origin-top flex justify-center">
        <FractalRoots growthPhase={growthProgress} width={800} height={800} />
      </div>

      {/* Interactive Memory Nodes embedded in the roots */}
      {ROOTS.map((root, i) => (
        <motion.div
          key={root.id}
          className="absolute z-20 cursor-pointer rounded-full bg-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]"
          style={{ left: `${root.x}%`, top: `${root.y}%`, width: 16, height: 16, translateX: "-50%", translateY: "-50%" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: activeRoot === root.id ? 1.5 : 1, opacity: growthProgress > 0.8 ? 1 : 0 }}
          transition={{ delay: growthProgress > 0.8 ? i * 0.2 : 0, duration: 0.5 }}
          onHoverStart={() => setActiveRoot(root.id)}
          onHoverEnd={() => setActiveRoot(null)}
        >
          <motion.div 
            className="absolute inset-0 rounded-full bg-amber-200 blur-sm"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      ))}

      {/* Hover Memory Reveal */}
      <AnimatePresence>
        {activeRoot && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute z-30 bottom-32 max-w-lg bg-black/40 backdrop-blur-md border border-amber-500/30 p-8 rounded-2xl text-center shadow-[0_0_50px_rgba(253,224,71,0.1)] pointer-events-none"
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
