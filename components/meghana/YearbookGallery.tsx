"use client";

import { motion } from "framer-motion";
import { meghanaData } from "@/lib/data";

export function YearbookGallery() {
  return (
    <div className="w-[150vw] h-full flex flex-col justify-center relative shrink-0 px-32 border-r border-white/5 bg-[#020205]">
      
      <div className="mb-16 text-center w-full z-10">
        <h2 className="text-3xl md:text-6xl font-playfair font-light text-white uppercase tracking-[0.2em] mb-6">
          The Legacy Tributes
        </h2>
        <p className="text-amber-500 font-sans tracking-[0.4em] uppercase text-xs">
          Words of gratitude from the minds you helped shape.
        </p>
      </div>

      <div className="flex gap-12 max-w-7xl mx-auto w-full overflow-visible justify-center items-stretch py-4 z-10">
        {meghanaData.yearbook.map((card: any, i: number) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, y: -8 }}
            transition={{ duration: 0.8, delay: i * 0.15, type: "spring", stiffness: 100 }}
            className="w-80 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-lg border border-white/10 hover:border-amber-500/40 p-8 flex flex-col justify-between cursor-pointer rounded-2xl transition-all shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.1)] relative"
          >
            {/* Gold Corner Highlight */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-500/20 rounded-tr-2xl" />

            <div>
              <span className="text-5xl font-serif text-amber-500/20 leading-none block mb-2">“</span>
              <p className="text-gray-300 font-playfair text-sm leading-relaxed italic">
                {card.message}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5">
              <h4 className="text-white font-sans text-sm font-semibold tracking-wider uppercase">
                {card.name}
              </h4>
              <p className="text-xs text-amber-500/70 font-sans mt-1 tracking-widest uppercase">
                {card.year}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
