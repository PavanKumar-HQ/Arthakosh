"use client";

import { motion } from "framer-motion";

interface ChapterControlsProps {
  instruction: string;
  onSkip: () => void;
  skipText?: string;
  className?: string;
  darkText?: boolean;
}

export function ChapterControls({ instruction, onSkip, skipText = "Next \u2192", className = "", darkText = false }: ChapterControlsProps) {
  const textColor = darkText ? "text-slate-800" : "text-white/80";
  const buttonColor = darkText 
    ? "border-slate-800/30 bg-white/40 text-slate-800 hover:bg-slate-800 hover:text-white" 
    : "border-white/20 bg-black/20 text-white/70 hover:bg-white/10 hover:text-white";

  return (
    <div className={`absolute inset-0 pointer-events-none z-50 ${className}`}>
      
      {/* Centered Instruction Text at the bottom */}
      <motion.div 
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center w-full px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <p className={`font-sans text-base md:text-lg font-medium tracking-[0.15em] uppercase drop-shadow-md ${textColor}`}>
          {instruction}
        </p>
      </motion.div>

      {/* Skip Button in the bottom right */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          onSkip();
        }}
        className={`absolute bottom-6 right-6 md:bottom-10 md:right-10 pointer-events-auto px-6 py-2 rounded-full border backdrop-blur-md font-sans text-xs uppercase tracking-widest transition-all drop-shadow-lg ${buttonColor}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        {skipText}
      </motion.button>
      
    </div>
  );
}
