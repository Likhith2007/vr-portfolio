'use client';

import { useState, useEffect } from 'react';
import { createFakeLoadingSequence, type LoadingState } from '@/utils/loading';

export default function Loader({ onComplete }: { onComplete?: () => void }) {
  const [state, setState] = useState<LoadingState>({
    isLoading: true,
    progress: 0,
    message: 'Initializing...',
    phase: 'init',
  });

  useEffect(() => {
    const cancel = createFakeLoadingSequence((newState) => {
      setState(newState);
      if (!newState.isLoading) {
        setTimeout(() => onComplete?.(), 500);
      }
    }, 3000);

    return cancel;
  }, [onComplete]);

  if (!state.isLoading && state.progress >= 1) return null;

  const percent = Math.round(state.progress * 100);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-loader)' as unknown as number,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-void)',
        fontFamily: 'var(--font-display)',
        transition: 'opacity 0.5s ease',
        opacity: state.progress >= 1 ? 0 : 1,
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: 'var(--neon-cyan)',
          textShadow: '0 0 20px #00f5ff, 0 0 40px #00f5ff66',
          letterSpacing: '0.2em',
          marginBottom: '2rem',
        }}
      >
        VR PORTFOLIO
      </h1>

      {/* Progress bar container */}
      <div
        style={{
          width: '320px',
          height: '3px',
          background: 'var(--bg-panel)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Progress fill */}
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))',
            borderRadius: 'var(--radius-full)',
            transition: 'width 0.1s ease',
            boxShadow: '0 0 10px var(--neon-cyan)',
          }}
        />
      </div>

      {/* Progress text */}
      <div
        style={{
          marginTop: '1rem',
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
          color: 'var(--text-secondary)',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        <span>{state.message}</span>
        <span style={{ color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)' }}>
          {percent}%
        </span>
      </div>

      {/* Decorative scanline */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)',
          animation: 'scanline 4s linear infinite',
          opacity: 0.3,
        }}
      />
    </div>
  );
}
