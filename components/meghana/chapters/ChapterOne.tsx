"use client";

import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";

export function ChapterOne() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center py-32 px-4 relative bg-transparent overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(49,46,129,0.15)_0%,transparent_70%)] blur-2xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)] blur-2xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="max-w-5xl w-full relative z-10"
      >
        <div className="text-center mb-16">
          <span className="text-[#d4af37]/80 font-mono tracking-[0.25em] text-sm uppercase mb-4 block">
            Chapter I
          </span>
          <h2 className="font-playfair text-5xl md:text-7xl text-white leading-tight">
            The First Impression
          </h2>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent mx-auto mt-6" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          
          {/* Glassmorphism Card 1 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-10 rounded-2xl relative overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.05)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
            }}
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-colors duration-700" />
            
            <Sparkles className="w-6 h-6 text-indigo-400 mb-6 opacity-60" />
            <p className="text-gray-300 font-sans text-lg md:text-xl leading-relaxed font-light relative z-10">
              You didn&apos;t just walk into the classroom; you changed the atmosphere. There was a quiet authority, wrapped in an undeniable warmth.
            </p>
          </motion.div>

          {/* Glassmorphism Card 2 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-10 rounded-2xl relative overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.05)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
            }}
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-colors duration-700" />
            
            <Star className="w-6 h-6 text-amber-400 mb-6 opacity-60" />
            <p className="text-gray-300 font-sans text-lg md:text-xl leading-relaxed font-light relative z-10">
              We thought we were just there to learn a subject. We didn&apos;t realize we were about to learn how to think, how to question, and how to believe in ourselves.
            </p>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
