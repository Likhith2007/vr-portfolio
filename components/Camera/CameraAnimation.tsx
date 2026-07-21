'use client';

import { useRef, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { CameraPathConfig } from '@/types';
import { easings, type EasingName } from '@/utils/easing';
import { lerp } from '@/utils/math';

export default function CameraAnimation() {
  const { camera } = useThree();
  const pathRef = useRef<CameraPathConfig | null>(null);
  const progressRef = useRef(0);
  const segmentRef = useRef(0);
  const isPlaying = useRef(false);

  const playPath = useCallback((path: CameraPathConfig) => {
    pathRef.current = path;
    progressRef.current = 0;
    segmentRef.current = 0;
    isPlaying.current = true;
  }, []);

  useFrame((_, delta) => {
    if (!isPlaying.current || !pathRef.current) return;
    const path = pathRef.current;
    const kf = path.keyframes;

    if (segmentRef.current >= kf.length - 1) {
      if (path.loop) {
        segmentRef.current = 0;
        progressRef.current = 0;
      } else {
        isPlaying.current = false;
      }
      return;
    }

    const current = kf[segmentRef.current];
    const next = kf[segmentRef.current + 1];

    if (next.duration <= 0) {
      camera.position.set(...next.position);
      camera.lookAt(new THREE.Vector3(...next.lookAt));
      segmentRef.current++;
      progressRef.current = 0;
      return;
    }

    progressRef.current += delta;
    let t = Math.min(1, progressRef.current / next.duration);

    // Apply easing
    const easingName = (next.easing || 'linear') as EasingName;
    if (easings[easingName]) {
      t = easings[easingName](t);
    }

    // Interpolate
    camera.position.set(
      lerp(current.position[0], next.position[0], t),
      lerp(current.position[1], next.position[1], t),
      lerp(current.position[2], next.position[2], t)
    );

    const lookAt = new THREE.Vector3(
      lerp(current.lookAt[0], next.lookAt[0], t),
      lerp(current.lookAt[1], next.lookAt[1], t),
      lerp(current.lookAt[2], next.lookAt[2], t)
    );
    camera.lookAt(lookAt);

    if (progressRef.current >= next.duration) {
      segmentRef.current++;
      progressRef.current = 0;
    }
  });

  return null;
}

export { CameraAnimation };
