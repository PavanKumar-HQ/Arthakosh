"use client";

import { motion } from "framer-motion";

export function CenterHero() {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5, delay: 1 }}
      className="flex flex-col items-center justify-center text-center mt-8 drop-shadow-md"
    >
      <div className="flex items-center gap-4 mb-2">
        <span className="text-pink-400">💕</span>
        <h2 className="font-sans text-[#8a734e] tracking-[0.2em] uppercase text-sm font-semibold">
          Happy Birthday
        </h2>
        <span className="text-amber-500/50">✦</span>
      </div>

      <h1 
        className="font-playfair text-6xl md:text-[5rem] text-pink-400 mb-6 drop-shadow-sm"
        style={{ textShadow: "0 2px 10px rgba(244,114,182,0.2)" }}
      >
        Preeti Ma&apos;am
      </h1>

      <p className="font-playfair text-[#6d5b3d] text-lg md:text-xl max-w-lg italic">
        Thank you for helping us grow, guiding us, and believing in us. <span className="text-pink-400 not-italic">💗</span>
      </p>

      <button className="mt-8 px-8 py-3 bg-[#a39360] hover:bg-[#8a734e] text-white rounded-full shadow-lg font-sans tracking-widest text-sm uppercase transition-all hover:scale-105 flex items-center gap-2">
        Start Journey 🦋
      </button>
    </motion.div>
  );
}
