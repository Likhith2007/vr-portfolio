'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DataSphereProps {
  position?: [number, number, number];
  color?: string;
  size?: number;
}

export default function DataSphere({ position = [0, 1, 0], color = '#00f5ff', size = 1 }: DataSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.2;
      meshRef.current.rotation.z = t * 0.1;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.3;
      wireRef.current.rotation.x = t * 0.15;
    }
  });

  return (
    <group position={position}>
      {/* Inner solid core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[size * 0.8, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.6}
          wireframe
        />
      </mesh>

      {/* Outer wireframe shell */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[size, 2]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          wireframe
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Core light */}
      <pointLight color={color} intensity={0.5} distance={size * 4} />
    </group>
  );
}
