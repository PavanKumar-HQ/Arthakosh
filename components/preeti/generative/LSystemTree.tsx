"use client";

import { useEffect, useRef } from "react";

interface LSystemTreeProps {
  growthPhase: number; // 0 to 1
  width?: number;
  height?: number;
}

export function LSystemTree({ growthPhase, width = 600, height = 600 }: LSystemTreeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    // Only draw if growth > 0
    if (growthPhase <= 0) return;

    const maxDepth = Math.max(1, Math.floor(growthPhase * 10)); // Depth from 1 to 10
    const branchAngle = Math.PI / 6; // 30 degrees
    const startLength = height * 0.25;

    // A simple recursive tree function
    const drawBranch = (x: number, y: number, length: number, angle: number, depth: number) => {
      if (depth === 0) return;

      const endX = x + length * Math.sin(angle);
      const endY = y - length * Math.cos(angle);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      
      // Thicker branches at base, thinner at top
      ctx.lineWidth = depth * 1.5;
      
      // Color gradient from dark brown trunk to green leaves
      if (depth <= 2) {
        ctx.strokeStyle = `rgba(34, 197, 94, ${growthPhase})`; // Green leaves
      } else {
        ctx.strokeStyle = `rgba(69, 43, 24, ${growthPhase})`; // Brown trunk
      }
      
      ctx.lineCap = "round";
      ctx.stroke();

      // Recursive calls for left and right branches
      // We reduce length and depth
      drawBranch(endX, endY, length * 0.7, angle - branchAngle, depth - 1);
      drawBranch(endX, endY, length * 0.7, angle + branchAngle, depth - 1);
    };

    // Animate the tree drawing upwards
    // Start from bottom center
    drawBranch(width / 2, height, startLength * growthPhase, 0, maxDepth);

  }, [growthPhase, width, height]);

  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height} 
      className="max-w-full max-h-full drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]"
    />
  );
}
