'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTeleportStore } from '@/hooks/useTeleport';
import { damp } from '@/utils/math';

export default function TeleportWarp() {
  const { camera } = useThree();
  const isTransitioning = useTeleportStore((state) => state.isTransitioning);
  const warpIntensity = useRef(0);
  const groupRef = useRef<THREE.Group>(null);
  
  const defaultFov = 60;
  
  // Create warp particles (streaks of light)
  const particleCount = 200;
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 8;
      const length = 5 + Math.random() * 20;
      temp.push({
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          -Math.random() * 50
        ),
        scale: new THREE.Vector3(0.05, 0.05, length),
        speed: 20 + Math.random() * 40
      });
    }
    return temp;
  }, []);

  useFrame((_, delta) => {
    const targetIntensity = isTransitioning ? 1 : 0;
    warpIntensity.current = damp(warpIntensity.current, targetIntensity, 4, delta);
    
    // 1. Hyperspace FOV stretch
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = defaultFov + warpIntensity.current * 60; // Stretch FOV up to 120
      camera.updateProjectionMatrix();
    }

    // 2. Animate warp tunnel particles
    if (groupRef.current) {
      // Position the tunnel right on the camera, looking where the camera looks
      groupRef.current.position.copy(camera.position);
      groupRef.current.quaternion.copy(camera.quaternion);
      
      // Scale based on warp intensity
      groupRef.current.scale.z = 1 + warpIntensity.current * 5;
      
      // Move children
      groupRef.current.children.forEach((child, i) => {
        const p = particles[i];
        child.position.z += p.speed * delta * warpIntensity.current;
        if (child.position.z > 10) {
          child.position.z = -50;
        }
        
        // Fade opacity based on intensity
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.opacity = warpIntensity.current * 0.8;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position} scale={p.scale}>
          <boxGeometry />
          <meshBasicMaterial 
            color={i % 2 === 0 ? "#00f5ff" : "#ff00ea"} 
            transparent 
            opacity={0} 
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
