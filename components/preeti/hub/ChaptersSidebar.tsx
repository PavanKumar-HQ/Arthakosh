"use client";

import { motion } from "framer-motion";

const CHAPTERS = [
  { id: 1, title: "01. The Beginning", subtitle: "Where every seed was planted", icon: "🌱" },
  { id: 2, title: "02. Beautiful Moments", subtitle: "Smiles, laughter and little memories", icon: "🌸" },
  { id: 3, title: "03. Lessons & Growth", subtitle: "Things you taught that stayed forever", icon: "🌻" },
  { id: 4, title: "04. Our Stories", subtitle: "Voices that carry your impact", icon: "🦋" },
  { id: 5, title: "05. Garden of Gratitude", subtitle: "Thank you for helping us bloom", icon: "🌳" },
  { id: 6, title: "06. Secret Greenhouse", subtitle: "A surprise waiting just for you", icon: "🔐" },
  { id: 7, title: "07. Birthday Wishes", subtitle: "Wishes from your butterflies", icon: "✉️" },
];

export function ChaptersSidebar() {
  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="w-full h-[90%] max-h-[800px] mt-4 bg-[#fdfaf3]/90 backdrop-blur-md rounded-3xl shadow-xl border border-[#e8dfc8] flex flex-col p-6 overflow-y-auto custom-scrollbar"
      style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1), inset 0 0 40px rgba(230,210,180,0.3)" }}
    >
      <h3 className="text-center font-playfair text-[#8a734e] tracking-widest text-sm mb-8 mt-2 uppercase font-semibold">
        Chapters
      </h3>

      <div className="flex flex-col gap-6">
        {CHAPTERS.map((chap) => (
          <div 
            key={chap.id} 
            className="flex items-start gap-4 p-2 rounded-xl hover:bg-white/50 cursor-pointer transition-colors group"
          >
            <div className="text-2xl mt-1 opacity-80 group-hover:scale-110 transition-transform">
              {chap.icon}
            </div>
            <div>
              <h4 className="font-playfair font-bold text-[#6d5b3d] text-[15px] group-hover:text-[#8a734e] transition-colors">
                {chap.title}
              </h4>
              <p className="font-sans text-[11px] text-[#9a8c78] mt-0.5 leading-tight">
                {chap.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
