"use client";

import { useEffect, useState } from "react";

// Deterministic data for SSR safety
const LANTERNS = Array.from({ length: 15 }).map((_, i) => ({
  id: `lantern-${i}`,
  left: ((i * 137) % 100).toFixed(2),
  duration: (15 + ((i * 11) % 20)).toFixed(2),
  delay: ((i * 3) % 15).toFixed(2),
  scale: (0.5 + ((i * 7) % 5) / 10).toFixed(2),
}));

const PETALS = Array.from({ length: 30 }).map((_, i) => ({
  id: `petal-${i}`,
  left: ((i * 83) % 100).toFixed(2),
  duration: (8 + ((i * 13) % 10)).toFixed(2),
  delay: ((i * 5) % 12).toFixed(2),
  rotate: ((i * 47) % 360),
  scale: (0.4 + ((i * 11) % 6) / 10).toFixed(2),
  type: i % 3 === 0 ? "pink" : i % 3 === 1 ? "rose" : "white",
}));

export function FestiveBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Chinese Lanterns floating up */}
      {LANTERNS.map((lantern) => (
        <div
          key={lantern.id}
          className="absolute bottom-[-100px] flex flex-col items-center animate-float-up"
          style={{
            left: `${lantern.left}%`,
            animationDuration: `${lantern.duration}s`,
            animationDelay: `${lantern.delay}s`,
            transform: `scale(${lantern.scale})`,
          }}
        >
          {/* Lantern Body */}
          <div className="w-12 h-16 rounded-3xl bg-gradient-to-b from-orange-400 via-red-500 to-red-600 relative overflow-hidden shadow-[0_0_30px_rgba(249,115,22,0.8)] border-x border-orange-300/30">
            {/* Inner glow / flame */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-6 bg-yellow-300 rounded-full blur-[6px] opacity-80 animate-pulse" />
            {/* Ribs */}
            <div className="absolute inset-0 flex justify-evenly opacity-20">
              <div className="w-px h-full bg-transparent/50" />
              <div className="w-px h-full bg-transparent/50" />
            </div>
          </div>
          {/* Top Ring */}
          <div className="w-6 h-1 bg-yellow-600 rounded-t-sm -mt-17 z-10" />
          {/* Bottom Tassel */}
          <div className="w-4 h-6 border-b-2 border-x-2 border-red-500 rounded-b-sm mt-1 flex justify-center">
            <div className="w-0.5 h-8 bg-red-600 mt-2" />
          </div>
        </div>
      ))}

      {/* Falling Flower Petals */}
      {PETALS.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-[-50px] animate-fall-down"
          style={{
            left: `${petal.left}%`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            transform: `scale(${petal.scale}) rotate(${petal.rotate}deg)`,
          }}
        >
          <div
            className={`w-4 h-6 rounded-tr-full rounded-bl-full opacity-60 shadow-sm ${
              petal.type === "pink"
                ? "bg-pink-300"
                : petal.type === "rose"
                ? "bg-rose-400"
                : "bg-white"
            }`}
            style={{
              animation: "petal-flutter 3s ease-in-out infinite alternate",
            }}
          />
        </div>
      ))}
    </div>
  );
}
