"use client";

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { SVGFlower } from "@/components/preeti/generative/SVGFlower";

// 6 well-spaced positions with unique identities
const FLOWERS = [
  { id: 1, x: 18, y: 28, msg: "2018 — First seeds were planted.", petalColor: "rgba(253,164,175,0.9)", strokeColor: "#f43f5e", size: 120 },
  { id: 2, x: 78, y: 22, msg: "2019 — Roots grew deeper.", petalColor: "rgba(196,181,253,0.9)", strokeColor: "#7c3aed", size: 110 },
  { id: 3, x: 42, y: 52, msg: "2020 — Even in storms, we bloomed.", petalColor: "rgba(253,230,138,0.9)", strokeColor: "#d97706", size: 130 },
  { id: 4, x: 12, y: 72, msg: "2021 — New branches, new dreams.", petalColor: "rgba(134,239,172,0.9)", strokeColor: "#16a34a", size: 100 },
  { id: 5, x: 82, y: 68, msg: "2022 — We found our light.", petalColor: "rgba(147,197,253,0.9)", strokeColor: "#2563eb", size: 115 },
  { id: 6, x: 52, y: 82, msg: "2023 — The garden is complete.", petalColor: "rgba(253,186,116,0.9)", strokeColor: "#ea580c", size: 105 },
];

function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// Pre-compute falling leaves/petals for the background
const FALLING_PETALS = Array.from({ length: 25 }, (_, i) => ({
  left: (sr(i * 13) * 100).toFixed(2),
  xEnd: (sr(i * 17) - 0.5) * 400,
  duration: 6 + sr(i * 19) * 8,
  delay: sr(i * 23) * 5,
  rotate: sr(i * 29) * 360,
  color: ["bg-pink-300", "bg-orange-300", "bg-amber-200", "bg-rose-300"][i % 4],
}));

export function Chapter5_Field({ onComplete }: { onComplete: () => void }) {
  const [bloomedIds, setBloomedIds] = useState<number[]>([]);
  const [shakingId, setShakingId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

    // Auto-bloom flowers near the cursor
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    FLOWERS.forEach((f) => {
      const dist = Math.hypot(f.x - mx, f.y - my);
      if (dist < 12 && !bloomedIds.includes(f.id)) {
        handleBloom(f.id);
      }
    });
  }, [bloomedIds]);

  const handleBloom = (id: number) => {
    if (!bloomedIds.includes(id)) {
      setShakingId(id);
      setTimeout(() => {
        setShakingId(null);
        setBloomedIds((prev) => {
          const next = [...prev, id];
          if (next.length === FLOWERS.length) {
            setTimeout(onComplete, 5000);
          }
          return next;
        });
      }, 450);
    }
  };

  const isFullyBloomed = bloomedIds.length === FLOWERS.length;

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative bg-transparent overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Chapter header */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="font-playfair text-3xl md:text-5xl text-emerald-900"
          style={{ textShadow: "0 2px 20px rgba(255,255,255,0.9)" }}
        >
          Thousands of seeds were planted.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-emerald-700 font-serif text-lg mt-3 italic"
        >
          Move your mouse to help them bloom
        </motion.p>
      </div>

      {/* Mouse glow that follows cursor */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-amber-100/60 blur-3xl pointer-events-none z-10"
        style={{ x: useTransform(mouseX, (v) => v - 64), y: useTransform(mouseY, (v) => v - 64) }}
      />

      {/* Falling Petals Background System */}
      {FALLING_PETALS.map((petal, i) => (
        <motion.div
          key={`falling-petal-${i}`}
          className={`absolute w-3 h-4 ${petal.color} opacity-40 rounded-br-full rounded-tl-full z-0 pointer-events-none drop-shadow-sm`}
          style={{ left: `${petal.left}%`, top: "-10%" }}
          animate={{ 
            y: ["0vh", "120vh"], 
            x: [0, petal.xEnd],
            rotate: [petal.rotate, petal.rotate + 720]
          }}
          transition={{ 
            duration: petal.duration, 
            repeat: Infinity, 
            delay: petal.delay,
            ease: "linear"
          }}
        />
      ))}

      {/* The 6 Flowers */}
      {FLOWERS.map((f) => {
        const isBloomed = bloomedIds.includes(f.id);
        const isShaking = shakingId === f.id;
        return (
          <motion.div
            key={f.id}
            className="absolute cursor-pointer z-20"
            style={{ left: `${f.x}%`, top: `${f.y}%`, translateX: "-50%", translateY: "-50%" }}
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{ 
              opacity: 1, 
              scale: isBloomed ? 1 : 0.8,
              rotate: [-2, 2, -1, 1.5, -2] // Wind sway
            }}
            transition={{
              opacity: { duration: 1 },
              scale: { duration: 1, type: "spring" },
              rotate: { duration: 8 + sr(i * 13) * 4, repeat: Infinity, ease: "easeInOut" }
            }}
            onClick={() => handleBloom(f.id)}
          >
            {/* Soil mound beneath each flower */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 rounded-full bg-amber-900/20 blur-md"
              style={{ width: f.size * 0.8, height: 12 }}
            />

            {/* Stem */}
            <div className="flex justify-center">
              <motion.div
                className="w-1 bg-gradient-to-b from-emerald-400 to-emerald-700 rounded-full"
                initial={{ height: 0 }}
                animate={{ height: isBloomed ? f.size * 0.45 : f.size * 0.3 }}
                transition={{ duration: 1.5, delay: isBloomed ? 0 : f.id * 0.15, ease: "easeOut" }}
              />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <SVGFlower 
                isBlooming={isBloomed} 
                isShaking={isShaking}
                petalColor={f.petalColor} 
                strokeColor={f.strokeColor}
                size={f.size} 
                text={isBloomed ? f.msg : undefined}
              />
            </div>
          </motion.div>
        );
      })}

      {/* "All bloomed" celebration */}
      <AnimatePresence>
        {isFullyBloomed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none"
          >
            <p className="font-playfair text-2xl text-emerald-800" style={{ textShadow: "0 2px 15px rgba(255,255,255,1)" }}>
              The garden is in full bloom.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
