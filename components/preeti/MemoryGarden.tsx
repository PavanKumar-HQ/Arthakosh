"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Flower2, X } from "lucide-react";

const FLOWERS = [
  { id: 1, color: "text-pink-500", label: "The First Day", quote: "I still remember how nervous we were, until she smiled." },
  { id: 2, color: "text-purple-500", label: "Lunch Breaks", quote: "Sharing food and endless stories in the staff room." },
  { id: 3, color: "text-rose-400", label: "The Trip", quote: "That one excursion where she was more of a kid than we were." },
  { id: 4, color: "text-fuchsia-500", label: "Exam Panic", quote: "'Breathe. It's just a paper. You are more than your marks.'" },
  { id: 5, color: "text-violet-500", label: "Farewell", quote: "Tears, hugs, and promises to stay in touch." },
];

export function MemoryGarden() {
  const [selectedFlower, setSelectedFlower] = useState<{ id: number; label: string; quote: string; color: string } | null>(null);

  return (
    <section className="min-h-screen py-24 relative flex flex-col items-center">
      <h2 className="font-playfair text-4xl md:text-6xl text-pink-600 mb-16 text-center">The Memory Garden</h2>
      
      <div className="flex flex-wrap justify-center gap-12 max-w-5xl px-8">
        {FLOWERS.map((flower, i) => (
          <motion.div
            key={flower.id}
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.2, type: "spring" }}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => setSelectedFlower(flower)}
          >
            {/* Flower Stem */}
            <div className="w-1 h-24 bg-green-400 rounded-full mb-[-10px] origin-bottom transform group-hover:scale-y-110 transition-transform" />
            
            {/* Flower Head */}
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.2 }}
              className={`p-4 bg-white rounded-full shadow-lg ${flower.color} border-2 border-current`}
            >
              <Flower2 className="w-12 h-12" />
            </motion.div>
            
            <p className="mt-4 font-caveat text-2xl text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
              {flower.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Memory Modal */}
      <motion.div
        initial={false}
        animate={{ opacity: selectedFlower ? 1 : 0, pointerEvents: selectedFlower ? "auto" : "none" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-md p-4"
      >
        {selectedFlower && (
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg w-full relative border-4 border-pink-100"
          >
            <button 
              onClick={() => setSelectedFlower(null)}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex justify-center mb-6">
              <Flower2 className={`w-16 h-16 ${selectedFlower.color}`} />
            </div>
            <h3 className="font-playfair text-2xl text-center text-gray-800 mb-4">{selectedFlower.label}</h3>
            <p className="font-caveat text-3xl text-center text-gray-600 leading-relaxed">
              &quot;{selectedFlower.quote}&quot;
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
