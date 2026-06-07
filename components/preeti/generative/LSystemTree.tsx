"use client";

import { useEffect, useRef, useState, useMemo } from "react";

interface LSystemTreeProps {
  growthPhase: number; // 0.0 to 1.0
  width: number;
  height: number;
  onLeavesGenerated?: (leaves: {x: number, y: number, id: number}[]) => void;
}

// Deterministic seed
function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export function LSystemTree({ growthPhase, width, height, onLeavesGenerated }: LSystemTreeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Keep track of leaf nodes to avoid infinite state loops
  const [hasGeneratedLeaves, setHasGeneratedLeaves] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // The physics/tree configuration
    const maxDepth = 9; // High depth
    const currentDepthLimit = Math.floor(growthPhase * maxDepth);
    const branchLength = 140;
    const branchAngle = Math.PI / 6.5;

    let leafNodes: {x: number, y: number, id: number}[] = [];
    let seedIndex = 0;

    // A recursive function to draw realistic textured branches
    function drawBranch(
      x: number, 
      y: number, 
      length: number, 
      angle: number, 
      depth: number, 
      branchWidth: number
    ) {
      if (depth > currentDepthLimit) return;

      const endX = x + length * Math.cos(angle);
      const endY = y + length * Math.sin(angle);

      // Draw the bark (thick and dark)
      ctx!.beginPath();
      ctx!.moveTo(x, y);
      ctx!.lineTo(endX, endY);
      
      // Bark gradient for realism
      const gradient = ctx!.createLinearGradient(x, y, endX, endY);
      gradient.addColorStop(0, "#2c1c16"); // Dark brown
      gradient.addColorStop(1, "#4e342e"); // Lighter brown
      
      ctx!.strokeStyle = gradient;
      ctx!.lineWidth = branchWidth;
      ctx!.lineCap = "round";
      ctx!.stroke();

      seedIndex++;
      
      // Recursively branch out
      if (depth < currentDepthLimit) {
        const nextLength = length * 0.72;
        const nextWidth = branchWidth * 0.65;
        
        // Add slight random organic curves to the angle using seeded random
        const curve1 = angle - branchAngle + (sr(seedIndex) * 0.1 - 0.05);
        seedIndex++;
        const curve2 = angle + branchAngle + (sr(seedIndex) * 0.1 - 0.05);
        seedIndex++;

        drawBranch(endX, endY, nextLength, curve1, depth + 1, nextWidth);
        drawBranch(endX, endY, nextLength, curve2, depth + 1, nextWidth);
        
        // Randomly spawn a third middle branch for bushiness
        if (sr(seedIndex) > 0.4) {
          drawBranch(endX, endY, nextLength * 0.8, angle + (sr(seedIndex+1) * 0.2 - 0.1), depth + 1, nextWidth);
        }
      } else {
        // We are at the tip of a branch
        if (depth > 5 && growthPhase > 0.8) {
           // We record this point as a leaf node!
           leafNodes.push({ x: endX, y: endY, id: seedIndex });
        }
      }
    }

    // Start drawing from bottom center
    drawBranch(width / 2, height, branchLength * growthPhase, -Math.PI / 2, 0, 20 * growthPhase);

    if (growthPhase > 0.8 && !hasGeneratedLeaves && onLeavesGenerated) {
       // Debounce the callback to avoid re-renders
       setTimeout(() => {
         onLeavesGenerated(leafNodes);
         setHasGeneratedLeaves(true);
       }, 500);
    }

  }, [growthPhase, width, height, hasGeneratedLeaves, onLeavesGenerated]);

  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height} 
      className="drop-shadow-2xl"
    />
  );
}
