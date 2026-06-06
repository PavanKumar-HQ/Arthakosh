"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ImpactVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.5, 3]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [0, 1, 1, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section ref={containerRef} className="h-[200vh] relative bg-transparent">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        <div className="absolute top-32 text-center z-20">
          <span className="text-amber-500/80 font-mono tracking-[0.2em] text-sm uppercase mb-6 block">
            Chapter VI
          </span>
          <h2 className="font-playfair text-4xl md:text-6xl text-white leading-tight">
            The Ripple Effect
          </h2>
        </div>

        <motion.div
          style={{ scale, opacity, rotate }}
          className="relative w-64 h-64 md:w-96 md:h-96"
        >
          {/* Glowing Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-amber-500 rounded-full blur-xl opacity-50 animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-amber-300 rounded-full shadow-[0_0_20px_#fcd34d]" />

          {/* Infinite Liquid Ripples */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`ripple-${i}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-amber-500/30"
              style={{
                width: "40px",
                height: "40px",
                boxShadow: "0 0 30px rgba(245,158,11,0.2) inset"
              }}
              animate={{ 
                scale: [1, 8],
                opacity: [0.8, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 1,
              }}
            />
          ))}

          {/* Floating Energy Particles moving outward */}
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute top-1/2 left-1/2 w-[2px] h-[2px] bg-amber-300 rounded-full shadow-[0_0_5px_#fcd34d]"
              animate={{
                x: [0, Math.cos((i * 15) * (Math.PI / 180)) * 250],
                y: [0, Math.sin((i * 15) * (Math.PI / 180)) * 250],
                opacity: [0, 1, 0],
                scale: [1, 2, 0.5]
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                ease: "easeOut",
                delay: (i % 5) * 0.5,
              }}
            />
          ))}
        </motion.div>
        
        <motion.p 
          style={{ opacity }}
          className="absolute bottom-32 font-sans text-gray-500 uppercase tracking-widest text-sm"
        >
          One lesson. Infinite ripples.
        </motion.p>
      </div>
    </section>
  );
}
