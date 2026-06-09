"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMemo, useEffect, useState } from "react";

interface GardenAmbientProps {
  chapter?: number; // 1-12, controls palette
}

function randomBetween(min: number, max: number, seed: number) {
  // Deterministic "random" based on seed so it doesn't re-randomize on render
  const x = Math.sin(seed + 1) * 10000;
  return min + ((x - Math.floor(x)) * (max - min));
}

export function GardenAmbient({ chapter = 1 }: GardenAmbientProps) {
  const [mounted, setMounted] = useState(false);
  
  // Setup mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth the mouse movement
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position between -1 and 1
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(nx);
      mouseY.set(ny);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Palette shifts based on chapter
  const palette = useMemo(() => {
    if (chapter === 9) return { bg: "from-slate-950 to-[#0f172a]", orb1: "bg-blue-900/40", orb2: "bg-indigo-900/40", ray: "from-blue-500/10" }; // Apology
    if (chapter >= 10) return { bg: "from-[#020617] to-[#0f172a]", orb1: "bg-amber-900/20", orb2: "bg-rose-900/20", ray: "from-amber-500/5" }; // Finale (Night Sky)
    if (chapter <= 3) return { bg: "from-[#f0fdf4] to-[#fef9f0]", orb1: "bg-emerald-100", orb2: "bg-amber-100", ray: "from-amber-100/30" };
    if (chapter <= 6) return { bg: "from-[#fdf4ff] to-[#fff7ed]", orb1: "bg-purple-100", orb2: "bg-rose-100", ray: "from-rose-100/30" };
    return { bg: "from-[#eff6ff] to-[#f0fdf4]", orb1: "bg-sky-100", orb2: "bg-emerald-100", ray: "from-sky-100/30" };
  }, [chapter]);

  const pollenSeeds = useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);
  const orbSeeds = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []);

  // Parallax transforms based on depth layers
  const bgX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const bgY = useTransform(smoothY, [-1, 1], [-20, 20]);
  
  const midX = useTransform(smoothX, [-1, 1], [-40, 40]);
  const midY = useTransform(smoothY, [-1, 1], [-40, 40]);
  
  const fgX = useTransform(smoothX, [-1, 1], [-80, 80]);
  const fgY = useTransform(smoothY, [-1, 1], [-80, 80]);

  if (!mounted) return null; // Avoid hydration mismatch on initial render

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none bg-gradient-to-br transition-colors duration-[2000ms] ${palette.bg}`}>

      {/* Layer 1: Background Orbs (Slow Parallax) */}
      <motion.div className="absolute inset-0" style={{ x: bgX, y: bgY }}>
        {orbSeeds.slice(0, 6).map((i) => (
          <motion.div
            key={`orb-bg-${i}`}
            className={`absolute rounded-full ${i % 2 === 0 ? palette.orb1 : palette.orb2} opacity-40 blur-[100px] transition-colors duration-[2000ms]`}
            style={{
              width: `${randomBetween(300, 600, i * 3)}px`,
              height: `${randomBetween(300, 600, i * 3 + 1)}px`,
              left: `${randomBetween(-20, 100, i * 3 + 2)}%`,
              top: `${randomBetween(-20, 100, i * 3 + 3)}%`,
            }}
            animate={{
              x: [0, randomBetween(-80, 80, i * 5), 0],
              y: [0, randomBetween(-60, 60, i * 5 + 1), 0],
              scale: [1, randomBetween(1.05, 1.25, i * 5 + 2), 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: randomBetween(15, 30, i * 7),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Layer 2: Midground Orbs & God Rays (Medium Parallax) */}
      <motion.div className="absolute inset-0" style={{ x: midX, y: midY }}>
        {/* Dynamic crepuscular god rays */}
        <motion.div
          className={`absolute -inset-20 bg-gradient-to-tr ${palette.ray} via-transparent to-transparent transition-colors duration-[2000ms]`}
          animate={{ opacity: [0.3, 0.7, 0.3], rotate: [-4, 4, -4] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top right" }}
        />
        <motion.div
          className="absolute -inset-20 bg-gradient-to-bl from-white/10 via-transparent to-transparent"
          animate={{ opacity: [0.2, 0.5, 0.2], rotate: [3, -3, 3] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ transformOrigin: "bottom left" }}
        />

        {orbSeeds.slice(6, 12).map((i) => (
          <motion.div
            key={`orb-mid-${i}`}
            className={`absolute rounded-full ${i % 2 === 0 ? palette.orb1 : palette.orb2} opacity-30 blur-[60px] transition-colors duration-[2000ms]`}
            style={{
              width: `${randomBetween(150, 300, i * 11)}px`,
              height: `${randomBetween(150, 300, i * 11 + 1)}px`,
              left: `${randomBetween(-10, 100, i * 11 + 2)}%`,
              top: `${randomBetween(0, 100, i * 11 + 3)}%`,
            }}
            animate={{
              x: [0, randomBetween(-40, 40, i * 13), 0],
              y: [0, randomBetween(-30, 30, i * 13 + 1), 0],
            }}
            transition={{
              duration: randomBetween(10, 20, i * 17),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Layer 2.5: Cinematic Anamorphic Lens Flare */}
      <motion.div className="absolute inset-0 flex items-center justify-center mix-blend-screen pointer-events-none" style={{ x: midX, y: midY }}>
        <motion.div 
          className="absolute w-[150vw] h-[2px] bg-sky-300/30 blur-[2px]"
          animate={{ opacity: [0.1, 0.4, 0.1], rotate: [-10, -10, -10] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-[80vw] h-[8px] bg-blue-400/20 blur-[6px] rounded-[100%]"
          animate={{ opacity: [0.2, 0.6, 0.2], rotate: [-10, -10, -10] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-[30vw] h-[20px] bg-cyan-300/10 blur-[12px] rounded-[100%]"
          animate={{ opacity: [0.3, 0.8, 0.3], rotate: [-10, -10, -10], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Layer 3: Foreground Fireflies / Pollen (Fast Parallax) */}
      <motion.div className="absolute inset-0" style={{ x: fgX, y: fgY }}>
        {pollenSeeds.map((i) => {
          // Different colors for fireflies vs pollen
          const isFirefly = chapter === 11 ? true : i % 4 === 0;
          const bg = isFirefly 
            ? "rgba(253, 224, 71, 0.9)" // bright yellow firefly
            : i % 3 === 0 
              ? "rgba(251, 191, 36, 0.6)" 
              : i % 3 === 1 
                ? "rgba(244, 114, 182, 0.4)" 
                : "rgba(167, 243, 208, 0.5)";

          return (
            <motion.div
              key={`pollen-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${randomBetween(2, isFirefly ? 6 : 4, i * 19)}px`,
                height: `${randomBetween(2, isFirefly ? 6 : 4, i * 19)}px`,
                background: bg,
                left: `${randomBetween(-10, 110, i * 23)}%`,
                top: `${randomBetween(-10, 110, i * 23 + 1)}%`,
                filter: isFirefly ? "blur(1px) drop-shadow(0 0 4px rgba(253,224,71,0.8))" : "blur(1px)",
              }}
              animate={{
                y: [0, randomBetween(-150, -50, i * 29)],
                x: [0, randomBetween(-50, 50, i * 29 + 1)],
                opacity: isFirefly ? [0, 1, 0.2, 1, 0] : [0, 0.8, 0],
                scale: [0.5, 1.2, 0.3],
              }}
              transition={{
                duration: randomBetween(6, 14, i * 31),
                repeat: Infinity,
                ease: "easeInOut",
                delay: randomBetween(0, 8, i * 37),
              }}
            />
          );
        })}
      </motion.div>

    </div>
  );
}
