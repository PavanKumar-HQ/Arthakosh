"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FractalRoots } from "@/components/preeti/generative/FractalRoots";
import { ChapterControls } from "@/components/preeti/ui/ChapterControls";
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
      
      {/* Deep Cinematic Soil Magic Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#2a1306_0%,#0a0502_80%)]" />
        
        {/* SVG Noise Filter removed for performance */}

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

      <div className="absolute top-16 text-center z-20 px-4 pointer-events-none w-full flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-playfair text-amber-100/90 tracking-widest mb-6 drop-shadow-[0_0_20px_rgba(253,224,71,0.3)]"
        >
          Strong Foundations
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="text-amber-200/60 font-sans tracking-[0.3em] uppercase text-xs md:text-sm font-semibold max-w-lg"
        >
          {isComplete ? "Hover over the glowing seeds of wisdom." : "The roots reach deep..."}
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
          className="absolute z-20 cursor-pointer rounded-full bg-yellow-200 drop-shadow-[0_0_15px_rgba(253,224,71,0.9)]"
          style={{ left: `${root.x}%`, top: `${root.y}%`, width: 12, height: 12, translateX: "-50%", translateY: "-50%" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: activeRoot === root.id ? 2 : 1, opacity: growthProgress > 0.8 ? 1 : 0 }}
          transition={{ delay: growthProgress > 0.8 ? i * 0.2 : 0, duration: 0.5 }}
          onHoverStart={() => setActiveRoot(root.id)}
          onHoverEnd={() => setActiveRoot(null)}
        >
          <motion.div 
            className="absolute inset-0 rounded-full bg-white blur-[2px]"
            animate={{ scale: [1, 2, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      ))}

      {/* Hover Memory Reveal */}
      <AnimatePresence>
        {activeRoot && (
          <motion.div 
            initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
            className="absolute z-30 bottom-32 max-w-lg bg-[#0a0502]/80 backdrop-blur-xl border border-amber-900/50 p-10 rounded-[2rem] text-center shadow-[0_20px_60px_rgba(0,0,0,0.8)] pointer-events-none"
          >
            <h3 className="text-4xl font-playfair text-amber-200 mb-6 tracking-wider drop-shadow-md">
              {ROOTS.find(r => r.id === activeRoot)?.name}
            </h3>
            <p className="text-xl font-playfair text-amber-100/80 leading-relaxed italic">
              &quot;{ROOTS.find(r => r.id === activeRoot)?.memory}&quot;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <ChapterControls 
        instruction={!isComplete ? "The roots reach deep..." : "Hover over the glowing seeds of wisdom."} 
        onSkip={phase < 4 ? () => setFedCount(ROOTS.length) : onComplete} 
      />
    </div>
  );
}
