'use client';

import { Text as DreiText } from '@react-three/drei';
import { experience } from '@/data/experience';

export default function ExperienceRoom() {
  return (
    <group position={[0, 0, 0]}>
      {/* Void Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#020205" roughness={0.9} metalness={0.1} />
      </mesh>

      <DreiText position={[0, 7, -6]} fontSize={0.8} color="#ffaa00" anchorX="center">
        EXPERIENCE
      </DreiText>

      {/* Timeline */}
      <group position={[0, 1.5, 0]}>
        {experience.map((exp, i) => {
          // Increase vertical spacing to make room for bullet points
          const y = 3.5 - i * 3.5;
          return (
            <group key={exp.id} position={[0, y, -5]}>
              {/* Timeline line */}
              <mesh position={[-4.5, 0, 0]}>
                <boxGeometry args={[0.02, 3.5, 0.02]} />
                <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={0.3} />
              </mesh>

              {/* Timeline dot */}
              <mesh position={[-4.5, 1.0, 0]}>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={0.5} />
              </mesh>

              {/* Card - Holographic Glass */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[8.5, 2.8, 0.1]} />
                <meshPhysicalMaterial 
                  color="#0a0a1a" 
                  transmission={0.9} 
                  opacity={1} 
                  transparent
                  roughness={0.1} 
                  thickness={0.5}
                  emissive="#ffaa00" 
                  emissiveIntensity={0.1} 
                />
              </mesh>

              {/* Header */}
              <DreiText position={[-3.8, 1.0, 0.06]} fontSize={0.22} color="#ffaa00" anchorX="left">
                {exp.role}
              </DreiText>
              
              <DreiText position={[-3.8, 0.65, 0.06]} fontSize={0.15} color="#a0a0b8" anchorX="left">
                {exp.company}
              </DreiText>

              <DreiText position={[3.8, 1.0, 0.06]} fontSize={0.12} color="#ffaa00" anchorX="right">
                {exp.startDate} — {exp.endDate}
              </DreiText>
              
              <DreiText position={[3.8, 0.65, 0.06]} fontSize={0.12} color="#606078" anchorX="right">
                {exp.location}
              </DreiText>

              {/* Resume Bullet Points */}
              <group position={[-3.8, 0.2, 0.06]}>
                {exp.highlights.map((point, idx) => (
                  <DreiText 
                    key={idx} 
                    position={[0.2, -idx * 0.4, 0]} 
                    fontSize={0.14} 
                    color="#e0e0e0" 
                    anchorX="left" 
                    anchorY="top"
                    maxWidth={7.5} 
                    lineHeight={1.4}
                  >
                    • {point}
                  </DreiText>
                ))}
              </group>

            </group>
          );
        })}
      </group>

      <pointLight position={[0, 5, 0]} intensity={1.2} color="#ffaa00" distance={20} />
      <ambientLight intensity={0.2} />
    </group>
  );
}
