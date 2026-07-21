'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { damp } from '@/utils/math';

interface CameraRigProps {
  followTarget?: THREE.Object3D | null;
  offset?: [number, number, number];
  lookAhead?: number;
  smoothing?: number;
  enabled?: boolean;
}

export default function CameraRig({
  followTarget,
  offset = [0, 3, 8],
  lookAhead = 2,
  smoothing = 4,
  enabled = true,
}: CameraRigProps) {
  const { camera } = useThree();
  const lookAtPos = useRef(new THREE.Vector3(0, 1, 0));
  const targetFov = useRef(60);

  // Handle scroll wheel for zooming
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      targetFov.current = THREE.MathUtils.clamp(targetFov.current + e.deltaY * 0.05, 20, 120);
    };
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  useFrame((_, delta) => {
    if (!enabled || !followTarget) return;

    // Smoothly animate FOV zoom
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = damp(camera.fov, targetFov.current, 6, delta);
      camera.updateProjectionMatrix();
    }

    const pitch = followTarget.userData.pitch || 0;
    const pitchQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), pitch);

    // Target position = followTarget.position + rotated offset (pitch + yaw)
    const offsetVector = new THREE.Vector3(...offset);
    offsetVector.applyQuaternion(pitchQuat); // Pitch around X
    offsetVector.applyQuaternion(followTarget.quaternion); // Yaw around Y
    const targetPos = followTarget.position.clone().add(offsetVector);

    // Smooth camera position
    camera.position.x = damp(camera.position.x, targetPos.x, smoothing, delta);
    camera.position.y = damp(camera.position.y, targetPos.y, smoothing, delta);
    camera.position.z = damp(camera.position.z, targetPos.z, smoothing, delta);

    // LookAt: slightly ahead of the target, factoring in pitch
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(pitchQuat);
    forward.applyQuaternion(followTarget.quaternion);
    
    const lookTarget = followTarget.position
      .clone()
      .add(forward.multiplyScalar(lookAhead))
      .add(new THREE.Vector3(0, 1.5, 0));

    lookAtPos.current.x = damp(lookAtPos.current.x, lookTarget.x, smoothing, delta);
    lookAtPos.current.y = damp(lookAtPos.current.y, lookTarget.y, smoothing, delta);
    lookAtPos.current.z = damp(lookAtPos.current.z, lookTarget.z, smoothing, delta);

    camera.lookAt(lookAtPos.current);
  });

  return null;
}
