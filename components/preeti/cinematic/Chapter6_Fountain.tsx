"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useMemo } from "react";
import { CanvasWaterPhysics } from "@/components/preeti/generative/CanvasWaterPhysics";
import { ChapterControls } from "@/components/preeti/ui/ChapterControls";

const WISHES = [
  { id: 1, text: "She always believed in us.", cx: 48, cy: 68 },
  { id: 2, text: "A memory from 2022 — thank you.", cx: 32, cy: 74 },
  { id: 3, text: "Ma'am, you changed my life.", cx: 64, cy: 70 },
];

// Deterministic helpers
function s(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export function Chapter6_Fountain({ onComplete }: { onComplete: () => void }) {
  const [activeWish, setActiveWish] = useState<number | null>(null);
  const [revealedWishes, setRevealedWishes] = useState<number[]>([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Deterministic sets so no hydration mismatch
  const coins = useMemo(() => Array.from({ length: 18 }, (_, i) => i), []);
  const sparkles = useMemo(() => Array.from({ length: 30 }, (_, i) => i), []);
  const ripples = useMemo(() => Array.from({ length: 8 }, (_, i) => i), []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleReveal = (id: number) => {
    if (!revealedWishes.includes(id)) {
      setActiveWish(id);
      setRevealedWishes((prev) => {
        const next = [...prev, id];
        if (next.length === WISHES.length) setTimeout(onComplete, 5000);
        return next;
      });
      setTimeout(() => setActiveWish(null), 4500);
    }
  };

  return (
    <div className="w-full h-full relative bg-slate-900 flex flex-col items-center justify-end overflow-hidden">
      
      {/* Majestic Ocean-Blue Background */}
      <div className="absolute inset-0 z-0">
        {/* Deep stone radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#082f49_0%,#020617_100%)]" />
        
        {/* Moonlight shafts / Ocean light rays */}
        <motion.div 
          className="absolute -top-[10%] left-[20%] w-[100%] h-[150%] bg-[conic-gradient(from_150deg_at_top_right,rgba(56,189,248,0.1)_0deg,transparent_30deg,transparent_330deg,rgba(56,189,248,0.1)_360deg)] pointer-events-none"
          animate={{ opacity: [0.4, 0.8, 0.4], rotate: [-2, 2, -2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -top-[10%] -left-[20%] w-[100%] h-[150%] bg-[conic-gradient(from_210deg_at_top_left,rgba(186,230,253,0.08)_0deg,transparent_30deg,transparent_330deg,rgba(186,230,253,0.08)_360deg)] pointer-events-none"
          animate={{ opacity: [0.3, 0.7, 0.3], rotate: [2, -2, 2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Subtle Water Ripples on the ground reflecting from the fountain */}
        <motion.div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-cyan-400/15 blur-[100px]"
          animate={{ opacity: [0.4, 0.8, 0.4], scaleY: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="absolute top-16 text-center z-20 w-full px-4 pointer-events-none">
        <h2 className="font-playfair text-3xl md:text-5xl text-blue-100 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]">
          The Wishing Fountain
        </h2>
      </div>

      {/* Hidden SVG filters */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="water-warp" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.015 0.025" numOctaves="3" seed="2" result="noise">
              <animate attributeName="baseFrequency" values="0.015 0.025;0.02 0.03;0.015 0.025" dur="8s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <radialGradient id="waterGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#7dd3fc" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.75" />
          </radialGradient>
          <radialGradient id="waterCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.6" />
          </radialGradient>
        </defs>
      </svg>

      {/* The Fountain Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative mt-16 z-10"
        style={{ width: 520, height: 480 }}
      >
        {/* ── FOUNTAIN SVG ── */}
        <svg viewBox="0 0 200 190" width="520" height="480" className="absolute inset-0 drop-shadow-2xl overflow-visible">

          {/* === BASE POOL === */}
          {/* Outer stone rim */}
          <ellipse cx="100" cy="155" rx="85" ry="30" fill="#b5985a" stroke="#8a6c38" strokeWidth="2" />
          <ellipse cx="100" cy="152" rx="85" ry="30" fill="#c4a85e" stroke="#9a7a42" strokeWidth="1.5" />
          {/* Pool water surface */}
          <ellipse cx="100" cy="150" rx="78" ry="26" fill="url(#waterGrad)" filter="url(#water-warp)" />
          {/* Water shimmer overlay */}
          <motion.ellipse
            cx="100" cy="150" rx="78" ry="26"
            fill="rgba(255,255,255,0.15)"
            animate={{ rx: [78, 80, 78], ry: [26, 27, 26] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* === PEDESTAL === */}
          <ellipse cx="100" cy="140" rx="28" ry="10" fill="#b5985a" stroke="#8a6c38" strokeWidth="1.5" />
          <rect x="86" y="95" width="28" height="48" rx="6" fill="#c4a85e" stroke="#9a7a42" strokeWidth="1.5" />
          <ellipse cx="100" cy="97" rx="20" ry="7" fill="#d4b86e" stroke="#9a7a42" strokeWidth="1" />

          {/* === UPPER BASIN === */}
          <ellipse cx="100" cy="96" rx="36" ry="13" fill="#c4a85e" stroke="#9a7a42" strokeWidth="1.5" />
          <ellipse cx="100" cy="94" rx="32" ry="11" fill="url(#waterCenter)" filter="url(#water-warp)" />
          {/* Upper basin shimmer */}
          <motion.ellipse
            cx="100" cy="94" rx="32" ry="11"
            fill="rgba(255,255,255,0.2)"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* === CENTRAL SPOUT === */}
          <rect x="98" y="68" width="4" height="26" rx="2" fill="#d4b86e" stroke="#9a7a42" strokeWidth="0.5" />
          {/* Spout top cap */}
          <ellipse cx="100" cy="68" rx="5" ry="3" fill="#e4c87e" stroke="#9a7a42" strokeWidth="0.5" />

          {/* === ANIMATED WATER JET (main arc) === */}
          {/* Main upward jet */}
          <motion.path
            d="M 100 68 Q 100 40 100 30"
            fill="none" stroke="rgba(186,230,253,0.85)" strokeWidth="3" strokeLinecap="round"
            animate={{ d: ["M 100 68 Q 100 40 100 30", "M 100 68 Q 102 42 101 30", "M 100 68 Q 100 40 100 30"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Arcing side streams */}
          {[[-35, 20, -50, 50], [35, 20, 50, 50], [-20, 10, -30, 45], [20, 10, 30, 45]].map(([qx, qy, ex, ey], i) => (
            <motion.path
              key={`arc-${i}`}
              d={`M 100 68 Q ${100 + qx} ${68 - qy} ${100 + ex} ${68 + ey}`}
              fill="none"
              stroke="rgba(186,230,253,0.7)"
              strokeWidth={i < 2 ? 2 : 1.5}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 1.2 + i * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
            />
          ))}

          {/* Ripple rings in pool */}
          {ripples.map((i) => (
            <motion.ellipse
              key={`ripple-${i}`}
              cx="100" cy="150"
              rx="15" ry="5"
              fill="none"
              stroke="rgba(186,230,253,0.6)"
              strokeWidth="0.8"
              initial={{ rx: 5, ry: 1.5, opacity: 0.8 }}
              animate={{ rx: 70, ry: 23, opacity: 0 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.6,
              }}
            />
          ))}

          {/* Stone decorative details on pedestal */}
          <rect x="87" y="105" width="4" height="30" rx="1" fill="rgba(139,100,40,0.3)" />
          <rect x="109" y="105" width="4" height="30" rx="1" fill="rgba(139,100,40,0.3)" />
        </svg>

        {/* ── REALISTIC CANVAS WATER PHYSICS ── */}
        <CanvasWaterPhysics width={800} height={500} />

        {/* ── COINS IN POOL ── */}
        {coins.map((i) => {
          const cx = 140 + s(i * 5) * 220;
          const cy = 360 + s(i * 7) * 60;
          return (
            <motion.div
              key={`coin-${i}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: cx,
                top: cy,
                width: 8 + s(i * 9) * 8,
                height: 4 + s(i * 9) * 4,
                background: `rgba(${200 + Math.floor(s(i * 3) * 55)}, ${150 + Math.floor(s(i * 13) * 50)}, 30, 0.85)`,
              }}
              animate={{
                scaleX: [1, 0.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2 + s(i * 17) * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: s(i * 29) * 3,
              }}
            />
          );
        })}

        {/* ── SPARKLES ON WATER ── */}
        {sparkles.map((i) => {
          const sx = 140 + s(i * 11) * 230;
          const sy = 340 + s(i * 13) * 80;
          return (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute pointer-events-none"
              style={{ left: sx, top: sy, width: 4, height: 4 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 1.5 + s(i * 7) * 1,
                repeat: Infinity,
                delay: s(i * 31) * 3,
              }}
            >
              <svg viewBox="0 0 10 10" width="12" height="12">
                <path d="M5 0 L5.5 4.5 L10 5 L5.5 5.5 L5 10 L4.5 5.5 L0 5 L4.5 4.5 Z" fill="white" opacity="0.9" />
              </svg>
            </motion.div>
          );
        })}

        {/* Mouse ripple */}
        <motion.div
          className="absolute w-20 h-20 rounded-full border border-sky-300/50 pointer-events-none"
          animate={{ left: `${mousePos.x}%`, top: `${mousePos.y}%`, x: "-50%", y: "-50%" }}
          transition={{ type: "spring", damping: 30 }}
        />

        {/* ── WISHES (glowing orbs + rising text) ── */}
        {WISHES.map((wish) => {
          const isRevealed = revealedWishes.includes(wish.id);
          const isActive = activeWish === wish.id;
          const ox = (wish.cx / 100) * 520;
          const oy = (wish.cy / 100) * 480;
          return (
            <div key={wish.id} className="absolute z-30" style={{ left: ox, top: oy }}>
              {!isRevealed ? (
                <motion.div
                  className="w-6 h-6 rounded-full cursor-pointer"
                  style={{
                    background: "radial-gradient(circle, rgba(186,230,253,1), rgba(56,189,248,0.6))",
                    boxShadow: "0 0 12px 4px rgba(56,189,248,0.7)",
                  }}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ delay: 1.5, duration: 1, repeat: Infinity }}
                  onClick={() => handleReveal(wish.id)}
                />
              ) : (
                <AnimatePresence>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: -60, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -100, filter: "blur(6px)" }}
                      transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute -translate-x-1/2 whitespace-nowrap font-playfair text-2xl md:text-3xl text-sky-100 font-semibold pointer-events-none"
                      style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(56,189,248,0.8)" }}
                    >
                      {wish.text}
                    </motion.p>
                  )}
                </AnimatePresence>
              )}
            </div>
          );
        })}
      </div>
      <ChapterControls 
        instruction={revealedWishes.length === WISHES.length ? "Your wish has been granted." : "Discover the luminescent memories..."} 
        onSkip={() => {
          if (!wished || revealedWishes.length < WISHES.length) {
            setWished(true);
            setRevealedWishes(WISHES.map(w => w.id));
          } else {
            onComplete();
          }
        }} 
      />
    </div>
  );
}
