"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function GardenFinale() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [0, 0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <div ref={containerRef} className="relative z-20 w-full min-h-[150vh] flex flex-col items-center justify-center bg-gradient-to-t from-emerald-950 to-transparent pt-64 pb-32">
      
      {/* Dark overlay that fades in at the very end to make the glowing tree pop */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 bg-emerald-950/80 -z-10 pointer-events-none"
      />

      <motion.div 
        style={{ opacity, y }}
        className="text-center px-4 max-w-4xl"
      >
        <p className="font-playfair text-3xl md:text-5xl text-amber-200 tracking-wider mb-12 leading-relaxed">
          &quot;A flower never forgets the sunlight that helped it bloom.&quot;
        </p>
        
        <p className="font-sans text-xl md:text-2xl text-emerald-100/80 mb-20">
          Thank you for helping us bloom.
        </p>

        <h1 className="text-5xl md:text-8xl font-playfair text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 font-bold drop-shadow-[0_0_30px_rgba(253,224,71,0.5)]">
          HAPPY BIRTHDAY<br />PREETI MA&apos;AM
        </h1>
      </motion.div>

    </div>
  );
}
