'use client';

import { Text as DreiText, Html } from '@react-three/drei';
import { FaGithub } from 'react-icons/fa';
import { projects } from '@/data/projects';

export default function ProjectRoom() {
  return (
    <group position={[0, 0, 0]}>
      {/* Room floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#0d1117" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Title */}
      <DreiText position={[0, 5.5, -6]} fontSize={0.8} color="#ff00ff" anchorX="center">
        PROJECTS
      </DreiText>

      {/* Project display panels */}
      {projects.map((project, i) => {
        // Wider curve to prevent overlapping text
        const angle = (i - 1.5) * 0.45; 
        const radius = 8;
        const x = Math.sin(angle) * radius;
        // Keep them mostly flat but slightly curved inward, pushed back to z=-6 at the center
        const z = -6 - (radius - Math.cos(angle) * radius);
        
        return (
          <group key={project.id} position={[x, 2.5, z]} rotation={[0, -angle, 0]}>
            {/* Panel background */}
            <mesh>
              <boxGeometry args={[3.2, 4.2, 0.1]} />
              <meshStandardMaterial
                color="#1a1a2e"
                emissive="#ff00ff"
                emissiveIntensity={0.05}
                metalness={0.5}
                roughness={0.5}
              />
            </mesh>

            {/* Project title */}
            <DreiText position={[0, 1.5, 0.06]} fontSize={0.22} color="#ff00ff" anchorX="center" maxWidth={3} textAlign="center">
              {project.title}
            </DreiText>

            {/* Description */}
            <DreiText
              position={[0, 0.2, 0.06]}
              fontSize={0.12}
              color="#a0a0b8"
              maxWidth={2.8}
              textAlign="center"
              anchorX="center"
              anchorY="middle"
            >
              {project.longDescription}
            </DreiText>

            {/* Tech stack */}
            <DreiText
              position={[0, -1.2, 0.06]}
              fontSize={0.1}
              color="#00f5ff"
              anchorX="center"
              maxWidth={3}
              textAlign="center"
            >
              {project.techStack.join(' • ')}
            </DreiText>

            {/* Github Logo using HTML */}
            <Html transform position={[0, -1.7, 0.06]} scale={0.5}>
              <a href={project.githubUrl} target="_blank" rel="noreferrer" style={{ color: '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
                <FaGithub size={40} />
                <span style={{ fontSize: '12px', marginTop: '4px', fontFamily: 'monospace' }}>View Code</span>
              </a>
            </Html>
          </group>
        );
      })}

      <pointLight position={[0, 5, 0]} intensity={0.8} color="#ff00ff" distance={15} />
      <ambientLight intensity={0.15} />
    </group>
  );
}
