"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BackgroundGreenhouse } from "@/components/preeti/generative/BackgroundGreenhouse";
import { ChapterControls } from "@/components/preeti/ui/ChapterControls";
import { Lock, Unlock } from "lucide-react";

export function Chapter9_Greenhouse({ onComplete }: { onComplete: () => void }) {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="w-full h-full relative overflow-hidden bg-transparent">
      {/* Dynamic Greenhouse Background */}
      <BackgroundGreenhouse chapterProgress={9} />
      
      {/* Animated Overgrown Vines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <motion.path
          d="M 0 0 C 20 20, 10 50, 30 80 S 50 100, 60 100"
          fill="none"
          stroke="rgba(16, 185, 129, 0.4)" // emerald-500
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 6, ease: "easeInOut" }}
        />
        <motion.path
          d="M 100 0 C 80 30, 90 60, 70 90 S 40 100, 30 100"
          fill="none"
          stroke="rgba(52, 211, 153, 0.4)" // emerald-400
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, delay: 1, ease: "easeInOut" }}
        />
        <motion.path
          d="M 50 0 C 60 40, 40 60, 50 100"
          fill="none"
          stroke="rgba(5, 150, 105, 0.3)" // emerald-600
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 7, delay: 0.5, ease: "easeInOut" }}
        />
      </svg>
      

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="locked"
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4"
          >
            <div className="w-24 h-24 bg-white/20 backdrop-blur-xl border border-white/40 rounded-full shadow-[0_0_40px_rgba(16,185,129,0.3)] flex items-center justify-center mb-8">
              <Lock className="w-10 h-10 text-emerald-100" />
            </div>
            <h2 className="text-4xl md:text-6xl font-playfair text-emerald-50 mb-4 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]">
              The Secret Greenhouse
            </h2>
            <p className="text-emerald-200/80 italic font-serif text-xl md:text-2xl mb-12 tracking-wide drop-shadow-sm">
              The sanctuary of our most precious memories.
            </p>
            <button 
              onClick={() => setUnlocked(true)}
              className="px-10 py-4 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/50 text-emerald-50 rounded-full font-sans tracking-[0.2em] text-sm hover:bg-emerald-500/40 hover:border-emerald-300 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              Turn the Key
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 p-4 md:p-8"
          >
            <div className="w-full max-w-5xl max-h-[90vh] bg-[#022c22]/60 backdrop-blur-2xl border border-emerald-500/30 rounded-[2rem] p-8 md:p-14 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-y-auto custom-scrollbar flex flex-col items-center">
            <Unlock className="w-10 h-10 text-emerald-400 mb-8 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
            <h2 className="text-4xl md:text-6xl font-playfair text-emerald-50 mb-12 text-center drop-shadow-md">
              Happy Birthday, Preeti Ma&apos;am
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/10 flex flex-col items-center hover:bg-white/10 transition-all cursor-pointer hover:border-emerald-400/50 group">
                <div className="w-full h-56 bg-black/40 rounded-xl flex items-center justify-center mb-6 overflow-hidden relative">
                   <div className="absolute inset-0 bg-emerald-900/20 group-hover:bg-emerald-500/20 transition-colors" />
                   <span className="text-emerald-300 font-sans tracking-widest text-sm z-10 drop-shadow-md flex items-center gap-2"><span className="text-xl">▶</span> Play Video</span>
                </div>
                <p className="font-playfair text-2xl text-emerald-100 italic">Our Class Montage</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/10 flex flex-col items-center hover:bg-white/10 transition-all cursor-pointer hover:border-emerald-400/50 group">
                <div className="w-full h-56 bg-black/40 rounded-xl flex items-center justify-center mb-6 overflow-hidden relative">
                   <div className="absolute inset-0 bg-emerald-900/20 group-hover:bg-emerald-500/20 transition-colors" />
                   <span className="text-emerald-300 font-sans tracking-widest text-sm z-10 drop-shadow-md flex items-center gap-2"><span className="text-xl">📷</span> Group Photo</span>
                </div>
                <p className="font-playfair text-2xl text-emerald-100 italic">Class of 2023</p>
              </div>
            </div>

            <button 
              onClick={onComplete}
              className="mt-8 px-10 py-4 bg-transparent border border-emerald-500/50 text-emerald-300 rounded-full font-sans tracking-[0.2em] text-sm hover:bg-emerald-900/50 hover:text-emerald-100 transition-all"
            >
              Leave the Greenhouse
            </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ChapterControls 
        instruction={unlocked ? "The greenhouse is open." : "Click the lock to open the greenhouse..."} 
        onSkip={() => {
          if (!unlocked) {
            setUnlocked(true);
          } else {
            onComplete();
          }
        }} 
      />
    </div>
  );
}
