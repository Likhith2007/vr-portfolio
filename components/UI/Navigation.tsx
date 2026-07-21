'use client';

import { useTeleportStore } from '@/hooks/useTeleport';
import { getPortalRooms } from '@/lib/scene';
import type { RoomId } from '@/types';

export default function Navigation() {
  const { currentRoom, isTransitioning } = useTeleportStore();
  const teleportTo = useTeleportStore((s) => s.setRoom);
  const rooms = getPortalRooms();

  const handleNavigate = (roomId: RoomId) => {
    if (isTransitioning || currentRoom === roomId) return;
    teleportTo(roomId);
  };

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 'var(--space-xl)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 'var(--z-navigation)' as unknown as number,
        display: 'flex',
        gap: 'var(--space-xs)',
        padding: 'var(--space-sm)',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        WebkitBackdropFilter: 'blur(var(--glass-blur))',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-xl)',
      }}
    >
      {/* Lobby button */}
      <button
        onClick={() => handleNavigate('lobby')}
        disabled={isTransitioning}
        style={{
          padding: '8px 14px',
          background: currentRoom === 'lobby' ? 'var(--neon-cyan)' : 'transparent',
          color: currentRoom === 'lobby' ? 'var(--bg-void)' : 'var(--text-secondary)',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          fontFamily: 'var(--font-display)',
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        🏠 Lobby
      </button>

      <div style={{ width: '1px', background: 'var(--border-subtle)', margin: '4px 0' }} />

      {/* Room buttons */}
      {rooms.map((room) => (
        <button
          key={room.id}
          onClick={() => handleNavigate(room.id)}
          disabled={isTransitioning}
          title={room.description}
          style={{
            padding: '8px 12px',
            background: currentRoom === room.id ? room.color : 'transparent',
            color: currentRoom === room.id ? 'var(--bg-void)' : 'var(--text-secondary)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-display)',
            fontSize: '0.55rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
        >
          {room.icon} {room.label}
        </button>
      ))}
    </nav>
  );
}
