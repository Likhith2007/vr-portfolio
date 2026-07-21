'use client';

import { useState, useEffect } from 'react';
import { Text as DreiText } from '@react-three/drei';
import { profile } from '@/data/profile';

const terminalText = `> INITIALIZING SYSTEM...
> CONNECTING TO HOST...
> SECURE CONNECTION ESTABLISHED.
>
> USER: IMANDI LIKHITH
> STATUS: ONLINE
> ROLE: AI/ML ENGINEER | FULL-STACK DEVELOPER
>
> LOADING PROFILE...
> ANALYZING EXPERIENCE...
> BUILDING KNOWLEDGE GRAPH...
>
> Hello, I'm Likhith — a passionate AI Engineer and Software Developer
> focused on building intelligent, scalable, and production-ready systems.
>
> My work spans Large Language Models (LLMs), Agentic AI, Retrieval-Augmented
> Generation (RAG), Deep Learning, Computer Vision, Full-Stack Development,
> and Distributed Systems.
>
> I enjoy transforming ambitious ideas into real-world products, whether it's
> training AI models, developing cloud-native applications, designing backend
> architectures, or creating immersive user experiences.
>
> CURRENT MISSION:
> • Building AI-powered products
> • Exploring Agentic AI & Autonomous Systems
> • Researching Computer Vision & Thermal AI
> • Creating innovative hackathon solutions
> • Learning scalable system design
>
> ACHIEVEMENTS DETECTED...
> ✓ Multiple National Hackathon Winner
> ✓ AI Research Enthusiast
> ✓ Open Source Contributor
> ✓ Full-Stack Developer
>
> SYSTEM STATUS:
> READY FOR NEXT CHALLENGE.`;

function TypewriterText({ text, maxLines = 14, ...props }: any) {
  const [displayedText, setDisplayedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        i++;
        const currentSubstring = text.substring(0, i);
        // Split by newlines and keep only the last 'maxLines'
        const lines = currentSubstring.split('\n');
        if (lines.length > maxLines) {
          setDisplayedText(lines.slice(lines.length - maxLines).join('\n'));
        } else {
          setDisplayedText(currentSubstring);
        }
      } else {
        clearInterval(typingInterval);
      }
    }, 20); // Extremely fast for lots of text

    return () => clearInterval(typingInterval);
  }, [text, maxLines]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 400); // Blink speed
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <DreiText {...props}>
      {`${displayedText}${cursorVisible ? '_' : ' '}`}
    </DreiText>
  );
}

export default function AboutRoom() {
  return (
    <group position={[0, 0, 0]}>
      {/* Room floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#0d1117" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Title */}
      <DreiText position={[0, 5, -7]} fontSize={0.8} color="#00ff88" anchorX="center">
        ABOUT ME
      </DreiText>

      {/* Terminal window background */}
      <mesh position={[0, 2.0, -6.5]}>
        <planeGeometry args={[14, 5.5]} />
        <meshBasicMaterial color="#050505" transparent opacity={0.85} />
      </mesh>
      
      {/* Terminal neon outline */}
      <mesh position={[0, 2.0, -6.49]}>
        <boxGeometry args={[14.1, 5.6, 0.01]} />
        <meshBasicMaterial color="#00ff88" wireframe />
      </mesh>

      {/* Typing Terminal Text */}
      <TypewriterText
        text={terminalText}
        position={[-6.5, 4.2, -6.4]}
        fontSize={0.22}
        color="#00ff88" // Cyberpunk terminal hacker green
        maxWidth={13}
        textAlign="left"
        anchorX="left"
        anchorY="top"
      />

      {/* Ambient light */}
      <pointLight position={[0, 5, 0]} intensity={0.8} color="#00f5ff" distance={15} />
      <ambientLight intensity={0.2} />
    </group>
  );
}
