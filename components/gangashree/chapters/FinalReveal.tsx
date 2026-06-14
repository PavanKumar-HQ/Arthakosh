"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useJourneyStore } from "@/lib/store";
import { useEffect, useState, useRef } from "react";
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

const BALLOON_COLORS = [
  '#f43f5e', // rose
  '#f59e0b', // amber
  '#3b82f6', // blue
  '#10b981', // emerald
  '#a855f7', // purple
  '#ec4899', // pink
];

const GANGASHREE_PHOTOS = [
  "/gangashree/photos/photo1.jpeg",
  "/gangashree/photos/photo2.jpeg",
  "/gangashree/photos/photo3.jpeg",
  "/gangashree/photos/photo4.jpeg",
  "/gangashree/photos/photo5.jpeg"
];

const BalloonSVG = ({ color, photoUrl }: { color: string, photoUrl?: string }) => {
  const gradientId = `grad-${color.replace('#', '')}-${Math.random().toString(36).substr(2, 5)}`;
  return (
    <div className="relative flex flex-col items-center">
      <svg viewBox="0 0 100 250" className="w-24 h-[15rem] drop-shadow-2xl overflow-visible">
        <defs>
          <radialGradient id={gradientId} cx="35%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="15%" stopColor={color} stopOpacity="0.9" />
            <stop offset="80%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
          </radialGradient>
        </defs>
        {/* Balloon shape */}
        <path 
          d="M50 10 C20 10 10 40 10 70 C10 110 40 130 48 140 C49 141 51 141 52 140 C60 130 90 110 90 70 C90 40 80 10 50 10 Z" 
          fill={`url(#${gradientId})`} 
        />
        {/* Knot */}
        <path 
          d="M48 140 L45 145 L55 145 L52 140 Z" 
          fill={color} 
          style={{ filter: "brightness(0.7)" }}
        />
        {/* String */}
        <path 
          d="M50 145 Q 40 170 50 190 T 50 240" 
          fill="none" 
          stroke="rgba(255,255,255,0.4)" 
          strokeWidth="1.5" 
        />
      </svg>
      {/* Hanging Polaroid */}
      {photoUrl && (
        <motion.div 
          className="absolute top-[14.5rem] w-16 h-20 bg-white p-1 pb-4 shadow-xl rounded-sm border border-gray-100"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 3 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-gray-200 overflow-hidden relative">
            <img src={photoUrl} className="w-full h-full object-cover" alt="Memory" />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export function FinalReveal() {
  const completeGangashree = useJourneyStore(state => state.completeGangashree);
  const [showBalloons, setShowBalloons] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      triggerCelebration();
      const timer = setTimeout(() => {
        completeGangashree();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isInView, completeGangashree]);

  const triggerCelebration = () => {
    if (showBalloons) return;
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
      ref={sectionRef}
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

      {/* Premium SVG Balloons floating up */}
      {showBalloons && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={`balloon-${i}`}
              className="absolute bottom-[-300px]"
              style={{
                left: `${(i * 17) % 90}%`,
              }}
              animate={{
                y: ["0vh", "-150vh"],
                x: ["0px", `${(i % 2 === 0 ? 50 : -50)}px`, "0px"],
                rotate: [-5, 5, -5]
              }}
              transition={{
                duration: 10 + (i % 8),
                delay: (i * 0.4),
                ease: "easeOut"
              }}
            >
              <BalloonSVG 
                color={BALLOON_COLORS[i % BALLOON_COLORS.length]} 
                photoUrl={i % 3 === 0 ? GANGASHREE_PHOTOS[i % GANGASHREE_PHOTOS.length] : undefined}
              />
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
          Gangashree
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

      {/* Randomly Popping Final Photos */}
      {showBalloons && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {[
            { src: "/gangashree/photos/photo1.jpeg", x: "5%", y: "15%", rotate: -15 },
            { src: "/gangashree/photos/photo2.jpeg", x: "75%", y: "12%", rotate: 10 },
            { src: "/gangashree/photos/photo3.jpeg", x: "8%", y: "60%", rotate: -5 },
            { src: "/gangashree/photos/photo4.jpeg", x: "70%", y: "65%", rotate: 20 },
            { src: "/gangashree/photos/photo5.jpeg", x: "80%", y: "35%", rotate: 5 }
          ].map((photo, i) => (
            <motion.div
              key={`final-photo-${i}`}
              className="absolute shadow-2xl rounded-xl overflow-hidden border-[6px] border-white/20 bg-white/10 backdrop-blur-sm pointer-events-none select-none"
              style={{
                width: "220px",
                height: "auto",
                left: photo.x,
                top: photo.y,
              }}
              initial={{ scale: 0, opacity: 0, rotate: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                rotate: photo.rotate,
                y: [0, -15, 0] 
              }}
              transition={{
                scale: { type: "spring", bounce: 0.5, duration: 1, delay: 1 + i * 0.8 },
                opacity: { duration: 0.5, delay: 1 + i * 0.8 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 + i * 0.8 },
                rotate: { type: "spring", duration: 1, delay: 1 + i * 0.8 }
              }}
            >
              <img src={photo.src} alt="Memory" className="w-full h-auto block select-none pointer-events-none" />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
