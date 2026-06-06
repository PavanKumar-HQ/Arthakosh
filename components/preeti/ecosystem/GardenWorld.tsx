"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { LSystemTree } from "@/components/preeti/generative/LSystemTree";
import { CSSButterfly } from "@/components/preeti/generative/CSSButterfly";
import { SVGFlower } from "@/components/preeti/generative/SVGFlower";
import { FluidFountain } from "@/components/preeti/ecosystem/FluidFountain";
import { GreenhouseBackground } from "@/components/preeti/ecosystem/GreenhouseBackground";
import { AnimatePresence } from "framer-motion";

const APOLOGY_SCRIPT = [
  "There was always one thing I wanted to say.",
  "For years I thought I would say it later.",
  "Then later became months.",
  "And months became years.",
  "One of the reasons I came for the farewell was to tell you something.",
  "I wanted to apologize.",
  "There was a day when I argued instead of listening.",
  "At the time I thought I was right.",
  "Looking back, I understand things differently.",
  "Some lessons take years to learn.",
  "And respect is one of them.",
  "I never found the right moment.",
  "So I am saying it now.",
  "I'm sorry.",
  "And thank you for continuing to teach, guide, and care even when we didn't always make it easy."
];

// The world is 3x the size of a standard screen to allow panning
const WORLD_WIDTH = 3000;
const WORLD_HEIGHT = 2000;

export function GardenWorld() {
  const [discoveryCount, setDiscoveryCount] = useState(0);
  const [apologyPhase, setApologyPhase] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Spring-based camera coordinates for smooth panning
  const cameraX = useMotionValue(0);
  const cameraY = useMotionValue(0);
  const smoothX = useSpring(cameraX, { damping: 30, stiffness: 100 });
  const smoothY = useSpring(cameraY, { damping: 30, stiffness: 100 });

  // Center camera initially
  useEffect(() => {
    cameraX.set(-(WORLD_WIDTH / 2) + window.innerWidth / 2);
    cameraY.set(-(WORLD_HEIGHT / 2) + window.innerHeight / 2);
  }, [cameraX, cameraY]);

  // Handle ambient camera drifting based on mouse position (Parallax)
  const handleMouseMove = (e: React.MouseEvent) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    // Slight shift based on mouse, on top of the drag position
    // (In a full implementation, we'd combine drag and mouse parallax securely)
  };

  const handleDiscovery = () => {
    setDiscoveryCount(prev => prev + 1);
  };

  useEffect(() => {
    // Start apology sequence when 3 discoveries are made
    if (discoveryCount === 3 && apologyPhase === -1) {
      setApologyPhase(0);
    }
  }, [discoveryCount, apologyPhase]);

  useEffect(() => {
    if (apologyPhase >= 0 && apologyPhase < APOLOGY_SCRIPT.length) {
      const timer = setTimeout(() => {
        setApologyPhase(prev => prev + 1);
      }, 4000); // 4 seconds per line
      return () => clearTimeout(timer);
    }
  }, [apologyPhase]);

  const isApologyComplete = apologyPhase >= APOLOGY_SCRIPT.length;
  const treeGrowth = Math.min(1, 0.2 + (discoveryCount * 0.15));

  return (
    <div 
      className="w-screen h-screen overflow-hidden bg-[#f0f9ff] relative cursor-grab active:cursor-grabbing"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background Gradient changing with discoveries */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{ 
          background: discoveryCount >= 5 
            ? "radial-gradient(circle at 50% 50%, rgba(253,224,71,0.3) 0%, rgba(240,249,255,1) 100%)" 
            : "radial-gradient(circle at 50% 50%, rgba(253,224,71,0.0) 0%, rgba(240,249,255,1) 100%)"
        }}
        transition={{ duration: 3 }}
      />

      <motion.div 
        ref={containerRef}
        drag
        dragConstraints={{
          left: -(WORLD_WIDTH - typeof window !== "undefined" ? window.innerWidth : 1000),
          right: 0,
          top: -(WORLD_HEIGHT - typeof window !== "undefined" ? window.innerHeight : 1000),
          bottom: 0
        }}
        dragElastic={0.1}
        style={{ width: WORLD_WIDTH, height: WORLD_HEIGHT, x: smoothX, y: smoothY }}
        className="relative shadow-inner z-10"
      >
        
        {/* Background Elements */}
        <div className="absolute left-[20%] top-[20%] opacity-80">
          <GreenhouseBackground progress={discoveryCount / 10} />
        </div>
        <div className="absolute left-[60%] top-[40%]">
          <FluidFountain />
        </div>

        {/* The Central Tree */}
        <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
          <LSystemTree growthPhase={treeGrowth} width={1200} height={1200} />
        </div>

        {/* The White Flower (Apology Sequence) */}
        <div className="absolute left-[52%] top-[65%] pointer-events-none">
          <div className={isApologyComplete ? "scale-[3] drop-shadow-[0_0_50px_rgba(253,224,71,0.5)] transition-transform duration-[3000ms]" : ""}>
            <SVGFlower isBlooming={isApologyComplete} color="stroke-white" delay={1} />
          </div>
        </div>

        {/* Cinematic Subtitles overlay for the Apology Sequence */}
        {apologyPhase >= 0 && !isApologyComplete && (
          <div className="absolute left-1/2 top-[80%] -translate-x-1/2 w-full max-w-2xl text-center pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.p
                key={apologyPhase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1 }}
                className={`font-playfair text-3xl md:text-5xl drop-shadow-md ${apologyPhase === 13 ? 'text-red-500 font-bold text-6xl' : 'text-slate-800'}`}
              >
                {APOLOGY_SCRIPT[apologyPhase]}
              </motion.p>
            </AnimatePresence>
          </div>
        )}

        {/* Interactive Butterflies (Discoveries) */}
        <InteractiveButterfly x="30%" y="40%" color="bg-blue-400" memory="Thank you for the endless support." onDiscover={handleDiscovery} />
        <InteractiveButterfly x="70%" y="30%" color="bg-pink-400" memory="Class of 2023 will never forget you." onDiscover={handleDiscovery} />
        <InteractiveButterfly x="40%" y="70%" color="bg-purple-400" memory="You taught us more than just the syllabus." onDiscover={handleDiscovery} />

      </motion.div>
    </div>
  );
}

function InteractiveButterfly({ x, y, color, memory, onDiscover }: { x: string, y: string, color: string, memory: string, onDiscover: () => void }) {
  const [discovered, setDiscovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent drag
    if (!discovered) {
      setDiscovered(true);
      onDiscover();
    }
  };

  return (
    <div 
      className="absolute flex flex-col items-center" 
      style={{ left: x, top: y }}
      onClick={handleClick}
    >
      <motion.div 
        className="cursor-pointer"
        animate={discovered ? { scale: 0, opacity: 0 } : { y: [0, -20, 0] }}
        transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.5 } }}
      >
        <CSSButterfly color={color} />
      </motion.div>

      {/* Memory Blooms Inline */}
      {discovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="absolute top-0 flex flex-col items-center"
        >
          <SVGFlower isBlooming={true} color="stroke-rose-400" />
          <p className="mt-2 text-slate-800 font-playfair text-lg text-center whitespace-nowrap bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40 shadow-sm">
            {memory}
          </p>
        </motion.div>
      )}
    </div>
  );
}
