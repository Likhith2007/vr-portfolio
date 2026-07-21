'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CurtainsProps {
  isOpen?: boolean;
}

export default function Curtains({ isOpen = false }: CurtainsProps) {
  const leftRef = useRef<THREE.Mesh>(null);
  const rightRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const target = isOpen ? -7 : -0.5;
    const targetRight = isOpen ? 7 : 0.5;

    if (leftRef.current) {
      leftRef.current.position.x += (target - leftRef.current.position.x) * delta * 1.5;
    }
    if (rightRef.current) {
      rightRef.current.position.x += (targetRight - rightRef.current.position.x) * delta * 1.5;
    }
  });

  const curtainMaterial = (
    <meshStandardMaterial
      color="#8b0000"
      roughness={0.85}
      metalness={0.1}
      side={THREE.DoubleSide}
    />
  );

  return (
    <group position={[0, 4, -7.5]}>
      {/* Left curtain */}
      <mesh ref={leftRef} position={[-0.5, 0, 0.1]}>
        <planeGeometry args={[7, 8]} />
        {curtainMaterial}
      </mesh>

      {/* Right curtain */}
      <mesh ref={rightRef} position={[0.5, 0, 0.1]}>
        <planeGeometry args={[7, 8]} />
        {curtainMaterial}
      </mesh>

      {/* Curtain rod */}
      <mesh position={[0, 4, 0.15]}>
        <cylinderGeometry args={[0.06, 0.06, 15, 8]} />
        <meshStandardMaterial color="#8b7355" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}
