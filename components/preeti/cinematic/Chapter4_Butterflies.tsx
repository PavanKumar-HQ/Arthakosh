"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SVGButterfly } from "@/components/preeti/generative/SVGButterfly";

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
    <div className="w-full h-full relative bg-transparent flex flex-col items-center justify-center overflow-hidden">
      
      {/* Soft God Rays */}
      <motion.div 
        className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-[conic-gradient(from_200deg_at_top_right,rgba(253,224,71,0.15)_0deg,transparent_30deg,transparent_330deg,rgba(253,224,71,0.15)_360deg)] pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3], rotate: [-2, 2, -2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "top right" }}
      />

      {/* Floating Dust Particles in the Light */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-1 h-1 bg-amber-200/50 rounded-full blur-[1px]"
            style={{ 
              left: `${(sr(i * 7) * 100).toFixed(2)}%`, 
              top: `${(sr(i * 11) * 100).toFixed(2)}%` 
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              y: [-10, 10, -10],
              x: [-10, 10, -10],
              opacity: [0.1, 0.5, 0.1]
            }}
            transition={{ 
              duration: 4 + sr(i * 13) * 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: sr(i * 17) * 2 
            }}
          />
        ))}
      </div>

      <div className="text-center absolute top-16 z-20 pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-playfair text-amber-900 mb-2"
        >
          The Butterfly Messengers
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-amber-700 italic font-serif text-lg"
        >
          Catch a butterfly to unfold a memory.
        </motion.p>
      </div>

      {/* The Butterflies */}
      {BUTTERFLIES.map((b) => (
        <motion.div
          key={b.id}
          className={`absolute cursor-pointer text-5xl drop-shadow-md z-10 ${b.color} ${activeButterfly === b.id ? 'z-30' : ''}`}
          style={{ left: `${b.x}%`, top: `${b.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={activeButterfly === b.id ? {
            left: "50%",
            top: "40%",
            x: "-50%",
            y: "-50%",
            scale: 1.5,
            rotate: 0,
            opacity: 1
          } : activeButterfly !== null ? {
            opacity: 0
          } : {
            opacity: completed.includes(b.id) ? 0.4 : 1,
            scale: 1,
            x: [0, 20, -20, 0],
            y: [0, -20, 20, 0],
            rotate: [-10, 10, -10]
          }}
          transition={activeButterfly === b.id ? { duration: 1 } : { duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => handleCatch(b.id)}
        >
          <SVGButterfly color={b.color} size={80} delay={b.id * 0.2} />
        </motion.div>
      ))}

      {/* The Message Modal */}
      <AnimatePresence>
        {activeButterfly !== null && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-16 z-20 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-amber-100 max-w-md w-full text-center"
          >
            <p className="font-playfair text-xl text-amber-900 leading-relaxed italic mb-6">
              &quot;{BUTTERFLIES.find(b => b.id === activeButterfly)?.msg}&quot;
            </p>
            {BUTTERFLIES.find(b => b.id === activeButterfly)?.photo && (
              <div className="w-full h-32 bg-amber-100 rounded-lg mb-6 flex items-center justify-center text-amber-600 font-sans text-sm">
                [ Photo Appears ]
              </div>
            )}
            <button 
              onClick={handleClose}
              className="px-6 py-2 bg-amber-100 text-amber-800 rounded-full font-sans text-sm hover:bg-amber-200 transition-colors"
            >
              Let it fly away
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
