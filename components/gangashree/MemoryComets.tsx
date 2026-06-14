"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useJourneyStore } from "@/lib/store";

export function MemoryComets() {
  const [comets, setComets] = useState<{ id: number, top: string, duration: number }[]>([]);
  const [caught, setCaught] = useState<number | null>(null);
  const increaseEnergy = useJourneyStore(state => state.increaseEnergy);

  useEffect(() => {
    // Spawn a comet every 15-30 seconds randomly
    const spawnComet = () => {
      const newComet = {
        id: Date.now(),
        top: `${10 + Math.random() * 80}%`,
        duration: 2 + Math.random() * 2 // Fast moving
      };
      setComets(prev => [...prev, newComet]);

      // Remove comet after it finishes flying
      setTimeout(() => {
        setComets(prev => prev.filter(c => c.id !== newComet.id));
      }, newComet.duration * 1000);

      // Schedule next comet
      setTimeout(spawnComet, 15000 + Math.random() * 15000);
    };

    const timeout = setTimeout(spawnComet, 5000); // First comet after 5s
    return () => clearTimeout(timeout);
  }, []);

  const catchComet = (id: number) => {
    setCaught(id);
    increaseEnergy(5); // Big energy boost
    setTimeout(() => setCaught(null), 4000);
    setComets(prev => prev.filter(c => c.id !== id));
  };

  return (
    <>
      {/* The Comets */}
      {comets.map(comet => (
        <motion.div
          key={comet.id}
          initial={{ x: "110vw", y: 0, rotate: 25, opacity: 0 }}
          animate={{ x: "-20vw", y: "60.6vw", opacity: [0, 1, 1, 0] }}
          transition={{ duration: comet.duration, ease: "linear" }}
          onClick={() => catchComet(comet.id)}
          className="fixed w-40 h-[2px] bg-gradient-to-r from-white via-cyan-400/40 to-transparent cursor-pointer z-50 hover:h-[4px] transition-all origin-left"
          style={{ top: comet.top, left: 0 }}
        >
          {/* Comet Head */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_12px_#ffffff,0_0_25px_#22d3ee]" />
        </motion.div>
      ))}

      {/* Caught Secret Overlay */}
      <AnimatePresence>
        {caught && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent/90 border border-cyan-400/50 p-8 z-[100] max-w-md text-center shadow-[0_0_50px_rgba(34,211,238,0.2)]"
          >
            <h3 className="text-cyan-400 font-sans tracking-widest uppercase text-sm mb-4">
              Memory Comet Caught!
            </h3>
            <p className="font-playfair text-white text-xl italic leading-relaxed">
              &quot;Remember that time the projector broke and you guided the entire complex topic using just a piece of chalk and a napkin? Legend.&quot;
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
