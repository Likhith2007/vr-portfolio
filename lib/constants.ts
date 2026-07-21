import type { RoomConfig, QualityLevel } from '@/types';

// ─── Room Positions (arranged in a circle around the lobby) ───────────────────

export const ROOM_CONFIGS: RoomConfig[] = [
  {
    id: 'theatre',
    label: 'Theatre',
    description: 'Cinematic intro experience',
    position: [0, 0, -50],
    rotation: [0, 0, 0],
    color: '#ff2d55',
    icon: '🎬',
  },
  {
    id: 'lobby',
    label: 'Lobby',
    description: 'Central hub',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    color: '#00f5ff',
    icon: '🏠',
  },
  {
    id: 'about',
    label: 'About',
    description: 'Learn about me',
    position: [20, 0, 0],
    rotation: [0, -Math.PI / 2, 0],
    color: '#00f5ff',
    icon: '👤',
  },
  {
    id: 'projects',
    label: 'Projects',
    description: 'Explore my work',
    position: [14.14, 0, 14.14],
    rotation: [0, -Math.PI / 4, 0],
    color: '#ff00ff',
    icon: '🚀',
  },
  {
    id: 'skills',
    label: 'Skills',
    description: 'Technical abilities',
    position: [0, 0, 20],
    rotation: [0, 0, 0],
    color: '#00ff88',
    icon: '⚡',
  },
  {
    id: 'experience',
    label: 'Experience',
    description: 'Professional journey',
    position: [-14.14, 0, 14.14],
    rotation: [0, Math.PI / 4, 0],
    color: '#ffaa00',
    icon: '💼',
  },
  {
    id: 'awards',
    label: 'Awards',
    description: 'Achievements & recognition',
    position: [-20, 0, 0],
    rotation: [0, Math.PI / 2, 0],
    color: '#ffd700',
    icon: '🏆',
  },
  {
    id: 'research',
    label: 'Research',
    description: 'Academic work & publications',
    position: [-14.14, 0, -14.14],
    rotation: [0, (3 * Math.PI) / 4, 0],
    color: '#8b5cf6',
    icon: '🔬',
  },
  {
    id: 'contact',
    label: 'Contact',
    description: 'Get in touch',
    position: [14.14, 0, -14.14],
    rotation: [0, (-3 * Math.PI) / 4, 0],
    color: '#ff6b6b',
    icon: '📧',
  },
];

// ─── Colors ───────────────────────────────────────────────────────────────────

export const COLORS = {
  neonCyan: '#00f5ff',
  neonMagenta: '#ff00ff',
  neonPurple: '#8b5cf6',
  neonAmber: '#ffaa00',
  neonGreen: '#00ff88',
  neonPink: '#ff2d55',
  neonGold: '#ffd700',
  neonRed: '#ff6b6b',
  bgDark: '#0a0a0f',
  bgPanel: '#111118',
  bgCard: '#1a1a2e',
  textPrimary: '#e0e0e0',
  textSecondary: '#a0a0b0',
} as const;

// ─── Camera ───────────────────────────────────────────────────────────────────

export const CAMERA_DEFAULTS = {
  fov: 60,
  near: 0.1,
  far: 1000,
  position: [0, 2, 10] as [number, number, number],
  lookAt: [0, 1, 0] as [number, number, number],
};

export const CAMERA_TRANSITION_DURATION = 2.0; // seconds

// ─── Avatar ───────────────────────────────────────────────────────────────────

export const AVATAR_DEFAULTS = {
  moveSpeed: 5,
  runMultiplier: 1.8,
  rotationSpeed: 3,
  height: 1.7,
  modelScale: 1,
};

// ─── Animation ────────────────────────────────────────────────────────────────

export const ANIMATION_DURATIONS = {
  introTotal: 6,
  curtainOpen: 2,
  projectorOn: 1,
  titleReveal: 1.5,
  portalActivate: 0.8,
  roomTransition: 1.5,
  fadeIn: 0.5,
  fadeOut: 0.3,
} as const;

// ─── Physics ──────────────────────────────────────────────────────────────────

export const PHYSICS = {
  gravity: -9.81,
  groundLevel: 0,
  portalTriggerRadius: 2.5,
  interactionRadius: 3,
} as const;

// ─── Quality Presets ──────────────────────────────────────────────────────────

export const QUALITY_SETTINGS: Record<
  QualityLevel,
  {
    shadowMapSize: number;
    particleCount: number;
    postProcessing: boolean;
    antialiasing: boolean;
    pixelRatio: number;
  }
> = {
  low: {
    shadowMapSize: 512,
    particleCount: 100,
    postProcessing: false,
    antialiasing: false,
    pixelRatio: 0.75,
  },
  medium: {
    shadowMapSize: 1024,
    particleCount: 500,
    postProcessing: true,
    antialiasing: false,
    pixelRatio: 1,
  },
  high: {
    shadowMapSize: 2048,
    particleCount: 1000,
    postProcessing: true,
    antialiasing: true,
    pixelRatio: 1,
  },
  ultra: {
    shadowMapSize: 4096,
    particleCount: 2000,
    postProcessing: true,
    antialiasing: true,
    pixelRatio: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1,
  },
};
