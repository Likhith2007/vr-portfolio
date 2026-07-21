'use client';

import { useEffect, useRef, useCallback } from 'react';

interface KeyboardState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
  sprint: boolean;
  interact: boolean;
  escape: boolean;
}

const initialState: KeyboardState = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  jump: false,
  sprint: false,
  interact: false,
  escape: false,
};

const KEY_MAP: Record<string, keyof KeyboardState> = {
  KeyW: 'forward',
  ArrowUp: 'forward',
  KeyS: 'backward',
  ArrowDown: 'backward',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyD: 'right',
  ArrowRight: 'right',
  Space: 'jump',
  ShiftLeft: 'sprint',
  ShiftRight: 'sprint',
  KeyE: 'interact',
  KeyF: 'interact',
  Escape: 'escape',
};

/**
 * Track WASD + modifier key input.
 */
export function useKeyboard() {
  const keys = useRef<KeyboardState>({ ...initialState });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const action = KEY_MAP[e.code];
    if (action) {
      keys.current[action] = true;
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const action = KEY_MAP[e.code];
    if (action) {
      keys.current[action] = false;
    }
  }, []);

  const handleBlur = useCallback(() => {
    // Reset all keys when window loses focus
    keys.current = { ...initialState };
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [handleKeyDown, handleKeyUp, handleBlur]);

  return keys;
}
