"use client";

import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 1) * 6 - 2; // shoot up
    this.life = 0;
    this.maxLife = Math.random() * 50 + 50;
    this.color = color;
    this.size = Math.random() * 2 + 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.2; // gravity
    
    // Air resistance (drag)
    this.vx *= 0.98;
    this.vy *= 0.99;
    
    this.life++;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const alpha = 1 - this.life / this.maxLife;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

class Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  life: number;
  maxLife: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = Math.random() * 20 + 20;
    this.life = 0;
    this.maxLife = 40;
  }

  update() {
    this.radius += (this.maxRadius - this.radius) * 0.1;
    this.life++;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const alpha = 1 - this.life / this.maxLife;
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = `rgba(186, 230, 253, ${alpha})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    // draw oval for isometric perspective
    ctx.ellipse(this.x, this.y, this.radius, this.radius * 0.3, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

export function CanvasWaterPhysics({ width = 800, height = 500 }: { width?: number, height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let ripples: Ripple[] = [];
    let animationId: number;

    const sourceX = width / 2;
    const sourceY = height * 0.3; // Top of the fountain
    const basinY = height * 0.7; // Where water hits the basin

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Emit new particles from fountain top
      if (Math.random() < 0.6) {
        particles.push(new Particle(sourceX + (Math.random() - 0.5) * 10, sourceY, "rgba(224, 242, 254, 0.8)"));
        particles.push(new Particle(sourceX + (Math.random() - 0.5) * 10, sourceY, "rgba(186, 230, 253, 0.6)"));
      }

      // Update and draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.update();
        r.draw(ctx);
        if (r.life >= r.maxLife) {
          ripples.splice(i, 1);
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);

        // Check collision with basin
        if (p.y >= basinY + (Math.random() - 0.5) * 20 && p.vy > 0) {
          // Create ripple
          if (Math.random() < 0.3) {
            ripples.push(new Ripple(p.x, p.y));
          }
          // Secondary splash
          if (Math.random() < 0.2) {
            const splash = new Particle(p.x, p.y, "rgba(255, 255, 255, 0.8)");
            splash.vy = (Math.random() - 1) * 3; // bounce up
            particles.push(splash);
          }
          particles.splice(i, 1);
        } else if (p.life >= p.maxLife || p.y > height) {
          particles.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [width, height]);

  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height} 
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 drop-shadow-[0_0_8px_rgba(186,230,253,0.5)]"
    />
  );
}
