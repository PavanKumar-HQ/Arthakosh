"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const LAUGHTER_PARTICLES = (() => {
  const count = 3000;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = 2 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.3; // Flattened
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  return positions;
})();

export function PlanetLaughter({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.z += delta * 0.1;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.15;
    }
  });

  return (
    <group position={position} ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Points ref={pointsRef} positions={LAUGHTER_PARTICLES} stride={3}>
          <PointMaterial transparent color="#e2e8f0" size={0.1} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
        </Points>

        {/* Elegant Abstract Core */}
        <mesh>
          <sphereGeometry args={[2, 32, 32]} />
          <meshBasicMaterial color="#0f172a" transparent opacity={0.8} />
          <pointLight color="#fcd34d" intensity={15} distance={30} />
        </mesh>

        <Html position={[0, -10, 0]} center distanceFactor={20} className="pointer-events-none">
          <div className="flex flex-col items-center justify-center text-center opacity-0 hover:opacity-100 transition-opacity duration-1000 w-96">
            <h3 className="font-playfair text-3xl text-slate-200 mb-4 tracking-[0.2em] uppercase">Planet of Laughter</h3>
            <p className="font-sans text-sm text-slate-400 font-light tracking-wider leading-relaxed">
              A chaotic nebula of infinite jokes, <br/>
              classroom disruptions, and silver linings.
            </p>
          </div>
        </Html>
      </Float>
    </group>
  );
}
