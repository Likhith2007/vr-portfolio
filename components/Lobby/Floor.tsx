'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Floor() {
  const gridRef = useRef<THREE.LineSegments>(null);

  // Create grid lines
  const gridGeometry = useMemo(() => {
    const size = 40;
    const divisions = 40;
    const step = size / divisions;
    const halfSize = size / 2;

    const vertices: number[] = [];

    for (let i = 0; i <= divisions; i++) {
      const pos = -halfSize + i * step;
      // X lines
      vertices.push(-halfSize, 0, pos, halfSize, 0, pos);
      // Z lines
      vertices.push(pos, 0, -halfSize, pos, 0, halfSize);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, []);

  useFrame(({ clock }) => {
    if (gridRef.current) {
      const material = gridRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.15 + Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return (
    <group>
      {/* Base floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color="#0a0a0f"
          roughness={0.3}
          metalness={0.8}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Neon grid overlay */}
      <lineSegments ref={gridRef} geometry={gridGeometry}>
        <lineBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0.15}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
