"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import { MotionValue } from "framer-motion";
import * as THREE from "three";
import { useJourneyStore } from "@/lib/store";

import { EnergyCore } from "./features/EnergyCore";
import { TempleOfImpact } from "./features/TempleOfImpact";
import { CosmicWhales } from "./features/CosmicWhales";
import { MemoryComets } from "./features/MemoryComets";

import { PlanetLaughter } from "./planets/PlanetLaughter";
import { PlanetWisdom } from "./planets/PlanetWisdom";
import { PlanetGrowth } from "./planets/PlanetGrowth";
import { PlanetGratitude } from "./planets/PlanetGratitude";
import { VoiceCrystalGalaxy } from "./features/VoiceCrystalGalaxy";
import { FinalClimaxSequence } from "./features/FinalClimaxSequence";

export function CinematicUniverse({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const energyLevel = useJourneyStore(state => state.energyLevel);
  
  const [climaxTriggered, setClimaxTriggered] = useState(false);

  useFrame((state, delta) => {
    // Read the framer-motion scroll progress (0 to 1)
    const offset = scrollProgress.get();

    // Travel horizontally along the X-axis
    // The universe spans from X=0 to X=800
    const targetX = offset * 800;
    
    // Smooth camera interpolation along X
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetX, 4, delta);

    // Add subtle camera drift based on mouse pointer
    const pointerX = (state.pointer.x * 5);
    const pointerY = (state.pointer.y * 5);
    
    // We want the camera to look straight ahead but drift slightly
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, pointerY, 2, delta);
    // Keep Z constant at 40 so we have a wide view of the planets we pass
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, 40 + (pointerX * 0.2), 2, delta);

    // Trigger climax when reaching the end of the scroll
    if (offset > 0.95 && !climaxTriggered) {
      setClimaxTriggered(true);
    }
  });

  return (
    <group>
      {/* Background Elements - Midnight Blue / Silver palette */}
      <Stars radius={150} depth={100} count={6000} factor={4} saturation={0} fade speed={0.5} />
      <Sparkles count={2000} scale={[1000, 200, 200]} size={2} speed={0.2} opacity={0.3} color="#94a3b8" position={[400, 0, -20]} />
      <Sparkles count={1000} scale={[1000, 200, 200]} size={4} speed={0.1} opacity={0.5} color="#fcd34d" position={[400, 0, -40]} />
      
      {/* Dynamic 3D Features */}
      <CosmicWhales />
      <MemoryComets />

      {/* Spaced out linearly along X-axis */}
      <VoiceCrystalGalaxy position={[0, 0, 0]} />
      <PlanetLaughter position={[150, 5, 0]} />
      <PlanetWisdom position={[300, -5, 0]} />
      <PlanetGrowth position={[450, 0, 0]} />
      <PlanetGratitude position={[600, 5, 0]} />

      {/* The Central Elements at the end of the journey */}
      <group position={[800, 0, 0]}>
        <TempleOfImpact />
        <EnergyCore />
      </group>

      {/* HTML Overlay for the final reveal */}
      {climaxTriggered && <FinalClimaxSequence />}
    </group>
  );
}
