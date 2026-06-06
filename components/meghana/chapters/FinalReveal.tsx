"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useJourneyStore } from "@/lib/store";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

// Deterministic falling gold particles
const PARTICLES = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  x: ((i * 137.5) % 100).toFixed(2),
  y: ((i * 97.4) % 100).toFixed(2),
  size: (1 + ((i * 3) % 4)).toFixed(1),
  duration: (5 + ((i * 7) % 8)).toFixed(1),
  delay: ((i * 0.4) % 5).toFixed(1),
}));

export function FinalReveal() {
  const completeMeghana = useJourneyStore(state => state.completeMeghana);
  const [showBalloons, setShowBalloons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      completeMeghana();
    }, 2000);
    return () => clearTimeout(timer);
  }, [completeMeghana]);

  const triggerCelebration = () => {
    setShowBalloons(true);
    
    // Poppers from corners
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { x: 0, y: 1 },
      colors: ['#d4af37', '#ffffff', '#ec4899', '#f59e0b']
    });
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { x: 1, y: 1 },
      colors: ['#d4af37', '#ffffff', '#ec4899', '#f59e0b']
    });

    // Fireworks effect continuously for a few seconds
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval: ReturnType<typeof setInterval> = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 }, colors: ['#d4af37', '#ffffff', '#ec4899', '#f59e0b', '#3b82f6'] });
    }, 250);
  };

  return (
    <section 
      onMouseEnter={triggerCelebration}
      className="min-h-screen w-full flex flex-col items-center justify-center py-32 px-4 relative bg-transparent overflow-hidden"
    >
      
      {/* Falling golden dust */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#d4af37]"
            style={{ left: `${p.x}vw`, top: `-10%`, width: `${p.size}px`, height: `${p.size}px` }}
            animate={{ 
              y: ["0vh", "120vh"],
              x: ["0px", `${(Number(p.id) % 30) - 15}px`],
              opacity: [0, 0.8, 0],
              rotate: [0, 180]
            }}
            transition={{ 
              duration: Number(p.duration), 
              repeat: Infinity, 
              delay: Number(p.delay),
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Realistic Balloons that float up when triggered */}
      {showBalloons && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`balloon-${i}`}
              className="absolute bottom-[-150px] flex flex-col items-center"
              style={{
                left: `${10 + (i * 27) % 80}%`,
              }}
              animate={{
                y: ["0vh", "-120vh"],
                x: ["0px", `${(i % 2 === 0 ? 30 : -30)}px`, "0px"],
              }}
              transition={{
                duration: 6 + (i % 5),
                delay: i * 0.2,
                ease: "easeIn"
              }}
            >
              {/* Balloon Body */}
              <div 
                className={`w-16 h-20 rounded-t-[50%] rounded-b-[40%] shadow-inner relative ${
                  i % 3 === 0 ? 'bg-rose-500' : i % 3 === 1 ? 'bg-amber-400' : 'bg-indigo-500'
                }`}
              >
                {/* Highlight/Reflection */}
                <div className="absolute top-2 left-2 w-4 h-8 bg-white/30 rounded-full rotate-[-20deg]" />
              </div>
              {/* Balloon Knot */}
              <div className="w-2 h-2 bg-inherit rounded-full -mt-1" />
              {/* String */}
              <div className="w-px h-24 bg-white/40" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Core Energy Glow */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 4, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_60%)] rounded-full pointer-events-none blur-3xl z-0"
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="max-w-4xl text-center relative z-10 w-full"
      >
        <span className="text-[#d4af37]/80 font-mono tracking-[0.3em] text-sm uppercase mb-10 block">
          Epilogue
        </span>
        
        <h1 className="text-5xl md:text-8xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400 tracking-[0.1em] uppercase leading-tight mb-6">
          Happy Birthday
        </h1>
        
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
          <Sparkles className="w-5 h-5 text-[#d4af37]" />
          <div className="w-16 h-px bg-gradient-to-r from-[#d4af37]/60 via-[#d4af37]/60 to-transparent" />
        </div>


        
        <p className="text-3xl md:text-5xl font-playfair text-[#d4af37] tracking-[0.2em] uppercase font-medium mb-20 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">
          Meghana Ma&apos;am
        </p>
        
        <p className="font-sans text-xl md:text-2xl text-gray-300 leading-relaxed font-light mb-24 max-w-2xl mx-auto">
          &quot;The chapters you helped write in our lives will never be forgotten.&quot;
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2.5, duration: 1.5 }}
        >
          <Link href="/">
            <button 
              className="px-10 py-5 rounded-full flex items-center justify-center gap-3 transition-all mx-auto uppercase tracking-[0.25em] text-sm group relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white"
              }}
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ArrowLeft className="w-4 h-4 text-[#d4af37] transform group-hover:-translate-x-1 transition-transform" />
              <span className="relative z-10 mt-0.5">Return to the Book</span>
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
