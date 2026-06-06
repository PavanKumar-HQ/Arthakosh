"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Deterministic seed
function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// Stable rain drops
const DROPS = Array.from({ length: 80 }, (_, i) => ({
  left: sr(i * 7) * 100,
  delay: sr(i * 11) * 2,
  duration: 0.5 + sr(i * 13) * 0.5,
  height: 10 + sr(i * 17) * 20,
  opacity: 0.3 + sr(i * 19) * 0.5,
}));

const APOLOGIES = [
  { id: 1, text: "We were not always the students you deserved." },
  { id: 2, text: "We took your patience for granted." },
  { id: 3, text: "We never said thank you enough." },
  { id: 4, text: "We didn't always listen the first time." },
  { id: 5, text: "We never truly understood how hard you worked for us." },
  { id: 6, text: "We are sorry, Ma'am." },
];

export function Chapter_Apology({ onComplete }: { onComplete: () => void }) {
  const [revealed, setRevealed] = useState(0);
  const [candleClicked, setCandleClicked] = useState(false);
  const isFinished = revealed >= APOLOGIES.length;

  const handleClick = () => {
    if (!candleClicked) {
      setCandleClicked(true);
      return;
    }
    if (revealed < APOLOGIES.length) {
      setRevealed(prev => {
        if (prev + 1 >= APOLOGIES.length) {
          setTimeout(onComplete, 6000);
        }
        return prev + 1;
      });
    }
  };

  return (
    <div
      className="w-full h-full relative overflow-hidden bg-slate-950 flex flex-col items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      {/* Rain */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {DROPS.map((d, i) => (
          <motion.div
            key={`drop-${i}`}
            className="absolute bg-blue-200/30 rounded-full"
            style={{
              left: `${d.left}%`,
              top: -30,
              width: 1,
              height: d.height,
              opacity: d.opacity,
            }}
            animate={{ y: ["0vh", "110vh"] }}
            transition={{
              duration: d.duration,
              repeat: Infinity,
              ease: "linear",
              delay: d.delay,
            }}
          />
        ))}
      </div>

      {/* Lightning flash occasionally */}
      <motion.div
        className="absolute inset-0 bg-white pointer-events-none z-0"
        animate={{ opacity: [0, 0, 0, 0.03, 0, 0, 0, 0.05, 0, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ground puddle reflection */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-blue-950/40 to-transparent pointer-events-none" />

      {/* The Candle */}
      <div className="relative flex flex-col items-center z-20 mb-8">
        {/* Flame */}
        <AnimatePresence>
          {candleClicked && (
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              className="relative mb-1"
              style={{ transformOrigin: "bottom" }}
            >
              {/* Glow halo */}
              <motion.div
                className="absolute -inset-8 rounded-full bg-amber-400/10 blur-2xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              {/* Outer flame */}
              <motion.div
                className="w-8 h-16 bg-gradient-to-t from-amber-600 via-amber-400 to-amber-100 rounded-t-full rounded-b-sm blur-[2px]"
                animate={{ scaleX: [1, 0.85, 1.1, 0.9, 1], scaleY: [1, 1.05, 0.95, 1.02, 1], skewX: [0, 3, -3, 2, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Inner flame bright core */}
              <motion.div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-6 bg-white/80 rounded-t-full blur-[1px]"
                animate={{ scaleX: [1, 0.9, 1.1, 0.95, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Candle wax body */}
        <div className="relative">
          <div className="w-10 h-32 bg-gradient-to-b from-amber-50 to-amber-100 rounded-sm shadow-lg border border-amber-200/50" />
          {/* Wax drip */}
          <div className="absolute top-2 left-2 w-2 h-8 bg-amber-50/70 rounded-b-full" />
          {/* Wick */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-gray-700 rounded-full" />
        </div>
        {/* Candle base plate */}
        <div className="w-16 h-3 bg-amber-200/30 rounded-full blur-sm mt-1" />
      </div>

      {/* Apologies revealed one by one */}
      <div className="relative z-20 w-full max-w-2xl px-8 text-center space-y-4 pointer-events-none">
        <AnimatePresence>
          {APOLOGIES.slice(0, revealed).map((a, i) => (
            <motion.p
              key={a.id}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{
                opacity: i === revealed - 1 ? 1 : 0.4,
                y: 0,
                filter: "blur(0px)",
                scale: i === revealed - 1 ? 1.05 : 1,
              }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className={`font-playfair leading-relaxed ${
                a.id === 6
                  ? "text-2xl md:text-4xl text-amber-200 font-semibold"
                  : "text-xl md:text-2xl text-slate-300"
              }`}
              style={{ textShadow: candleClicked ? "0 0 30px rgba(251,191,36,0.4)" : "none" }}
            >
              {a.text}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>

      {/* Tap instruction */}
      <AnimatePresence>
        {!candleClicked && (
          <motion.p
            exit={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-16 text-slate-500 font-serif italic text-base z-20 pointer-events-none"
          >
            Tap to light the candle
          </motion.p>
        )}
        {candleClicked && !isFinished && (
          <motion.p
            key="tap-reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-16 text-amber-700/60 font-serif italic text-sm z-20 pointer-events-none"
          >
            Tap to continue...
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
