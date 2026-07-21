'use client';

import { useRef, forwardRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeyboard } from '@/hooks/useKeyboard';
import { useTeleportStore } from '@/hooks/useTeleport';
import { AVATAR_DEFAULTS } from '@/lib/constants';
import Avatar from './Avatar';

const AvatarController = forwardRef<THREE.Group>((_, forwardedRef) => {
  const localRef = useRef<THREE.Group>(null);
  const { currentRoom } = useTeleportStore();

  // Sync localRef with forwardedRef so parent gets the instance
  useEffect(() => {
    if (typeof forwardedRef === 'function') {
      forwardedRef(localRef.current);
    } else if (forwardedRef) {
      forwardedRef.current = localRef.current;
    }
  }, [forwardedRef, localRef]);

  const keys = useKeyboard();
  const velocity = useRef(new THREE.Vector3());
  const rotation = useRef(0);
  const pitch = useRef(0);

  // Reset position when entering a new room
  useEffect(() => {
    if (localRef.current) {
      localRef.current.position.set(0, 0, 0);
      velocity.current.set(0, 0, 0);
    }
  }, [currentRoom]);
  
  // Mouse drag rotation state
  const isDragging = useRef(false);
  const previousMouseX = useRef(0);
  const previousMouseY = useRef(0);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      isDragging.current = true;
      previousMouseX.current = e.clientX;
      previousMouseY.current = e.clientY;
      document.body.style.cursor = 'grabbing';
    };
    
    const handlePointerUp = () => {
      isDragging.current = false;
      document.body.style.cursor = 'default';
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousMouseX.current;
      const deltaY = e.clientY - previousMouseY.current;
      
      // Horizontal rotation (Yaw)
      rotation.current -= deltaX * 0.005; 
      
      // Vertical rotation (Pitch) clamped to prevent flipping over backwards
      pitch.current -= deltaY * 0.005;
      pitch.current = THREE.MathUtils.clamp(pitch.current, -Math.PI / 3, Math.PI / 3);
      
      if (localRef.current) {
        localRef.current.userData.pitch = pitch.current;
      }
      
      previousMouseX.current = e.clientX;
      previousMouseY.current = e.clientY;
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
      document.body.style.cursor = 'default';
    };
  }, []);

  useFrame((_, delta) => {
    if (!localRef.current) return;
    const { moveSpeed, runMultiplier, rotationSpeed } = AVATAR_DEFAULTS;
    const speed = keys.current.sprint ? moveSpeed * runMultiplier : moveSpeed;

    // Movement direction (Local Forward/Backward)
    const direction = new THREE.Vector3();
    if (keys.current.forward) direction.z -= 1;
    if (keys.current.backward) direction.z += 1;

    // Rotation (Local Left/Right)
    if (keys.current.left) rotation.current += rotationSpeed * delta;
    if (keys.current.right) rotation.current -= rotationSpeed * delta;

    if (direction.length() > 0) {
      direction.normalize();
      
      // Rotate movement vector by current avatar rotation
      direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation.current);

      // Apply velocity
      velocity.current.lerp(direction.multiplyScalar(speed), delta * 10);
    } else {
      // Decelerate smoothly
      velocity.current.lerp(new THREE.Vector3(), delta * 8);
    }

    // Apply rotation and position
    localRef.current.rotation.y = rotation.current;
    localRef.current.position.add(velocity.current.clone().multiplyScalar(delta));
  });

  return (
    <group ref={localRef}>
      <Avatar />
    </group>
  );
});

export default AvatarController;
