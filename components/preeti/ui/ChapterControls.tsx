"use client";

import { motion } from "framer-motion";

interface ChapterControlsProps {
  instruction: string;
  onSkip: () => void;
  skipText?: string;
  className?: string;
}

export function ChapterControls({ instruction, onSkip, skipText = "Skip \u2192", className = "" }: ChapterControlsProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none z-50 ${className}`}>
      
      {/* Centered Instruction Text at the bottom */}
      <motion.div 
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center w-full px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p className="font-sans text-sm md:text-base text-white/70 tracking-[0.2em] uppercase drop-shadow-md">
          {instruction}
        </p>
      </motion.div>

      {/* Skip Button in the bottom right */}
      <motion.button
        onClick={onSkip}
        className="absolute bottom-6 right-6 md:bottom-10 md:right-10 pointer-events-auto px-6 py-2 rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-white/60 font-sans text-xs uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all drop-shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        {skipText}
      </motion.button>
      
    </div>
  );
}
