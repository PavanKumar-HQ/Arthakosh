"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SVGFlower } from "@/components/preeti/generative/SVGFlower";

// Generate a grid of flowers
const generateFlowers = () => {
  const flowers = [];
  const rows = 4;
  const cols = 5;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      flowers.push({
        id: r * cols + c,
        x: (c / cols) * 100 + (Math.random() * 10 - 5),
        y: (r / rows) * 100 + (Math.random() * 10 - 5),
        msg: `Memory from Class ${2018 + Math.floor(Math.random() * 6)}`,
      });
    }
  }
  return flowers;
};

const FLOWERS = generateFlowers();

export function Chapter5_Field({ onComplete }: { onComplete: () => void }) {
  const [bloomedIds, setBloomedIds] = useState<number[]>([]);
  const [shakingId, setShakingId] = useState<number | null>(null);

  const handleBloom = (id: number) => {
    if (!bloomedIds.includes(id)) {
      setShakingId(id);
      setTimeout(() => {
        setShakingId(null);
        setBloomedIds((prev) => {
          const next = [...prev, id];
          if (next.length === FLOWERS.length) {
            setTimeout(onComplete, 4000);
          }
          return next;
        });
      }, 400); // Shake for 400ms before blooming
    }
  };

  const isFullyBloomed = bloomedIds.length === FLOWERS.length;

  return (
    <div className={`w-full h-full relative transition-colors duration-1000 ${isFullyBloomed ? 'bg-amber-50' : 'bg-[#faf8f5]'}`}>
      <div className="absolute inset-0 p-8">
        
        <div className="text-center mt-12 mb-8 pointer-events-none">
          <p className="font-playfair text-2xl md:text-4xl text-emerald-900 drop-shadow-[0_2px_10px_rgba(255,255,255,1)]">
            Thousands of seeds were planted.
          </p>
          <p className="font-playfair text-lg text-emerald-700 mt-2 opacity-80">
            Hover or tap to help them bloom
          </p>
        </div>

        <div className="relative w-full h-[60vh] max-w-5xl mx-auto">
          {FLOWERS.map((f) => {
            const isBloomed = bloomedIds.includes(f.id);
            const isShaking = shakingId === f.id;
            return (
              <motion.div
                key={f.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${f.x}%`, top: `${f.y}%` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: f.id * 0.05 }}
                onHoverStart={() => handleBloom(f.id)}
                onClick={() => handleBloom(f.id)}
              >
                <div className="pointer-events-none">
                  <SVGFlower 
                    isBlooming={isBloomed} 
                    isShaking={isShaking}
                    color="stroke-rose-400" 
                    text={isBloomed ? f.msg : undefined} 
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
