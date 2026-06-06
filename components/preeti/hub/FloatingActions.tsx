"use client";

import { motion } from "framer-motion";
import { Music, Camera, Mic, Mail } from "lucide-react";

export function FloatingActions() {
  return (
    <>
      {/* Right Side Buttons */}
      <div className="absolute right-8 top-1/3 flex flex-col gap-4 z-30">
        {[
          { icon: <Music className="w-5 h-5" />, label: "Music" },
          { icon: <Camera className="w-5 h-5" />, label: "Gallery" },
          { icon: <Mic className="w-5 h-5" />, label: "Voice" },
          { icon: <Mail className="w-5 h-5" />, label: "Messages" }
        ].map((btn, i) => (
          <button 
            key={i}
            className="w-12 h-12 bg-[#fdfaf3]/90 backdrop-blur-md rounded-full shadow-lg border border-[#e8dfc8] flex items-center justify-center text-[#8a734e] hover:bg-amber-50 hover:scale-110 transition-all hover:shadow-[0_0_15px_rgba(253,224,71,0.5)] group relative"
          >
            {btn.icon}
            <span className="absolute right-14 bg-white px-2 py-1 rounded-md shadow-md text-xs font-sans opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {btn.label}
            </span>
          </button>
        ))}
      </div>

      {/* Butterfly Bubble Note */}
      <div className="absolute right-12 bottom-32 z-30 flex items-center gap-4">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-[#e8dfc8] text-xs font-sans text-[#8a734e] max-w-[120px] text-center relative">
          Catch a butterfly to unlock a special memory!
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white/90 border-r border-t border-[#e8dfc8] rotate-45" />
        </div>
        
        <motion.div 
          className="w-20 h-20 bg-gradient-to-br from-white/40 to-transparent backdrop-blur-sm rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.5),0_10px_20px_rgba(0,0,0,0.1)] border border-white/50 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.img 
            src="/real-butterfly.png" 
            className="w-12 h-12 object-contain mix-blend-darken"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </>
  );
}
