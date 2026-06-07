"use client";

import { motion } from "framer-motion";

interface FractalRootsProps {
  growthPhase?: number; // 0 to 1
  width?: number;
  height?: number;
}

export function FractalRoots({ growthPhase = 1, width = 600, height = 500 }: FractalRootsProps) {
  
  // We use a deterministic L-System to generate root paths
  const generateRoots = () => {
    let axiom = "X";
    const rules: Record<string, string> = {
      "X": "F-[[X]+X]+F[+FX]-X",
      "F": "FF"
    };

    let result = axiom;
    // 5 iterations for nice complexity
    for (let i = 0; i < 5; i++) {
      let next = "";
      for (let char of result) {
        next += rules[char] || char;
      }
      result = next;
    }
    return result;
  };

  const lsystem = generateRoots();
  
  // Turtle graphics to trace the L-System
  const drawPaths = () => {
    const paths: string[] = [];
    let currentPath = `M ${width / 2} 0 `;
    
    // State stack
    const stack: {x: number, y: number, angle: number}[] = [];
    
    let x = width / 2;
    let y = 0;
    let angle = 90; // pointing DOWN (0 is right, 90 is down)
    
    const length = 5; // branch length
    const angleOffset = 20;

    for (let char of lsystem) {
      if (char === "F") {
        const r = angle * (Math.PI / 180);
        x += Math.cos(r) * length;
        y += Math.sin(r) * length;
        currentPath += `L ${x.toFixed(1)} ${y.toFixed(1)} `;
      } else if (char === "+") {
        angle -= angleOffset;
      } else if (char === "-") {
        angle += angleOffset;
      } else if (char === "[") {
        stack.push({ x, y, angle });
      } else if (char === "]") {
        const state = stack.pop();
        if (state) {
          x = state.x;
          y = state.y;
          angle = state.angle;
          paths.push(currentPath); // finish current branch
          currentPath = `M ${x.toFixed(1)} ${y.toFixed(1)} `; // start new branch
        }
      }
    }
    paths.push(currentPath);
    return paths;
  };

  const paths = drawPaths();

  return (
    <div style={{ width, height, position: 'relative' }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: "visible" }}>
        <defs>
          <filter id="rootGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {paths.map((p, i) => (
          <motion.path
            key={i}
            d={p}
            fill="none"
            stroke="rgba(217, 119, 6, 0.4)" // amber-600
            strokeWidth={1.5}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: growthPhase }}
            transition={{ 
              duration: 4, 
              delay: (i / paths.length) * 2, 
              ease: "easeOut" 
            }}
          />
        ))}

        {/* Pulsing energy down the roots */}
        {paths.map((p, i) => {
          if (i % 5 !== 0) return null; // only some branches
          return (
            <motion.circle
              key={`pulse-${i}`}
              r="2"
              fill="#fef08a" // yellow-200
              filter="url(#rootGlow)"
              initial={{ opacity: 0 }}
              animate={{
                offsetDistance: ["0%", "100%"],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: (i % 5),
                ease: "linear"
              }}
              style={{
                offsetPath: `path('${p}')`,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
