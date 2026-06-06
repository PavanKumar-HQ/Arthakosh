"use client";

import { motion, useInView } from "framer-motion";
import { preetiData } from "@/lib/data";
import { useRef } from "react";

export function MemoryJar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="w-full py-32 bg-[#fffcf5] relative border-y-8 border-dashed border-[#e6d5a7]" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}>
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
        
        {/* The Jar Graphic */}
        <div className="relative w-64 h-80" ref={ref}>
          {/* Jar background */}
          <div className="absolute inset-x-0 bottom-0 top-8 bg-blue-100/30 rounded-b-3xl border-4 border-[#b5c7d3] shadow-inner backdrop-blur-sm z-20" />
          {/* Jar Neck */}
          <div className="absolute inset-x-8 top-0 h-8 border-x-4 border-t-4 border-[#b5c7d3] bg-blue-100/40 rounded-t-lg z-20" />
          
          {/* Floating Notes inside Jar */}
          {isInView && preetiData.stats.map((stat: any, i: number) => {
            // Stable rotations to prevent layout jumps on re-renders
            const startRot = (i * 25) % 90;
            const endRot = ((i * 19) % 45) - 20;
            return (
              <motion.div
                key={stat.label}
                initial={{ y: -100, opacity: 0, rotate: startRot }}
                animate={{ y: 20 + i * 40, opacity: 1, rotate: endRot }}
                transition={{ duration: 1, delay: i * 0.3, type: "spring", bounce: 0.6 }}
                className="absolute left-8 right-8 bg-[#fff9e6] border border-[#e6d5a7] p-3 text-center shadow-md z-10"
                style={{ top: '20%' }}
              >
              <div className="font-caveat text-3xl text-[#d97757] font-bold">{stat.value}{stat.suffix}</div>
              <div className="font-caveat text-xl text-[#6d8a7c] leading-none">{stat.label}</div>
            </motion.div>
            );
          })}
          
          {/* Glass glare */}
          <div className="absolute left-4 top-12 bottom-4 w-4 bg-white/40 rounded-full z-30 pointer-events-none" />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-5xl font-caveat text-[#2d4a3e] mb-6">Jar of Joy</h2>
          <p className="font-caveat text-3xl text-[#5b5851] leading-relaxed">
            We tried to count the moments, but they overflowed. Here’s a tiny fraction of the impact you've collected over the years.
          </p>
        </div>
      </div>
    </section>
  );
}
