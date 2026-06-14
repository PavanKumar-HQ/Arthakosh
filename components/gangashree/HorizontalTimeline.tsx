"use client";

import { motion } from "framer-motion";
import { useJourneyStore } from "@/lib/store";
import { gangashreeData } from "@/lib/data";

export function HorizontalTimeline() {
  const increaseEnergy = useJourneyStore(state => state.increaseEnergy);
  
  // Group memories by year
  const memoriesByYear = gangashreeData.memories.reduce((acc, curr) => {
    if (!acc[curr.year]) acc[curr.year] = [];
    acc[curr.year].push(curr);
    return acc;
  }, {} as Record<string, typeof gangashreeData.memories>);
  
  const years = Object.keys(memoriesByYear).sort();

  return (
    <div className="w-[300vw] h-full flex items-center shrink-0">
      
      {years.map((year, i) => (
        <div key={year} className="w-[60vw] h-[80vh] flex flex-col items-center justify-center relative shrink-0 group">
          
          {/* Celestial Gate */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[80%] h-full border-x-2 border-white/5 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent group-hover:via-indigo-500/[0.05] transition-colors duration-1000" />
          </div>

          <h3 className="text-[10vw] font-playfair font-bold text-white/5 absolute top-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
            {year}
          </h3>

          <div className="relative z-10 w-full max-w-md px-8">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-px bg-indigo-500" />
              <h4 className="text-xl font-sans tracking-[0.4em] uppercase text-indigo-400">{year}</h4>
            </div>

            <div className="space-y-8">
              {memoriesByYear[year].map((memory: any) => (
                <motion.div 
                  key={memory.id}
                  whileHover={{ scale: 1.05, x: 20 }}
                  onClick={() => increaseEnergy(2)}
                  className="bg-transparent/60 backdrop-blur-md border border-white/10 p-6 cursor-pointer hover:border-indigo-500/50 transition-colors"
                >
                  <p className="font-playfair text-white text-lg mb-2">{memory.title}</p>
                  <p className="text-gray-400 font-sans text-xs uppercase tracking-widest truncate">
                    Tap to extract energy
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      ))}

    </div>
  );
}
