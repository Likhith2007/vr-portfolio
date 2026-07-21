'use client';

import { type ReactNode, type HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glowColor?: string;
  hoverable?: boolean;
}

export default function Card({
  children,
  glowColor = 'var(--neon-cyan)',
  hoverable = true,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`glass-panel p-6 ${className}`}
      style={{
        borderColor: `color-mix(in srgb, ${glowColor} 20%, transparent)`,
        transition: 'all 0.3s ease',
        ...(hoverable
          ? {}
          : {}),
      }}
      onMouseEnter={(e) => {
        if (!hoverable) return;
        const el = e.currentTarget;
        el.style.borderColor = `color-mix(in srgb, ${glowColor} 50%, transparent)`;
        el.style.boxShadow = `0 0 15px color-mix(in srgb, ${glowColor} 15%, transparent), inset 0 0 15px color-mix(in srgb, ${glowColor} 5%, transparent)`;
        el.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        if (!hoverable) return;
        const el = e.currentTarget;
        el.style.borderColor = `color-mix(in srgb, ${glowColor} 20%, transparent)`;
        el.style.boxShadow = 'none';
        el.style.transform = 'translateY(0)';
      }}
      {...props}
    >
      {children}
    </div>
  );
}
