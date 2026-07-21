'use client';

import { useRef, useCallback } from 'react';
import gsap from 'gsap';

/**
 * Hook for triggering GSAP timeline animations.
 */
export function useAnimation() {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  /**
   * Create and play a GSAP timeline.
   */
  const animate = useCallback(
    (
      steps: Array<{
        target: gsap.TweenTarget;
        vars: gsap.TweenVars;
        position?: gsap.Position;
      }>,
      options?: {
        onComplete?: () => void;
        paused?: boolean;
      }
    ) => {
      // Kill existing timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline({
        paused: options?.paused ?? false,
        onComplete: options?.onComplete,
      });

      for (const step of steps) {
        tl.to(step.target, step.vars, step.position);
      }

      timelineRef.current = tl;

      if (!options?.paused) {
        tl.play();
      }

      return tl;
    },
    []
  );

  /**
   * Animate a single target.
   */
  const animateTo = useCallback(
    (target: gsap.TweenTarget, vars: gsap.TweenVars) => {
      return gsap.to(target, vars);
    },
    []
  );

  /**
   * Animate from initial values.
   */
  const animateFrom = useCallback(
    (target: gsap.TweenTarget, vars: gsap.TweenVars) => {
      return gsap.from(target, vars);
    },
    []
  );

  /**
   * Kill the current timeline.
   */
  const kill = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
  }, []);

  return { animate, animateTo, animateFrom, kill, timeline: timelineRef };
}
