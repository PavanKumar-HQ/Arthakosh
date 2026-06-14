"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { useJourneyStore } from "@/lib/store";

export function TempleOfImpact({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const energyLevel = useJourneyStore(state => state.energyLevel);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.x += delta * 0.2;
    if (ring2Ref.current) ring2Ref.current.rotation.y += delta * 0.15;
    if (ring3Ref.current) ring3Ref.current.rotation.z -= delta * 0.25;
  });

  const isUnlocked = energyLevel >= 50; // Threshold for unlock

  return (
    <group position={position} ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        
        {/* Outer Silver Icosahedron Frame */}
        <mesh>
          <icosahedronGeometry args={[10, 1]} />
          <meshStandardMaterial 
            color="#e2e8f0" 
            wireframe 
            transparent 
            opacity={isUnlocked ? 0.05 : 0.4} 
            emissive="#cbd5e1"
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Spinning inner lock rings - Gold and Silver */}
        {!isUnlocked && (
          <>
            <mesh ref={ring1Ref}>
              <torusGeometry args={[8, 0.05, 16, 100]} />
              <meshStandardMaterial color="#fbbf24" emissive="#d97706" emissiveIntensity={2} />
            </mesh>
            <mesh ref={ring2Ref}>
              <torusGeometry args={[7.5, 0.05, 16, 100]} />
              <meshStandardMaterial color="#e2e8f0" emissive="#94a3b8" emissiveIntensity={1} />
            </mesh>
            <mesh ref={ring3Ref}>
              <torusGeometry args={[7, 0.05, 16, 100]} />
              <meshStandardMaterial color="#fcd34d" emissive="#b45309" emissiveIntensity={1.5} />
            </mesh>
          </>
        )}

        <Html position={[0, -15, 0]} center distanceFactor={30} className="pointer-events-none z-0">
          <div className="flex flex-col items-center justify-center text-center opacity-0 hover:opacity-100 transition-opacity duration-1000 w-[500px]">
            <h3 className="font-playfair text-2xl text-slate-300 mb-2 tracking-[0.4em] uppercase">{isUnlocked ? "The Seal is Broken" : "Temple of Impact"}</h3>
            {!isUnlocked && <p className="font-sans text-xs text-slate-500 font-light tracking-widest uppercase">Collect more memories to unlock</p>}
          </div>
        </Html>
      </Float>
    </group>
  );
}
