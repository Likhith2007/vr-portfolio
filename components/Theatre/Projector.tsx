'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProjectorProps {
  position?: [number, number, number];
  isOn?: boolean;
}

export default function Projector({ position = [0, 7, 5], isOn = false }: ProjectorProps) {
  const beamRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.SpotLight>(null);

  useFrame(({ clock }) => {
    if (beamRef.current) {
      const targetOpacity = isOn ? 0.08 : 0;
      const material = beamRef.current.material as THREE.MeshBasicMaterial;
      material.opacity += (targetOpacity - material.opacity) * 0.05;

      // Subtle flicker
      if (isOn) {
        material.opacity += Math.sin(clock.getElapsedTime() * 8) * 0.005;
      }
    }
    if (lightRef.current) {
      lightRef.current.intensity = isOn ? 2 : 0;
    }
  });

  return (
    <group position={position}>
      {/* Projector body */}
      <mesh castShadow>
        <boxGeometry args={[0.8, 0.5, 1.2]} />
        <meshStandardMaterial color="#2a2a3a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Lens */}
      <mesh position={[0, 0, -0.65]}>
        <cylinderGeometry args={[0.15, 0.2, 0.1, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={isOn ? '#00f5ff' : '#000000'}
          emissiveIntensity={isOn ? 2 : 0}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Light beam (cone) */}
      <mesh
        ref={beamRef}
        position={[0, -3.5, -6.5]}
        rotation={[0.45, 0, 0]}
      >
        <coneGeometry args={[4, 12, 32, 1, true]} />
        <meshBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Spot light */}
      <spotLight
        ref={lightRef}
        position={[0, 0, -0.5]}
        target-position={[0, -7, -13]}
        angle={0.4}
        penumbra={0.5}
        intensity={0}
        color="#00f5ff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </group>
  );
}
