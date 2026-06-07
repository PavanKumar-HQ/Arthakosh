"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Lock, Unlock } from "lucide-react";

export function Chapter9_Greenhouse({ onComplete }: { onComplete: () => void }) {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="w-full h-full relative bg-transparent flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background abstract greenhouse structure */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 20 100 L 20 40 L 50 10 L 80 40 L 80 100" fill="none" stroke="#065f46" strokeWidth="0.5" />
        <path d="M 30 100 L 30 40 L 50 20 L 70 40 L 70 100" fill="none" stroke="#065f46" strokeWidth="0.5" />
      </svg>

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="locked"
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center text-center z-20 px-4"
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
            className="w-full max-w-5xl h-[80vh] bg-white/60 backdrop-blur-xl border border-emerald-100 rounded-3xl p-8 md:p-12 shadow-2xl z-20 overflow-y-auto custom-scrollbar flex flex-col items-center"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
