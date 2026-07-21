'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function NeonLights() {
  const lightsRef = useRef<THREE.Group>(null);

  const neonStrips = useMemo(() => [
    { position: [0, 0.05, -18] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], length: 20, color: '#00f5ff' },
    { position: [0, 0.05, 18] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], length: 20, color: '#ff00ff' },
    { position: [-18, 0.05, 0] as [number, number, number], rotation: [0, Math.PI / 2, 0] as [number, number, number], length: 20, color: '#00f5ff' },
    { position: [18, 0.05, 0] as [number, number, number], rotation: [0, Math.PI / 2, 0] as [number, number, number], length: 20, color: '#ff00ff' },
  ], []);

  useFrame(({ clock }) => {
    if (!lightsRef.current) return;
    lightsRef.current.children.forEach((child, i) => {
      const mesh = child.children[0] as THREE.Mesh;
      if (mesh?.material) {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.8 + Math.sin(clock.getElapsedTime() * 1.5 + i) * 0.2;
      }
    });
  });

  return (
    <group ref={lightsRef}>
      {neonStrips.map((strip, i) => (
        <group key={i} position={strip.position} rotation={strip.rotation}>
          <mesh>
            <boxGeometry args={[strip.length, 0.03, 0.03]} />
            <meshStandardMaterial
              color={strip.color}
              emissive={strip.color}
              emissiveIntensity={0.8}
              toneMapped={false}
            />
          </mesh>
          <pointLight position={[0, 0.5, 0]} intensity={0.2} color={strip.color} distance={6} />
        </group>
      ))}
    </group>
  );
}
