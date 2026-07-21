'use client';

export default function Crosshair() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 'var(--z-crosshair)' as unknown as number,
        pointerEvents: 'none',
        width: '24px',
        height: '24px',
      }}
    >
      {/* Center dot */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '3px',
          height: '3px',
          borderRadius: '50%',
          background: 'var(--neon-cyan)',
          boxShadow: '0 0 6px var(--neon-cyan)',
        }}
      />

      {/* Top line */}
      <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '1px', height: '6px', background: 'var(--neon-cyan)', opacity: 0.6 }} />

      {/* Bottom line */}
      <div style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '1px', height: '6px', background: 'var(--neon-cyan)', opacity: 0.6 }} />

      {/* Left line */}
      <div style={{ position: 'absolute', top: '50%', left: '0', transform: 'translateY(-50%)', width: '6px', height: '1px', background: 'var(--neon-cyan)', opacity: 0.6 }} />

      {/* Right line */}
      <div style={{ position: 'absolute', top: '50%', right: '0', transform: 'translateY(-50%)', width: '6px', height: '1px', background: 'var(--neon-cyan)', opacity: 0.6 }} />
    </div>
  );
}
