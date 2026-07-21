import type { AnimationConfig } from '@/types';

/**
 * Lobby scene animation configs.
 */
export const lobbyAnimations: Record<string, AnimationConfig> = {
  portalIdle: {
    name: 'portalIdle',
    duration: 3.0,
    repeat: -1,
    yoyo: true,
    easing: 'easeInOutSine',
  },
  portalActivate: {
    name: 'portalActivate',
    duration: 0.8,
    easing: 'easeOutBack',
  },
  portalHover: {
    name: 'portalHover',
    duration: 0.3,
    easing: 'easeOutCubic',
  },
  floorGridPulse: {
    name: 'floorGridPulse',
    duration: 2.0,
    repeat: -1,
    easing: 'easeInOutSine',
  },
  teleporterCharge: {
    name: 'teleporterCharge',
    duration: 1.5,
    easing: 'easeInExpo',
  },
  lobbyFadeIn: {
    name: 'lobbyFadeIn',
    duration: 1.0,
    delay: 0.2,
    easing: 'easeOutCubic',
  },
};
