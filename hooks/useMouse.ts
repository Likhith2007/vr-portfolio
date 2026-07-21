'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

interface MouseState {
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
  isLocked: boolean;
}

/**
 * Track mouse position, delta, and pointer lock state.
 */
export function useMouse() {
  const state = useRef<MouseState>({
    x: 0,
    y: 0,
    deltaX: 0,
    deltaY: 0,
    isLocked: false,
  });
  const [isLocked, setIsLocked] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (state.current.isLocked) {
      state.current.deltaX = e.movementX;
      state.current.deltaY = e.movementY;
    }
    state.current.x = e.clientX;
    state.current.y = e.clientY;
  }, []);

  const handlePointerLockChange = useCallback(() => {
    const locked = document.pointerLockElement !== null;
    state.current.isLocked = locked;
    setIsLocked(locked);
  }, []);

  const requestPointerLock = useCallback(() => {
    document.body.requestPointerLock();
  }, []);

  const exitPointerLock = useCallback(() => {
    document.exitPointerLock();
  }, []);

  /**
   * Call this each frame to reset the delta after reading it.
   */
  const consumeDelta = useCallback((): { deltaX: number; deltaY: number } => {
    const dx = state.current.deltaX;
    const dy = state.current.deltaY;
    state.current.deltaX = 0;
    state.current.deltaY = 0;
    return { deltaX: dx, deltaY: dy };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('pointerlockchange', handlePointerLockChange);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
    };
  }, [handleMouseMove, handlePointerLockChange]);

  return {
    state,
    isLocked,
    requestPointerLock,
    exitPointerLock,
    consumeDelta,
  };
}
