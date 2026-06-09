"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo } from "react";
// lucide icons removed (unused)

const TIMELINE = [
  {
    era: "The Beginning",
    text: "When we first realized this class was different.",
    color: "from-amber-500/20 to-amber-500/5",
    glow: "rgba(245,158,11,0.3)",
    label: "Where it started",
    image: "/meghana/20260517_031521.jpg"
  },
  {
    era: "The Middle",
    text: "When the syllabus ended but the learning continued.",
    color: "from-indigo-500/20 to-indigo-500/5",
    glow: "rgba(99,102,241,0.3)",
    label: "Where we grew",
    image: "/meghana/DSC00336.JPG"
  },
  {
    era: "The Lessons",
    text: "When we realized every correction was an act of care.",
    color: "from-rose-500/20 to-rose-500/5",
    glow: "rgba(225,29,72,0.3)",
    label: "What we learned",
    image: "/meghana/DSC00340.JPG"
  },
  {
    era: "Now",
    text: "Carrying your energy forward into our own lives.",
    color: "from-emerald-500/20 to-emerald-500/5",
    glow: "rgba(16,185,129,0.3)",
    label: "Where we are",
    image: "/meghana/DSC00345.JPG"
  },
];

// Pre-computed particle positions
const PARTICLES = Array.from({ length: 24 }).map((_, i) => ({
  id: i,
  x: ((i * 137.5) % 100),
  y: ((i * 97.4) % 100),
  size: 1 + ((i * 3) % 3),
  duration: 4 + ((i * 7) % 5),
  delay: (i * 0.4) % 6,
}));

// Floating gifts that burst out on hover
const GIFTS = ["🎁", "⭐", "✨", "🌟", "💫", "🎊"];

function GiftBurst({ active }: { active: boolean }) {
  const particles = useMemo(() =>
    GIFTS.map((emoji, i) => ({
      emoji,
      angle: (i / GIFTS.length) * 360,
      distance: 80 + Math.floor(i * 23.7) % 40,
      duration: 0.8 + (i * 0.15),
    }))
  , []);

  return (
    <AnimatePresence>
      {active && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, x: "50%", y: "50%", scale: 0 }}
              animate={{
                x: `calc(50% + ${Math.cos((p.angle * Math.PI) / 180) * p.distance}px)`,
                y: `calc(50% + ${Math.sin((p.angle * Math.PI) / 180) * p.distance}px)`,
                scale: [0, 1.2, 1],
                opacity: [0, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: p.duration, ease: "easeOut" }}
              className="absolute text-lg"
            >
              {p.emoji}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

export function HorizontalTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  // Progress indicator opacity
  const progressOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);

  return (
    <section ref={containerRef} className="h-[450vh] relative bg-transparent">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

        {/* Background ambient particles */}
        <div className="absolute inset-0 pointer-events-none">
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute bg-white rounded-full opacity-20"
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px` }}
              animate={{ opacity: [0.05, 0.25, 0.05], scale: [1, 1.5, 1] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* Ambient glow that shifts color based on scroll */}
        <motion.div
          style={{ opacity: progressOpacity }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(245,158,11,0.05)_0%,transparent_70%)] pointer-events-none"
        />

        {/* Chapter header */}
        <div className="absolute top-20 left-6 md:left-20 z-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[#d4af37]/80 font-mono tracking-[0.25em] text-xs uppercase mb-3 block">
              Chapter IV
            </span>
            <h2 className="font-playfair text-4xl md:text-6xl text-white leading-tight">
              The Flow of Time
            </h2>
            <p className="font-sans text-gray-500 text-sm mt-3 tracking-wide">
              Scroll to travel through the journey.
            </p>
          </motion.div>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          style={{ opacity: progressOpacity }}
          className="absolute top-0 left-0 right-0 h-[1px] bg-white/5"
        >
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            className="h-full bg-gradient-to-r from-amber-500/60 to-amber-500/20"
          />
        </motion.div>

        {/* Horizontal track */}
        <motion.div
          style={{ x }}
          className="flex w-[400vw] items-center pl-6 md:pl-20 gap-0"
        >
          {TIMELINE.map((item, i) => (
            <div
              key={i}
              className="w-[100vw] flex-shrink-0 flex items-center relative"
            >
              {/* Connecting line */}
              {i < TIMELINE.length - 1 && (
                <div className="absolute top-1/2 right-0 w-full h-px bg-gradient-to-r from-white/10 to-transparent -translate-y-1/2 pointer-events-none" />
              )}

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30%" }}
                transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-lg"
                onHoverStart={() => setActiveCard(i)}
                onHoverEnd={() => setActiveCard(null)}
              >
                {/* Card */}
                <div
                  className="relative p-10 md:p-12 rounded-2xl cursor-pointer overflow-hidden transition-all duration-700 group"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    backdropFilter: "blur(20px)",
                    border: activeCard === i
                      ? `1px solid rgba(212,175,55,0.35)`
                      : "1px solid rgba(255,255,255,0.06)",
                    boxShadow: activeCard === i
                      ? `0 0 80px ${item.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`
                      : "none",
                  }}
                >
                  {/* Top glow line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                  {/* Corner radial bg */}
                  <div className={`absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl ${item.color} rounded-full blur-2xl pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100`} />

                  {/* Gift burst */}
                  <GiftBurst active={activeCard === i} />

                  {/* Timeline dot */}
                  <motion.div
                    animate={{ scale: activeCard === i ? [1, 1.3, 1] : 1 }}
                    transition={{ duration: 0.8, repeat: activeCard === i ? Infinity : 0 }}
                    className="w-3 h-3 rounded-full mb-8"
                    style={{
                      background: "#d4af37",
                      boxShadow: activeCard === i ? "0 0 20px rgba(212,175,55,0.8)" : "0 0 8px rgba(212,175,55,0.4)",
                    }}
                  />

                  <p className="font-mono text-[10px] tracking-[0.3em] text-[#d4af37]/60 uppercase mb-3">
                    {item.label}
                  </p>
                  <h3 className="font-playfair text-3xl md:text-4xl text-white font-semibold mb-5 leading-tight">
                    {item.era}
                  </h3>
                  <p className="font-playfair italic text-lg text-gray-400 leading-relaxed">
                    &quot;{item.text}&quot;
                  </p>

                  {item.image && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: activeCard === i ? 1 : 0.4, height: activeCard === i ? "auto" : 0 }}
                      className="mt-6 overflow-hidden rounded-xl"
                    >
                      <img src={item.image} alt={item.era} className="w-full h-auto object-contain max-h-48" />
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: activeCard === i ? 1 : 0, y: activeCard === i ? 0 : 8 }}
                    transition={{ duration: 0.4 }}
                    className="mt-8 text-[10px] tracking-[0.25em] uppercase text-gray-600 font-mono"
                  >
                    Hover to feel the memory
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
