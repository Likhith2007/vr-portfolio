'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text as DreiText } from '@react-three/drei';
import * as THREE from 'three';
import { hologramVertexShader, hologramFragmentShader } from '@/shaders/hologram';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function ProjectCard({ project, position = [0, 0, 0], rotation = [0, 0, 0] }: ProjectCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [hovered, setHovered] = useState(false);

  const uniforms = useRef({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#00f5ff') },
    uOpacity: { value: 0.8 },
  });

  useFrame(({ clock }, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 2) * 0.05;
      
      // Hover scale and rotation effect
      const targetScale = hovered ? 1.05 : 1;
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 5)
      );
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
      {/* Holographic panel */}
      <mesh>
        <planeGeometry args={[2.5, 3.5, 32, 32]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={hologramVertexShader}
          fragmentShader={hologramFragmentShader}
          uniforms={uniforms.current}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Frame border */}
      <mesh position={[0, 0, 0.01]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(2.5, 3.5)]} />
        <lineBasicMaterial color={hovered ? '#ff00ff' : '#00f5ff'} linewidth={2} />
      </mesh>

      {/* Content */}
      <DreiText position={[0, 1.2, 0.02]} fontSize={0.2} color="#ffffff" anchorX="center">
        {project.title}
      </DreiText>
      
      <DreiText
        position={[0, 0.2, 0.02]}
        fontSize={0.12}
        color="#a0a0b8"
        maxWidth={2.2}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        {project.description}
      </DreiText>

      {/* Tech stack tags */}
      <group position={[0, -1.2, 0.02]}>
        {project.techStack.slice(0, 3).map((tech, i) => (
          <DreiText
            key={tech}
            position={[(i - 1) * 0.8, 0, 0]}
            fontSize={0.1}
            color="#00f5ff"
            anchorX="center"
          >
            {tech}
          </DreiText>
        ))}
      </group>
    </group>
  );
}
