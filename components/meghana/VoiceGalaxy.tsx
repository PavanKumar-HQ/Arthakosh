"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useJourneyStore } from "@/lib/store";
import { meghanaData } from "@/lib/data";

export function VoiceGalaxy() {
  const [activeVoice, setActiveVoice] = useState<number | null>(null);
  const [playedVoices, setPlayedVoices] = useState<Set<number>>(new Set());
  const increaseEnergy = useJourneyStore(state => state.increaseEnergy);

  const handlePlay = (id: number) => {
    if (activeVoice === id) return;
    setActiveVoice(id);
    
    // Simulate audio duration
    setTimeout(() => {
      setActiveVoice(null);
      if (!playedVoices.has(id)) {
        setPlayedVoices(prev => new Set(prev).add(id));
        increaseEnergy(3); // Big boost for listening to a voice note
      }
    }, 4000);
  };

  return (
    <div className="w-[150vw] h-full flex flex-col justify-center relative shrink-0 px-32 border-r border-white/5">
      
      <div className="mb-24 text-center w-full">
        <h2 className="text-3xl md:text-6xl font-playfair font-light text-white uppercase tracking-[0.2em] mb-6">
          Voice Galaxy
        </h2>
        <p className="text-cyan-400 font-sans tracking-[0.4em] uppercase text-xs">
          Listen closely. Add their light to the core.
        </p>
      </div>

      <div className="flex items-center justify-center gap-16 md:gap-32 w-full h-[400px]">
        {meghanaData.voiceNotes?.map((note: any, i: number) => {
          const isPlayed = playedVoices.has(note.id);
          const isActive = activeVoice === note.id;

          return (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.2 }}
              className="relative flex flex-col items-center"
            >
              <div 
                onClick={() => handlePlay(note.id)}
                className="w-48 h-64 cursor-pointer relative flex items-center justify-center group"
                style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} // Crystal Hexagon Shape
              >
                {/* Crystal Background */}
                <div className={`absolute inset-0 transition-colors duration-1000 ${
                  isActive ? "bg-cyan-500/30" :
                  isPlayed ? "bg-indigo-500/20" :
                  "bg-white/[0.02] group-hover:bg-white/[0.05]"
                } backdrop-blur-md border-2 border-white/10`} />
                
                {/* Energy Core of Crystal */}
                <div className={`w-4 h-4 rounded-full transition-all duration-1000 ${
                  isActive ? "bg-white scale-[3] shadow-[0_0_30px_rgba(34,211,238,1)] animate-pulse" :
                  isPlayed ? "bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]" :
                  "bg-gray-600 group-hover:bg-gray-400"
                }`} />

                {/* Vertical Light Beam if played */}
                {isPlayed && (
                  <motion.div 
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 0.5, scaleY: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[800px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent pointer-events-none"
                  />
                )}
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: isPlayed || isActive ? 1 : 0 }}
                className="absolute -bottom-16 whitespace-nowrap bg-transparent/50 px-4 py-2 backdrop-blur-md rounded-full border border-white/10"
              >
                <p className="text-xs text-white tracking-[0.3em] uppercase font-sans">
                  {note.name}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
