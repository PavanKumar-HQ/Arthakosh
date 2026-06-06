"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const WISHES = [
  { id: 1, text: "A wish for happiness...", x: 30, y: 40 },
  { id: 2, text: "A memory from 2022", x: 70, y: 50 },
  { id: 3, text: "Always believing in us.", x: 50, y: 70 },
];

export function Chapter6_Fountain({ onComplete }: { onComplete: () => void }) {
  const [activeWish, setActiveWish] = useState<number | null>(null);
  const [revealedWishes, setRevealedWishes] = useState<number[]>([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleReveal = (id: number) => {
    if (!revealedWishes.includes(id)) {
      setActiveWish(id);
      setRevealedWishes(prev => {
        const next = [...prev, id];
        if (next.length === WISHES.length) {
          setTimeout(onComplete, 5000);
        }
        return next;
      });
      setTimeout(() => setActiveWish(null), 4000);
    }
  };

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center justify-center overflow-hidden">
      
      {/* SVG Filters for water displacement */}
      <svg className="hidden">
        <defs>
          <filter id="water-ripple">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div className="absolute top-1/4 text-center z-20 px-4 w-full pointer-events-none">
        <p className="font-playfair text-2xl md:text-4xl text-blue-900 drop-shadow-[0_2px_10px_rgba(255,255,255,1)]">
          The Fountain of Wishes
        </p>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-[600px] h-[600px] mt-20 flex items-center justify-center"
      >
        {/* The Fountain Base (Distorted Water Surface) */}
        <motion.div 
          className="absolute inset-0 bg-blue-200/50 rounded-full blur-md"
          style={{ filter: 'url(#water-ripple)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />

        {/* Cursor Ripple Interaction */}
        <motion.div 
          className="absolute w-32 h-32 bg-white/30 rounded-full blur-xl pointer-events-none mix-blend-overlay"
          animate={{ left: `${mousePos.x}%`, top: `${mousePos.y}%`, x: '-50%', y: '-50%' }}
          transition={{ type: 'spring', damping: 20 }}
        />

        <img src="/wishing-fountain.png" alt="Fountain" className="w-[400px] h-[400px] object-contain drop-shadow-xl z-10 pointer-events-none mix-blend-multiply" />

        {/* Hidden Wishes inside the water */}
        {WISHES.map((wish) => {
          const isRevealed = revealedWishes.includes(wish.id);
          const isActive = activeWish === wish.id;
          return (
            <motion.div
              key={wish.id}
              className="absolute z-20"
              style={{ left: `${wish.x}%`, top: `${wish.y}%` }}
            >
              {!isRevealed ? (
                // Unrevealed wish (glowing orb beneath water)
                <motion.div
                  className="w-8 h-8 rounded-full bg-cyan-200/80 cursor-pointer"
                  style={{ filter: 'url(#water-ripple) blur(4px)' }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  onClick={() => handleReveal(wish.id)}
                />
              ) : (
                // Revealed Wish rising from the water (No modal!)
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.8, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, y: -80, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -120 }}
                      transition={{ duration: 3, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                    >
                      <p className="font-playfair text-2xl text-cyan-900 drop-shadow-[0_2px_15px_rgba(255,255,255,1)]">
                        {wish.text}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.div>
          );
        })}

      </div>
    </div>
  );
}
