'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/components/UI/Loader';
import HUD from '@/components/UI/HUD';
import Crosshair from '@/components/UI/Crosshair';
import Navigation from '@/components/UI/Navigation';
import MiniMap from '@/components/UI/MiniMap';
import RecruiterAI from '@/components/AI/RecruiterAI';
import VoiceAssistant from '@/components/AI/VoiceAssistant';
import ChatPanel from '@/components/AI/ChatPanel';
import IntroSequence from '@/components/Theatre/IntroSequence';

// Dynamically import the 3D scene to avoid SSR issues with Three.js
const MainScene = dynamic(() => import('@/components/MainScene'), {
  ssr: false,
  loading: () => null,
});

import { useTeleportStore } from '@/hooks/useTeleport';

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const setRoom = useTeleportStore((state) => state.setRoom);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    setRoom('lobby');
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* 1. Loading Screen */}
      {!loadingComplete && <Loader onComplete={() => setLoadingComplete(true)} />}

      {loadingComplete && !introComplete && (
        <IntroSequence onComplete={handleIntroComplete} />
      )}

      {/* 3. The 3D World */}
      {loadingComplete && (
        <div className="absolute inset-0 z-0">
          <MainScene introComplete={introComplete} />
        </div>
      )}

      {/* 4. Overlay UI (HUD, Nav, AI) - Only show after intro */}
      {introComplete && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <HUD />
          <Crosshair />
          
          <div className="pointer-events-auto">
            <Navigation />
            <MiniMap />
            <ChatPanel />
            <VoiceAssistant />
          </div>
        </div>
      )}
    </main>
  );
}
