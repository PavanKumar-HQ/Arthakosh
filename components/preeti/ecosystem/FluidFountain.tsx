"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SVGFlower } from "@/components/preeti/generative/SVGFlower";

export function FluidFountain() {
  const [clicked, setClicked] = useState(false);

  return (
    <div 
      className="relative w-[400px] h-[300px] flex items-end justify-center cursor-pointer group"
      onClick={(e) => { e.stopPropagation(); setClicked(true); }}
    >
      {/* Base of fountain */}
      <div className="absolute bottom-0 w-3/4 h-24 bg-slate-300 rounded-[50%] border-b-8 border-slate-400 drop-shadow-xl" />
      <div className="absolute bottom-12 w-1/4 h-48 bg-slate-300 rounded-t-full drop-shadow-lg" />
      
      {/* Water Pool */}
      <div className="absolute bottom-4 w-[70%] h-16 bg-cyan-300/60 rounded-[50%] overflow-hidden border-2 border-cyan-200/50 backdrop-blur-sm flex items-center justify-center">
        {/* Animated Ripples */}
        <motion.div 
          className="absolute w-full h-full border border-cyan-100 rounded-[50%]"
          animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute w-full h-full border border-cyan-100 rounded-[50%]"
          animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
          transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "easeOut" }}
        />

        {/* Secret Memory emerging from water */}
        {clicked && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: -40, opacity: 1 }}
            transition={{ type: "spring", duration: 2 }}
            className="absolute flex flex-col items-center pointer-events-none"
          >
            <SVGFlower isBlooming={true} color="stroke-cyan-500" />
            <p className="text-cyan-900 font-playfair font-bold mt-2 bg-white/80 px-3 py-1 rounded-full shadow-lg">
              A forgotten classroom joke...
            </p>
          </motion.div>
        )}
      </div>

      {/* Spouting Water */}
      <div className="absolute bottom-56 flex justify-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1 h-1 bg-cyan-200 rounded-full mx-0.5"
            animate={{ 
              y: [0, -40, 60], 
              x: [0, (i - 2) * 15], 
              opacity: [1, 1, 0] 
            }}
            transition={{ duration: 1.5 + Math.random() * 0.5, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
      </div>
    </div>
  );
}
