'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text as DreiText, Line, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { skills } from '@/data/skills';
import type { Skill } from '@/types';

// Pseudo-random generator for consistent 3D positions
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Generate positions for all skills
const NODE_RADIUS = 18; // Massively increased to spread nodes far apart
const skillPositions: Record<string, THREE.Vector3> = {};
skills.forEach((skill, i) => {
  // Spherical distribution
  const phi = Math.acos(1 - 2 * seededRandom(i));
  const theta = Math.PI * 2 * seededRandom(i + 100);
  
  const x = NODE_RADIUS * Math.sin(phi) * Math.cos(theta);
  const y = (NODE_RADIUS * Math.sin(phi) * Math.sin(theta)) * 0.7; // Squash vertically a bit
  const z = NODE_RADIUS * Math.cos(phi);
  
  skillPositions[skill.id] = new THREE.Vector3(x, y, z);
});

// Build unique edges
const edges: { source: string; target: string; p1: THREE.Vector3; p2: THREE.Vector3; color: string }[] = [];
const edgeSet = new Set<string>();

skills.forEach((skill) => {
  if (skill.connections) {
    skill.connections.forEach((targetId) => {
      // Ensure unique bidirectional edges
      const edgeKey1 = `${skill.id}-${targetId}`;
      const edgeKey2 = `${targetId}-${skill.id}`;
      if (!edgeSet.has(edgeKey1) && !edgeSet.has(edgeKey2) && skillPositions[targetId]) {
        edgeSet.add(edgeKey1);
        edges.push({
          source: skill.id,
          target: targetId,
          p1: skillPositions[skill.id],
          p2: skillPositions[targetId],
          color: skill.color
        });
      }
    });
  }
});

function EnergyLine({ edge, activeNodes }: { edge: any; activeNodes: React.MutableRefObject<Set<string>> }) {
  const lineRef = useRef<any>(null);

  useFrame((_, delta) => {
    if (lineRef.current && lineRef.current.material) {
      const isActive = activeNodes.current.has(edge.source) || activeNodes.current.has(edge.target);
      
      // Speed up pulse if active
      const speed = isActive ? 4.0 : 1.0;
      lineRef.current.material.dashOffset -= delta * speed;
      
      // Glow brighter if active
      lineRef.current.material.color.set(isActive ? '#ffffff' : edge.color);
      lineRef.current.material.opacity = isActive ? 0.9 : 0.2;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={[edge.p1, edge.p2]}
      color={edge.color}
      lineWidth={2}
      dashed
      dashScale={2}
      dashSize={0.5}
      dashOffset={0}
      transparent
      opacity={0.2}
    />
  );
}

function SkillNode({ skill, pos, activeNodes }: { skill: Skill; pos: THREE.Vector3; activeNodes: React.MutableRefObject<Set<string>> }) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const textRef = useRef<any>(null);
  
  useFrame((_, delta) => {
    if (groupRef.current && materialRef.current && textRef.current) {
      const isActive = activeNodes.current.has(skill.id);
      
      // Smooth interpolation for scale pop
      const targetScale = isActive ? 1.8 : 1.0;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 10);

      materialRef.current.emissiveIntensity = isActive ? 4.0 : 0.5;
      textRef.current.fillOpacity = isActive ? 1.0 : 0.6;
    }
  });

  return (
    <group ref={groupRef} position={pos}>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          ref={materialRef}
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      <Billboard>
        <DreiText
          ref={textRef}
          position={[0, 0.8, 0]}
          fontSize={0.5}
          color={skill.color}
          anchorX="center"
        >
          {skill.name}
        </DreiText>
      </Billboard>
    </group>
  );
}

export default function SkillsRoom() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const activeNodes = useRef<Set<string>>(new Set());

  useFrame(() => {
    if (groupRef.current) {
      // Gently rotate the entire neural network cloud
      groupRef.current.rotation.y += 0.001;

      // Calculate proximities from camera to nodes
      activeNodes.current.clear();
      const cameraWorldPos = new THREE.Vector3();
      camera.getWorldPosition(cameraWorldPos);

      skills.forEach((skill) => {
        const localPos = skillPositions[skill.id];
        if (!localPos) return;
        
        // Transform local node position to world position using the group's matrix
        const nodeWorldPos = new THREE.Vector3().copy(localPos).applyMatrix4(groupRef.current!.matrixWorld);

        // Interaction radius - if the user walks within 10 units of a node
        if (cameraWorldPos.distanceTo(nodeWorldPos) < 10.0) { 
          activeNodes.current.add(skill.id);
          // Light up all connected neurons!
          skill.connections?.forEach(c => activeNodes.current.add(c));
        }
      });
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Void Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#020205" roughness={0.9} metalness={0.1} />
      </mesh>

      <DreiText position={[0, 8, -8]} fontSize={0.8} color="#00ff88" anchorX="center">
        NEURAL NETWORK
      </DreiText>

      {/* The Brain / Cloud */}
      <group ref={groupRef} position={[0, 4, -4]}>
        {/* Edges */}
        {edges.map((edge, i) => (
          <EnergyLine key={`edge-${i}`} edge={edge} activeNodes={activeNodes} />
        ))}

        {/* Nodes */}
        {skills.map((skill) => {
          const pos = skillPositions[skill.id];
          if (!pos) return null;
          return <SkillNode key={skill.id} skill={skill} pos={pos} activeNodes={activeNodes} />;
        })}
      </group>

      {/* Lights */}
      <pointLight position={[0, 5, 0]} intensity={1.5} color="#00f5ff" distance={25} />
      <ambientLight intensity={0.2} />
    </group>
  );
}
