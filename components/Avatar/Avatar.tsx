'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AvatarProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  visible?: boolean;
}

/**
 * Avatar model placeholder — renders a stylized humanoid capsule.
 * Replace with useGLTF when a real avatar model is available.
 */
export default function Avatar({ position = [0, 0, 0], rotation = [0, 0, 0], visible = true }: AvatarProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Subtle idle breathing animation
      groupRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 1.5) * 0.03;
    }
  });

  if (!visible) return null;

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Body */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <capsuleGeometry args={[0.25, 0.7, 8, 16]} />
        <meshStandardMaterial color="#2a2a4a" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#3a3a5a" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Visor / face glow */}
      <mesh position={[0, 1.6, 0.15]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.25, 0.08, 0.05]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Shadow under avatar */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.4, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.3} depthWrite={false} />
      </mesh>
    </group>
  );
}
