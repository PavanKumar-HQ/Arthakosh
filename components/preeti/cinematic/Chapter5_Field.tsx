"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Generate a grid of flowers
const generateFlowers = () => {
  return Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 30 + Math.random() * 60,
    scale: 0.5 + Math.random() * 0.8,
    delay: Math.random() * 2,
    msg: `Thank you for the memory #${i + 1}`
  }));
};

const FLOWERS = generateFlowers();

export function Chapter5_Field({ onComplete }: { onComplete: () => void }) {
  const [bloomed, setBloomed] = useState<number[]>([]);
  const [activeFlower, setActiveFlower] = useState<number | null>(null);

  const colorIntensity = Math.min(bloomed.length * 5, 100); // Max 100% saturation

  const handleBloom = (id: number) => {
    if (!bloomed.includes(id)) {
      setBloomed([...bloomed, id]);
    }
  };

  const handleClick = (id: number) => {
    setActiveFlower(id);
    if (bloomed.length >= 5) {
      // Allow progression after exploring a bit
      setTimeout(onComplete, 5000);
    }
  };

  return (
    <div 
      className="w-full h-full relative transition-colors duration-1000 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, 
          hsl(200, ${colorIntensity}%, ${95 - colorIntensity * 0.1}%), 
          hsl(100, ${colorIntensity}%, ${95 - colorIntensity * 0.1}%))`
      }}
    >
      <div className="text-center absolute top-16 z-20 pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-playfair text-emerald-900 mb-2"
        >
          The Field of Blooms
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-emerald-700 italic font-serif text-lg"
        >
          Every flower you touch brings color to the garden.
        </motion.p>
      </div>

      {/* The Flowers */}
      {FLOWERS.map((f) => {
        const isBloomed = bloomed.includes(f.id);
        return (
          <motion.div
            key={f.id}
            className="absolute cursor-pointer flex items-center justify-center"
            style={{ left: `${f.x}%`, top: `${f.y}%`, scale: f.scale }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: f.delay }}
            onHoverStart={() => handleBloom(f.id)}
            onClick={() => handleClick(f.id)}
          >
            <motion.div 
              className={`text-4xl drop-shadow-sm transition-all duration-1000 ${isBloomed ? 'grayscale-0 scale-125' : 'grayscale opacity-50 hover:grayscale-0 hover:opacity-100'}`}
              animate={isBloomed ? { rotate: [0, 5, -5, 0] } : {}}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🌸
            </motion.div>
          </motion.div>
        );
      })}

      {/* Memory Modal */}
      <AnimatePresence>
        {activeFlower !== null && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute z-30 bottom-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-emerald-100 max-w-sm w-full text-center"
          >
            <p className="font-playfair text-emerald-900 text-lg italic">
              &quot;{FLOWERS.find(f => f.id === activeFlower)?.msg}&quot;
            </p>
            <button 
              onClick={() => setActiveFlower(null)}
              className="mt-4 text-emerald-600 text-sm font-sans underline"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
