import type { AnimationConfig } from '@/types';

/**
 * Theatre scene animation configs.
 */
export const theatreAnimations: Record<string, AnimationConfig> = {
  curtainOpen: {
    name: 'curtainOpen',
    duration: 2.0,
    delay: 0.5,
    easing: 'easeInOutCubic',
  },
  projectorBeam: {
    name: 'projectorBeam',
    duration: 1.0,
    delay: 0,
    easing: 'easeOutExpo',
  },
  dustParticlesFadeIn: {
    name: 'dustParticlesFadeIn',
    duration: 2.0,
    delay: 1.5,
    easing: 'easeOutSine',
  },
  screenFlicker: {
    name: 'screenFlicker',
    duration: 0.3,
    repeat: 3,
    easing: 'linear',
  },
  seatAmbientGlow: {
    name: 'seatAmbientGlow',
    duration: 4.0,
    repeat: -1,
    yoyo: true,
    easing: 'easeInOutSine',
  },
};
