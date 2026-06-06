"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { meghanaData } from "@/lib/data";
import { useJourneyStore } from "@/lib/store";

export function ChamberOfUnsaidWords() {
  const energyLevel = useJourneyStore(state => state.energyLevel);
  const [opened, setOpened] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Door unlocks when sufficient energy is gathered (e.g., >= 5)
  const canOpen = energyLevel >= 5;

  const handleOpen = () => {
    if (canOpen) {
      setOpened(true);
    }
  };

  const messages = meghanaData.secretMessages?.slice(0, 10) || [];

  const handleNext = () => {
    if (currentIndex < messages.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="w-[150vw] h-full flex flex-col items-center justify-center relative shrink-0 px-32 border-r border-white/5 bg-[#010204]">
      
      {!opened ? (
        <div className="flex flex-col items-center text-center max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-playfair font-light text-white uppercase tracking-[0.2em] mb-12">
            The Chamber of Unsaid Words
          </h2>
          
          <motion.div 
            whileHover={canOpen ? { scale: 1.05 } : {}}
            onClick={handleOpen}
            className={`w-64 h-96 border-2 flex items-center justify-center transition-all duration-1000 ${
              canOpen 
                ? "border-yellow-500/50 bg-yellow-500/10 cursor-pointer shadow-[0_0_50px_rgba(251,191,36,0.2)]" 
                : "border-white/10 bg-transparent/50 cursor-not-allowed opacity-50"
            }`}
          >
            {canOpen ? (
              <p className="font-sans text-yellow-500 tracking-widest uppercase text-sm animate-pulse">Enter</p>
            ) : (
              <p className="font-sans text-gray-500 tracking-widest uppercase text-xs">More energy required</p>
            )}
          </motion.div>
        </div>
      ) : (
        <div className="w-full max-w-5xl flex flex-col items-center justify-center h-[500px] z-10 px-8">
          
          {/* Slideshow Container */}
          <div className="relative w-full h-[300px] flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute w-full flex flex-col items-center text-center justify-center px-4"
              >
                <div className="border-l-4 border-yellow-500/40 pl-8 md:pl-12 py-4 max-w-4xl text-left">
                  <p className="font-playfair text-xl md:text-3xl text-gray-100 leading-relaxed italic font-light">
                    &quot;{messages[currentIndex]}&quot;
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation & Counter */}
          <div className="flex items-center justify-between w-full max-w-md mt-8 border-t border-white/10 pt-6 z-20 pointer-events-auto">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-4 py-2 text-xs font-sans uppercase tracking-widest transition-all ${
                currentIndex === 0 
                  ? "opacity-20 cursor-not-allowed text-gray-500" 
                  : "opacity-80 hover:opacity-100 hover:text-yellow-500 text-white"
              }`}
            >
              ← Previous
            </button>

            <span className="text-xs text-yellow-500/80 tracking-widest font-sans font-light">
              {currentIndex + 1} / {messages.length}
            </span>

            <button
              onClick={handleNext}
              disabled={currentIndex === messages.length - 1}
              className={`px-4 py-2 text-xs font-sans uppercase tracking-widest transition-all ${
                currentIndex === messages.length - 1 
                  ? "opacity-20 cursor-not-allowed text-gray-500" 
                  : "opacity-80 hover:opacity-100 hover:text-yellow-500 text-white"
              }`}
            >
              Next →
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
