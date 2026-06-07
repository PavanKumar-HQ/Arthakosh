"use client";

import { useEffect, useRef } from "react";

interface FireworksBurstProps {
  active: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  radius: number;
  gravity: number;
  trail: { x: number; y: number }[];
}

interface Rocket {
  x: number;
  y: number;
  vy: number;
  color: string;
  targetY: number;
  exploded: boolean;
  trail: { x: number; y: number }[];
}

function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const COLORS = [
  "#ef4444", // red-500
  "#3b82f6", // blue-500
  "#10b981", // emerald-500
  "#8b5cf6", // violet-500
  "#f59e0b", // amber-500
  "#ec4899", // pink-500
  "#06b6d4", // cyan-500
];

export function FireworksBurst({ active }: FireworksBurstProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const rocketsRef = useRef<Rocket[]>([]);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const launchRocket = (seed: number) => {
      const x = canvas.width * (0.1 + sr(seed) * 0.8);
      const targetY = canvas.height * (0.1 + sr(seed + 7) * 0.4);
      const color = COLORS[Math.floor(sr(seed + 3) * COLORS.length)];
      rocketsRef.current.push({
        x,
        y: canvas.height,
        vy: -canvas.height * 0.02,
        color,
        targetY,
        exploded: false,
        trail: [],
      });
    };

    const explode = (x: number, y: number, color: string, seed: number) => {
      const count = 120 + Math.floor(sr(seed) * 80);
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const speed = 1 + sr(seed * 100 + i * 7) * 5;
        // Secondary color mix
        const useSecondary = sr(seed * 7 + i) > 0.7;
        const pColor = useSecondary ? COLORS[Math.floor(sr(seed * 13 + i) * COLORS.length)] : color;
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: pColor,
          radius: 1.5 + sr(seed + i * 3) * 2.5,
          gravity: 0.04 + sr(seed + i) * 0.06,
          trail: [],
        });
      }
      // Glitter burst — small faster particles
      for (let i = 0; i < 30; i++) {
        const angle = sr(seed * 17 + i * 11) * Math.PI * 2;
        const speed = 4 + sr(seed * 19 + i) * 6;
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: "#ffffff",
          radius: 0.8,
          gravity: 0.08,
          trail: [],
        });
      }
    };

    const draw = () => {
      frameRef.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Launch new rockets periodically
      if (frameRef.current % 22 === 0) {
        launchRocket(frameRef.current);
      }
      // Staggered launch at start
      if (frameRef.current < 10 && frameRef.current % 3 === 0) {
        launchRocket(frameRef.current * 31);
      }

      // Draw & update rockets
      rocketsRef.current = rocketsRef.current.filter(r => {
        if (r.exploded) return false;
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 8) r.trail.shift();

        // Draw trail
        r.trail.forEach((p, i) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2 * (i / r.trail.length), 0, Math.PI * 2);
          ctx.fillStyle = r.color;
          ctx.globalAlpha = (i / r.trail.length) * 0.6;
          ctx.fill();
        });
        ctx.globalAlpha = 1;

        // Draw rocket
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = r.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        r.y += r.vy;
        r.vy += 0.02; // Slight gravity on rocket

        if (r.y <= r.targetY) {
          explode(r.x, r.y, r.color, frameRef.current);
          r.exploded = true;
          return false;
        }
        return true;
      });

      // Draw & update particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 5) p.trail.shift();

        // Trail
        p.trail.forEach((t, i) => {
          ctx.beginPath();
          ctx.arc(t.x, t.y, p.radius * (i / p.trail.length), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * (i / p.trail.length) * 0.5;
          ctx.fill();
        });

        // Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.alpha -= 0.012;

        return p.alpha > 0;
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      particlesRef.current = [];
      rocketsRef.current = [];
      frameRef.current = 0;
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-50"
    />
  );
}
