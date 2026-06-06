"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const BUTTERFLY_MESSAGES = [
  "You always had the best smile!",
  "Remember that time we couldn't stop laughing in class?",
  "Thank you for being so patient with us.",
  "Your classes were the highlight of my day.",
  "You taught us more than just the syllabus.",
];

export function ButterflySystem() {
  const [butterflies, setButterflies] = useState<{ id: number, x: number, y: number, msg: string }[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  useEffect(() => {
    // Spawn a butterfly every 5 seconds
    const interval = setInterval(() => {
      setButterflies(prev => {
        if (prev.length > 5) return prev; // max 5 at a time
        return [...prev, {
          id: Date.now(),
          x: Math.random() * 80 + 10, // 10% to 90%
          y: Math.random() * 80 + 10,
          msg: BUTTERFLY_MESSAGES[Math.floor(Math.random() * BUTTERFLY_MESSAGES.length)]
        }];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const catchButterfly = (id: number, msg: string) => {
    setButterflies(prev => prev.filter(b => b.id !== id));
    setActiveMessage(msg);
    setTimeout(() => setActiveMessage(null), 4000);
  };

  return (
    <>
      {/* Floating Butterflies */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        <AnimatePresence>
          {butterflies.map(b => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: [0, Math.random() * 100 - 50, Math.random() * 200 - 100, 0],
                y: [0, Math.random() * -100 - 50, Math.random() * 100 + 50, 0],
              }}
              exit={{ opacity: 0, scale: 2 }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
              className="absolute pointer-events-auto cursor-pointer"
              onClick={() => catchButterfly(b.id, b.msg)}
              whileHover={{ scale: 1.2 }}
            >
              <motion.img
                src="/real-butterfly.png"
                alt="Magical Butterfly"
                className="relative w-16 h-16 object-contain mix-blend-darken"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [-5, 5, -5]
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Captured Message Toast */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md px-8 py-4 rounded-full border border-amber-200 shadow-2xl"
          >
            <p className="font-playfair text-amber-900 text-lg md:text-xl text-center italic">
              &quot;{activeMessage}&quot;
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
