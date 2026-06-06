"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CSSButterfly } from "@/components/preeti/generative/CSSButterfly";
import { LSystemTree } from "@/components/preeti/generative/LSystemTree";

export function Finale_Tree() {
  const [phase, setPhase] = useState(0); 

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
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-[#e8f5e9] to-[#faf8f5] flex flex-col items-center justify-end">
      
      {/* Ambient Empty Space Filler: Dynamic God Rays */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-transparent via-emerald-100/30 to-amber-100/50 mix-blend-overlay pointer-events-none z-10"
        animate={{ opacity: phase >= 3 ? [0.6, 1, 0.6] : [0.2, 0.5, 0.2], rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Ambient Orbs filling the sky */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-32 h-32 bg-amber-100/20 rounded-full blur-[40px] z-0 pointer-events-none"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 80}%`
          }}
          animate={{ 
            scale: [1, 1.5, 1], 
            opacity: [0.2, 0.6, 0.2],
            y: [-20, 20, -20]
          }}
          transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Massive Procedural L-System Tree */}
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: phase >= 3 ? 1.1 : 1 }}
        transition={{ duration: 5, ease: "easeOut" }}
      >
        <LSystemTree growthPhase={phase >= 3 ? 1 : (phase * 0.3)} width={1200} height={1000} />
      </motion.div>

      {/* Floating Butterflies */}
      {phase >= 1 && Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`butterfly-${i}`}
          className="absolute z-30 drop-shadow-2xl pointer-events-none"
          style={{ 
            left: `${10 + Math.random() * 80}%`, 
            top: `${10 + Math.random() * 80}%`,
            scale: 0.5 + Math.random() * 0.5
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: 1, 
            y: [-20, 20, -20],
            x: [-30, 30, -30]
          }}
          transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <CSSButterfly color={["bg-cyan-300", "bg-pink-300", "bg-yellow-300", "bg-purple-300"][i % 4]} />
        </motion.div>
      ))}

      {/* Falling Petals */}
      {phase >= 1 && Array.from({ length: 60 }).map((_, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute w-4 h-6 bg-pink-300/80 drop-shadow-sm z-20 pointer-events-none"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: "-10%",
            borderRadius: "50% 0 50% 50%" 
          }}
          animate={{ 
            y: ["0vh", "120vh"], 
            x: [0, (Math.random() - 0.5) * 400, (Math.random() - 0.5) * 400],
            rotate: [0, 180, 360, 720] 
          }}
          transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Text Sequence */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 z-40 text-center w-full max-w-4xl px-4 pointer-events-none">
        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.div
              key="text1"
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
              transition={{ duration: 2 }}
            >
              <p className="font-playfair text-3xl md:text-5xl text-emerald-900 drop-shadow-sm">
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
              <p className="font-playfair text-3xl md:text-5xl text-emerald-900 drop-shadow-sm">
                Grew because you believed in the seed.
              </p>
            </motion.div>
          )}

          {phase === 3 && (
            <motion.div
              key="finale"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 3, delay: 1 }}
              className="px-12 py-8 bg-white/20 backdrop-blur-lg border border-white/40 rounded-[3rem] mx-auto shadow-[0_0_100px_rgba(253,224,71,0.5)]"
            >
              <h1 className="font-playfair font-bold text-5xl md:text-7xl text-emerald-900 drop-shadow-md">
                HAPPY BIRTHDAY
                <br />
                PREETI MA'AM
              </h1>
              <p className="mt-6 font-serif text-xl md:text-2xl text-emerald-700 tracking-widest uppercase font-bold">
                From all your students.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
