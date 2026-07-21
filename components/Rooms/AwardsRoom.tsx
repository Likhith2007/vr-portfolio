'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text as DreiText } from '@react-three/drei';
import * as THREE from 'three';
import { awards } from '@/data/awards';

export default function AwardsRoom() {
  const trophyGroupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (trophyGroupRef.current) {
      trophyGroupRef.current.children.forEach((child, i) => {
        child.position.y = 1.5 + Math.sin(clock.getElapsedTime() + i * 1.5) * 0.15;
      });
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#0d1117" roughness={0.4} metalness={0.6} />
      </mesh>

      <DreiText position={[0, 5, -7]} fontSize={0.8} color="#ffd700" anchorX="center">
        AWARDS
      </DreiText>

      {/* Floating trophy pedestals */}
      <group ref={trophyGroupRef}>
        {awards.map((award, i) => {
          const x = (i - (awards.length - 1) / 2) * 3.5;
          return (
            <group key={award.id} position={[x, 1.5, -3]}>
              {/* Pedestal */}
              <mesh position={[0, -1, 0]}>
                <cylinderGeometry args={[0.5, 0.6, 0.3, 16]} />
                <meshStandardMaterial color="#2a2a3a" metalness={0.9} roughness={0.1} />
              </mesh>

              {/* Trophy/Icon orb */}
              <mesh castShadow>
                <dodecahedronGeometry args={[0.35, 0]} />
                <meshStandardMaterial
                  color="#ffd700"
                  emissive="#ffd700"
                  emissiveIntensity={0.4}
                  metalness={0.9}
                  roughness={0.1}
                />
              </mesh>

              {/* Award title */}
              <DreiText position={[0, 0.7, 0]} fontSize={0.12} color="#ffd700" anchorX="center" maxWidth={2.5} textAlign="center">
                {award.title}
              </DreiText>

              {/* Organization */}
              <DreiText position={[0, -1.5, 0]} fontSize={0.1} color="#a0a0b8" anchorX="center">
                {award.organization} · {award.date}
              </DreiText>

              {/* Spotlight */}
              <pointLight position={[0, 1, 1]} intensity={0.3} color="#ffd700" distance={5} />
            </group>
          );
        })}
      </group>

      <pointLight position={[0, 6, 0]} intensity={0.5} color="#ffd700" distance={15} />
      <ambientLight intensity={0.15} />
    </group>
  );
}
