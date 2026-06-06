"use client";

import { motion } from "framer-motion";
import { Html } from "@react-three/drei";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useJourneyStore } from "@/lib/store";
import { useEffect } from "react";

export function FinalClimaxSequence() {
  const completeMeghana = useJourneyStore(state => state.completeMeghana);

  useEffect(() => {
    completeMeghana();
  }, [completeMeghana]);
  return (
    <Html position={[0, 0, -230]} center zIndexRange={[100, 0]}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="w-[100vw] h-[100vh] flex flex-col items-center justify-center bg-transparent/80 backdrop-blur-md"
      >
        <div className="text-center max-w-4xl p-8 border border-cyan-500/30 rounded-2xl bg-transparent/50 shadow-[0_0_100px_rgba(34,211,238,0.2)]">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="text-5xl md:text-8xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 tracking-[0.2em] uppercase leading-tight mb-8 animate-pulse"
          >
            Happy Birthday
          </motion.h1>
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/50 to-transparent mx-auto mb-8" />
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 2 }}
            className="text-2xl md:text-4xl font-sans text-cyan-400 tracking-[0.4em] uppercase font-light"
          >
            Meghana Ma'am
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 2 }}
            className="mt-12 text-gray-400 font-playfair italic text-xl"
          >
            "You may remember lessons. We remember the person who taught them."
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5, duration: 1 }}
            className="mt-12"
          >
            <Link href="/">
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white font-sans flex items-center gap-2 transition-colors mx-auto uppercase tracking-widest text-sm">
                Return to the Book <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </Html>
  );
}
