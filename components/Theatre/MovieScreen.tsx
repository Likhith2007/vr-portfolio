'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MovieScreenProps {
  position?: [number, number, number];
}

export default function MovieScreen({ position = [0, 4, -7.9] }: MovieScreenProps) {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      // Subtle emissive pulse to simulate screen glow
      const t = Math.sin(clock.getElapsedTime() * 0.5) * 0.1 + 0.5;
      materialRef.current.emissiveIntensity = t;
    }
  });

  return (
    <group position={position}>
      {/* Screen border/frame */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[12.5, 7.2, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Screen surface */}
      <mesh>
        <planeGeometry args={[12, 6.75]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#0a0a0f"
          emissive="#00f5ff"
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>
    </group>
  );
}
