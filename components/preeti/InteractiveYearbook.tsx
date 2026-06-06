"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { preetiData } from "@/lib/data";

export function InteractiveYearbook() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section className="w-full py-32 bg-[#fffcf5] border-t-8 border-dashed border-[#e6d5a7] relative" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}>
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="mb-20 text-center">
          <h2 className="text-5xl font-caveat text-[#2d4a3e] mb-4">The Class Yearbook</h2>
          <p className="font-caveat text-2xl text-[#d97757]">Tap on any student to read their handwritten note!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {preetiData.yearbook.map((card: any, i: number) => {
            // Stable rotation based on index to prevent jumps on hover
            const rot = i % 2 === 0 ? (i * 4) % 6 + 1 : -((i * 4) % 6) - 1;
            
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                onClick={() => setActiveCard(i)}
                className="bg-white p-6 shadow-md border border-[#e6d5a7]/50 relative cursor-pointer flex flex-col justify-between items-center group"
                style={{ 
                  rotate: `${rot}deg`, 
                  borderRadius: "2% 1% 3% 1% / 1% 3% 1% 2%" 
                }}
              >
                {/* Cute Paper Clip sticker effect */}
                <div className="absolute -top-3 left-6 w-12 h-6 bg-yellow-100/80 border border-yellow-300/40 rounded-full rotate-12 opacity-80 shadow-sm" />
                
                {/* Student Avatar Initials */}
                <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-dashed border-[#6d8a7c] flex items-center justify-center mb-6">
                  <span className="text-3xl text-[#6d8a7c]/70 font-caveat font-bold select-none">
                    {card.name.split(" ").map((n: string) => n[0]).join("")}
                  </span>
                </div>

                <div className="text-center mb-4">
                  <h3 className="font-caveat text-2xl text-[#2d4a3e] font-bold leading-tight">
                    {card.name}
                  </h3>
                  <p className="font-caveat text-lg text-[#d97757] mt-1">
                    {card.year}
                  </p>
                </div>

                <div className="text-xs font-mono text-emerald-600/70 border border-emerald-600/20 px-3 py-1 rounded-full group-hover:bg-emerald-50 transition-colors uppercase tracking-wider">
                  Read Note
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Expanded Note Overlay */}
      <AnimatePresence>
        {activeCard !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-transparent/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
            onClick={() => setActiveCard(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, rotate: -2 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.9, y: 20, rotate: -2 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#fffcf0] p-12 shadow-2xl border-4 border-[#e6d5a7] relative flex flex-col items-center"
              style={{ 
                borderRadius: "3% 2% 4% 2% / 2% 4% 2% 3%",
                backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" 
              }}
            >
              {/* Cute Washi Tape on Top */}
              <div className="absolute -top-4 w-40 h-8 bg-red-100/70 border border-red-200/40 rotate-2 opacity-90 shadow-sm" />

              <span className="text-6xl font-serif text-[#6d8a7c]/20 leading-none mb-2">“</span>
              
              <p className="font-caveat text-3xl md:text-4xl text-[#2d4a3e] text-center leading-relaxed italic">
                {preetiData.yearbook[activeCard].message}
              </p>

              <div className="mt-8 text-center border-t border-dashed border-[#e6d5a7] pt-6 w-full max-w-xs">
                <h4 className="font-caveat text-3xl text-[#d97757] font-bold">
                  - {preetiData.yearbook[activeCard].name}
                </h4>
                <p className="font-caveat text-xl text-[#6d8a7c]">
                  {preetiData.yearbook[activeCard].year}
                </p>
              </div>

              <button
                onClick={() => setActiveCard(null)}
                className="mt-8 px-6 py-2 bg-[#6d8a7c] text-white font-caveat text-2xl rounded-sm hover:bg-[#587064] transition-colors shadow-sm"
              >
                Close Note
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
