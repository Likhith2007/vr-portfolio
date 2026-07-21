'use client';

import { useRef, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { damp } from '@/utils/math';
import { CAMERA_TRANSITION_DURATION } from '@/lib/constants';

interface CameraState {
  targetPosition: THREE.Vector3;
  targetLookAt: THREE.Vector3;
  isAnimating: boolean;
}

/**
 * Camera controller hook — smooth transitions between positions.
 */
export function useCamera() {
  const { camera } = useThree();
  const state = useRef<CameraState>({
    targetPosition: new THREE.Vector3(0, 2, 10),
    targetLookAt: new THREE.Vector3(0, 1, 0),
    isAnimating: false,
  });
  const lookAtTarget = useRef(new THREE.Vector3(0, 1, 0));

  const moveTo = useCallback(
    (
      position: [number, number, number],
      lookAt: [number, number, number],
      instant = false
    ) => {
      state.current.targetPosition.set(...position);
      state.current.targetLookAt.set(...lookAt);

      if (instant) {
        camera.position.set(...position);
        lookAtTarget.current.set(...lookAt);
        camera.lookAt(lookAtTarget.current);
        state.current.isAnimating = false;
      } else {
        state.current.isAnimating = true;
      }
    },
    [camera]
  );

  useFrame((_, delta) => {
    if (!state.current.isAnimating) return;

    const speed = 1 / CAMERA_TRANSITION_DURATION;

    // Damp position
    camera.position.x = damp(camera.position.x, state.current.targetPosition.x, speed * 4, delta);
    camera.position.y = damp(camera.position.y, state.current.targetPosition.y, speed * 4, delta);
    camera.position.z = damp(camera.position.z, state.current.targetPosition.z, speed * 4, delta);

    // Damp lookAt
    lookAtTarget.current.x = damp(lookAtTarget.current.x, state.current.targetLookAt.x, speed * 4, delta);
    lookAtTarget.current.y = damp(lookAtTarget.current.y, state.current.targetLookAt.y, speed * 4, delta);
    lookAtTarget.current.z = damp(lookAtTarget.current.z, state.current.targetLookAt.z, speed * 4, delta);

    camera.lookAt(lookAtTarget.current);

    // Check if close enough to stop
    const posDist = camera.position.distanceTo(state.current.targetPosition);
    if (posDist < 0.01) {
      state.current.isAnimating = false;
    }
  });

  return {
    moveTo,
    isAnimating: state.current.isAnimating,
    camera,
  };
}
