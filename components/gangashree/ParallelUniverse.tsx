"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function ParallelUniverse() {
  const achievements = [
    { title: "Most Feared 'Complete Your Homework'", level: "Legendary" },
    { title: "Fastest Assignment Detection", level: "God Tier" },
    { title: "sibling Mind Reader", level: "Max Level" },
    { title: "Deadline Guardian", level: "Unbeatable" },
    { title: "Energy Supplier", level: "Level 9999" }
  ];

  const zones = [
    { name: "Exams Tomorrow", quote: "\"Are you writing a paper or painting a wall? Bullet points, people!\"", angle: 45 },
    { name: "Mild Stress", quote: "\"I have graded 40 assignments today. Do not test my formatting patience.\"", angle: 135 },
    { name: "Coffee Overdose", quote: "\"I survived on 2 hours of sleep and three double espressos. Submit it now.\"", angle: 225 },
    { name: "Sarcastic Mode", quote: "\"Yes, the deadline was yesterday. Yes, I saw you online at 3 AM playing games.\"", angle: 315 }
  ];

  const [needleAngle, setNeedleAngle] = useState(0);
  const [currentZone, setCurrentZone] = useState<typeof zones[0] | null>(null);
  const [spinning, setSpinning] = useState(false);

  const spinDial = () => {
    if (spinning) return;
    setSpinning(true);
    setCurrentZone(null);

    // Pick a random zone
    const targetZone = zones[Math.floor(Math.random() * zones.length)];
    
    // Spin 3 to 5 times plus the target angle
    const extraSpins = (3 + Math.floor(Math.random() * 3)) * 360;
    const finalAngle = extraSpins + targetZone.angle;
    
    setNeedleAngle(finalAngle);

    setTimeout(() => {
      setSpinning(false);
      setCurrentZone(targetZone);
    }, 2000); // matches the transition duration
  };

  return (
    <div className="w-[150vw] h-full flex flex-col justify-center relative shrink-0 px-32 border-r border-white/5 bg-gradient-to-r from-transparent via-[#1a0b2e]/30 to-transparent">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(217,70,239,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="mb-16 text-center w-full z-10">
        <h2 className="text-3xl md:text-6xl font-playfair font-light text-fuchsia-400 uppercase tracking-[0.2em] mb-6">
          Parallel Universe
        </h2>
        <p className="text-gray-400 font-sans tracking-[0.4em] uppercase text-xs">
          Alternative timeline metrics detected.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto w-full z-10 items-stretch">
        {achievements.slice(0, 5).map((acc, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03, y: -5 }}
            className="bg-transparent/60 backdrop-blur-md border border-fuchsia-500/20 p-6 flex flex-col items-center text-center cursor-pointer hover:bg-fuchsia-950/30 hover:border-fuchsia-500/50 transition-colors shadow-[0_0_30px_rgba(217,70,239,0.05)] rounded-xl"
          >
            <div className="w-12 h-12 rounded-full bg-fuchsia-500/10 flex items-center justify-center mb-4 border border-fuchsia-500/30">
              <span className="text-xl">🏆</span>
            </div>
            <h4 className="text-lg font-playfair text-white mb-2">{acc.title}</h4>
            <p className="text-fuchsia-400 font-sans tracking-widest uppercase text-xs">
              {acc.level}
            </p>
          </motion.div>
        ))}
        
        {/* INTERACTIVE PANIC GAUGE */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-transparent/60 backdrop-blur-md border border-fuchsia-500/20 p-6 flex flex-col items-center justify-between text-center relative rounded-xl hover:border-fuchsia-500/40 transition-colors shadow-[0_0_30px_rgba(217,70,239,0.05)]"
        >
          <div className="w-full flex flex-col items-center">
            <h4 className="text-base font-sans font-semibold tracking-wider text-fuchsia-400 uppercase mb-4">
              Stress Analyzer
            </h4>
            
            {/* The Dial Visual */}
            <div className="relative w-36 h-36 border-4 border-fuchsia-500/20 rounded-full flex items-center justify-center bg-transparent/40 shadow-inner">
              
              {/* Dial markings/ticks */}
              <div className="absolute inset-2 border border-dashed border-fuchsia-500/20 rounded-full pointer-events-none" />
              
              {/* Golden Pointer Needle */}
              <motion.div 
                animate={{ rotate: needleAngle }}
                transition={spinning ? { duration: 2, ease: "circOut" } : { duration: 0.2 }}
                className="absolute w-1.5 h-16 bg-gradient-to-t from-fuchsia-500 to-amber-400 origin-bottom bottom-1/2 rounded-full shadow-[0_0_10px_rgba(217,70,239,0.8)]"
                style={{ transformOrigin: "bottom center" }}
              />
              
              {/* Needle Hub */}
              <div className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)] z-10" />
            </div>
          </div>

          <div className="mt-4 min-h-[70px] flex items-center justify-center px-2">
            {currentZone ? (
              <div className="animate-fade-in">
                <p className="text-xs text-amber-400 uppercase font-mono font-bold tracking-widest mb-1">
                  {currentZone.name}
                </p>
                <p className="text-xs font-playfair text-gray-300 italic max-h-16 overflow-y-auto leading-relaxed">
                  {currentZone.quote}
                </p>
              </div>
            ) : (
              <p className="text-xs font-sans text-gray-500 uppercase tracking-widest leading-relaxed">
                {spinning ? "Scanning cosmic stress waves..." : "Click below to scan sister stress levels..."}
              </p>
            )}
          </div>

          <button
            onClick={spinDial}
            disabled={spinning}
            className={`mt-4 px-6 py-2 border border-fuchsia-500/40 text-fuchsia-400 font-sans uppercase tracking-widest text-xs rounded-full transition-all ${
              spinning 
                ? "opacity-50 cursor-not-allowed" 
                : "hover:bg-fuchsia-500/20 hover:border-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.1)]"
            }`}
          >
            {spinning ? "Scanning..." : "Trigger Scan"}
          </button>
        </motion.div>
      </div>
      
    </div>
  );
}
