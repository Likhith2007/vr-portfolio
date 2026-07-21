'use client';

import { useState, useCallback } from 'react';
import Text from '@/components/Shared/Text';
import Button from '@/components/Shared/Button';
import { profile } from '@/data/profile';

interface IntroSequenceProps {
  onComplete: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [phase, setPhase] = useState<'title' | 'subtitle' | 'ready'>('title');

  const handleTitleDone = useCallback(() => {
    setTimeout(() => setPhase('subtitle'), 300);
  }, []);

  const handleSubtitleDone = useCallback(() => {
    setTimeout(() => setPhase('ready'), 500);
  }, []);

  return (
    <div
      className="intro-container"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 45,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at center, rgba(0,245,255,0.05) 0%, transparent 70%)',
        pointerEvents: phase === 'ready' ? 'auto' : 'none',
      }}
    >
      {/* Title */}
      <div style={{ marginBottom: '1rem' }}>
        <Text
          text={profile.name.toUpperCase()}
          effect="glitch"
          glitchDuration={800}
          as="h1"
          neon
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            fontWeight: 900,
            letterSpacing: '0.15em',
          }}
          onComplete={handleTitleDone}
        />
      </div>

      {/* Subtitle */}
      {(phase === 'subtitle' || phase === 'ready') && (
        <div style={{ marginBottom: '2rem' }}>
          <Text
            text={profile.title}
            effect="typewriter"
            typeSpeed={50}
            as="p"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9rem, 2vw, 1.3rem)',
              color: 'var(--text-secondary)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
            onComplete={handleSubtitleDone}
          />
        </div>
      )}

      {/* Enter button */}
      {phase === 'ready' && (
        <div className="animate-fade-in" style={{ pointerEvents: 'auto' }}>
          <Button variant="primary" size="lg" glowing onClick={onComplete}>
            ENTER PORTFOLIO
          </Button>
        </div>
      )}
    </div>
  );
}
