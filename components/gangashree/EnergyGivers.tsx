"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useJourneyStore } from "@/lib/store";
import { gangashreeData } from "@/lib/data";

export function EnergyGivers() {
  const increaseEnergy = useJourneyStore(state => state.increaseEnergy);
  const [activeOrb, setActiveOrb] = useState<number | null>(null);

  const handleOrbClick = (id: number) => {
    setActiveOrb(activeOrb === id ? null : id);
    if (activeOrb !== id) {
      increaseEnergy(1); // Boost the core
    }
  };

  return (
    <div className="w-[200vw] h-full flex items-center relative shrink-0 border-r border-white/5">
      
      <div className="w-screen px-32 shrink-0">
        <h2 className="text-4xl md:text-7xl font-playfair font-light text-white tracking-[0.3em] uppercase">
          Energy Givers
        </h2>
        <p className="text-indigo-400 font-sans tracking-[0.4em] text-sm mt-8 uppercase">
          Every memory opened strengthens the core.
        </p>
      </div>

      <div className="w-screen relative h-full flex items-center justify-center shrink-0">
        
        {gangashreeData.memories.map((memory: any, i: number) => {
          // Deterministic layout positions based on index to prevent jumps on updates
          const seedTop = 20 + ((i * 17) % 55);
          const seedLeft = 10 + ((i * 29) % 75);
          const top = `${seedTop}%`;
          const left = `${seedLeft}%`;
          const duration = 3 + (i % 3) * 0.7;
          
          return (
            <motion.div
              key={memory.id}
              className="absolute"
              style={{ top, left }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* The Orb */}
              <div 
                onClick={() => handleOrbClick(memory.id)}
                className="w-12 h-12 rounded-full cursor-pointer relative flex items-center justify-center group"
              >
                <div className="absolute inset-0 bg-white/10 rounded-full blur-md group-hover:bg-white/30 transition-colors" />
                <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1)]" />
                
                {/* Energy beam effect on hover/active */}
                <div className={`absolute top-1/2 left-1/2 w-[500px] h-px bg-gradient-to-r from-white to-transparent origin-left transition-opacity duration-500 pointer-events-none -translate-y-1/2 ${
                  activeOrb === memory.id ? "opacity-100 rotate-[15deg]" : "opacity-0 group-hover:opacity-50"
                }`} />
              </div>

              {/* Memory Popup */}
              {activeOrb === memory.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-16 left-1/2 -translate-x-1/2 w-80 p-8 bg-transparent/80 backdrop-blur-md border border-white/20 z-50 pointer-events-none"
                >
                  <h4 className="text-white font-playfair mb-4 text-xl">{memory.title}</h4>
                  <p className="text-gray-400 font-sans text-sm leading-relaxed">
                    {memory.description}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

    </div>
  );
}
