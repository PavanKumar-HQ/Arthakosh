"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Html } from "@react-three/drei";
import * as THREE from "three";
import { useJourneyStore } from "@/lib/store";

export function EnergyCore({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const energyLevel = useJourneyStore(state => state.energyLevel);

  useFrame((state) => {
    if (coreRef.current) {
      // Core breathes and grows with energy
      const baseScale = Math.min(2 + (energyLevel * 0.02), 6);
      const breathe = Math.sin(state.clock.elapsedTime * 2) * 0.2;
      coreRef.current.scale.setScalar(baseScale + breathe);
    }
  });

  return (
    <group position={position}>
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh ref={coreRef}>
          <sphereGeometry args={[2, 64, 64]} />
          <MeshDistortMaterial 
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={2 + energyLevel * 0.1}
            distort={Math.min(0.2 + (energyLevel * 0.005), 0.5)}
            speed={Math.min(2 + (energyLevel * 0.05), 8.0)}
            roughness={0.0}
            metalness={1.0}
            transparent
            opacity={0.9}
          />
          {/* Inner intense gold glow */}
          <pointLight color="#fef08a" intensity={50 + energyLevel * 5} distance={200} />
        </mesh>
      </Float>

      <Html position={[0, -15, 0]} center distanceFactor={30} className="pointer-events-none z-0">
        <div className="flex flex-col items-center justify-center text-center opacity-0 hover:opacity-100 transition-opacity duration-1000 w-96">
          <h3 className="font-playfair text-4xl text-white mb-4 tracking-[0.3em] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">The Energy Core</h3>
          <p className="font-sans text-sm text-slate-300 font-light tracking-widest leading-relaxed">
            The singularity born from a thousand tiny sparks.
          </p>
        </div>
      </Html>
    </group>
  );
}
