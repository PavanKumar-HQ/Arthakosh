"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Html, Tube, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

export function PlanetGrowth({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate a beautiful DNA-like helix of light
  const tubePath = useMemo(() => {
    class HelixCurve extends THREE.Curve<THREE.Vector3> {
      constructor() {
        super();
      }
      getPoint(t: number, optionalTarget = new THREE.Vector3()) {
        const a = 3; // radius
        const b = 15; // height multiplier
        const angle = t * Math.PI * 8; // 4 loops
        const x = Math.cos(angle) * a;
        const y = (t - 0.5) * b;
        const z = Math.sin(angle) * a;
        return optionalTarget.set(x, y, z);
      }
    }
    return new HelixCurve();
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.1;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group position={position} ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Tube args={[tubePath, 200, 0.2, 16, false]}>
          <meshStandardMaterial color="#fbbf24" emissive="#d97706" emissiveIntensity={2} transparent opacity={0.6} />
        </Tube>
        
        {/* Second interlocking helix */}
        <group rotation={[0, Math.PI, 0]}>
          <Tube args={[tubePath, 200, 0.1, 16, false]}>
            <MeshTransmissionMaterial 
              color="#e2e8f0" 
              resolution={128} 
              thickness={0.5} 
              roughness={0.1}
              transmission={1} 
              ior={1.5}
            />
          </Tube>
        </group>

        <pointLight color="#fcd34d" intensity={15} distance={30} />

        <Html position={[0, -12, 0]} center distanceFactor={20} className="pointer-events-none">
          <div className="flex flex-col items-center justify-center text-center opacity-0 hover:opacity-100 transition-opacity duration-1000 w-96">
            <h3 className="font-playfair text-3xl text-amber-200 mb-4 tracking-[0.2em] uppercase">Planet of Growth</h3>
            <p className="font-sans text-sm text-amber-400/80 font-light tracking-wider leading-relaxed">
              An elegant strand of evolving stardust, <br/>
              built from the quiet development of siblings.
            </p>
          </div>
        </Html>
      </Float>
    </group>
  );
}
