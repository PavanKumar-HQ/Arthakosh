"use client";

import { motion, AnimatePresence } from "framer-motion";

// Deterministic seed
function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

interface DynamicWeatherSystemProps {
  season: number; // 0=Spring, 1=Summer, 2=Autumn, 3=Winter, 4=Spring Again
}

export function DynamicWeatherSystem({ season }: DynamicWeatherSystemProps) {
  const isSpring = season === 0 || season === 4;
  const isSummer = season === 1;
  const isAutumn = season === 2;
  const isWinter = season === 3;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        
        {/* SPRING BLOSSOMS */}
        {isSpring && (
          <motion.div 
            key="spring"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 2 } }}
            className="absolute inset-0"
          >
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={`spring-${i}`}
                className="absolute w-3 h-3 bg-pink-200/60 rounded-full blur-[1px]"
                style={{ 
                  left: `${(sr(i * 7) * 100).toFixed(2)}%`, 
                  top: "-10%",
                  borderRadius: "50% 0 50% 50%" // Petal shape
                }}
                animate={{ 
                  y: "120vh", 
                  x: (sr(i * 11) - 0.5) * 200,
                  rotate: [0, 180, 360],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 8 + sr(i * 13) * 8, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: sr(i * 17) * 5 
                }}
              />
            ))}
          </motion.div>
        )}

        {/* SUMMER FIREFLIES & HEAT */}
        {isSummer && (
          <motion.div 
            key="summer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 2 } }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(253,224,71,0.15)_0%,transparent_60%)]" />
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={`summer-${i}`}
                className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full blur-[1px]"
                style={{ 
                  left: `${(sr(i * 7) * 100).toFixed(2)}%`, 
                  bottom: `${(sr(i * 11) * 100).toFixed(2)}%`
                }}
                animate={{ 
                  y: [-20, 20, -20], 
                  x: [-20, 20, -20],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 4 + sr(i * 13) * 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: sr(i * 17) * 4 
                }}
              />
            ))}
          </motion.div>
        )}

        {/* AUTUMN FALLING LEAVES */}
        {isAutumn && (
          <motion.div 
            key="autumn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 2 } }}
            className="absolute inset-0"
          >
            {Array.from({ length: 35 }).map((_, i) => {
              const colors = ["bg-orange-500", "bg-red-500", "bg-amber-600", "bg-yellow-500"];
              const leafColor = colors[Math.floor(sr(i * 3) * colors.length)];
              return (
                <motion.div
                  key={`autumn-${i}`}
                  className={`absolute w-4 h-4 ${leafColor} opacity-80 blur-[0.5px]`}
                  style={{ 
                    left: `${(sr(i * 7) * 100).toFixed(2)}%`, 
                    top: "-10%",
                    borderRadius: "50% 0 50% 50%" 
                  }}
                  animate={{ 
                    y: "120vh", 
                    x: (sr(i * 11) - 0.5) * 300,
                    rotate: [0, 360, 720],
                    rotateX: [0, 180, 360],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 6 + sr(i * 13) * 6, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: sr(i * 17) * 5 
                  }}
                />
              );
            })}
          </motion.div>
        )}

        {/* WINTER SNOW */}
        {isWinter && (
          <motion.div 
            key="winter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 2 } }}
            className="absolute inset-0"
          >
            {/* Wind blur layer */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/10" />
            
            {Array.from({ length: 100 }).map((_, i) => {
              const isForeground = sr(i * 5) > 0.5;
              const size = isForeground ? 3 : 1.5;
              return (
                <motion.div
                  key={`winter-${i}`}
                  className="absolute bg-white rounded-full"
                  style={{ 
                    width: size, height: size,
                    left: `${(sr(i * 7) * 100).toFixed(2)}%`, 
                    top: "-10%",
                    opacity: isForeground ? 0.8 : 0.4,
                    filter: isForeground ? "none" : "blur(1px)"
                  }}
                  animate={{ 
                    y: "120vh", 
                    x: (sr(i * 11) - 0.5) * 100, // drift left/right
                  }}
                  transition={{ 
                    duration: (isForeground ? 4 : 8) + sr(i * 13) * 4, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: sr(i * 17) * 5 
                  }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
