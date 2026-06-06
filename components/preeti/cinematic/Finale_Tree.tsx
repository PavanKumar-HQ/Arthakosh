"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CSSButterfly } from "@/components/preeti/generative/CSSButterfly";

export function Finale_Tree() {
  const [phase, setPhase] = useState(0); // 0: enter, 1: text 1, 2: text 2, 3: grand reveal

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 3000));
      setPhase(1); // Type 1
      await new Promise(r => setTimeout(r, 4000));
      setPhase(2); // Type 2
      await new Promise(r => setTimeout(r, 4000));
      setPhase(3); // Glow & Happy Birthday
    };
    sequence();
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-black flex flex-col items-center justify-center">
      
      {/* Massive Realistic Tree Background */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/grand-tree-bg.png')" }}
        initial={{ scale: 1.5, filter: "brightness(0.3) blur(5px)" }}
        animate={{ 
          scale: 1, 
          filter: phase >= 3 ? "brightness(1.2) blur(0px)" : "brightness(0.6) blur(0px)"
        }}
        transition={{ duration: 15, ease: "easeOut" }}
      />

      {/* Magical God Rays */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-transparent via-amber-200/20 to-amber-100/30 mix-blend-overlay pointer-events-none"
        animate={{ opacity: phase >= 3 ? [0.6, 1, 0.6] : 0 }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Floating Butterflies */}
      {phase >= 1 && Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`butterfly-${i}`}
          className="absolute z-30 drop-shadow-2xl"
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
      {phase >= 1 && Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute w-4 h-6 bg-pink-300/80 drop-shadow-sm z-20"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: "-10%",
            borderRadius: "50% 0 50% 50%" 
          }}
          animate={{ 
            y: ["0vh", "120vh"], 
            x: [0, (Math.random() - 0.5) * 300, (Math.random() - 0.5) * 300],
            rotate: [0, 180, 360, 720] 
          }}
          transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Text Sequence with Glassmorphism */}
      <div className="relative z-40 text-center w-full max-w-4xl px-4 pointer-events-none">
        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.div
              key="text1"
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
              transition={{ duration: 2 }}
              className="px-8 py-6 bg-black/40 backdrop-blur-md border border-white/20 rounded-3xl mx-auto shadow-2xl"
            >
              <p className="font-playfair text-3xl md:text-5xl text-amber-50 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
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
              className="px-8 py-6 bg-black/40 backdrop-blur-md border border-white/20 rounded-3xl mx-auto shadow-2xl"
            >
              <p className="font-playfair text-3xl md:text-5xl text-amber-50 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
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
              className="px-12 py-8 bg-black/50 backdrop-blur-lg border border-white/30 rounded-[3rem] mx-auto shadow-[0_0_100px_rgba(253,224,71,0.3)]"
            >
              <h1 className="font-playfair font-bold text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 drop-shadow-2xl">
                HAPPY BIRTHDAY
                <br />
                PREETI MA'AM
              </h1>
              <p className="mt-6 font-serif text-xl md:text-2xl text-amber-100/90 tracking-widest uppercase">
                From all your students.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
