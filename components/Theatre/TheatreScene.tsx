'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Curtains from './Curtains';
import MovieScreen from './MovieScreen';
import Projector from './Projector';
import DustParticles from './DustParticles';
import TheatreLights from '@/components/Lighting/TheatreLights';

interface TheatreSceneProps {
  visible?: boolean;
  introComplete?: boolean;
}

export default function TheatreScene({ visible = true, introComplete = false }: TheatreSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.visible = visible;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -50]}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 5, -8]} receiveShadow>
        <planeGeometry args={[30, 10]} />
        <meshStandardMaterial color="#111118" roughness={0.9} />
      </mesh>
      <mesh position={[-15, 5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[16, 10]} />
        <meshStandardMaterial color="#0f0f16" roughness={0.9} />
      </mesh>
      <mesh position={[15, 5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[16, 10]} />
        <meshStandardMaterial color="#0f0f16" roughness={0.9} />
      </mesh>

      {/* Movie screen */}
      <MovieScreen position={[0, 4, -7.9]} />

      {/* Curtains */}
      <Curtains isOpen={introComplete} />

      {/* Projector */}
      <Projector position={[0, 7, 5]} isOn={introComplete} />

      {/* Floating dust */}
      <DustParticles count={200} />

      {/* Theatre seating (simplified rows) */}
      {[0, 2, 4, 6].map((z, rowIndex) => (
        <group key={rowIndex} position={[0, rowIndex * 0.3, z]}>
          {[-6, -4, -2, 0, 2, 4, 6].map((x, seatIndex) => (
            <mesh key={seatIndex} position={[x, 0.3, 0]} castShadow>
              <boxGeometry args={[1.2, 0.6, 0.8]} />
              <meshStandardMaterial
                color="#2d1f3d"
                roughness={0.7}
                metalness={0.3}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Lighting */}
      <TheatreLights />
    </group>
  );
}
