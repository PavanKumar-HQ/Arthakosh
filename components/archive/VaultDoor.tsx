"use client";

import { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';

export function VaultDoor() {
  const router = useRouter();
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState<string | null>(null);
  const { camera } = useThree();

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle breathing
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Cursor react
      const targetX = (state.pointer.x * Math.PI) * 0.1;
      const targetY = (state.pointer.y * Math.PI) * 0.1;
      
      groupRef.current.rotation.y += 0.05 * (targetX - groupRef.current.rotation.y);
      groupRef.current.rotation.x += 0.05 * (-targetY - groupRef.current.rotation.x);
    }

    if (transitioning) {
      // Zoom camera in rapidly
      camera.position.z -= 0.2;
      if (camera.position.z < -5) {
        // Route when camera passes through
        if (transitioning === 'preeti') router.push('/preeti');
        if (transitioning === 'meghana') router.push('/meghana');
        setTransitioning(null);
      }
    }
  });

  const handleSelect = (target: string) => {
    if (transitioning) return;
    setTransitioning(target);
  };

  return (
    <group ref={groupRef}>
      {/* Background ambient particles */}
      <Sparkles count={500} scale={15} size={2} speed={0.2} opacity={0.5} color="#4a5568" />

      {/* The Vault Ring */}
      <mesh position={[0, 0, -2]}>
        <torusGeometry args={[4, 0.5, 32, 100]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Vault Core */}
      <mesh position={[0, 0, -2.5]}>
        <cylinderGeometry args={[3.8, 3.8, 0.5, 64]} />
        <meshStandardMaterial color="#050505" />
      </mesh>

      {/* Preeti's Seal (Left) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={[-2, 0, 0]}>
        <mesh 
          onPointerOver={() => setHovered('preeti')} 
          onPointerOut={() => setHovered(null)}
          onClick={() => handleSelect('preeti')}
        >
          <sphereGeometry args={[0.8, 64, 64]} />
          <MeshDistortMaterial 
            color={hovered === 'preeti' || transitioning === 'preeti' ? "#fcd34d" : "#fbbf24"} 
            envMapIntensity={1} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
            metalness={0.2} 
            roughness={0.1} 
            distort={hovered === 'preeti' ? 0.4 : 0.2} 
            speed={3} 
          />
        </mesh>
        <Text position={[0, -1.2, 0]} fontSize={0.3} color="#fcd34d" font="https://fonts.gstatic.com/s/caveat/v18/Wnz6HAc5bAfYB2Q7Yj8.woff">
          Secret Garden
        </Text>
        {(hovered === 'preeti' || transitioning === 'preeti') && (
          <pointLight color="#fcd34d" intensity={10} distance={10} />
        )}
      </Float>

      {/* Meghana's Seal (Right) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={[2, 0, 0]}>
        <mesh 
          onPointerOver={() => setHovered('meghana')} 
          onPointerOut={() => setHovered(null)}
          onClick={() => handleSelect('meghana')}
        >
          <icosahedronGeometry args={[0.8, 1]} />
          <meshStandardMaterial 
            color={hovered === 'meghana' || transitioning === 'meghana' ? "#818cf8" : "#4f46e5"} 
            wireframe={hovered === 'meghana' ? false : true} 
            metalness={0.8} 
            roughness={0.2} 
          />
        </mesh>
        {hovered === 'meghana' && (
          <mesh>
            <icosahedronGeometry args={[0.78, 2]} />
            <meshStandardMaterial color="#c7d2fe" emissive="#4f46e5" emissiveIntensity={2} />
          </mesh>
        )}
        <Text position={[0, -1.2, 0]} fontSize={0.3} color="#818cf8" font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff">
          Celestial Hall
        </Text>
        {(hovered === 'meghana' || transitioning === 'meghana') && (
          <pointLight color="#818cf8" intensity={10} distance={10} />
        )}
      </Float>

    </group>
  );
}
