/**
 * Asset preloading utilities.
 * Preload 3D models, textures, and audio before the scene renders.
 */

// Model paths — these will be preloaded when the app initializes
export const MODEL_PATHS = {
  theatre: '/assets/models/theatre/theatre.glb',
  lobby: '/assets/models/lobby/lobby.glb',
  avatar: '/assets/models/avatar/avatar.glb',
  props: {
    projector: '/assets/models/props/projector.glb',
    trophy: '/assets/models/props/trophy.glb',
  },
} as const;

// Texture paths
export const TEXTURE_PATHS = {
  floor: '/assets/textures/floor_diffuse.jpg',
  floorNormal: '/assets/textures/floor_normal.jpg',
  noise: '/assets/textures/noise.png',
  stars: '/assets/textures/star.png',
} as const;

// HDR environment maps
export const HDR_PATHS = {
  theatre: '/assets/hdr/theatre.hdr',
  lobby: '/assets/hdr/lobby.hdr',
} as const;

// Audio paths
export const AUDIO_PATHS = {
  ambient: '/assets/audio/ambient.mp3',
  transition: '/assets/audio/transition.mp3',
  click: '/assets/audio/click.mp3',
  hover: '/assets/audio/hover.mp3',
  intro: '/assets/audio/intro.mp3',
} as const;

/**
 * Track loading progress across all asset types.
 */
export class AssetLoadTracker {
  private total = 0;
  private loaded = 0;
  private onProgress?: (progress: number) => void;

  constructor(onProgress?: (progress: number) => void) {
    this.onProgress = onProgress;
  }

  register(count: number): void {
    this.total += count;
  }

  complete(): void {
    this.loaded = Math.min(this.loaded + 1, this.total);
    this.onProgress?.(this.getProgress());
  }

  getProgress(): number {
    if (this.total === 0) return 1;
    return this.loaded / this.total;
  }

  isComplete(): boolean {
    return this.loaded >= this.total;
  }
}

/**
 * Preload an image and return a promise.
 */
export function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Preload an audio file and return a promise.
 */
export function preloadAudio(src: string): Promise<HTMLAudioElement> {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.oncanplaythrough = () => resolve(audio);
    audio.onerror = reject;
    audio.src = src;
    audio.load();
  });
}
