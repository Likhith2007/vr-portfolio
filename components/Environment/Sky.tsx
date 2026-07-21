'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Sky() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[300, 32, 32]} />
      <meshBasicMaterial
        color="#050510"
        side={THREE.BackSide}
      />
    </mesh>
  );
}
