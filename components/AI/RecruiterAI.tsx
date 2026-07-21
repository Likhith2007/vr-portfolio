'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text as DreiText } from '@react-three/drei';
import * as THREE from 'three';
import DataSphere from '@/components/Holograms/DataSphere';

export default function RecruiterAI() {
  const groupRef = useRef<THREE.Group>(null);
  const [isActive, setIsActive] = useState(false);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = 2 + Math.sin(clock.getElapsedTime() * 1.5) * 0.1;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[5, 2, -10]}
      onClick={() => setIsActive(!isActive)}
      onPointerEnter={() => document.body.style.cursor = 'pointer'}
      onPointerLeave={() => document.body.style.cursor = 'default'}
    >
      {/* Visual representation of the AI */}
      <DataSphere color={isActive ? '#ff00ff' : '#00f5ff'} size={0.6} />
      
      {/* AI Label */}
      <DreiText
        position={[0, 1.2, 0]}
        fontSize={0.2}
        color={isActive ? '#ff00ff' : '#00f5ff'}
        anchorX="center"
      >
        RECRUITER AI
      </DreiText>

      {/* Floating status text */}
      <DreiText
        position={[0, -0.8, 0]}
        fontSize={0.12}
        color="#a0a0b8"
        anchorX="center"
      >
        {isActive ? 'LISTENING...' : 'CLICK TO INTERACT'}
      </DreiText>

      {/* Holographic rings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <ringGeometry args={[0.8, 0.85, 32]} />
        <meshBasicMaterial color={isActive ? '#ff00ff' : '#00f5ff'} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}
