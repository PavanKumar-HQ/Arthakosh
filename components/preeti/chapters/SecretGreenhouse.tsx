"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Lock, Unlock } from "lucide-react";

export function SecretGreenhouse() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className="relative z-20 w-full min-h-[100vh] py-32 flex flex-col items-center justify-center">
      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl md:text-6xl font-playfair text-emerald-900 mb-4">
          The Secret Greenhouse
        </h2>
        <p className="text-lg text-emerald-700 italic">
          A special place reserved for the most precious memories.
        </p>
      </div>

      <div className="relative w-full max-w-5xl px-8 h-[600px]">
        {/* The Locked Overlay */}
        <AnimatePresence>
          {!isUnlocked && (
            <motion.div 
              exit={{ opacity: 0, filter: "blur(20px)" }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl"
            >
              <div className="w-24 h-24 bg-white/80 rounded-full flex items-center justify-center shadow-xl mb-6">
                <Lock className="w-10 h-10 text-emerald-800" />
              </div>
              <p className="text-xl font-playfair text-emerald-900 mb-8 max-w-md text-center">
                This greenhouse contains our most emotional tributes and birthday wishes.
              </p>
              <button 
                onClick={() => setIsUnlocked(true)}
                className="px-8 py-3 bg-emerald-800 hover:bg-emerald-700 text-white rounded-full font-medium tracking-wide shadow-lg transition-all hover:scale-105"
              >
                Turn the Key
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Greenhouse Content (Behind the lock) */}
        <div className="absolute inset-0 z-20 p-8 bg-emerald-50/80 rounded-3xl border border-emerald-100 flex flex-col items-center overflow-y-auto">
          <Unlock className="w-8 h-8 text-emerald-400 mb-8" />
          
          <h3 className="text-3xl font-playfair text-emerald-900 mb-12">
            Happy Birthday, Preeti Ma&apos;am!
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
              <div className="w-full h-48 bg-emerald-100 rounded-xl mb-4 flex items-center justify-center text-emerald-600">
                [ Video Montage Placeholder ]
              </div>
              <p className="text-center font-playfair italic text-emerald-900">A look back at our best times.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
              <div className="w-full h-48 bg-emerald-100 rounded-xl mb-4 flex items-center justify-center text-emerald-600">
                [ Group Photo Placeholder ]
              </div>
              <p className="text-center font-playfair italic text-emerald-900">Class of 2023</p>
            </div>
          </div>
          
          <div className="mt-12 w-full bg-white p-8 rounded-2xl shadow-sm border border-emerald-100">
            <h4 className="text-xl font-playfair text-emerald-900 mb-4 text-center">Voice Messages</h4>
            <div className="flex flex-col gap-4">
              <div className="w-full h-12 bg-emerald-50 rounded-full flex items-center px-6">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse mr-4" />
                <span className="text-emerald-800 text-sm">Play Message from Rahul</span>
              </div>
              <div className="w-full h-12 bg-emerald-50 rounded-full flex items-center px-6">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse mr-4" />
                <span className="text-emerald-800 text-sm">Play Message from Priya</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
