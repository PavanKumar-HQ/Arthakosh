"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SVGFlower } from "@/components/preeti/generative/SVGFlower";

// Hardcode 6 well-spaced positions across the entire screen (0-100%) to avoid overlap
const FLOWERS = [
  { id: 1, x: 20, y: 25, msg: "Memory from Class 2018" },
  { id: 2, x: 75, y: 30, msg: "Memory from Class 2019" },
  { id: 3, x: 45, y: 50, msg: "Memory from Class 2020" },
  { id: 4, x: 15, y: 70, msg: "Memory from Class 2021" },
  { id: 5, x: 85, y: 65, msg: "Memory from Class 2022" },
  { id: 6, x: 55, y: 80, msg: "Memory from Class 2023" },
];

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
        
        <div className="text-center mt-12 mb-8 pointer-events-none relative z-10">
          <p className="font-playfair text-2xl md:text-4xl text-emerald-900 drop-shadow-[0_2px_10px_rgba(255,255,255,1)]">
            Thousands of seeds were planted.
          </p>
          <p className="font-playfair text-lg text-emerald-700 mt-2 opacity-80">
            Move your mouse around to help them bloom
          </p>
        </div>

        <div className="absolute inset-0">
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
