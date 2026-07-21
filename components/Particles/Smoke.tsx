'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { randomRange } from '@/utils/math';

export default function Smoke({ position = [0, 0, 0] as [number, number, number], count = 20, color = '#444466' }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() =>
    Array.from({ length: count }, () => ({
      x: randomRange(-1, 1),
      speed: randomRange(0.2, 0.5),
      phase: randomRange(0, Math.PI * 2),
      scale: randomRange(0.5, 1.5),
    })),
  [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const p = particles[i];
      const life = ((t * p.speed + p.phase) % 5) / 5; // 0-1 lifecycle
      dummy.position.set(
        position[0] + p.x + Math.sin(t * 0.5 + p.phase) * 0.3,
        position[1] + life * 5,
        position[2] + Math.cos(t * 0.3 + p.phase) * 0.3
      );
      dummy.scale.setScalar(p.scale * (0.5 + life));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.5, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.08} depthWrite={false} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}
