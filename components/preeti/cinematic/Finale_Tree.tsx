"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { LSystemTree } from "@/components/preeti/generative/LSystemTree";

const FireworksBurst = dynamic(
  () => import("@/components/preeti/generative/FireworksBurst").then(m => ({ default: m.FireworksBurst })),
  { ssr: false }
);

function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export function Finale_Tree() {
  const [phase, setPhase] = useState(0); 
  const [leaves, setLeaves] = useState<{x: number, y: number, id: number}[]>([]);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 1000));
      setPhase(1); // Tree growing + text 1
      await new Promise(r => setTimeout(r, 6000));
      setPhase(2); // text 2
      await new Promise(r => setTimeout(r, 6000));
      setPhase(3); // Glow & Happy Birthday
    };
    sequence();
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-transparent flex flex-col items-center justify-end">
      
      {/* Fireworks — full sky burst when finale reached */}
      <FireworksBurst active={phase >= 3} />

      {/* Ambient Empty Space Filler: Static God Rays */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-transparent via-emerald-100/10 to-amber-100/20 pointer-events-none z-10"
        animate={{ opacity: phase >= 3 ? [0.6, 1, 0.6] : [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />



      {/* Massive Procedural L-System Tree with SVG Flowers */}
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: phase >= 3 ? 1.1 : 1 }}
        transition={{ duration: 5, ease: "easeOut" }}
      >
        <LSystemTree 
          growthPhase={phase >= 3 ? 1 : (phase * 0.3)} 
          width={1200} 
          height={1000} 
          onLeavesGenerated={(nodes) => setLeaves(nodes)}
        />
        
        {/* Render simple glowing leaves at the branch tips for maximum performance! Capped at 50 to prevent overload */}
        {leaves.slice(0, 50).map((leaf, i) => (
          <motion.div
            key={`leaf-${leaf.id}`}
            className="absolute z-20"
            style={{ 
              left: leaf.x, 
              top: leaf.y,
              x: "-50%",
              y: "-50%",
              pointerEvents: "none"
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: sr(i) * 3, duration: 1, type: "spring" }}
          >
              <div 
              className="w-4 h-6 md:w-5 md:h-8 opacity-90 drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]"
              style={{
                backgroundColor: ["#86efac", "#4ade80", "#22c55e", "#16a34a"][i % 4],
                borderRadius: "50% 0 50% 50%",
                transform: `rotate(${sr(leaf.id) * 360}deg)`
              }}
            />
          </motion.div>
        ))}
      </motion.div>



      {/* Text Sequence */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 z-40 text-center w-full max-w-3xl px-4 pointer-events-none">
        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.div
              key="text1"
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
              transition={{ duration: 2 }}
            >
              <p className="font-playfair text-4xl md:text-6xl text-emerald-100 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                Every branch, every leaf, every flower...
              </p>
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div
              key="text2"
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
              transition={{ duration: 2 }}
            >
              <p className="font-playfair text-4xl md:text-6xl text-emerald-100 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                Grew because you believed in the seed.
              </p>
            </motion.div>
          )}

          {phase === 3 && (
            <motion.div
              key="finale"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 3, delay: 1 }}
              className="px-8 py-10 md:py-12 bg-white/10 backdrop-blur-md border border-white/30 rounded-[3rem] mx-auto shadow-[0_0_80px_rgba(255,255,255,0.2)]"
            >
              <h1 className="font-playfair font-bold text-5xl md:text-7xl text-amber-300 drop-shadow-[0_0_20px_rgba(253,224,71,0.5)]">
                HAPPY BIRTHDAY
                <br />
                PREETI MA'AM
              </h1>
              <p className="mt-6 font-sans text-xl md:text-2xl text-amber-100 tracking-[0.3em] uppercase font-bold drop-shadow-md">
                From all your students.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
