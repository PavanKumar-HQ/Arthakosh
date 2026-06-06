"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CAROUSEL_ITEMS = [
  { id: 1, title: "The Beginning", icon: "🌱" },
  { id: 2, title: "Beautiful Moments", icon: "🌸" },
  { id: 3, title: "Lessons & Growth", icon: "🪴" },
  { id: 4, title: "Our Stories", icon: "🐦" },
  { id: 5, title: "Garden of Gratitude", icon: "🌺" },
  { id: 6, title: "Secret Greenhouse", icon: "🪴" },
  { id: 7, title: "Birthday Wishes", icon: "💐" },
];

export function JourneyCarousel() {
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
      className="w-full bg-[#fdfaf3]/90 backdrop-blur-md rounded-full shadow-2xl border border-[#e8dfc8] px-8 py-4 relative flex flex-col items-center"
      style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.1), inset 0 0 30px rgba(230,210,180,0.3)" }}
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="text-amber-600/40">⟵</span>
        <h3 className="font-playfair text-[#8a734e] tracking-widest text-sm font-semibold">
          Our Journey Together
        </h3>
        <span className="text-amber-600/40">⟶</span>
      </div>

      <div className="flex items-center justify-between w-full">
        <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-[#8a734e] hover:bg-amber-50">
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex gap-4 md:gap-8 overflow-hidden px-4">
          {CAROUSEL_ITEMS.map((item) => (
            <div key={item.id} className="flex flex-col items-center gap-2 cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-white shadow-inner flex items-center justify-center text-3xl group-hover:scale-110 transition-transform border border-amber-50">
                {item.icon}
              </div>
              <span className="text-[10px] font-sans text-[#8a734e] text-center w-16 leading-tight font-medium group-hover:text-amber-700">
                {item.title}
              </span>
            </div>
          ))}
        </div>

        <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-[#8a734e] hover:bg-amber-50">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="absolute -bottom-10 text-xs font-sans text-white drop-shadow-md flex items-center gap-2">
        Scroll, click, explore and experience your garden <span className="animate-bounce">↓</span>
      </div>
    </motion.div>
  );
}
