"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";

const CRYSTALS_DATA = Array.from({ length: 40 }).map((_, i) => {
  const radius = 15 + Math.random() * 25;
  const angle = (i / 40) * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const y = (Math.random() - 0.5) * 20;
  const z = Math.sin(angle) * radius;
  return {
    key: i,
    position: [x, y, z] as [number, number, number],
    rotation: [Math.random(), Math.random(), Math.random()] as [number, number, number],
    size: 0.2 + Math.random() * 0.8,
    isWireframe: Math.random() > 0.8
  };
});

export function VoiceCrystalGalaxy({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const galaxyRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group position={position} ref={galaxyRef}>
      {CRYSTALS_DATA.map((crystal) => (
        <Float key={crystal.key} speed={1} floatIntensity={1} rotationIntensity={0.2}>
          <mesh position={crystal.position} rotation={crystal.rotation}>
            <octahedronGeometry args={[crystal.size]} />
            <meshStandardMaterial 
              color="#e2e8f0" 
              emissive="#64748b"
              emissiveIntensity={0.5}
              roughness={0.0}
              metalness={1.0}
              transparent
              opacity={0.8}
              wireframe={crystal.isWireframe}
            />
          </mesh>
        </Float>
      ))}

      <pointLight color="#f8fafc" intensity={10} distance={50} />

      <Html position={[0, -20, 0]} center distanceFactor={30} className="pointer-events-none">
        <div className="flex flex-col items-center justify-center text-center opacity-0 hover:opacity-100 transition-opacity duration-1000 w-[600px]">
          <h3 className="font-playfair text-4xl text-slate-200 mb-4 tracking-[0.3em] uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Voice Crystal Galaxy</h3>
          <p className="font-sans text-sm text-slate-400 font-light tracking-[0.2em] leading-relaxed uppercase">
            Echoes of siblings suspended in crystalized time.
          </p>
        </div>
      </Html>
    </group>
  );
}
