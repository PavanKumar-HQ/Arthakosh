"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Deterministic seed for rain
function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const DROPS = Array.from({ length: 100 }, (_, i) => ({
  left: (sr(i * 7) * 100).toFixed(2),
  delay: sr(i * 11) * 2,
  duration: 0.5 + sr(i * 13) * 0.5,
  height: (10 + sr(i * 17) * 20).toFixed(2),
  opacity: 0.2 + sr(i * 19) * 0.4,
}));

const APOLOGIES = [
  { id: 1, text: ["There is one flower in this garden that belongs only to me.", "Not to a memory.", "Not to a photograph.", "Not to a celebration.", "Just to me."] },
  { id: 2, text: ["Yesterday was our farewell.", "And one of the reasons I came was because I wanted to tell you something.", "I wanted to finally say the words I should have said a long time ago.", "But when the moment came, I couldn't."] },
  { id: 3, text: ["There was a day when I chose to argue instead of understand.", "A moment I have thought about more times than you will probably ever know.", "And ever since then, there was something I always wanted to say."] },
  { id: 4, text: ["I'm sorry.", "Truly.", "Sorry for the hurt I may have caused.", "Sorry for never saying this when I had the chance.", "And sorry for waiting this long."] },
  { id: 5, text: ["And thank you.", "Thank you for your patience.", "Thank you for your guidance.", "And thank you for the lessons I only understood much later."] },
  { id: 6, text: ["Some lessons are taught in a classroom.", "Some lessons stay with us long after we leave it.", "This was one of mine."] },
  { id: 7, text: ["I'm sorry, Ma'am.", "And thank you."], isFinal: true },
];

export function Chapter_Apology({ onComplete }: { onComplete: () => void }) {
  const [revealedIndex, setRevealedIndex] = useState(-1);
  const [isBlooming, setIsBlooming] = useState(false);
  const isFinished = revealedIndex >= APOLOGIES.length - 1;

  const handleClick = () => {
    if (!isBlooming) {
      setIsBlooming(true);
      setTimeout(() => {
        setRevealedIndex(0);
      }, 4000); // Wait for the flower to bloom before showing first text
      return;
    }
    
    if (revealedIndex < APOLOGIES.length - 1) {
      setRevealedIndex(prev => prev + 1);
    } else if (isFinished) {
      onComplete();
    }
  };

  const currentApology = revealedIndex >= 0 ? APOLOGIES[revealedIndex] : null;

  return (
    <div
      className="w-full h-full relative overflow-hidden bg-transparent flex flex-col items-center justify-center cursor-pointer transition-colors duration-1000"
      onClick={handleClick}
    >
      {/* Background Magic - Lightens slightly when blooming */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{ backgroundColor: isBlooming ? "rgba(30, 41, 59, 0.5)" : "rgba(2, 6, 23, 0.9)" }}
        transition={{ duration: 5, ease: "easeInOut" }}
      />

      {/* Dynamic Rain - Slows down and fades out when blooming */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {DROPS.map((d, i) => (
          <motion.div
            key={`drop-${i}`}
            className="absolute bg-blue-200/40 rounded-full"
            style={{
              left: `${d.left}%`,
              top: -50,
              width: 1,
              height: d.height,
            }}
            animate={{ 
              y: ["0vh", "120vh"], 
              opacity: isBlooming ? 0 : d.opacity 
            }}
            transition={{
              duration: isBlooming ? d.duration * 3 : d.duration, // Rain slows down
              repeat: Infinity,
              ease: "linear",
              delay: d.delay,
            }}
          />
        ))}
      </div>

      {/* Ground Reflection */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none z-0" />

      {/* Center Stage Spotlight */}
      <motion.div 
        className="absolute top-0 w-[60vw] h-[100vh] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none z-10"
        animate={{ opacity: isBlooming ? 1 : 0 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      />

      {/* The White Flower SVG Animation */}
      <div className="relative z-20 flex flex-col items-center mb-12">
        <motion.div 
          className="relative w-48 h-48 flex items-center justify-center drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          animate={{ y: isBlooming ? -20 : 0, scale: isBlooming ? 1.1 : 1 }}
          transition={{ duration: 4, ease: "easeOut" }}
        >
          {/* Stem */}
          <motion.svg className="absolute w-64 h-64 top-24 pointer-events-none" viewBox="0 0 100 100">
            <motion.path 
              d="M50 0 Q55 50 45 100" 
              fill="none" 
              stroke="#166534" 
              strokeWidth="2" 
              animate={{ d: isBlooming ? "M50 0 Q45 50 50 100" : "M50 0 Q55 50 45 100" }}
              transition={{ duration: 5, ease: "easeInOut" }}
            />
          </motion.svg>

          {/* Petals */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            const closedAngle = (i % 2 === 0 ? 10 : -10); // Petals bunched up
            
            return (
              <motion.div
                key={i}
                className="absolute origin-bottom w-6 h-20 bg-gradient-to-t from-slate-200 to-white rounded-t-full rounded-b-sm border border-white/20"
                style={{ bottom: "50%" }}
                animate={{
                  rotate: isBlooming ? angle : closedAngle,
                  scaleY: isBlooming ? 1 : 0.8,
                  scaleX: isBlooming ? 1 : 0.6,
                  y: isBlooming ? 0 : 20,
                  opacity: isBlooming ? 0.9 : 0.6,
                  filter: isBlooming ? "blur(0px)" : "blur(1px)"
                }}
                transition={{
                  duration: 4,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.1 // Petals unfurl sequentially
                }}
              />
            );
          })}

          {/* Glowing Center */}
          <motion.div 
            className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-yellow-200 to-amber-200 blur-sm"
            animate={{ opacity: isBlooming ? 1 : 0.2, scale: isBlooming ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 2, opacity: { duration: 4 }, scale: { repeat: Infinity, duration: 3 } }}
          />
        </motion.div>
      </div>

      {/* The Script */}
      <div className="relative z-30 w-full max-w-3xl px-6 text-center h-64 flex flex-col justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          {currentApology && (
            <motion.div
              key={currentApology.id}
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="space-y-6"
            >
              {currentApology.text.map((line, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 1.5 + 0.5, duration: 1.5 }}
                  className={`font-playfair leading-relaxed drop-shadow-lg ${
                    currentApology.isFinal
                      ? "text-3xl md:text-5xl text-white font-bold"
                      : "text-xl md:text-3xl text-slate-200"
                  }`}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* UI Instructions */}
      <div className="absolute bottom-12 w-full text-center z-20 pointer-events-none">
        <AnimatePresence mode="wait">
          {!isBlooming ? (
            <motion.p
              key="bloom-instruction"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-slate-400 font-sans tracking-widest text-sm uppercase"
            >
              Click the closed flower to let it bloom
            </motion.p>
          ) : !isFinished && revealedIndex >= 0 ? (
            <motion.p
              key="continue-instruction"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/50 font-sans tracking-widest text-sm uppercase"
            >
              Click anywhere to continue reading...
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {isFinished && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12 px-8 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full font-sans tracking-widest text-sm z-30 transition-all hover:scale-105"
            onClick={(e) => {
              e.stopPropagation();
              onComplete();
            }}
          >
            Enter the Final Garden
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
