'use client';

import { useEffect, useCallback, useRef } from 'react';
import { audioManager } from '@/utils/audio';
import { AUDIO_PATHS } from '@/lib/preload';

/**
 * Hook for audio playback wrapping the AudioManager singleton.
 */
export function useAudio() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Register all sounds
    audioManager.register('ambient', AUDIO_PATHS.ambient, 'ambient', true);
    audioManager.register('transition', AUDIO_PATHS.transition, 'sfx');
    audioManager.register('click', AUDIO_PATHS.click, 'sfx');
    audioManager.register('hover', AUDIO_PATHS.hover, 'sfx');
    audioManager.register('intro', AUDIO_PATHS.intro, 'music');

    return () => {
      audioManager.dispose();
    };
  }, []);

  const play = useCallback((id: string) => {
    audioManager.play(id);
  }, []);

  const stop = useCallback((id: string) => {
    audioManager.stop(id);
  }, []);

  const crossfade = useCallback((from: string, to: string, duration?: number) => {
    audioManager.crossfade(from, to, duration);
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    audioManager.setMuted(muted);
  }, []);

  return { play, stop, crossfade, setMuted, isMuted: audioManager.isMuted() };
}
