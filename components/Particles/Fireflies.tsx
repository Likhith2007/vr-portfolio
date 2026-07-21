'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { randomRange } from '@/utils/math';

export default function Fireflies({ count = 50, area = 30 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: randomRange(-area / 2, area / 2),
      y: randomRange(0.5, 4),
      z: randomRange(-area / 2, area / 2),
      speed: randomRange(0.3, 1),
      phase: randomRange(0, Math.PI * 2),
      radius: randomRange(0.5, 2),
    }));
  }, [count, area]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const p = particles[i];
      dummy.position.set(
        p.x + Math.sin(t * p.speed + p.phase) * p.radius,
        p.y + Math.sin(t * p.speed * 1.5 + p.phase) * 0.5,
        p.z + Math.cos(t * p.speed + p.phase) * p.radius
      );
      dummy.scale.setScalar(0.03 + Math.sin(t * 3 + p.phase) * 0.015);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#00ff88" transparent opacity={0.8} depthWrite={false} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}
