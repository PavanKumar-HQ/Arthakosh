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

const LANTERNS = Array.from({ length: 20 }, (_, i) => ({
  left: (sr(i * 11) * 100).toFixed(2),
  delay: sr(i * 13) * 5,
  duration: 15 + sr(i * 17) * 10,
  scale: 0.5 + sr(i * 19) * 0.8,
}));

const CONFETTI = Array.from({ length: 100 }, (_, i) => ({
  left: (sr(i * 23) * 100).toFixed(2),
  delay: sr(i * 29) * 2,
  duration: 4 + sr(i * 31) * 3,
  color: ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#a855f7", "#ec4899", "#06b6d4"][i % 7],
}));

const FINAL_PHOTOS = [
  { src: "/preeti/20260517_063836.jpg", x: "8%", y: "15%", rotate: -15 }, // Top Left
  { src: "/preeti/DSC00388.JPG", x: "75%", y: "12%", rotate: 10 }, // Top Right
  { src: "/preeti/IMG_6372.JPG", x: "12%", y: "60%", rotate: -5 }, // Bottom Left
  { src: "/preeti/IMG_6441.JPG", x: "68%", y: "55%", rotate: 20 }, // Bottom Right
  { src: "/preeti/IMG_6460.JPG", x: "80%", y: "40%", rotate: 5 }, // Middle Right
];

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



      {/* Floating Sky Lanterns */}
      {phase >= 3 && LANTERNS.map((l, i) => (
        <motion.div
          key={`lantern-${i}`}
          className="absolute bottom-[-10%] z-0 flex flex-col items-center justify-center opacity-80"
          style={{ left: `${l.left}%`, scale: l.scale }}
          initial={{ y: "10vh", opacity: 0 }}
          animate={{ y: "-120vh", opacity: [0, 1, 1, 0], x: [0, 50, -50, 0] }}
          transition={{ duration: l.duration, delay: l.delay, ease: "easeInOut", repeat: Infinity }}
        >
          <div className="w-12 h-16 bg-gradient-to-t from-orange-400/80 to-yellow-200/90 rounded-t-xl rounded-b-md shadow-[0_0_25px_rgba(253,186,116,0.9)] flex items-end justify-center pb-1">
            <div className="w-3 h-4 bg-yellow-100 rounded-full blur-[2px] animate-pulse" />
          </div>
        </motion.div>
      ))}

      {/* Confetti Poppers */}
      {phase >= 3 && CONFETTI.map((c, i) => (
        <motion.div
          key={`confetti-${i}`}
          className="absolute top-[-10%] w-3 h-3 z-50"
          style={{ backgroundColor: c.color, left: `${c.left}%`, borderRadius: i % 2 === 0 ? "2px" : "50%" }}
          initial={{ y: "-10vh", rotateX: 0, rotateY: 0, rotate: 0 }}
          animate={{ 
            y: "110vh", 
            x: [(sr(i)-0.5)*200, (sr(i+1)-0.5)*200, (sr(i+2)-0.5)*200],
            rotateX: [0, 360, 720], 
            rotateY: [0, 720, 1080],
            rotate: [0, 360, 720]
          }}
          transition={{ duration: c.duration, delay: c.delay, ease: "linear", repeat: Infinity }}
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
        
        {/* Render all simple glowing leaves at the branch tips */}
        {leaves.map((leaf, i) => (
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

      {/* Randomly Popping Final Photos */}
      <AnimatePresence>
        {phase === 3 && FINAL_PHOTOS.map((photo, i) => (
          <motion.div
            key={`final-photo-${i}`}
            className="absolute z-30 shadow-2xl rounded-xl overflow-hidden border-[6px] border-white/20 bg-white/10 backdrop-blur-sm"
            style={{
              width: "220px",
              height: "auto",
              left: photo.x,
              top: photo.y,
            }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              rotate: photo.rotate,
              y: [0, -15, 0] 
            }}
            transition={{
              scale: { type: "spring", bounce: 0.5, duration: 1, delay: 1 + sr(i) * 3 },
              opacity: { duration: 0.5, delay: 1 + sr(i) * 3 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 + sr(i) * 3 },
              rotate: { type: "spring", duration: 1, delay: 1 + sr(i) * 3 }
            }}
          >
            <img src={photo.src} alt="Memory" className="w-full h-auto block select-none pointer-events-none" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Text Sequence */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 z-40 text-center w-full max-w-3xl px-4 pointer-events-none select-none">
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
              className="px-8 py-10 md:py-12 bg-white/10 backdrop-blur-md border border-white/30 rounded-[3rem] mx-auto shadow-[0_0_80px_rgba(255,255,255,0.2)] select-none"
            >
              <h1 className="font-playfair font-bold text-5xl md:text-7xl text-amber-300 drop-shadow-[0_0_20px_rgba(253,224,71,0.5)]">
                HAPPY BIRTHDAY
                <br />
                PREETI MA'AM
              </h1>
              <p className="mt-6 font-sans text-xl md:text-2xl text-amber-100 tracking-[0.3em] uppercase font-bold drop-shadow-md">
                FROM YOUR GANG.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
