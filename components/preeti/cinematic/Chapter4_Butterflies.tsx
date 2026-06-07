"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SVGButterfly } from "@/components/preeti/generative/SVGButterfly";
import { ChapterControls } from "@/components/preeti/ui/ChapterControls";

// Deterministic seed
function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const BUTTERFLIES = [
  { id: 1, color: "#3b82f6", x: 15, y: 30, msg: "Thank you for the endless support.", photo: true },
  { id: 2, color: "#a855f7", x: 75, y: 25, msg: "Your words changed my life.", photo: false },
  { id: 3, color: "#ec4899", x: 45, y: 65, msg: "I still remember your smile every morning.", photo: true },
];

export function Chapter4_Butterflies({ onComplete }: { onComplete: () => void }) {
  const [activeButterfly, setActiveButterfly] = useState<number | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);

  const handleCatch = (id: number) => {
    setActiveButterfly(id);
    if (!completed.includes(id)) {
      setCompleted([...completed, id]);
    }
  };

  const handleClose = () => {
    setActiveButterfly(null);
    if (completed.length === BUTTERFLIES.length) {
      setTimeout(() => onComplete(), 2000);
    }
  };

  return (
    <div className="w-full h-full relative bg-emerald-800 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Dreamy Twilight Sky Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#4c1d95_0%,#1e1b4b_100%)]" />
        {/* Soft magical color blobs (Static to prevent GPU overdraw lag) */}
        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-pink-600/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[80px]" />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-[25rem] h-[25rem] bg-fuchsia-400/10 rounded-full blur-[60px]"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Volumetric Light Rays (God Rays) */}
      <motion.div 
        className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-[conic-gradient(from_200deg_at_top_right,rgba(253,224,71,0.1)_0deg,transparent_30deg,transparent_330deg,rgba(253,224,71,0.1)_360deg)] pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="text-center absolute top-16 z-20 pointer-events-none w-full">
        <motion.h2 
          initial={{ opacity: 0, y: -20, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5 }}
          className="text-4xl md:text-6xl font-playfair text-pink-100 mb-4 drop-shadow-[0_0_20px_rgba(244,114,182,0.5)] tracking-widest"
        >
          The Messengers
        </motion.h2>
      </div>

      {/* The Butterflies */}
      {BUTTERFLIES.map((b) => (
        <motion.div
          key={b.id}
          className={`absolute cursor-pointer text-5xl drop-shadow-md z-10 ${b.color} ${activeButterfly === b.id ? 'z-30' : ''}`}
          style={activeButterfly === b.id ? {
            left: "50%",
            top: "40%",
            transform: "translate(-50%, -50%)"
          } : {
            left: `${b.x}%`,
            top: `${b.y}%`
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={activeButterfly === b.id ? {
            scale: 1.5,
            rotate: 0,
            opacity: 1,
            x: 0, y: 0
          } : activeButterfly !== null ? {
            opacity: 0,
          } : {
            opacity: completed.includes(b.id) ? 0.4 : 1,
            scale: 1,
            x: [0, 20, -20, 0],
            y: [0, -20, 20, 0],
            rotate: [-10, 10, -10]
          }}
          transition={activeButterfly === b.id ? { duration: 0.5, ease: "easeOut" } : { duration: 4 + sr(b.id * 7) * 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => handleCatch(b.id)}
        >
          {/* Using SVG Butterfly - SCALED UP */}
          <div className="drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
            <SVGButterfly color={b.color} delay={b.id * 0.1} size={220} />
          </div>
        </motion.div>
      ))}

      {/* The Message Modal */}
      <AnimatePresence>
        {activeButterfly !== null && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(10px)" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-20 z-20 bg-[#1e1b4b]/60 backdrop-blur-2xl p-10 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-pink-500/20 max-w-lg w-full text-center"
          >
            <p className="font-playfair text-2xl text-pink-100 italic leading-relaxed mb-8 drop-shadow-md">
              &quot;{BUTTERFLIES.find(b => b.id === activeButterfly)?.msg}&quot;
            </p>
            {BUTTERFLIES.find(b => b.id === activeButterfly)?.photo && (
              <div className="w-full h-40 bg-black/30 rounded-xl mb-8 flex items-center justify-center text-pink-200/50 font-sans text-xs tracking-widest border border-white/5">
                [ Photo Appears ]
              </div>
            )}
            <button 
              onClick={handleClose}
              className="px-8 py-3 bg-transparent border border-pink-500/50 text-pink-200 rounded-full font-sans tracking-[0.2em] text-xs hover:bg-pink-900/50 hover:text-white transition-all uppercase"
            >
              Let it fly away
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <ChapterControls 
        instruction={completed.length === BUTTERFLIES.length ? "They have delivered their messages." : "Click to catch the glowing butterflies..."} 
        onSkip={onComplete} 
      />
    </div>
  );
}
