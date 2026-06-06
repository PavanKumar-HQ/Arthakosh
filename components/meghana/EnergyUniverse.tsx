"use client";

import { useFrame, useThree } from '@react-three/fiber';
import { Stars, Sparkles, Float, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';
import { useJourneyStore } from '@/lib/store';

export function EnergyUniverse({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const starsGroupRef = useRef<THREE.Group>(null);
  const sparklesGroupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const energyLevel = useJourneyStore(state => state.energyLevel);

  useFrame((state) => {
    // Horizontal travel: Move camera along X axis based on scroll
    const currentScroll = scrollProgress.get();
    const targetCamX = currentScroll * 80; // Travel up to 80 units
    state.camera.position.x += (targetCamX - state.camera.position.x) * 0.05;
    
    // Core breathes and grows with energy, clamped to prevent clipping
    if (coreRef.current) {
      const baseScale = Math.min(1 + (energyLevel * 0.015), 1.8);
      const breathe = Math.sin(state.clock.elapsedTime * 1.5) * 0.04;
      coreRef.current.scale.setScalar(baseScale + breathe);
      
      // Core stays centered horizontally relative to camera
      coreRef.current.position.x = camera.position.x; 
      
      // Cursor reaction
      const targetX = (state.pointer.x * 1.5);
      const targetY = (state.pointer.y * 1.5);
      coreRef.current.position.y += (targetY - coreRef.current.position.y) * 0.05;
      // Keep it far enough back to prevent clipping (Z = -12)
      coreRef.current.position.z = -12 + (targetX * 0.5);
    }

    // Parallax background layers
    if (starsGroupRef.current) {
      starsGroupRef.current.position.x = camera.position.x;
    }
    if (sparklesGroupRef.current) {
      sparklesGroupRef.current.position.x = camera.position.x * 0.5; // Parallax
    }
  });

  return (
    <group>
      {/* Layer 1: Slow moving stars, infinite depth */}
      <group ref={starsGroupRef}>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
      </group>
      
      {/* Layer 4 & 5: Tiny particles and ambient energy */}
      <group ref={sparklesGroupRef}>
        <Sparkles count={2000} scale={[100, 50, 50]} size={2} speed={0.4} color="#818cf8" opacity={0.2} />
        <Sparkles count={1000} scale={[100, 50, 50]} size={4} speed={0.8} color="#fbbf24" opacity={0.4} />
      </group>

      {/* The Energy Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={coreRef} position={[0, 0, -12]}>
          <sphereGeometry args={[2, 64, 64]} />
          <MeshDistortMaterial 
            color="#4f46e5"
            emissive="#4f46e5"
            emissiveIntensity={2}
            distort={Math.min(0.25 + (energyLevel * 0.003), 0.45)}
            speed={Math.min(3 + (energyLevel * 0.02), 5.0)}
            roughness={0.2}
            metalness={0.8}
          />
          {/* Inner intense glow */}
          <pointLight color="#fbbf24" intensity={20 + energyLevel * 2} distance={50} />
        </mesh>
      </Float>

    </group>
  );
}
