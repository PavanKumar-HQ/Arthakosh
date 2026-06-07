"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Deterministic seed
function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const PATHS = [
  { id: "rose", name: "Rose Path", type: "Funny Memories", color: "from-rose-400 to-rose-600", bg: "from-rose-50 to-[#faf8f5]", petalColor: "bg-rose-300" },
];

export function Chapter3_Paths({ onComplete }: { onComplete: () => void }) {
  const [activePath, setActivePath] = useState<string | null>(null);

  const handlePathClick = (id: string) => {
    setActivePath(id);
    // In a real app, this might load a sub-sequence. For this cinematic flow,
    // we show a beautiful blooming effect then move to the next chapter.
    setTimeout(() => {
      onComplete();
    }, 4000);
  };

  return (
    <div className="w-full h-full relative bg-[#020617] flex items-center justify-center overflow-hidden">
      
      {/* Misty Forest Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#1e293b_0%,#020617_80%)]" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Soft floating mist clouds */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1/2 bg-slate-800/30 blur-[60px]"
          animate={{ x: [-50, 50, -50] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/4 w-full h-1/2 bg-cyan-900/20 blur-[80px]"
          animate={{ x: [50, -50, 50] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="text-center z-30 mb-16 px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-playfair text-emerald-50 mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        >
          {activePath ? `Walking the ${PATHS.find(p => p.id === activePath)?.name}` : "The Path of Memories"}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-emerald-200 italic font-serif text-lg md:text-xl drop-shadow-sm"
        >
          {activePath ? "Let the memories bloom..." : "Choose a path to walk."}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-2 font-sans text-sm tracking-widest text-amber-200/80 uppercase"
        >
          {activePath ? "Journey Continues..." : "Choose a path to explore"}
        </motion.p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 md:gap-16 z-20 px-4">
        {PATHS.map((path, i) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: activePath && activePath !== path.id ? 0 : 1,
              scale: activePath === path.id ? 1.2 : 1,
              y: activePath === path.id ? -50 : 0
            }}
            transition={{ duration: 1, delay: i * 0.2 }}
            onClick={() => !activePath && handlePathClick(path.id)}
            className={`relative group cursor-pointer flex flex-col items-center ${activePath && activePath !== path.id ? 'pointer-events-none' : ''}`}
          >
            {/* The Path Graphic */}
            <div className="w-32 h-64 relative overflow-hidden rounded-t-full shadow-lg border-2 border-white/50 backdrop-blur-sm bg-white/20">
              <div className={`absolute inset-0 opacity-40 bg-gradient-to-t ${path.color}`} />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 200">
                <path d="M 50 200 Q 20 100 50 0" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeDasharray="5,5" />
              </svg>
            </div>
            
            <div className="mt-6 text-center">
              <h3 className="font-playfair font-bold text-xl text-emerald-100 group-hover:text-white transition-colors">{path.name}</h3>
              <p className="font-sans text-xs uppercase tracking-widest text-emerald-300/80 mt-1">{path.type}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Magical blooming effect when path is chosen */}
      <AnimatePresence>
        {activePath && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 10 }}
            className={`absolute z-10 w-64 h-64 rounded-full blur-3xl bg-gradient-to-r ${PATHS.find(p => p.id === activePath)?.color} opacity-20`}
            transition={{ duration: 3 }}
          />
        )}
      </AnimatePresence>

      {activePath && Array.from({ length: 50 }).map((_, i) => {
        const petalColor = PATHS.find(p => p.id === activePath)?.petalColor || "bg-pink-300";
        return (
          <motion.div
            key={`petal-${i}`}
            className={`absolute w-4 h-6 opacity-80 drop-shadow-sm ${petalColor}`}
            style={{ 
              left: `${(sr(i * 7) * 100).toFixed(2)}%`, 
              top: "-10%",
              borderRadius: "50% 0 50% 50%" // Realistic petal/teardrop shape
            }}
            initial={{ y: 0, x: 0, opacity: 0, scale: 0 }}
            animate={{ 
              y: "120vh", 
              x: (sr(i * 11) - 0.5) * 300,
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
              rotate: [0, 180, 360, 720] // Tumble like a real petal
            }}
            transition={{ duration: 4 + sr(i * 13) * 4, ease: "linear" }}
          />
        );
      })}

    </div>
  );
}
