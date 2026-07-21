'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { randomRange } from '@/utils/math';

interface DustParticlesProps {
  count?: number;
  area?: [number, number, number];
}

export default function DustParticles({
  count = 200,
  area = [20, 8, 16],
}: DustParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        position: new THREE.Vector3(
          randomRange(-area[0] / 2, area[0] / 2),
          randomRange(0.5, area[1]),
          randomRange(-area[2] / 2, area[2] / 2)
        ),
        speed: randomRange(0.1, 0.4),
        phase: randomRange(0, Math.PI * 2),
        scale: randomRange(0.01, 0.04),
      });
    }
    return data;
  }, [count, area]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      dummy.position.copy(p.position);
      dummy.position.y += Math.sin(t * p.speed + p.phase) * 0.5;
      dummy.position.x += Math.cos(t * p.speed * 0.7 + p.phase) * 0.2;
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial
        color="#ffddaa"
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}
