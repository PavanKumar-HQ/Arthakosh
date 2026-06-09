"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const MEMORIES = [
  { id: 1, text: "Teachers' Day Celebration 2022", details: "You brought so much joy to our classroom!", image: "/preeti/20260517_063836.jpg" },
  { id: 2, text: "The Science Fair", details: "Thank you for staying late to help us build the volcano.", image: "/preeti/IMG_6460.JPG" },
  { id: 3, text: "Farewell Party", details: "We will never forget your inspiring speech.", image: "/preeti/IMG_6460.JPG" },
  { id: 4, text: "Morning Assembly", details: "Your daily quotes kept us motivated.", image: "/preeti/DSC00388.JPG" },
  { id: 5, text: "Sports Day", details: "Cheering for us louder than anyone else.", image: "/preeti/IMG_6372.JPG" },
  { id: 6, text: "Graduation", details: "A proud moment we shared together.", image: "/preeti/IMG_6441.JPG" }
];

export function MemoryBlooms() {
  const [activeMemory, setActiveMemory] = useState<number | null>(null);

  return (
    <div className="relative z-20 w-full min-h-[100vh] flex flex-col items-center justify-center pt-64">
      <h2 className="text-4xl md:text-6xl font-playfair text-emerald-900 mb-20 text-center">
        The Memory Blooms
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32 max-w-5xl w-full px-8">
        {MEMORIES.map((memory) => (
          <motion.div 
            key={memory.id}
            className="flex flex-col items-center relative cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => setActiveMemory(memory.id)}
          >
            <motion.img 
              src="/real-flower.png" 
              alt="Blooming Memory"
              className="w-48 h-48 object-cover mix-blend-darken"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="mt-4 text-center">
              <p className="font-sans text-emerald-800 font-medium text-lg tracking-wide">
                {memory.text}
              </p>
              <p className="text-sm text-emerald-600/80 italic mt-1">Click to reveal</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeMemory !== null && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-md px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMemory(null)}
          >
            <motion.div 
              className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-full text-center border border-emerald-100 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const memory = MEMORIES.find(m => m.id === activeMemory);
                return (
                  <>
                    {memory?.video ? (
                      <video src={memory.video} controls autoPlay muted className="w-full rounded-xl mb-6 max-h-64 object-contain bg-black/5" />
                    ) : memory?.image ? (
                      <img src={memory.image} alt={memory.text} className="w-full rounded-xl mb-6 max-h-64 object-contain bg-black/5" />
                    ) : (
                      <img src="/real-flower.png" className="w-32 h-32 mx-auto mix-blend-darken mb-6" alt="Flower" />
                    )}
                    <h3 className="text-2xl font-playfair text-emerald-900 mb-4">
                      {memory?.text}
                    </h3>
                    <p className="text-gray-600 font-sans leading-relaxed text-lg mb-6">
                      {memory?.details}
                    </p>
                  </>
                );
              })()}
              <button 
                onClick={() => setActiveMemory(null)}
                className="px-6 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full font-medium transition-colors"
              >
                Close Memory
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
