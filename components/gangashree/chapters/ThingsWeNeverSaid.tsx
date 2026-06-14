"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Quote } from "lucide-react";

export function ThingsWeNeverSaid() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <section className="min-h-screen w-full py-32 px-4 relative bg-transparent overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background ambient light that brightens when revealed */}
      <motion.div
        animate={{ opacity: isRevealed ? 1 : 0.2 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(49,46,129,0.1)_0%,transparent_60%)]" />
      </motion.div>

      <div className="absolute top-32 left-4 md:left-32 z-10 text-left w-full max-w-5xl mx-auto">
        <span className="text-[#d4af37]/80 font-mono tracking-[0.25em] text-sm uppercase mb-4 block">
          Chapter V
        </span>
        <h2 className="font-playfair text-5xl md:text-7xl text-white leading-tight">
          Things We Never Said
        </h2>
        <div className="w-12 h-px bg-gradient-to-r from-[#d4af37]/60 to-transparent mt-6" />
      </div>

      <div className="mt-32 relative z-20 flex flex-col items-center w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.button
              key="reveal-button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsRevealed(true)}
              className="w-48 h-48 rounded-full flex flex-col items-center justify-center relative group cursor-pointer"
              style={{
                background: "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.02) 100%)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(212,175,55,0.4)",
                boxShadow: "0 0 50px rgba(212,175,55,0.2), inset 0 0 30px rgba(212,175,55,0.1)"
              }}
            >
              {/* Pulsing rings */}
              <motion.div
                animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-amber-400/40"
              />
              <motion.div
                animate={{ scale: [1, 1.2], opacity: [0.8, 0] }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-amber-300/30"
              />

              <span className="font-mono text-sm uppercase tracking-[0.2em] text-amber-100 font-bold group-hover:text-white transition-colors duration-300">
                Click to
              </span>
              <span className="font-playfair italic text-2xl text-amber-200 mt-1 group-hover:text-white transition-colors duration-300">
                Reveal
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="revealed-content"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative p-12 md:p-16 rounded-3xl"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.5) 100%)",
                backdropFilter: "blur(30px)",
                border: "1px solid rgba(212,175,55,0.15)",
                boxShadow: "0 20px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)"
              }}
            >
              {/* Internal glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
              <Quote className="w-10 h-10 text-[#d4af37]/40 absolute top-8 left-8" />
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 0.8 }}
                className="font-playfair text-2xl md:text-4xl lg:text-5xl text-white leading-relaxed italic text-center relative z-10"
              >
                &quot;We were teenagers. We didn&apos;t know how to say thank you properly. We didn&apos;t tell you that your belief in us meant more than the grades we got. We just hope you always knew.&quot;
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
