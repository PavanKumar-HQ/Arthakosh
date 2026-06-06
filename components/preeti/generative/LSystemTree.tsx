"use client";

import { useEffect, useRef } from "react";

interface LSystemTreeProps {
  growthPhase: number; // 0.0 to 1.0
  width: number;
  height: number;
}

export function LSystemTree({ growthPhase, width, height }: LSystemTreeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // The physics/tree configuration
    const maxDepth = 10; // Extremely high depth for realism
    const currentDepthLimit = Math.floor(growthPhase * maxDepth);
    const branchLength = 120;
    const branchAngle = Math.PI / 7;

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
      gradient.addColorStop(0, "#3e2723"); // Dark brown
      gradient.addColorStop(1, "#5d4037"); // Lighter brown
      
      ctx!.strokeStyle = gradient;
      ctx!.lineWidth = branchWidth;
      ctx!.lineCap = "round";
      ctx!.stroke();

      // If we are at the edge of the growth phase, spawn green leaves!
      if (depth === currentDepthLimit || depth > 6) {
        // Only draw leaves if growth phase is advanced enough
        if (growthPhase > 0.4) {
          ctx!.beginPath();
          ctx!.arc(endX, endY, (growthPhase * 4) + Math.random() * 2, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${30 + Math.random() * 50}, ${150 + Math.random() * 80}, ${40 + Math.random() * 40}, 0.8)`;
          ctx!.fill();
        }
      }

      // Recursively branch out
      if (depth < currentDepthLimit) {
        const nextLength = length * 0.75;
        const nextWidth = branchWidth * 0.7;
        
        // Add slight random organic curves to the angle
        const curve1 = angle - branchAngle + (Math.random() * 0.1 - 0.05);
        const curve2 = angle + branchAngle + (Math.random() * 0.1 - 0.05);

        drawBranch(endX, endY, nextLength, curve1, depth + 1, nextWidth);
        drawBranch(endX, endY, nextLength, curve2, depth + 1, nextWidth);
        
        // Randomly spawn a third middle branch for bushiness
        if (Math.random() > 0.5) {
          drawBranch(endX, endY, nextLength * 0.8, angle + (Math.random() * 0.2 - 0.1), depth + 1, nextWidth);
        }
      }
    }

    // Start drawing from bottom center
    drawBranch(width / 2, height, branchLength * growthPhase, -Math.PI / 2, 0, 16 * growthPhase);

  }, [growthPhase, width, height]);

  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height} 
      className="drop-shadow-2xl"
    />
  );
}
