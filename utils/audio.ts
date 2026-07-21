/**
 * Audio manager for ambient sounds, SFX, and music.
 */

type SoundCategory = 'music' | 'sfx' | 'ambient';

interface SoundEntry {
  audio: HTMLAudioElement;
  category: SoundCategory;
  loop: boolean;
}

class AudioManager {
  private sounds: Map<string, SoundEntry> = new Map();
  private volumes: Record<SoundCategory, number> = {
    music: 0.5,
    sfx: 0.7,
    ambient: 0.4,
  };
  private globalMuted = false;

  /**
   * Register a sound for later playback.
   */
  register(
    id: string,
    src: string,
    category: SoundCategory = 'sfx',
    loop = false
  ): void {
    if (typeof window === 'undefined') return;
    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = this.volumes[category];
    audio.preload = 'auto';
    this.sounds.set(id, { audio, category, loop });
  }

  /**
   * Play a registered sound.
   */
  play(id: string): void {
    if (this.globalMuted) return;
    const entry = this.sounds.get(id);
    if (!entry) return;

    entry.audio.currentTime = 0;
    entry.audio.volume = this.volumes[entry.category];
    entry.audio.play().catch(() => {
      // Autoplay blocked — user hasn't interacted yet
    });
  }

  /**
   * Stop a playing sound.
   */
  stop(id: string): void {
    const entry = this.sounds.get(id);
    if (!entry) return;
    entry.audio.pause();
    entry.audio.currentTime = 0;
  }

  /**
   * Crossfade between two ambient sounds.
   */
  crossfade(fromId: string, toId: string, duration = 1000): void {
    const from = this.sounds.get(fromId);
    const to = this.sounds.get(toId);

    if (to) {
      to.audio.volume = 0;
      to.audio.play().catch(() => {});
    }

    const steps = 20;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const t = step / steps;

      if (from) {
        from.audio.volume = Math.max(0, this.volumes[from.category] * (1 - t));
      }
      if (to) {
        to.audio.volume = this.volumes[to.category] * t;
      }

      if (step >= steps) {
        clearInterval(timer);
        if (from) {
          from.audio.pause();
          from.audio.currentTime = 0;
        }
      }
    }, interval);
  }

  /**
   * Set volume for a sound category.
   */
  setVolume(category: SoundCategory, volume: number): void {
    this.volumes[category] = Math.max(0, Math.min(1, volume));
    // Update all sounds in this category
    for (const entry of this.sounds.values()) {
      if (entry.category === category) {
        entry.audio.volume = this.volumes[category];
      }
    }
  }

  /**
   * Mute/unmute all audio globally.
   */
  setMuted(muted: boolean): void {
    this.globalMuted = muted;
    for (const entry of this.sounds.values()) {
      if (muted) {
        entry.audio.pause();
      }
    }
  }

  isMuted(): boolean {
    return this.globalMuted;
  }

  /**
   * Cleanup all audio elements.
   */
  dispose(): void {
    for (const entry of this.sounds.values()) {
      entry.audio.pause();
      entry.audio.src = '';
    }
    this.sounds.clear();
  }
}

// Singleton instance
export const audioManager = new AudioManager();
export default AudioManager;
