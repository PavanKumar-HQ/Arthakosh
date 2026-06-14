"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useJourneyStore } from "@/lib/store";

export function MemoryComets() {
  const cometsRef = useRef<THREE.Group>(null);
  const increaseEnergy = useJourneyStore(state => state.increaseEnergy);

  // Simple procedural 3D comets using elegant silver/gold colors
  useFrame((state, delta) => {
    if (cometsRef.current) {
      cometsRef.current.children.forEach((comet, i) => {
        comet.position.x -= delta * (15 + i * 5);
        comet.position.y -= delta * (2 + i);
        // Reset if offscreen (flying past the camera's X position)
        if (comet.position.x < state.camera.position.x - 100) {
          comet.position.x = state.camera.position.x + 100 + Math.random() * 200;
          comet.position.y = 50 + Math.random() * 50;
        }
      });
    }
  });

  const handleCometClick = () => {
    increaseEnergy(5);
  };

  return (
    <group ref={cometsRef}>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[100 + i * 50, 20 + i * 15, -20 - i * 10]}
          onClick={handleCometClick}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'auto'}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#fcd34d" : "#e2e8f0"} />
          <pointLight color={i % 2 === 0 ? "#fcd34d" : "#e2e8f0"} intensity={2} distance={20} />
          {/* Tail */}
          <mesh position={[1.5, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
            <coneGeometry args={[0.1, 4, 8]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#fcd34d" : "#e2e8f0"} transparent opacity={0.3} />
          </mesh>
        </mesh>
      ))}
    </group>
  );
}
