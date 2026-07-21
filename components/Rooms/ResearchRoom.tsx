'use client';

import { Text as DreiText } from '@react-three/drei';

export default function ResearchRoom() {
  return (
    <group position={[0, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#0d1117" roughness={0.4} metalness={0.6} />
      </mesh>

      <DreiText position={[0, 5, -7]} fontSize={0.8} color="#8b5cf6" anchorX="center">
        RESEARCH
      </DreiText>

      {/* Research display - holographic papers */}
      {[
        { title: 'Real-time Neural Style Transfer for WebGL', year: '2023', venue: 'IEEE VIS' },
        { title: 'GPU-Accelerated Particle Physics on the Web', year: '2024', venue: 'SIGGRAPH' },
        { title: 'Efficient LOD Systems for Web3D Applications', year: '2024', venue: 'Web3D Conf' },
      ].map((paper, i) => (
        <group key={i} position={[(i - 1) * 4, 2.5, -5]}>
          <mesh>
            <boxGeometry args={[3, 3.5, 0.05]} />
            <meshStandardMaterial
              color="#1a1a2e"
              emissive="#8b5cf6"
              emissiveIntensity={0.05}
              transparent
              opacity={0.8}
            />
          </mesh>
          <DreiText position={[0, 1, 0.04]} fontSize={0.14} color="#8b5cf6" anchorX="center" maxWidth={2.5} textAlign="center">
            {paper.title}
          </DreiText>
          <DreiText position={[0, -0.5, 0.04]} fontSize={0.1} color="#a0a0b8" anchorX="center">
            {paper.venue} · {paper.year}
          </DreiText>

          {/* Abstract lines (decorative) */}
          {[0, 1, 2, 3, 4].map((line) => (
            <mesh key={line} position={[0, -0.2 - line * 0.15, 0.03]}>
              <boxGeometry args={[2.2, 0.03, 0.01]} />
              <meshStandardMaterial color="#333" />
            </mesh>
          ))}
        </group>
      ))}

      <pointLight position={[0, 5, 0]} intensity={0.8} color="#8b5cf6" distance={15} />
      <ambientLight intensity={0.15} />
    </group>
  );
}
