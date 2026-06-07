"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BackgroundGreenhouse } from "@/components/preeti/generative/BackgroundGreenhouse";
import { Lock, Unlock } from "lucide-react";

export function Chapter9_Greenhouse({ onComplete }: { onComplete: () => void }) {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="w-full h-full relative overflow-hidden bg-transparent">
      {/* Dynamic Greenhouse Background */}
      <BackgroundGreenhouse chapterProgress={9} />
      
      {/* Animated Overgrown Vines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <motion.path
          d="M 0 0 C 20 20, 10 50, 30 80 S 50 100, 60 100"
          fill="none"
          stroke="rgba(16, 185, 129, 0.4)" // emerald-500
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 6, ease: "easeInOut" }}
        />
        <motion.path
          d="M 100 0 C 80 30, 90 60, 70 90 S 40 100, 30 100"
          fill="none"
          stroke="rgba(52, 211, 153, 0.4)" // emerald-400
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, delay: 1, ease: "easeInOut" }}
        />
        <motion.path
          d="M 50 0 C 60 40, 40 60, 50 100"
          fill="none"
          stroke="rgba(5, 150, 105, 0.3)" // emerald-600
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 7, delay: 0.5, ease: "easeInOut" }}
        />
      </svg>
      

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="locked"
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4"
          >
            <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-full shadow-2xl flex items-center justify-center mb-8">
              <Lock className="w-10 h-10 text-emerald-800" />
            </div>
            <h2 className="text-4xl md:text-5xl font-playfair text-emerald-900 mb-4">
              The Secret Greenhouse
            </h2>
            <p className="text-emerald-700 italic font-serif text-lg mb-12">
              The sanctuary of our most precious memories.
            </p>
            <button 
              onClick={() => setUnlocked(true)}
              className="px-8 py-3 bg-emerald-800 text-white rounded-full font-sans tracking-widest text-sm hover:bg-emerald-700 transition-colors shadow-lg"
            >
              Turn the Key
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 p-4 md:p-8"
          >
            <div className="w-full max-w-5xl max-h-[90vh] bg-white/60 backdrop-blur-xl border border-emerald-100 rounded-3xl p-8 md:p-12 shadow-2xl overflow-y-auto custom-scrollbar flex flex-col items-center">
            <Unlock className="w-8 h-8 text-emerald-500 mb-6" />
            <h2 className="text-3xl md:text-5xl font-playfair text-emerald-900 mb-12 text-center">
              Happy Birthday, Preeti Ma&apos;am
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-50 flex flex-col items-center">
                <div className="w-full h-48 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-emerald-300">▶ Play Video</span>
                </div>
                <p className="font-playfair text-emerald-800 italic">Our Class Montage</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-50 flex flex-col items-center">
                <div className="w-full h-48 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-emerald-300">📷 Group Photo</span>
                </div>
                <p className="font-playfair text-emerald-800 italic">Class of 2023</p>
              </div>
            </div>

            <button 
              onClick={onComplete}
              className="mt-8 px-8 py-3 bg-emerald-100 text-emerald-800 rounded-full font-sans tracking-widest text-sm hover:bg-emerald-200 transition-colors"
            >
              Leave the Greenhouse
            </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
