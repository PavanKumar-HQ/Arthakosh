"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, Instance, Instances } from "@react-three/drei";
import * as THREE from "three";

export function PlanetWisdom({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate an elegant, orderly lattice of deep blue energy
  const lattice = useMemo(() => {
    const items = [];
    const size = 6;
    for (let x = -size; x <= size; x += 3) {
      for (let y = -size; y <= size; y += 3) {
        for (let z = -size; z <= size; z += 3) {
          if (Math.abs(x) + Math.abs(y) + Math.abs(z) < 10) {
            items.push([x, y, z]);
          }
        }
      }
    }
    return items;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group position={position} ref={groupRef}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={1}>
        <Instances limit={1000} range={lattice.length}>
          <octahedronGeometry args={[0.5]} />
          <meshStandardMaterial color="#1e3a8a" emissive="#1e40af" emissiveIntensity={1.5} wireframe transparent opacity={0.6} />
          {lattice.map((pos, i) => (
            <Instance key={i} position={pos as [number, number, number]} />
          ))}
        </Instances>

        <pointLight color="#3b82f6" intensity={20} distance={40} />

        <Html position={[0, -12, 0]} center distanceFactor={20} className="pointer-events-none">
          <div className="flex flex-col items-center justify-center text-center opacity-0 hover:opacity-100 transition-opacity duration-1000 w-96">
            <h3 className="font-playfair text-3xl text-blue-200 mb-4 tracking-[0.2em] uppercase">Planet of Wisdom</h3>
            <p className="font-sans text-sm text-blue-400 font-light tracking-wider leading-relaxed">
              A serene archive of life lessons, <br/>
              quiet guidance, and the Oracle system.
            </p>
          </div>
        </Html>
      </Float>
    </group>
  );
}
