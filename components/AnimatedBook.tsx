"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useJourneyStore } from "@/lib/store";
import { Sparkles, Moon, Users } from "lucide-react";

// Stars are now handled globally via GlobalStarfield

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

export function AnimatedBook() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<"preeti" | "meghana" | null>(null);
  const [mounted, setMounted] = useState(false);
  const preetiCompleted = useJourneyStore((state) => state.preetiCompleted);
  const meghanaCompleted = useJourneyStore((state) => state.meghanaCompleted);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      // Auto-open after a brief cinematic pause
      const openTimer = setTimeout(() => setIsOpen(true), 3500);
      return () => clearTimeout(openTimer);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const title = useTypewriter("Two Teachers. Two Stories. One Gratitude.", 65, 800, mounted);

  const allCompleted = mounted && preetiCompleted && meghanaCompleted;

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden">

      {/* Stars are now rendered globally by GlobalStarfield */}

      {/* ── Rose halo (left) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.6 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.4 }}
        className="absolute left-[22%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(225,29,72,0.18)_0%,transparent_70%)] pointer-events-none z-0 blur-xl"
      />

      {/* ── Indigo halo (right) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.6 }}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.6 }}
        className="absolute right-[22%] top-1/2 translate-x-1/2 -translate-y-1/2 w-[500px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(49,46,129,0.25)_0%,transparent_70%)] pointer-events-none z-0 blur-xl"
      />

      {/* ── Golden aurora bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-[#d4af37]/6 via-[#d4af37]/2 to-transparent pointer-events-none z-0" />

      {/* ── Title ── */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-16 md:top-20 text-center z-20 px-4"
      >
        <p className="font-mono text-[10px] tracking-[0.35em] text-[#d4af37]/60 uppercase mb-3">
          A Tribute
        </p>
        <h1 className="font-playfair text-3xl md:text-5xl font-bold tracking-tight text-white leading-snug min-h-[4rem]">
          {title.displayed}
          {!title.done && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="inline-block w-[2px] h-[1em] bg-[#d4af37] ml-1 align-middle"
            />
          )}
        </h1>
      </motion.div>

      {/* ── Cards ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-center px-8 w-full max-w-5xl"
          >
            {/* Preeti Card */}
            <Link href="/preeti" className="w-full md:w-80 block group">
              <motion.div
                onHoverStart={() => setHoveredCard("preeti")}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative h-[340px] md:h-[420px] rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.6) 100%)",
                  backdropFilter: "blur(20px)",
                  border: hoveredCard === "preeti" ? "1px solid rgba(212,175,55,0.8)" : "1px solid rgba(212,175,55,0.2)",
                  boxShadow: hoveredCard === "preeti"
                    ? "0 0 60px rgba(212,175,55,0.2), inset 0 0 40px rgba(225,29,72,0.15), inset 0 1px 0 rgba(255,255,255,0.2)"
                    : "0 10px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                {/* Inner top glow */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
                {/* Rose aura in corner */}
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-[radial-gradient(ellipse_at_bottom_right,rgba(225,29,72,0.2)_0%,transparent_70%)]" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <motion.div
                    animate={{ rotate: [0, 2, -2, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative mb-8 flex items-center justify-center w-28 h-28 rounded-full border border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/10 to-transparent shadow-[0_0_30px_rgba(212,175,55,0.15),inset_0_0_20px_rgba(212,175,55,0.1)]"
                  >
                    <div className="absolute inset-2 rounded-full border border-[#d4af37]/30 border-dashed animate-[spin_30s_linear_infinite]" />
                    <span className="font-playfair text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#fff3cc] to-[#d4af37] font-semibold drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">
                      P
                    </span>
                  </motion.div>
                  <h2 className="font-playfair text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fff3cc] to-[#d4af37] font-bold tracking-widest uppercase mb-3 drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
                    Preeti Ma&apos;am
                  </h2>
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#d4af37]/80 to-transparent mb-6" />
                  <AnimatePresence>
                    {hoveredCard === "preeti" && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.4 }}
                        className="font-playfair italic text-base text-rose-200/80 leading-relaxed"
                      >
                        &quot;The one who turned lessons into memories.&quot;
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                {mounted && preetiCompleted && (
                  <div className="absolute top-4 right-4 w-2 h-2 bg-rose-400 rounded-full shadow-[0_0_8px_rgba(225,29,72,0.8)]" />
                )}
              </motion.div>
            </Link>

            {/* Divider */}
            <div className="hidden md:flex flex-col items-center gap-3 opacity-30">
              <div className="w-px h-20 bg-gradient-to-b from-transparent via-white to-transparent" />
              <div className="w-1 h-1 bg-[#d4af37] rounded-full" />
              <div className="w-px h-20 bg-gradient-to-b from-white via-white to-transparent" />
            </div>

            {/* Meghana Card */}
            <Link href="/meghana" className="w-full md:w-80 block group">
              <motion.div
                onHoverStart={() => setHoveredCard("meghana")}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative h-[340px] md:h-[420px] rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.6) 100%)",
                  backdropFilter: "blur(20px)",
                  border: hoveredCard === "meghana" ? "1px solid rgba(212,175,55,0.8)" : "1px solid rgba(212,175,55,0.2)",
                  boxShadow: hoveredCard === "meghana"
                    ? "0 0 60px rgba(212,175,55,0.2), inset 0 0 40px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.2)"
                    : "0 10px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                {/* Inner top glow */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
                {/* Indigo aura in corner */}
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.2)_0%,transparent_70%)]" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <motion.div
                    animate={{ rotate: [0, -2, 2, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="relative mb-8 flex items-center justify-center w-28 h-28 rounded-full border border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/10 to-transparent shadow-[0_0_30px_rgba(212,175,55,0.15),inset_0_0_20px_rgba(212,175,55,0.1)]"
                  >
                    <div className="absolute inset-2 rounded-full border border-[#d4af37]/30 border-dashed animate-[spin_30s_linear_infinite]" />
                    <span className="font-playfair text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#fff3cc] to-[#d4af37] font-semibold drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]">
                      M
                    </span>
                  </motion.div>
                  <h2 className="font-playfair text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#fff3cc] to-[#d4af37] font-bold tracking-widest uppercase mb-3 drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
                    Meghana Ma&apos;am
                  </h2>
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#d4af37]/80 to-transparent mb-6" />
                  <AnimatePresence>
                    {hoveredCard === "meghana" && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.4 }}
                        className="font-playfair italic text-base text-indigo-200/80 leading-relaxed"
                      >
                        &quot;The one who taught beyond the syllabus.&quot;
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                {mounted && meghanaCompleted && (
                  <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                )}
              </motion.div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}
