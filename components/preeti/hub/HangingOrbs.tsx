"use client";

import { motion } from "framer-motion";

const ORBS = [
  { id: 1, text: "Memories", top: "35%", right: "30%" },
  { id: 2, text: "Lessons", top: "45%", right: "22%" },
  { id: 3, text: "Smiles", top: "52%", right: "35%" },
  { id: 4, text: "Love", top: "60%", right: "15%" },
];

export function HangingOrbs() {
  return (
    <>
      {ORBS.map((orb) => (
        <div 
          key={orb.id} 
          className="absolute group cursor-pointer"
          style={{ top: orb.top, right: orb.right }}
        >
          {/* The string */}
          <div className="absolute bottom-full left-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent to-amber-200/50" />
          
          {/* The Glowing Orb */}
          <motion.div 
            className="w-16 h-16 rounded-full flex items-center justify-center relative shadow-[0_0_30px_rgba(253,224,71,0.6)] backdrop-blur-md border border-amber-100/50 bg-white/20"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.1, boxShadow: "0 0 50px rgba(253,224,71,0.9)" }}
          >
            <span className="font-playfair text-[#8a734e] text-xs font-bold drop-shadow-sm group-hover:text-amber-900 transition-colors">
              {orb.text}
            </span>
          </motion.div>
        </div>
      ))}

      {/* Hanging Signs */}
      <motion.div 
        className="absolute top-10 right-10 w-48 bg-[#604229] border-4 border-[#3e2816] rounded-md p-4 shadow-2xl origin-top flex flex-col items-center justify-center cursor-pointer hover:bg-[#503520] transition-colors"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute -top-12 left-6 w-1 h-12 bg-[#3e2816]" />
        <div className="absolute -top-12 right-6 w-1 h-12 bg-[#3e2816]" />
        
        <p className="font-playfair text-[#e8dfc8] text-center text-sm md:text-base">
          Welcome to <br/> Your Garden <br/> of Memories
        </p>
      </motion.div>
    </>
  );
}
