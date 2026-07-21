'use client';

import { useEffect, useState, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function CustomSkybox() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const { camera } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    new THREE.TextureLoader().load(
      '/assests/images/user-bg.png', 
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(5, 1); 
        setTexture(tex);
      },
      undefined,
      (err) => console.log('Waiting for user to upload /assests/images/user-bg.png...')
    );
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      // Lock skybox to camera position so you can never walk out of it
      meshRef.current.position.copy(camera.position);
    }
  });

  if (!texture) return null;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[250, 64, 64]} />
      <meshBasicMaterial 
        map={texture} 
        side={THREE.BackSide} 
        toneMapped={false} 
        depthWrite={false}
        fog={false} 
      />
    </mesh>
  );
}
