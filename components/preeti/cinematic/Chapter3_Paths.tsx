"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const PATHS = [
  { id: "rose", name: "Rose Path", type: "Funny Memories", color: "from-rose-400 to-rose-600", bg: "from-rose-50 to-[#faf8f5]", petalColor: "bg-rose-300" },
  { id: "sunflower", name: "Sunflower Path", type: "Achievements", color: "from-amber-400 to-yellow-600", bg: "from-amber-50 to-[#faf8f5]", petalColor: "bg-amber-300" },
  { id: "lavender", name: "Lavender Path", type: "Heartfelt Messages", color: "from-purple-400 to-violet-600", bg: "from-purple-50 to-[#faf8f5]", petalColor: "bg-purple-300" },
  { id: "daisy", name: "Daisy Path", type: "Classroom Moments", color: "from-sky-300 to-blue-500", bg: "from-sky-50 to-[#faf8f5]", petalColor: "bg-sky-300" },
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
    <div className={`w-full h-full relative transition-colors duration-1000 bg-gradient-to-b ${activePath ? PATHS.find(p => p.id === activePath)?.bg : "from-[#e8f5e9] to-[#faf8f5]"} flex flex-col items-center justify-center overflow-hidden`}>
      
      <div className="text-center z-30 mb-16 px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-playfair text-emerald-900 mb-4"
        >
          {activePath ? `Walking the ${PATHS.find(p => p.id === activePath)?.name}` : "The Path of Memories"}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-emerald-700 italic font-serif text-lg md:text-xl"
        >
          {activePath ? "Let the memories bloom..." : "Choose a path to walk."}
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
            <div className="w-32 h-64 relative overflow-hidden rounded-t-full shadow-lg border-2 border-white/50 backdrop-blur-sm bg-white/20 transition-transform group-hover:scale-105">
              <div className={`absolute inset-0 opacity-40 bg-gradient-to-t ${path.color}`} />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 200">
                <path d="M 50 200 Q 20 100 50 0" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeDasharray="5,5" />
              </svg>
            </div>
            
            <div className="mt-6 text-center">
              <h3 className="font-playfair font-bold text-xl text-emerald-900 group-hover:text-emerald-700">{path.name}</h3>
              <p className="font-sans text-xs uppercase tracking-widest text-emerald-600/80 mt-1">{path.type}</p>
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

      {/* Falling Petals when path is clicked */}
      {activePath && Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={`petal-${i}`}
          className={`absolute w-3 h-3 rounded-full blur-[1px] z-30 opacity-80 ${PATHS.find(p => p.id === activePath)?.petalColor}`}
          style={{ left: `${Math.random() * 100}%`, top: "-10%" }}
          initial={{ y: 0, x: 0, opacity: 0, scale: 0 }}
          animate={{ 
            y: "120vh", 
            x: (Math.random() - 0.5) * 300,
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
            rotate: [0, 720] 
          }}
          transition={{ duration: 4 + Math.random() * 4, ease: "linear" }}
        />
      ))}

    </div>
  );
}
