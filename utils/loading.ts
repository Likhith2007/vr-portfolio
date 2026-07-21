/**
 * Loading state management and progress tracking utilities.
 */

export interface LoadingState {
  isLoading: boolean;
  progress: number; // 0 to 1
  message: string;
  phase: LoadingPhase;
}

export type LoadingPhase =
  | 'init'
  | 'models'
  | 'textures'
  | 'audio'
  | 'shaders'
  | 'complete';

const PHASE_LABELS: Record<LoadingPhase, string> = {
  init: 'Initializing...',
  models: 'Loading 3D models...',
  textures: 'Loading textures...',
  audio: 'Loading audio...',
  shaders: 'Compiling shaders...',
  complete: 'Ready!',
};

const PHASE_WEIGHTS: Record<LoadingPhase, number> = {
  init: 0.05,
  models: 0.45,
  textures: 0.25,
  audio: 0.15,
  shaders: 0.1,
  complete: 0,
};

/**
 * Calculate overall loading progress based on phase and per-phase progress.
 */
export function calculateOverallProgress(
  phase: LoadingPhase,
  phaseProgress: number
): number {
  const phases: LoadingPhase[] = ['init', 'models', 'textures', 'audio', 'shaders', 'complete'];
  const currentIndex = phases.indexOf(phase);

  let total = 0;
  for (let i = 0; i < currentIndex; i++) {
    total += PHASE_WEIGHTS[phases[i]];
  }
  total += PHASE_WEIGHTS[phase] * Math.min(1, phaseProgress);

  return Math.min(1, total);
}

/**
 * Get the human-readable label for a loading phase.
 */
export function getPhaseLabel(phase: LoadingPhase): string {
  return PHASE_LABELS[phase];
}

/**
 * Format progress as a percentage string.
 */
export function formatProgress(progress: number): string {
  return `${Math.round(progress * 100)}%`;
}

/**
 * Create a fake loading sequence for demo purposes
 * (used when no real assets are present).
 */
export function createFakeLoadingSequence(
  onProgress: (state: LoadingState) => void,
  totalDuration = 3000
): () => void {
  const phases: LoadingPhase[] = ['init', 'models', 'textures', 'audio', 'shaders', 'complete'];
  let cancelled = false;
  let elapsed = 0;
  const interval = 50;

  const timer = setInterval(() => {
    if (cancelled) {
      clearInterval(timer);
      return;
    }

    elapsed += interval;
    const t = Math.min(1, elapsed / totalDuration);

    // Determine current phase
    let phaseIndex = Math.min(phases.length - 1, Math.floor(t * (phases.length - 1)));
    if (t >= 1) phaseIndex = phases.length - 1;
    const phase = phases[phaseIndex];

    onProgress({
      isLoading: t < 1,
      progress: t,
      message: PHASE_LABELS[phase],
      phase,
    });

    if (t >= 1) {
      clearInterval(timer);
    }
  }, interval);

  // Return cancel function
  return () => {
    cancelled = true;
    clearInterval(timer);
  };
}
