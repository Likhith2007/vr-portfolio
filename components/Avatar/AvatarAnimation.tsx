'use client';

import { useRef, useState, useEffect } from 'react';
import type { AvatarAnimationState } from '@/types';
import { getTransitionDuration } from '@/animations/avatar';

interface AvatarAnimationProps {
  isMoving: boolean;
  isRunning: boolean;
  isInteracting: boolean;
  onStateChange?: (state: AvatarAnimationState) => void;
}

/**
 * Avatar animation state machine.
 * Determines the current animation state based on input.
 */
export function useAvatarAnimation({
  isMoving,
  isRunning,
  isInteracting,
  onStateChange,
}: AvatarAnimationProps) {
  const [currentState, setCurrentState] = useState<AvatarAnimationState>('idle');
  const prevState = useRef<AvatarAnimationState>('idle');
  const transitionTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    let newState: AvatarAnimationState = 'idle';

    if (isInteracting) {
      newState = 'interact';
    } else if (isMoving && isRunning) {
      newState = 'run';
    } else if (isMoving) {
      newState = 'walk';
    }

    if (newState !== currentState) {
      const duration = getTransitionDuration(currentState, newState);

      // Clear previous transition
      if (transitionTimer.current) {
        clearTimeout(transitionTimer.current);
      }

      transitionTimer.current = setTimeout(() => {
        prevState.current = currentState;
        setCurrentState(newState);
        onStateChange?.(newState);
      }, duration * 1000);
    }

    return () => {
      if (transitionTimer.current) {
        clearTimeout(transitionTimer.current);
      }
    };
  }, [isMoving, isRunning, isInteracting, currentState, onStateChange]);

  return { currentState, previousState: prevState.current };
}

/**
 * Wrapper component if you prefer a component-based approach.
 */
export default function AvatarAnimation({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}
