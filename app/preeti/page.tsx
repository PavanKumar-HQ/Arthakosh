"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { Chapter1_TheSeed } from "@/components/preeti/cinematic/Chapter1_TheSeed";
import { Chapter2_Roots } from "@/components/preeti/cinematic/Chapter2_Roots";
import { Chapter3_Paths } from "@/components/preeti/cinematic/Chapter3_Paths";
import { Chapter4_Butterflies } from "@/components/preeti/cinematic/Chapter4_Butterflies";
import { Chapter5_Field } from "@/components/preeti/cinematic/Chapter5_Field";
import { Chapter6_Fountain } from "@/components/preeti/cinematic/Chapter6_Fountain";
import { Chapter7_Birds } from "@/components/preeti/cinematic/Chapter7_Birds";
import { Chapter8_Seasons } from "@/components/preeti/cinematic/Chapter8_Seasons";
import { Chapter9_Greenhouse } from "@/components/preeti/cinematic/Chapter9_Greenhouse";
import { Chapter10_GoldenFlower } from "@/components/preeti/cinematic/Chapter10_GoldenFlower";
import { Chapter_Apology } from "@/components/preeti/cinematic/Chapter_Apology";
import { Finale_Tree } from "@/components/preeti/cinematic/Finale_Tree";
import { BackgroundGreenhouse } from "@/components/preeti/generative/BackgroundGreenhouse";

// Client-only: avoids SSR hydration mismatch from Math.sin() deterministic values
const GardenAmbient = dynamic(
  () => import("@/components/preeti/generative/GardenAmbient").then(m => ({ default: m.GardenAmbient })),
  { ssr: false }
);

export default function PreetiGardenOfGrowth() {
  const [chapter, setChapter] = useState(1);

  const nextChapter = () => setChapter((prev) => prev + 1);

  return (
    <main className="w-screen h-screen overflow-hidden relative font-sans">
      
      {/* Global Animated Ambient Background — always visible behind every chapter */}
      <GardenAmbient chapter={chapter} />
      <BackgroundGreenhouse chapterProgress={chapter} />

      <AnimatePresence mode="wait">
        {chapter === 1 && (
          <motion.div
            key="chapter1"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} // Camera moves "forward"
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0"
          >
            <Chapter1_TheSeed onComplete={nextChapter} />
          </motion.div>
        )}

        {chapter === 2 && (
          <motion.div
            key="chapter2"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} 
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0"
          >
            <Chapter2_Roots onComplete={nextChapter} />
          </motion.div>
        )}

        {chapter === 3 && (
          <motion.div
            key="chapter3"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} 
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0"
          >
            <Chapter3_Paths onComplete={nextChapter} />
          </motion.div>
        )}

        {chapter === 4 && (
          <motion.div
            key="chapter4"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} 
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0"
          >
            <Chapter4_Butterflies onComplete={nextChapter} />
          </motion.div>
        )}

        {chapter === 5 && (
          <motion.div
            key="chapter5"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} 
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0"
          >
            <Chapter5_Field onComplete={nextChapter} />
          </motion.div>
        )}

        {chapter === 6 && (
          <motion.div
            key="chapter6"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} 
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0"
          >
            <Chapter6_Fountain onComplete={nextChapter} />
          </motion.div>
        )}

        {chapter === 7 && (
          <motion.div
            key="chapter7"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} 
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0"
          >
            <Chapter7_Birds onComplete={nextChapter} />
          </motion.div>
        )}

        {chapter === 8 && (
          <motion.div
            key="chapter8"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} 
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0"
          >
            <Chapter8_Seasons onComplete={nextChapter} />
          </motion.div>
        )}

        {chapter === 9 && (
          <motion.div
            key="chapter9"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} 
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0"
          >
            <Chapter9_Greenhouse onComplete={nextChapter} />
          </motion.div>
        )}

        {chapter === 10 && (
          <motion.div
            key="chapter10"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} 
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0"
          >
            <Chapter10_GoldenFlower onComplete={nextChapter} />
          </motion.div>
        )}

        {chapter === 11 && (
          <motion.div
            key="apology"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} 
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0"
          >
            <Chapter_Apology onComplete={nextChapter} />
          </motion.div>
        )}

        {chapter === 12 && (
          <motion.div
            key="finale"
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0"
          >
            <Finale_Tree />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
