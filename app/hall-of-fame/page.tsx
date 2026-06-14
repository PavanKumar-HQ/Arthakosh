"use client";

import { motion } from "framer-motion";
import { Users, PartyPopper, Heart } from "lucide-react";
import Link from "next/link";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

export default function HallOfFame() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 relative overflow-hidden flex flex-col items-center justify-center text-white py-24 px-4">
      {windowSize.width > 0 && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="text-center z-10"
      >
        <PartyPopper className="w-20 h-20 text-yellow-400 mx-auto mb-8" />
        <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 drop-shadow-md">
          The Sisters' Hall of Fame
        </h1>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 my-16">
          
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-48 h-48 rounded-full border-4 border-pink-400 shadow-[0_0_50px_rgba(244,114,182,0.5)] bg-gradient-to-br from-pink-300 to-rose-500 flex items-center justify-center mb-6">
              <span className="font-playfair text-4xl font-bold">P</span>
            </div>
            <h2 className="font-playfair text-3xl text-pink-200">Preeti </h2>
            <p className="font-caveat text-xl text-pink-300 mt-2">Wonderland of Memories</p>
          </motion.div>

          <Heart className="w-12 h-12 text-rose-500 hidden md:block" />

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-48 h-48 rounded-full border-4 border-indigo-400 shadow-[0_0_50px_rgba(99,102,241,0.5)] bg-gradient-to-br from-indigo-300 to-blue-500 flex items-center justify-center mb-6">
              <span className="font-playfair text-4xl font-bold">M</span>
            </div>
            <h2 className="font-playfair text-3xl text-indigo-200">Gangashree </h2>
            <p className="font-caveat text-xl text-indigo-300 mt-2">Legacy Among The Stars</p>
          </motion.div>

        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="max-w-2xl mx-auto bg-transparent/20 backdrop-blur-md p-8 rounded-2xl border border-white/10"
        >
          <p className="font-playfair text-xl md:text-3xl leading-relaxed text-gray-200">
            Different styles.<br/>
            Different personalities.<br/>
            <span className="text-white font-bold block mt-4 text-3xl md:text-5xl">Same Impact.</span>
          </p>
          <p className="font-sans text-gray-400 mt-8 uppercase tracking-widest text-sm">
            Thank you for shaping us. Happy Birthday!
          </p>
        </motion.div>

        <Link href="/">
          <button className="mt-16 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full font-bold transition-all uppercase tracking-widest text-sm flex items-center gap-2 mx-auto">
            Close Book
          </button>
        </Link>
      </motion.div>
    </main>
  );
}
