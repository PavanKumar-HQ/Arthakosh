"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Chapter1_TheSeed } from "@/components/preeti/cinematic/Chapter1_TheSeed";
import { Chapter2_Roots } from "@/components/preeti/cinematic/Chapter2_Roots";

export default function PreetiGardenOfGrowth() {
  const [chapter, setChapter] = useState(1);

  const nextChapter = () => setChapter((prev) => prev + 1);

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#faf8f5] relative font-sans">
      <AnimatePresence mode="wait">
        {chapter === 1 && (
          <motion.div
            key="chapter1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }} // Camera pans down (so content moves up)
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0"
          >
            <Chapter1_TheSeed onComplete={nextChapter} />
          </motion.div>
        )}

        {chapter === 2 && (
          <motion.div
            key="chapter2"
            initial={{ opacity: 0, y: 100 }} // Starts from below
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0"
          >
            <Chapter2_Roots onComplete={nextChapter} />
          </motion.div>
        )}

        {/* We will add remaining chapters here */}
      </AnimatePresence>
    </main>
  );
}
