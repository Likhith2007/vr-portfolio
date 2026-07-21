'use client';

import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Text as DreiText } from '@react-three/drei';
import PortalDoor from '@/components/Shared/PortalDoor';
import type { RoomId } from '@/types';

interface PortalProps {
  roomId: RoomId;
  label: string;
  color: string;
  icon: string;
  position: [number, number, number];
  rotation: [number, number, number];
  onClick?: () => void;
}

export default function Portal({
  label,
  color,
  position,
  rotation,
  onClick,
}: PortalProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    
    // Hover scale animation
    const targetScale = hovered ? 1.1 : 1;
    const s = groupRef.current.scale.x;
    const newScale = s + (targetScale - s) * delta * 8;
    groupRef.current.scale.setScalar(newScale);

    // Proximity trigger: If camera (avatar) walks inside the portal radius, trigger teleport!
    const portalWorldPos = new THREE.Vector3();
    groupRef.current.getWorldPosition(portalWorldPos);
    
    // Check distance in X/Z plane (ignore height differences to be safe)
    const distSq = 
      Math.pow(camera.position.x - portalWorldPos.x, 2) + 
      Math.pow(camera.position.z - portalWorldPos.z, 2);
      
    // If distance < 2 units (distSq < 4), trigger the teleport
    if (distSq < 4.0) {
      onClick?.();
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerEnter={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerLeave={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      {/* Portal door with shader */}
      <PortalDoor
        color={color}
        secondaryColor="#ffffff"
        position={[0, 1.5, 0]}
        scale={1}
        onClick={onClick}
      />

      {/* Label */}
      <DreiText
        position={[0, 3.5, 0]}
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {label.toUpperCase()}
      </DreiText>

      {/* Base platform */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[2, 2.2, 0.1, 32]} />
        <meshStandardMaterial
          color="#1a1a2e"
          emissive={color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}
