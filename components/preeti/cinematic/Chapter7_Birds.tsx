"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const BIRDS = [
  { id: 1, type: "normal", color: "text-blue-500", x: 20, y: 30, delay: 0, msg: "Wish I could be in your class again!" },
  { id: 2, type: "normal", color: "text-red-500", x: 60, y: 20, delay: 2, msg: "I still laugh about the time we painted the desks." },
  { id: 3, type: "normal", color: "text-yellow-500", x: 40, y: 50, delay: 1, msg: "Happy Birthday to the best teacher!" },
  { id: 4, type: "rare", color: "text-purple-400 drop-shadow-[0_0_15px_rgba(192,132,252,1)]", x: 80, y: 40, delay: 3, msg: "[Voice Note: 'Thank you for believing in me.']" }
];

export function Chapter7_Birds({ onComplete }: { onComplete: () => void }) {
  const [activeBird, setActiveBird] = useState<number | null>(null);
  const [foundRare, setFoundRare] = useState(false);

  const handleCatch = (id: number, type: string) => {
    setActiveBird(id);
    if (type === "rare") setFoundRare(true);
  };

  const handleClose = () => {
    setActiveBird(null);
    if (foundRare) {
      setTimeout(onComplete, 1500);
    }
  };

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-blue-50 to-emerald-50 flex flex-col items-center justify-center overflow-hidden">
      
      <div className="text-center absolute top-16 z-20 pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-playfair text-emerald-900 mb-2"
        >
          Birds of Gratitude
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-emerald-700 italic font-serif text-lg"
        >
          Find the rare glowing bird to continue your journey.
        </motion.p>
      </div>

      {/* SVG Branches for birds to land on */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 0 30 Q 30 40 40 35" fill="none" stroke="#8a5232" strokeWidth="1" />
        <path d="M 100 40 Q 70 50 60 45" fill="none" stroke="#8a5232" strokeWidth="1" />
        <path d="M 0 60 Q 40 60 50 55" fill="none" stroke="#8a5232" strokeWidth="1" />
      </svg>

      {/* The Birds */}
      {BIRDS.map((b) => (
        <motion.div
          key={b.id}
          className={`absolute cursor-pointer text-4xl z-10 ${b.color} ${activeBird === b.id ? 'z-30' : ''}`}
          style={{ left: `${b.x}%`, top: `${b.y}%` }}
          initial={{ opacity: 0, x: -100, y: -50 }}
          animate={activeBird === b.id ? {
            left: "50%",
            top: "40%",
            x: "-50%",
            y: "-50%",
            scale: 2,
            opacity: 1
          } : activeBird !== null ? {
            opacity: 0
          } : {
            opacity: 1,
            x: 0, y: 0,
            scale: 1,
            rotate: [0, 5, -5, 0]
          }}
          transition={activeBird === b.id ? { duration: 0.5 } : { 
            opacity: { duration: 1, delay: b.delay }, 
            x: { duration: 2, delay: b.delay, type: "spring" },
            rotate: { duration: 3, repeat: Infinity } 
          }}
          onClick={() => handleCatch(b.id, b.type)}
        >
          🐦
        </motion.div>
      ))}

      {/* The Message Modal */}
      <AnimatePresence>
        {activeBird !== null && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-16 z-20 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-emerald-100 max-w-md w-full text-center"
          >
            <p className="font-playfair text-xl text-emerald-900 leading-relaxed italic mb-6">
              &quot;{BIRDS.find(b => b.id === activeBird)?.msg}&quot;
            </p>
            <button 
              onClick={handleClose}
              className="px-6 py-2 bg-emerald-100 text-emerald-800 rounded-full font-sans text-sm hover:bg-emerald-200 transition-colors"
            >
              Let it fly away
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
