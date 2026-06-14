"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export function PlanetGratitude({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const auraRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
    if (auraRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      auraRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={position} ref={groupRef}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        
        {/* Core Corona */}
        <mesh>
          <sphereGeometry args={[4, 64, 64]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>

        {/* Golden Distorted Aura */}
        <mesh ref={auraRef}>
          <sphereGeometry args={[4.5, 64, 64]} />
          <MeshDistortMaterial 
            color="#fbbf24" 
            emissive="#f59e0b"
            emissiveIntensity={2}
            distort={0.4}
            speed={2}
            transparent
            opacity={0.3}
            roughness={0.1}
          />
        </mesh>

        <pointLight color="#fcd34d" intensity={25} distance={60} />

        <Html position={[0, -12, 0]} center distanceFactor={20} className="pointer-events-none">
          <div className="flex flex-col items-center justify-center text-center opacity-0 hover:opacity-100 transition-opacity duration-1000 w-96">
            <h3 className="font-playfair text-3xl text-yellow-100 mb-4 tracking-[0.2em] uppercase">Planet of Gratitude</h3>
            <p className="font-sans text-sm text-yellow-500/80 font-light tracking-wider leading-relaxed">
              A radiating corona of immense appreciation <br/>
              and unsaid thank-yous waiting to be heard.
            </p>
          </div>
        </Html>
      </Float>
    </group>
  );
}
