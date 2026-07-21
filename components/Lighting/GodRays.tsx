'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GodRaysProps {
  position?: [number, number, number];
  color?: string;
  opacity?: number;
}

export default function GodRays({ position = [0, 10, -5], color = '#00f5ff', opacity = 0.06 }: GodRaysProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = opacity + Math.sin(clock.getElapsedTime() * 0.8) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={[0.2, 0, 0]}>
      <coneGeometry args={[8, 15, 32, 1, true]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
