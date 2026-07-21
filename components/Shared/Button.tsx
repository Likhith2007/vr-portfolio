'use client';

import { type ReactNode, type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glowing?: boolean;
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  glowing = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = `
    relative inline-flex items-center justify-center gap-2
    font-medium tracking-wider uppercase
    transition-all duration-300 ease-out
    border rounded-md cursor-pointer
    disabled:opacity-40 disabled:cursor-not-allowed
    focus-visible:outline-2 focus-visible:outline-offset-2
  `;

  const variants = {
    primary: `
      bg-transparent border-[var(--neon-cyan)] text-[var(--neon-cyan)]
      hover:bg-[var(--neon-cyan)] hover:text-[var(--bg-void)]
      hover:shadow-[var(--glow-cyan)]
    `,
    secondary: `
      bg-transparent border-[var(--neon-magenta)] text-[var(--neon-magenta)]
      hover:bg-[var(--neon-magenta)] hover:text-[var(--bg-void)]
      hover:shadow-[var(--glow-magenta)]
    `,
    ghost: `
      bg-transparent border-[var(--border-subtle)] text-[var(--text-secondary)]
      hover:border-[var(--neon-cyan)] hover:text-[var(--neon-cyan)]
    `,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  const glowStyle = glowing
    ? 'shadow-[var(--glow-cyan)] animate-[glowBreathe_3s_ease-in-out_infinite]'
    : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${glowStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
