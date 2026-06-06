"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useJourneyStore } from "@/lib/store";

function HolographicVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; size: number; speedY: number; val: string; opacity: number }[] = [];
    const words = ["ENERGY", "LEGACY", "INFLUENCE", "PLANNING", "IMPACT", "LOGIC", "TEACHER", "MENTOR"];

    // Initialize floating words
    for (let i = 0; i < 12; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 800),
        y: Math.random() * (canvas.height || 450) + (canvas.height || 450),
        size: 10 + Math.random() * 12,
        speedY: -(0.4 + Math.random() * 0.6),
        val: words[i % words.length],
        opacity: 0.1 + Math.random() * 0.3
      });
    }

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.015;

      // Draw Grid
      ctx.strokeStyle = "rgba(99, 102, 241, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Holographic Sine Waves
      ctx.lineWidth = 2;
      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath();
        ctx.strokeStyle = wave === 0 ? "rgba(34, 211, 238, 0.25)" : wave === 1 ? "rgba(99, 102, 241, 0.15)" : "rgba(168, 85, 247, 0.1)";
        const amplitude = 20 + wave * 15;
        const frequency = 0.005 - wave * 0.001;

        for (let x = 0; x < canvas.width; x++) {
          const y = canvas.height / 2 + Math.sin(x * frequency + time + wave) * amplitude * Math.cos(x * 0.0015 - time * 0.1);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw and Animate Particles (Floating Words)
      ctx.font = "9px monospace";
      particles.forEach((p) => {
        p.y += p.speedY;
        if (p.y < -30) {
          p.y = canvas.height + 30;
          p.x = Math.random() * canvas.width;
        }

        // Fade out as it rises near the top
        const alpha = p.opacity * Math.min(p.y / (canvas.height * 0.3), 1) * Math.min((canvas.height - p.y) / (canvas.height * 0.1), 1);
        ctx.fillStyle = `rgba(34, 211, 238, ${Math.max(alpha, 0)})`;
        ctx.fillText(p.val, p.x, p.y);

        ctx.fillStyle = `rgba(34, 211, 238, ${Math.max(alpha * 0.5, 0)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y - 10, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Holographic scanned line effect
      const scanY = (Math.sin(time * 0.5) * 0.5 + 0.5) * canvas.height;
      ctx.strokeStyle = "rgba(34, 211, 238, 0.05)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(canvas.width, scanY);
      ctx.stroke();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export function TheSealedArtifact() {
  const energyLevel = useJourneyStore(state => state.energyLevel);
  const [opened, setOpened] = useState(false);

  // Unlocks when energy level is high (e.g. > 10)
  const chainsBroken = Math.min(Math.floor(energyLevel / 2), 5);
  const canOpen = chainsBroken >= 5;

  return (
    <div className="w-[100vw] h-full flex flex-col items-center justify-center relative shrink-0 px-32 border-r border-white/5">
      
      <div className="mb-24 text-center z-10 pointer-events-none">
        <h2 className="text-3xl md:text-5xl font-playfair font-light text-white uppercase tracking-[0.2em] mb-4">
          The Sealed Artifact
        </h2>
        <p className="text-gray-400 font-sans tracking-[0.3em] uppercase text-xs">
          Only sufficient energy can break the final seal.
        </p>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center z-20">
        
        {/* Core Artifact (Crystal) */}
        <motion.div 
          animate={opened ? { scale: 10, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 2 }}
          onClick={() => canOpen && setOpened(true)}
          className={`w-32 h-48 border border-white/20 bg-white/5 backdrop-blur-xl flex items-center justify-center relative shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all ${
            canOpen ? "cursor-pointer hover:bg-white/10 hover:shadow-[0_0_100px_rgba(255,255,255,0.5)]" : "opacity-50"
          }`}
          style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
        >
          {canOpen && !opened && (
            <div className="w-4 h-4 bg-white rounded-full animate-pulse shadow-[0_0_30px_rgba(255,255,255,1)]" />
          )}
        </motion.div>

        {/* Chains of Light */}
        {!opened && Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 1 }}
            animate={{ opacity: i < chainsBroken ? 0 : 1 }}
            transition={{ duration: 1 }}
            className="absolute w-full h-px bg-yellow-500 shadow-[0_0_10px_rgba(251,191,36,0.8)] pointer-events-none"
            style={{ 
              rotate: i * 36, 
              width: "150%", 
              left: "-25%"
            }}
          />
        ))}

      </div>

      {/* The Reveal */}
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-transparent/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8 pointer-events-auto"
          >
            <h3 className="text-4xl md:text-6xl font-playfair font-light text-white mb-12 uppercase tracking-widest text-center">
              The Artifact Opens
            </h3>
            <div className="w-full max-w-4xl aspect-video bg-transparent/80 border border-cyan-500/30 flex items-center justify-center relative shadow-[0_0_80px_rgba(34,211,238,0.15)] overflow-hidden">
              {/* Holographic Projection */}
              <HolographicVisualizer />
              
              <div className="z-10 text-center select-none pointer-events-none">
                <p className="text-cyan-400 font-sans tracking-[0.4em] uppercase text-xs animate-pulse">
                  Holographic Projection Active
                </p>
                <p className="text-white font-playfair text-xl mt-4 font-light italic">
                  &quot;Legacy is not leaving something for people. It is leaving something in people.&quot;
                </p>
              </div>
              
              {/* Fake playback UI */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10 z-20">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 30, ease: "linear" }}
                  className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]"
                />
              </div>
            </div>
            <button 
              onClick={() => setOpened(false)}
              className="mt-12 px-8 py-3 border border-cyan-500/30 text-cyan-400 font-sans uppercase tracking-widest text-xs hover:bg-cyan-500/10 transition-colors z-20 rounded-full"
            >
              Close Projection
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
