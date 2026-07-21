'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Portal from './Portal';
import Floor from './Floor';
import Teleporter from './Teleporter';
import NeonLights from '@/components/Lighting/NeonLights';
import { getPortalRooms, getPortalPosition, getPortalRotation } from '@/lib/scene';
import type { RoomId } from '@/types';
import CustomSkybox from '@/components/Environment/CustomSkybox';

interface LobbySceneProps {
  visible?: boolean;
  onPortalClick?: (roomId: RoomId) => void;
}


export default function LobbyScene({ visible = true, onPortalClick }: LobbySceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const portalRooms = getPortalRooms();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.visible = visible;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Custom user background skybox just for the lobby */}
      <CustomSkybox />

      {/* Reflective floor */}
      <Floor />

      {/* Central teleporter pad */}
      <Teleporter position={[0, 0.01, 0]} />

      {/* Portals arranged in a circle */}
      {portalRooms.map((room, index) => {
        const position = getPortalPosition(index, portalRooms.length, 12);
        const rotation = getPortalRotation(index, portalRooms.length);
        return (
          <Portal
            key={room.id}
            roomId={room.id}
            label={room.label}
            color={room.color}
            position={position}
            rotation={rotation}
            icon={room.icon}
            onClick={() => onPortalClick?.(room.id)}
          />
        );
      })}

      {/* Ambient neon lights */}
      <NeonLights />

      {/* Central pillar of light */}
      <pointLight position={[0, 8, 0]} intensity={0.5} color="#00f5ff" distance={30} />
      <ambientLight intensity={0.15} />
    </group>
  );
}
