"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const WHALE_PARTICLES = (() => {
  const count = 500;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const t = Math.random();
    const x = (t - 0.5) * 40;
    const radius = Math.sin(t * Math.PI) * 4 * Math.random();
    const theta = Math.random() * Math.PI * 2;
    const y = Math.sin(theta) * radius;
    const z = Math.cos(theta) * radius;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }
  return positions;
})();

export function CosmicWhales() {
  const whale1Ref = useRef<THREE.Group>(null);
  const whale2Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    // Whales slowly swim alongside the scroll journey (moving right across the X-axis)
    if (whale1Ref.current) {
      whale1Ref.current.position.x = (state.clock.elapsedTime * 5) % 1000 - 200;
      whale1Ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 20;
    }
    if (whale2Ref.current) {
      whale2Ref.current.position.x = (state.clock.elapsedTime * 8) % 1200 - 300;
      whale2Ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.15) * 30 + 10;
    }
  });

  return (
    <group>
      {/* Ethereal Silver Whale */}
      <group ref={whale1Ref} position={[-200, 10, -80]}>
        <Float speed={0.5} floatIntensity={5} rotationIntensity={0.2}>
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[WHALE_PARTICLES, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.5} color="#e2e8f0" transparent opacity={0.3} sizeAttenuation depthWrite={false} />
          </points>
        </Float>
      </group>

      {/* Deep Blue/Gold Ethereal Whale */}
      <group ref={whale2Ref} position={[-300, -20, -120]}>
        <Float speed={0.3} floatIntensity={8} rotationIntensity={0.1}>
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[WHALE_PARTICLES, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.8} color="#93c5fd" transparent opacity={0.2} sizeAttenuation depthWrite={false} />
          </points>
        </Float>
      </group>
    </group>
  );
}
