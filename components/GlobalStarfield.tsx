"use client";

import { useEffect, useState } from "react";

const STAR_DATA = Array.from({ length: 120 }).map((_, i) => ({
  id: `global-star-${i}`,
  x: ((i * 137.508) % 100).toFixed(3),
  y: ((i * 97.433 + 13.5) % 100).toFixed(3),
  size: (0.6 + ((i * 31) % 14) / 10).toFixed(2),
  opacity: (0.15 + ((i * 17) % 40) / 100).toFixed(2),
  duration: (3 + ((i * 7) % 6)).toFixed(1),
}));

export function GlobalStarfield() {
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
      {/* Twinkling Star Field */}
      {STAR_DATA.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white star-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: Number(star.opacity),
            animationDuration: `${star.duration}s`,
            animationDelay: `${((Number(star.id.split('-')[2]) * 0.23) % 6).toFixed(2)}s`,
          }}
        />
      ))}
    </div>
  );
}
