"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function TreeOfGratitude() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Grow and glow as user scrolls down
  const treeScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const treeOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.9, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.6]);

  const [sparks, setSparks] = useState<{ id: number, x: number, y: number, delay: number }[]>([]);

  useEffect(() => {
    // Generate fireflies/sparks around the tree
    const newSparks = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 100, // -50% to 50%
      y: (Math.random() - 0.5) * 100,
      delay: Math.random() * 5
    }));
    setSparks(newSparks);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
      
      {/* Intense Background Glow */}
      <motion.div 
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,224,71,0.5)_0%,transparent_60%)] mix-blend-screen"
      />

      <motion.div 
        style={{ scale: treeScale, opacity: treeOpacity }}
        className="relative flex items-center justify-center mt-32"
      >
        {/* The Massive Tree Emoji */}
        <img 
          src="/magical-tree.png" 
          alt="Tree of Gratitude"
          className="w-[120%] md:w-[80%] max-w-7xl object-contain mix-blend-darken"
        />

        {/* Floating Sparks */}
        {sparks.map(spark => (
          <motion.div
            key={spark.id}
            className="absolute text-xl md:text-3xl text-amber-300 drop-shadow-[0_0_10px_rgba(253,224,71,1)]"
            style={{ 
              left: `calc(50% + ${spark.x}%)`, 
              top: `calc(50% + ${spark.y}%)` 
            }}
            animate={{ 
              y: [0, -20, 0], 
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: spark.delay,
              ease: "easeInOut"
            }}
          >
            ✨
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}
