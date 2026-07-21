'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { randomInSphere } from '@/utils/math';

interface StarsProps {
  count?: number;
  radius?: number;
}

export default function Stars({ count = 1000, radius = 150 }: StarsProps) {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const [x, y, z] = randomInSphere(radius);
      pos[i * 3] = x;
      pos[i * 3 + 1] = Math.abs(y); // Keep above ground
      pos[i * 3 + 2] = z;
      sz[i] = Math.random() * 1.5 + 0.5;
    }
    return [pos, sz];
  }, [count, radius]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.5}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
