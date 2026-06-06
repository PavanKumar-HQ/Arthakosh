"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { LSystemTree } from "@/components/preeti/generative/LSystemTree";
import { CSSButterfly } from "@/components/preeti/generative/CSSButterfly";
import { SVGFlower } from "@/components/preeti/generative/SVGFlower";

// The world is 3x the size of a standard screen to allow panning
const WORLD_WIDTH = 3000;
const WORLD_HEIGHT = 2000;

export function GardenWorld() {
  const [discoveryCount, setDiscoveryCount] = useState(0);
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
        
        {/* The Central Tree */}
        <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
          {/* We pass width/height to LSystemTree to give it massive scale */}
          <LSystemTree growthPhase={treeGrowth} width={1200} height={1200} />
        </div>

        {/* The White Flower (Apology) - always near the base of the tree */}
        <div className="absolute left-[52%] top-[65%]">
          <SVGFlower isBlooming={discoveryCount >= 6} color="stroke-white" delay={1} />
          {discoveryCount >= 6 && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 2 }}
              className="absolute top-full left-1/2 -translate-x-1/2 text-slate-800 font-playfair mt-4 whitespace-nowrap"
            >
              I am sorry. And thank you.
            </motion.p>
          )}
        </div>

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
