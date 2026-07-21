'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, BakeShadows, SoftShadows } from '@react-three/drei';
import { EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

import { useTeleportStore } from '@/hooks/useTeleport';
import { getPortalRooms } from '@/lib/scene';

// Scenes & Environments
import TheatreScene from '@/components/Theatre/TheatreScene';
import LobbyScene from '@/components/Lobby/LobbyScene';
import Sky from '@/components/Environment/Sky';
import Fog from '@/components/Environment/Fog';
import Stars from '@/components/Environment/Stars';
import CustomSkybox from '@/components/Environment/CustomSkybox';

// Rooms
import AboutRoom from '@/components/Rooms/AboutRoom';
import ProjectRoom from '@/components/Rooms/ProjectRoom';
import SkillsRoom from '@/components/Rooms/SkillsRoom';
import ExperienceRoom from '@/components/Rooms/ExperienceRoom';
import AwardsRoom from '@/components/Rooms/AwardsRoom';
import ResearchRoom from '@/components/Rooms/ResearchRoom';
import ContactRoom from '@/components/Rooms/ContactRoom';

// Avatar & Camera
import AvatarController from '@/components/Avatar/AvatarController';
import Avatar from '@/components/Avatar/Avatar';
import CameraRig from '@/components/Camera/CameraRig';
import { CameraAnimation } from '@/components/Camera/CameraAnimation';
import { useThree } from '@react-three/fiber';

function CinematicCamera({ introComplete }: { introComplete: boolean }) {
  const { camera } = useThree();
  useEffect(() => {
    if (!introComplete) {
      camera.position.set(0, 3, 20); // Positioned back in the lobby
      camera.lookAt(0, 1.5, 0); // Looking at the teleporter/portals
    }
  }, [camera, introComplete]);
  return null;
}

import Bloom from '@/components/Effects/Bloom';
import Vignette from '@/components/Effects/Vignette';
import DOF from '@/components/Effects/DOF';
import FilmGrain from '@/components/Effects/FilmGrain';
import TeleportWarp from '@/components/Effects/TeleportWarp';
import { ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

interface MainSceneProps {
  introComplete: boolean;
}

export default function MainScene({ introComplete }: MainSceneProps) {
  const { currentRoom, setRoom } = useTeleportStore();
  
  // Ref for the avatar group so the camera can follow it
  const [avatarRef, setAvatarRef] = useState<THREE.Object3D | null>(null);

  // When intro completes, maybe we spawn the avatar in the Lobby?
  // Actually, we should probably start in the theatre, and then teleport to the lobby.
  // For now, if not introComplete, we are in Theatre.
  const isTheatre = currentRoom === 'theatre' && !introComplete;

  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 10], fov: 60, near: 0.1, far: 1000 }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <color attach="background" args={['#050510']} />
      <Fog />
      
      <Suspense fallback={null}>
        {/* Environment */}
        <Sky />
        <Stars count={2000} radius={200} />

        {/* Camera Orchestration */}
        <CinematicCamera introComplete={introComplete} />
        <CameraAnimation />
        {/* If intro is complete, camera follows avatar. Otherwise it's static/animated by intro */}
        {introComplete && avatarRef && (
          <CameraRig followTarget={avatarRef} enabled={true} />
        )}

        {/* The Avatar (Player) */}
        {introComplete ? (
          <AvatarController ref={setAvatarRef} />
        ) : null}

        {/* Theatre Scene (Intro) */}
        {currentRoom === 'theatre' && (
          <TheatreScene visible={true} introComplete={introComplete} />
        )}

        {/* Main Hub & Rooms */}
        <group>
          {introComplete && currentRoom === 'lobby' && <LobbyScene onPortalClick={(roomId) => setRoom(roomId)} />}
          {introComplete && currentRoom === 'about' && <AboutRoom />}
            {currentRoom === 'projects' && <ProjectRoom />}
            {currentRoom === 'skills' && <SkillsRoom />}
            {currentRoom === 'experience' && <ExperienceRoom />}
            {currentRoom === 'awards' && <AwardsRoom />}
            {currentRoom === 'research' && <ResearchRoom />}
            {currentRoom === 'contact' && <ContactRoom />}
        </group>

        {/* Post Processing */}
        <TeleportWarp />
        <EffectComposer multisampling={0}>
          <Bloom intensity={1.5} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
          <Vignette darkness={0.5} offset={0.3} />
          <FilmGrain opacity={0.1} />
        </EffectComposer>

        <Preload all />
        <BakeShadows />
        {/* <SoftShadows size={20} samples={10} focus={0.5} /> */}
      </Suspense>
    </Canvas>
  );
}
