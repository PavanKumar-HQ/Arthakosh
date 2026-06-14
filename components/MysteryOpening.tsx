"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const typewriterLines: string[] = [];

export function MysteryOpening({ onEnter }: { onEnter: () => void }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (currentLine < typewriterLines.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, 2000); // 2 seconds per line
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowButton(true), 1000);
    }
  }, [currentLine]);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-transparent text-white px-4 overflow-hidden">
      {/* Warm royal glow behind the text */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_60%)] z-0 pointer-events-none" />
      
      <div className="max-w-2xl text-center space-y-6 relative z-10">
        {typewriterLines.map((line, lineIndex) => (
          <motion.div
            key={lineIndex}
            initial="hidden"
            animate={currentLine >= lineIndex ? "visible" : "hidden"}
            className="flex flex-wrap justify-center gap-2"
          >
            {line.split(" ").map((word, wordIndex) => (
              <motion.span
                key={wordIndex}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: wordIndex * 0.25, duration: 0.8, ease: "easeOut" }
                  }
                }}
                className="text-2xl md:text-4xl font-playfair italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fff3cc] to-[#d4af37] drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={showButton ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onEnter}
        className={`mt-20 px-10 py-4 rounded-full border border-[#d4af37]/60 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 backdrop-blur-md text-[#d4af37] font-playfair text-xl tracking-[0.15em] uppercase transition-all shadow-[0_0_40px_rgba(212,175,55,0.2)] ${
          showButton ? "pointer-events-auto" : "pointer-events-none opacity-0"
        }`}
      >
        Enter the Journey
      </motion.button>
    </section>
  );
}
