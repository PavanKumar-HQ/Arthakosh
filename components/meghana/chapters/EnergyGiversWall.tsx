"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const GIVERS = [
  { name: "Batch of '19", message: "Thank you for the endless patience." },
  { name: "Rahul S.", message: "You saw potential when I didn't." },
  { name: "Sneha M.", message: "For every after-school doubt cleared." },
  { name: "The Quiet Ones", message: "You made sure we were heard." },
  { name: "Aditya", message: "Your energy is contagious." },
  { name: "Priya", message: "You are the standard we aspire to." },
];

export function EnergyGiversWall() {
  return (
    <section className="min-h-screen w-full py-32 px-4 relative bg-transparent overflow-hidden flex flex-col items-center">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_60%)] rounded-full pointer-events-none blur-3xl z-0" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="max-w-4xl w-full text-center mb-24 relative z-10"
      >
        <span className="text-[#d4af37]/80 font-mono tracking-[0.25em] text-sm uppercase mb-6 block">
          Chapter III
        </span>
        <h2 className="font-playfair text-5xl md:text-7xl text-white leading-tight">
          The Energy Givers
        </h2>
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent mx-auto mt-6" />
        <p className="font-sans text-gray-400 mt-8 tracking-wider font-light text-lg">
          Hover to feel the light you&apos;ve created.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full relative z-10">
        {GIVERS.map((giver, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative h-48 rounded-2xl cursor-pointer overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.05)",
              boxShadow: "0 4px 30px rgba(0,0,0,0.1)"
            }}
          >
            {/* Top edge highlight */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Ambient hover glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/0 via-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/10 transition-all duration-700" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#d4af37]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="flex flex-col items-center justify-center h-full p-6 relative z-10 text-center">
              <Sparkles className="w-5 h-5 text-[#d4af37] opacity-0 group-hover:opacity-100 absolute top-4 right-4 transition-opacity duration-500" />
              
              <h3 className="font-mono tracking-[0.2em] text-gray-500 group-hover:text-[#d4af37] transition-colors duration-500 mb-3 uppercase text-xs font-semibold">
                {giver.name}
              </h3>
              
              <p className="font-playfair italic text-white/90 text-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                &quot;{giver.message}&quot;
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
    </section>
  );
}
