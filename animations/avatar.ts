import type { AnimationConfig, AvatarAnimationState } from '@/types';

/**
 * Avatar animation state machine configuration.
 */
export const avatarAnimations: Record<AvatarAnimationState, AnimationConfig> = {
  idle: {
    name: 'idle',
    duration: 2.0,
    repeat: -1,
    easing: 'easeInOutSine',
  },
  walk: {
    name: 'walk',
    duration: 0.8,
    repeat: -1,
    easing: 'linear',
  },
  run: {
    name: 'run',
    duration: 0.5,
    repeat: -1,
    easing: 'linear',
  },
  interact: {
    name: 'interact',
    duration: 1.2,
    easing: 'easeOutCubic',
  },
  wave: {
    name: 'wave',
    duration: 1.5,
    easing: 'easeInOutSine',
  },
};

/**
 * Transition durations between animation states (seconds).
 */
export const avatarTransitions: Record<string, number> = {
  'idle->walk': 0.2,
  'walk->idle': 0.3,
  'walk->run': 0.15,
  'run->walk': 0.2,
  'idle->interact': 0.25,
  'interact->idle': 0.3,
  'idle->wave': 0.3,
  'wave->idle': 0.3,
};

/**
 * Get transition duration between two states.
 */
export function getTransitionDuration(
  from: AvatarAnimationState,
  to: AvatarAnimationState
): number {
  const key = `${from}->${to}`;
  return avatarTransitions[key] ?? 0.25;
}
