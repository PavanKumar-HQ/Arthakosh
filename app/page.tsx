"use client";

import { useState } from "react";
import { AnimatedBook } from "@/components/AnimatedBook";
import { MysteryOpening } from "@/components/MysteryOpening";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <main className="h-screen w-full bg-transparent relative overflow-hidden">
      
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          {showIntro ? (
            <motion.div
              key="intro"
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full h-full absolute inset-0 z-50 bg-transparent"
            >
              <MysteryOpening onEnter={() => setShowIntro(false)} />
            </motion.div>
          ) : (
            <motion.div
              key="book"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              className="w-full h-full absolute inset-0 z-10"
            >
              <AnimatedBook />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
