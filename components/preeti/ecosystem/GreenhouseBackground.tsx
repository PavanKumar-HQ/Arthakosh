"use client";

import { motion } from "framer-motion";

export function GreenhouseBackground({ progress }: { progress: number }) {
  // Progress 0 to 1
  return (
    <div className="relative w-[600px] h-[400px] flex flex-col items-center justify-end pointer-events-none">
      
      {/* The Glow as progress increases */}
      <motion.div 
        className="absolute inset-0 bg-amber-200 blur-[100px]"
        animate={{ opacity: progress }}
        transition={{ duration: 2 }}
      />

      {/* The Glass Structure */}
      <div className="w-[80%] h-[60%] border-4 border-slate-300 rounded-t-[100px] relative overflow-hidden backdrop-blur-sm bg-white/10 shadow-2xl">
        {/* Glass panes */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-1 p-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border border-slate-300/30 bg-white/5 rounded-sm" />
          ))}
        </div>

        {/* Interior glow/content appearing */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-amber-100/40 to-transparent"
          animate={{ opacity: progress }}
        >
          {progress > 0.8 && (
            <div className="w-32 h-20 bg-white/80 rounded shadow-lg flex items-center justify-center text-xs font-bold text-amber-900 border border-amber-200">
              Birthday Video 🔒
            </div>
          )}
        </motion.div>

        {/* Glare effect */}
        <div className="absolute top-0 left-[-50%] w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent rotate-45 pointer-events-none" />
      </div>

    </div>
  );
}
