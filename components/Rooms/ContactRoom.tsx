'use client';

import { Text as DreiText } from '@react-three/drei';
import { profile } from '@/data/profile';

export default function ContactRoom() {
  return (
    <group position={[0, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#0d1117" roughness={0.4} metalness={0.6} />
      </mesh>

      <DreiText position={[0, 5, -7]} fontSize={0.8} color="#ff6b6b" anchorX="center">
        CONTACT
      </DreiText>

      {/* Contact form mockup - floating panels */}
      <group position={[0, 2.5, -4]}>
        {/* Main panel */}
        <mesh>
          <boxGeometry args={[8, 5, 0.1]} />
          <meshStandardMaterial color="#1a1a2e" emissive="#ff6b6b" emissiveIntensity={0.03} />
        </mesh>

        <DreiText position={[0, 1.8, 0.06]} fontSize={0.3} color="#ff6b6b" anchorX="center">
          GET IN TOUCH
        </DreiText>

        <DreiText position={[0, 1.2, 0.06]} fontSize={0.15} color="#a0a0b8" anchorX="center">
          Let&apos;s build something amazing together
        </DreiText>

        {/* Email display */}
        <group position={[0, 0.3, 0.06]}>
          <DreiText position={[0, 0, 0]} fontSize={0.12} color="#606078" anchorX="center">
            EMAIL
          </DreiText>
          <DreiText position={[0, -0.3, 0]} fontSize={0.18} color="#00f5ff" anchorX="center">
            {profile.email}
          </DreiText>
        </group>

        {/* Location */}
        <group position={[0, -0.6, 0.06]}>
          <DreiText position={[0, 0, 0]} fontSize={0.12} color="#606078" anchorX="center">
            LOCATION
          </DreiText>
          <DreiText position={[0, -0.3, 0]} fontSize={0.18} color="#00f5ff" anchorX="center">
            {profile.location}
          </DreiText>
        </group>

        {/* Social links */}
        <group position={[0, -1.5, 0.06]}>
          {profile.socials.map((social, i) => (
            <DreiText
              key={social.platform}
              position={[(i - (profile.socials.length - 1) / 2) * 2.5, 0, 0]}
              fontSize={0.15}
              color="#ff6b6b"
              anchorX="center"
            >
              {social.platform}
            </DreiText>
          ))}
        </group>
      </group>

      <pointLight position={[0, 5, 0]} intensity={0.8} color="#ff6b6b" distance={15} />
      <ambientLight intensity={0.15} />
    </group>
  );
}
