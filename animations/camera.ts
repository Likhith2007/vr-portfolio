import type { CameraPathConfig } from '@/types';

/**
 * Camera path keyframes for various scene transitions.
 */
export const cameraPaths: Record<string, CameraPathConfig> = {
  introToLobby: {
    name: 'introToLobby',
    keyframes: [
      { position: [0, 3, -45], lookAt: [0, 2, -50], duration: 0 },
      { position: [0, 4, -30], lookAt: [0, 2, -50], duration: 2, easing: 'easeInOutCubic' },
      { position: [0, 5, -10], lookAt: [0, 1, 0], duration: 2, easing: 'easeInOutCubic' },
      { position: [0, 2, 10], lookAt: [0, 1, 0], duration: 1.5, easing: 'easeOutCubic' },
    ],
  },

  lobbyOrbit: {
    name: 'lobbyOrbit',
    loop: true,
    keyframes: [
      { position: [0, 3, 12], lookAt: [0, 1, 0], duration: 0 },
      { position: [12, 3, 0], lookAt: [0, 1, 0], duration: 5, easing: 'easeInOutSine' },
      { position: [0, 3, -12], lookAt: [0, 1, 0], duration: 5, easing: 'easeInOutSine' },
      { position: [-12, 3, 0], lookAt: [0, 1, 0], duration: 5, easing: 'easeInOutSine' },
      { position: [0, 3, 12], lookAt: [0, 1, 0], duration: 5, easing: 'easeInOutSine' },
    ],
  },

  enterRoom: {
    name: 'enterRoom',
    keyframes: [
      { position: [0, 2, 10], lookAt: [0, 1, 0], duration: 0 },
      { position: [0, 2, 5], lookAt: [0, 1, 0], duration: 1, easing: 'easeInOutCubic' },
      { position: [0, 1.7, 2], lookAt: [0, 1.5, -2], duration: 0.8, easing: 'easeOutCubic' },
    ],
  },

  exitRoom: {
    name: 'exitRoom',
    keyframes: [
      { position: [0, 1.7, 2], lookAt: [0, 1.5, -2], duration: 0 },
      { position: [0, 3, 8], lookAt: [0, 1, 0], duration: 1.2, easing: 'easeInOutCubic' },
      { position: [0, 2, 10], lookAt: [0, 1, 0], duration: 0.8, easing: 'easeOutCubic' },
    ],
  },
};
