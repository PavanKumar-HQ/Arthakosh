"use client";

import { motion } from "framer-motion";
import { preetiData } from "@/lib/data";

export function PolaroidWall() {
  return (
    <section className="w-full py-32 bg-[#fdfbf7] relative" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}>
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-5xl font-caveat text-center text-[#d97757] mb-24 drop-shadow-sm">
          Scattered Memories...
        </h2>
        
        <div className="flex flex-wrap justify-center gap-12 relative">
          {preetiData.memories.map((memory: any, index: number) => {
            // Stable rotation based on index to prevent layout jumps on hover
            const rot = index % 2 === 0 ? (index * 3) % 5 + 2 : -((index * 3) % 5) - 2;
            return (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, scale: 0.8, rotate: rot * 1.5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: rot }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="w-72 md:w-80 bg-white p-4 pb-12 shadow-[2px_5px_15px_rgba(0,0,0,0.15)] relative cursor-pointer flex flex-col"
              >
                {/* Red pin */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 shadow-md border border-red-700" />
                
                <div className="w-full aspect-square bg-[#eae8e1] mb-4 flex items-center justify-center border border-[#d5d3cb] overflow-hidden">
                  <span className="font-caveat text-xl text-[#9b988f]">Insert Photo</span>
                </div>
                
                <h3 className="font-caveat text-3xl text-[#2d4a3e] font-bold mb-2 leading-tight">{memory.title}</h3>
                <p className="font-caveat text-2xl text-[#5b5851] leading-snug">
                  {memory.description}
                </p>
                <span className="absolute bottom-4 right-4 font-caveat text-xl text-[#d97757]">{memory.year}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
