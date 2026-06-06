"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { TypewriterText } from "./TypewriterText";

export function FakeLoading({ quote, onComplete }: { quote: string; onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fake progress
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(onComplete, 1000); // Wait 1s after hitting 100%
      }
      setProgress(p);
    }, 300);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[200] bg-transparent flex flex-col items-center justify-center text-center px-4"
    >
      <div className="max-w-2xl text-xl md:text-3xl font-light text-gray-300 italic mb-16 h-24 flex items-center justify-center">
        <TypewriterText text={`"${quote}"`} delay={500} />
      </div>

      <div className="w-64 md:w-96 h-1 bg-gray-900 rounded-full overflow-hidden relative">
        <motion.div
           className="absolute top-0 left-0 h-full bg-white"
           initial={{ width: "0%" }}
           animate={{ width: `${progress}%` }}
           transition={{ ease: "linear" }}
        />
      </div>
      <div className="mt-4 text-xs font-mono text-gray-600 uppercase tracking-widest">
        Compiling Memories... {Math.floor(progress)}%
      </div>
    </motion.div>
  );
}
