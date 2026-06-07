"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SVGBird } from "@/components/preeti/generative/SVGBird";

// Deterministic seed for background flock
function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

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
    <div className="w-full h-full relative bg-transparent flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Silhouetted Trees */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none opacity-30 mix-blend-multiply">
        <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,50 L0,30 Q5,10 10,35 T20,20 T30,40 T40,15 T50,30 T60,10 T70,35 T80,20 T90,40 T100,25 L100,50 Z" fill="#0f172a" />
          <path d="M0,50 L0,40 Q10,25 20,45 T40,30 T60,45 T80,30 T100,40 L100,50 Z" fill="#1e293b" opacity="0.7"/>
        </svg>
      </div>

      {/* Distant Flocking Birds */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`flock-${i}`}
            className="absolute text-slate-800/20 text-xs"
            style={{ 
              left: `${(sr(i * 7) * 100).toFixed(2)}%`, 
              top: `${(10 + sr(i * 11) * 40).toFixed(2)}%` 
            }}
            animate={{ 
              x: [0, -200 - sr(i * 13) * 300],
              y: [0, (sr(i * 17) - 0.5) * 100],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 15 + sr(i * 19) * 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: sr(i * 23) * 10 
            }}
          >
            <svg width="12" height="12" viewBox="0 0 10 10">
              <motion.path 
                d="M 5 5 Q 2 0 0 5 Q 2 3 5 5 Q 8 0 10 5 Q 8 3 5 5" 
                fill="currentColor"
                animate={{ scaleY: [1, -0.5, 1] }}
                transition={{ duration: 0.2 + sr(i) * 0.1, repeat: Infinity }}
                style={{ transformOrigin: "5px 5px" }}
              />
            </svg>
          </motion.div>
        ))}
      </div>
      
      <div className="absolute top-1/4 text-center z-20 px-4 w-full pointer-events-none">
        <p className="font-playfair text-2xl md:text-4xl text-sky-900 drop-shadow-[0_2px_10px_rgba(255,255,255,1)]">
          Birds of Gratitude
        </p>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-4 font-sans text-sm tracking-widest text-sky-700 uppercase"
        >
          {caughtBirds.length === BIRDS.length 
            ? "Journey Continues..." 
            : `Click all ${BIRDS.length} birds to hear their messages to continue (${caughtBirds.length}/${BIRDS.length})`
          }
        </motion.p>
      </div>

      {BIRDS.map((b) => {
        const isCaught = caughtBirds.includes(b.id);
        const isActive = activeBird === b.id;
        
        // Override random NPC state if the player is interacting with it
        let state = birdStates[b.id] || "flying";
        if (isActive) state = "chirping";
        else if (isCaught) state = "landing";

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
              <SVGBird 
                isFlying={state === "flying"} 
                color={["#0ea5e9", "#f59e0b", "#ec4899", "#10b981"][b.id % 4]} 
                delay={b.id * 0.1} 
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
