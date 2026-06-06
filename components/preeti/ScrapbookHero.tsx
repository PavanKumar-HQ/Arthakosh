"use client";

import { motion } from "framer-motion";
import { preetiData } from "@/lib/data";

export function ScrapbookHero({ onClick }: { onClick: () => void }) {
  return (
    <section 
      onClick={onClick}
      className="h-screen w-full bg-[#fdfbf7] flex items-center justify-center relative overflow-hidden cursor-pointer"
      style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}
    >
      <motion.div 
        initial={{ rotate: -2, y: 50, opacity: 0 }}
        animate={{ rotate: 2, y: 0, opacity: 1 }}
        transition={{ duration: 1.5, type: "spring", bounce: 0.5 }}
        className="bg-[#fff9e6] p-12 shadow-[5px_5px_15px_rgba(0,0,0,0.1)] border-2 border-[#e6d5a7] relative z-10 max-w-2xl text-center"
        style={{ borderRadius: "2% 3% 2% 4% / 3% 2% 4% 2%" }} // Hand-cut paper look
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-yellow-200/50 -rotate-3" /> {/* Tape */}
        
        <h1 className="text-6xl md:text-8xl text-[#2d4a3e] mb-4 font-caveat">
          Preeti's Storybook
        </h1>
        <p className="text-2xl text-[#6d8a7c] font-caveat tracking-wide">
          "The Creative Soul"
        </p>
        
        {/* Little doodles */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 -right-10 text-4xl"
        >
          ✨
        </motion.div>
        <motion.div 
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-8 -left-8 text-4xl"
        >
          🎨
        </motion.div>
      </motion.div>
    </section>
  );
}
