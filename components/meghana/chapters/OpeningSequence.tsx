"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
function useTypewriter(text: string, speed = 60, startDelay = 0, enabled = true) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const iRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    iRef.current = 0;
    const delayTimer = setTimeout(() => {
      const interval = setInterval(() => {
        iRef.current += 1;
        const next = text.slice(0, iRef.current);
        setDisplayed(next);
        if (iRef.current >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(delayTimer);
  }, [text, speed, startDelay, enabled]);

  return { displayed, done };
}

// StarField moved to global FestiveBackground

export function OpeningSequence() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 600));
      setStage(1);
      await new Promise(r => setTimeout(r, 3200));
      setStage(2);
      await new Promise(r => setTimeout(r, 2500));
      setStage(3);
      await new Promise(r => setTimeout(r, 3000));
      setStage(4);
    };
    sequence();
  }, []);

  const line1 = useTypewriter("There are textbooks,", 55, 0, stage >= 1);
  const line2 = useTypewriter("and then there are teachers.", 55, line1.done ? 400 : 99999, stage >= 1);

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative bg-transparent text-white overflow-hidden">

      {/* Animated star field (Moved to global FestiveBackground) */}

      {/* Subtle gold aurora at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-amber-500/8 via-amber-500/3 to-transparent pointer-events-none" />

      <div className="z-10 text-center px-6 max-w-3xl">
        {/* Typewriter Lines */}
        <AnimatePresence>
          {stage >= 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <p className="font-playfair italic text-2xl md:text-4xl text-gray-400 leading-relaxed min-h-[4rem]">
                {line1.displayed}
                {line1.done && (
                  <>
                    <br />
                    {line2.displayed}
                    {!line2.done && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="inline-block w-[2px] h-[1em] bg-amber-400 ml-1 align-middle"
                      />
                    )}
                  </>
                )}
                {!line1.done && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="inline-block w-[2px] h-[1em] bg-amber-400 ml-1 align-middle"
                  />
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Title reveal */}
        <AnimatePresence>
          {stage >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-none mb-6">
                The Unwritten
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-200">
                  Chapters
                </span>
              </h1>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500/70 to-transparent mx-auto mb-8" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* New Quote */}
        <AnimatePresence>
          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="max-w-2xl mx-auto"
            >
              <p className="font-playfair italic text-lg md:text-xl text-gray-300 leading-relaxed">
                "You forgive far more than you should, but that capacity for grace is exactly what makes your heart so rare and pure."
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll prompt */}
      <AnimatePresence>
        {stage >= 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute bottom-10 flex flex-col items-center gap-3"
          >
            <span className="text-[10px] tracking-[0.4em] text-amber-500/50 uppercase font-mono">
              Begin Reading
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4 text-amber-500/40" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
