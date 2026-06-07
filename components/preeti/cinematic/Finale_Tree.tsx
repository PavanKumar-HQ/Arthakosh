"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { SVGButterfly } from "@/components/preeti/generative/SVGButterfly";
import { LSystemTree } from "@/components/preeti/generative/LSystemTree";

const FireworksBurst = dynamic(
  () => import("@/components/preeti/generative/FireworksBurst").then(m => ({ default: m.FireworksBurst })),
  { ssr: false }
);

function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const ORBS = Array.from({ length: 5 }, (_, i) => ({
  left: (sr(i * 7) * 100).toFixed(2),
  top: (sr(i * 11) * 80).toFixed(2),
  duration: 5 + sr(i * 13) * 5,
}));

const BUTTERFLIES = Array.from({ length: 2 }, (_, i) => ({
  left: (10 + sr(i * 17) * 80).toFixed(2),
  top: (10 + sr(i * 19) * 80).toFixed(2),
  scale: (0.8 + sr(i * 23) * 0.7).toFixed(2),
  duration: 4 + sr(i * 29) * 2,
  color: ["#67e8f9", "#f9a8d4", "#fde047", "#d8b4fe"][i % 4],
}));

const PETALS = Array.from({ length: 15 }, (_, i) => ({
  left: (sr(i * 31) * 100).toFixed(2),
  xMid: ((sr(i * 37) - 0.5) * 400).toFixed(2),
  xEnd: ((sr(i * 41) - 0.5) * 400).toFixed(2),
  duration: 5 + sr(i * 43) * 5,
}));

const EMBERS = Array.from({ length: 10 }, (_, i) => ({
  left: (sr(i * 47) * 100).toFixed(2),
  yStart: 100 + sr(i * 53) * 20,
  duration: 3 + sr(i * 59) * 4,
  delay: sr(i * 61) * 5,
}));

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

      {/* Floating Ambient Orbs filling the sky */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-32 h-32 bg-amber-100/20 rounded-full blur-[40px] z-0 pointer-events-none"
          style={{ left: `${orb.left}%`, top: `${orb.top}%` }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.6, 0.2], y: [-20, 20, -20] }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

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
              className="w-4 h-6 md:w-5 md:h-8 opacity-90 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              style={{
                backgroundColor: ["#fbcfe8", "#fde047", "#86efac", "#93c5fd"][i % 4],
                borderRadius: "50% 0 50% 50%",
                transform: `rotate(${sr(leaf.id) * 360}deg)`
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Floating Butterflies */}
      {phase >= 1 && BUTTERFLIES.map((b, i) => (
        <motion.div
          key={`butterfly-${i}`}
          className="absolute z-30 pointer-events-none"
          style={{ left: `${b.left}%`, top: `${b.top}%`, scale: b.scale }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: [-20, 20, -20], x: [-30, 30, -30] }}
          transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
        >
          <SVGButterfly color={b.color} delay={sr(i) * 2} size={140} />
        </motion.div>
      ))}

      {/* Hardware-accelerated Falling Petals */}
      {phase >= 1 && PETALS.map((p, i) => (
        <div
          key={`petal-${i}`}
          className="absolute w-4 h-6 bg-pink-300/80 drop-shadow-sm z-20 pointer-events-none animate-fall-down"
          style={{ 
            left: `${p.left}%`, 
            top: "-10%", 
            borderRadius: "50% 0 50% 50%",
            animationDuration: `${p.duration}s`,
            animationDelay: `${sr(i) * 3}s`
          }}
        />
      ))}

      {/* Hardware-accelerated Golden Embers */}
      {phase >= 3 && EMBERS.map((e, i) => (
        <div
          key={`ember-${i}`}
          className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full drop-shadow-[0_0_5px_rgba(253,224,71,0.8)] z-30 pointer-events-none animate-float-up"
          style={{ 
            left: `${e.left}%`,
            bottom: "0%",
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`
          }}
        />
      ))}

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
