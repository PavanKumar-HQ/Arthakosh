"use client";

import { motion } from "framer-motion";

export function CSSButterfly({ color = "bg-blue-400" }: { color?: string }) {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center pointer-events-none drop-shadow-lg" style={{ perspective: "1000px" }}>
      {/* Left Wing */}
      <motion.div
        className={`absolute w-5 h-8 ${color} opacity-80 left-1 origin-right`}
        style={{ 
          clipPath: "polygon(0% 20%, 100% 0%, 100% 100%, 0% 80%, 20% 50%)",
          borderRadius: "10px 0 0 10px"
        }}
        animate={{ rotateY: [0, 60, 0] }}
        transition={{ duration: 0.15 + Math.random() * 0.1, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Body */}
      <div className="absolute w-1 h-6 bg-slate-800 rounded-full z-10" />

      {/* Right Wing */}
      <motion.div
        className={`absolute w-5 h-8 ${color} opacity-80 right-1 origin-left`}
        style={{ 
          clipPath: "polygon(0% 0%, 100% 20%, 80% 50%, 100% 80%, 0% 100%)",
          borderRadius: "0 10px 10px 0"
        }}
        animate={{ rotateY: [0, -60, 0] }}
        transition={{ duration: 0.15 + Math.random() * 0.1, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
