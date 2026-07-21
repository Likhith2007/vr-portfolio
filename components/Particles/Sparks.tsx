'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { randomRange } from '@/utils/math';

export default function Sparks({ position = [0, 2, 0] as [number, number, number], count = 30, color = '#ffaa00' }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() =>
    Array.from({ length: count }, () => ({
      velocity: new THREE.Vector3(randomRange(-2, 2), randomRange(1, 4), randomRange(-2, 2)),
      phase: randomRange(0, 5),
      scale: randomRange(0.01, 0.03),
    })),
  [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const p = particles[i];
      const life = ((t + p.phase) % 2) / 2;
      dummy.position.set(
        position[0] + p.velocity.x * life,
        position[1] + p.velocity.y * life - 4.9 * life * life, // gravity
        position[2] + p.velocity.z * life
      );
      dummy.scale.setScalar(p.scale * (1 - life));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}
