'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { portalVertexShader, portalFragmentShader } from '@/shaders/portal';

interface PortalDoorProps {
  color?: string;
  secondaryColor?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  speed?: number;
  onClick?: () => void;
}

export default function PortalDoor({
  color = '#00f5ff',
  secondaryColor = '#ff00ff',
  position = [0, 1.5, 0],
  rotation = [0, 0, 0],
  scale = 1,
  speed = 1.0,
  onClick,
}: PortalDoorProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorInner: { value: new THREE.Color(color) },
      uColorOuter: { value: new THREE.Color(secondaryColor) },
      uSpeed: { value: speed },
      uIntensity: { value: 1.2 },
    }),
    [color, secondaryColor, speed]
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Portal frame (arch) */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.5 * scale, 0.08 * scale, 16, 64, Math.PI]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Portal surface (shader plane) */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onClick={onClick}
      >
        <circleGeometry args={[1.4 * scale, 64]} />
        <shaderMaterial
          vertexShader={portalVertexShader}
          fragmentShader={portalFragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
