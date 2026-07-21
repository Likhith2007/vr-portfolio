'use client';

import { useTeleportStore } from '@/hooks/useTeleport';
import { getPortalRooms } from '@/lib/scene';

export default function MiniMap() {
  const { currentRoom } = useTeleportStore();
  const rooms = getPortalRooms();

  const mapSize = 120;
  const radius = 40;

  return (
    <div
      style={{
        position: 'fixed',
        top: 'var(--space-xl)',
        right: 'var(--space-xl)',
        width: `${mapSize}px`,
        height: `${mapSize}px`,
        zIndex: 'var(--z-hud)' as unknown as number,
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        WebkitBackdropFilter: 'blur(var(--glass-blur))',
        border: '1px solid var(--glass-border)',
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    >
      {/* Center point (lobby) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: currentRoom === 'lobby' ? '8px' : '5px',
          height: currentRoom === 'lobby' ? '8px' : '5px',
          borderRadius: '50%',
          background: currentRoom === 'lobby' ? 'var(--neon-cyan)' : 'var(--text-muted)',
          boxShadow: currentRoom === 'lobby' ? '0 0 8px var(--neon-cyan)' : 'none',
        }}
      />

      {/* Room dots arranged in a circle */}
      {rooms.map((room, index) => {
        const angle = (index / rooms.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius + mapSize / 2;
        const y = Math.sin(angle) * radius + mapSize / 2;
        const isActive = currentRoom === room.id;

        return (
          <div
            key={room.id}
            title={room.label}
            style={{
              position: 'absolute',
              left: `${x}px`,
              top: `${y}px`,
              transform: 'translate(-50%, -50%)',
              width: isActive ? '8px' : '4px',
              height: isActive ? '8px' : '4px',
              borderRadius: '50%',
              background: isActive ? room.color : 'var(--text-muted)',
              boxShadow: isActive ? `0 0 8px ${room.color}` : 'none',
              transition: 'all 0.3s ease',
            }}
          />
        );
      })}

      {/* Connecting lines (subtle) */}
      <svg
        width={mapSize}
        height={mapSize}
        style={{ position: 'absolute', top: 0, left: 0, opacity: 0.15 }}
      >
        {rooms.map((_, index) => {
          const angle = (index / rooms.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * radius + mapSize / 2;
          const y = Math.sin(angle) * radius + mapSize / 2;
          return (
            <line
              key={index}
              x1={mapSize / 2}
              y1={mapSize / 2}
              x2={x}
              y2={y}
              stroke="var(--neon-cyan)"
              strokeWidth="0.5"
            />
          );
        })}
      </svg>
    </div>
  );
}
