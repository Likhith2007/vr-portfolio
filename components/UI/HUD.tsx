'use client';

import { useState, useEffect } from 'react';
import { useTeleportStore } from '@/hooks/useTeleport';

export default function HUD() {
  const { currentRoom } = useTeleportStore();
  const [fps, setFps] = useState(60);

  // Simple FPS counter
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const tick = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = now;
      }
      requestAnimationFrame(tick);
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  const roomLabel = currentRoom.charAt(0).toUpperCase() + currentRoom.slice(1);

  return (
    <div className="hud-overlay" style={{ pointerEvents: 'none' }}>
      {/* Top-left: Room name */}
      <div
        style={{
          position: 'absolute',
          top: 'var(--space-lg)',
          left: 'var(--space-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-xs)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          Current Room
        </span>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--neon-cyan)',
            textShadow: '0 0 10px #00f5ff66',
          }}
        >
          {roomLabel}
        </span>
      </div>

      {/* Top-right: FPS */}
      <div
        style={{
          position: 'absolute',
          top: 'var(--space-lg)',
          right: 'var(--space-lg)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: fps > 30 ? 'var(--neon-green)' : 'var(--neon-red)',
          opacity: 0.7,
        }}
      >
        {fps} FPS
      </div>

      {/* Bottom-center: Controls hint */}
      <div
        style={{
          position: 'absolute',
          bottom: 'var(--space-lg)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 'var(--space-md)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
        }}
      >
        <span>
          <kbd style={{ color: 'var(--text-secondary)', padding: '1px 4px', border: '1px solid var(--border-subtle)', borderRadius: '3px' }}>WASD</kbd> Move
        </span>
        <span>
          <kbd style={{ color: 'var(--text-secondary)', padding: '1px 4px', border: '1px solid var(--border-subtle)', borderRadius: '3px' }}>E</kbd> Interact
        </span>
        <span>
          <kbd style={{ color: 'var(--text-secondary)', padding: '1px 4px', border: '1px solid var(--border-subtle)', borderRadius: '3px' }}>ESC</kbd> Menu
        </span>
      </div>
    </div>
  );
}
