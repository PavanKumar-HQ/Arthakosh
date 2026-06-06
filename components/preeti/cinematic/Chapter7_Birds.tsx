"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const BIRDS = [
  { id: 1, type: "wish", text: "A wish for peace", x: 20, y: 30 },
  { id: 2, type: "memory", text: "That day in the lab", x: 70, y: 40 },
  { id: 3, type: "voice", text: "🎵 Voice note from Rahul", x: 40, y: 60 },
  { id: 4, type: "wish", text: "A wish for joy", x: 80, y: 20 },
];

export function Chapter7_Birds({ onComplete }: { onComplete: () => void }) {
  const [activeBird, setActiveBird] = useState<number | null>(null);
  const [caughtBirds, setCaughtBirds] = useState<number[]>([]);
  const [birdStates, setBirdStates] = useState<Record<number, "flying" | "landing" | "looking" | "chirping">>({});

  // Simulate NPC behavior
  useEffect(() => {
    const intervals = BIRDS.map(b => {
      return setInterval(() => {
        setBirdStates(prev => {
          const currentState = prev[b.id] || "flying";
          const states: ("flying" | "landing" | "looking" | "chirping")[] = ["flying", "landing", "looking", "chirping"];
          let nextState = currentState;
          
          if (currentState === "flying") nextState = Math.random() > 0.5 ? "landing" : "flying";
          else if (currentState === "landing") nextState = "looking";
          else if (currentState === "looking") nextState = Math.random() > 0.5 ? "chirping" : "flying";
          else if (currentState === "chirping") nextState = "flying";

          return { ...prev, [b.id]: nextState };
        });
      }, 2000 + Math.random() * 2000);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const handleCatch = (id: number) => {
    if (!caughtBirds.includes(id)) {
      setActiveBird(id);
      setBirdStates(prev => ({ ...prev, [id]: "chirping" }));
      
      setTimeout(() => {
        setActiveBird(null);
        setBirdStates(prev => ({ ...prev, [id]: "flying" }));
        setCaughtBirds((prev) => {
          const next = [...prev, id];
          if (next.length === BIRDS.length) {
            setTimeout(onComplete, 3000);
          }
          return next;
        });
      }, 4000);
    }
  };

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-sky-100 to-sky-50 flex flex-col items-center justify-center overflow-hidden">
      
      <div className="absolute top-1/4 text-center z-20 px-4 w-full pointer-events-none">
        <p className="font-playfair text-2xl md:text-4xl text-sky-900 drop-shadow-[0_2px_10px_rgba(255,255,255,1)]">
          Birds of Gratitude
        </p>
      </div>

      {BIRDS.map((b) => {
        const isCaught = caughtBirds.includes(b.id);
        const isActive = activeBird === b.id;
        const state = birdStates[b.id] || "flying";

        // Determine physics based on NPC state
        let animateProps = {};
        if (state === "flying") {
          animateProps = { y: [-20, 20, -20], x: [-10, 10, -10], rotate: [-5, 5, -5] };
        } else if (state === "landing") {
          animateProps = { y: 0, x: 0, rotate: 0 };
        } else if (state === "looking") {
          animateProps = { rotateY: [0, 180, 180, 0] };
        } else if (state === "chirping") {
          animateProps = { y: [-5, 0, -5], scale: [1, 1.1, 1] };
        }

        return (
          <motion.div
            key={b.id}
            className="absolute cursor-pointer z-30"
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, ...animateProps }}
            transition={{ duration: state === "flying" ? 4 : 1, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => handleCatch(b.id)}
          >
            {/* The Bird Graphic */}
            <div className="relative">
              <img 
                src="/real-bird.png" 
                alt="Bird" 
                className="w-16 h-16 object-contain mix-blend-multiply" 
              />
              
              {/* Organic glowing text when clicked */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                    animate={{ opacity: 1, y: -40, scale: 1 }}
                    exit={{ opacity: 0, y: -60, filter: 'blur(4px)' }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap"
                  >
                    <p className="font-playfair text-xl text-sky-800 font-bold drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
                      {b.text}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Music notes emitting if it's chirping/voice */}
              {state === "chirping" && !isCaught && (
                <motion.div
                  className="absolute -right-4 -top-4 text-sky-400 text-sm drop-shadow-md"
                  animate={{ y: [-10, -30], x: [0, 10], opacity: [1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ♪
                </motion.div>
              )}

            </div>
          </motion.div>
        );
      })}

    </div>
  );
}
