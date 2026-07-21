import type { QualityLevel } from '@/types';

export interface AppConfig {
  quality: QualityLevel;
  audioEnabled: boolean;
  musicVolume: number;
  sfxVolume: number;
  showFPS: boolean;
  showMinimap: boolean;
  debugMode: boolean;
  invertY: boolean;
  mouseSensitivity: number;
  enablePostProcessing: boolean;
  enableParticles: boolean;
  enableShadows: boolean;
}

const defaultConfig: AppConfig = {
  quality: 'high',
  audioEnabled: true,
  musicVolume: 0.5,
  sfxVolume: 0.7,
  showFPS: false,
  showMinimap: true,
  debugMode: false,
  invertY: false,
  mouseSensitivity: 1.0,
  enablePostProcessing: true,
  enableParticles: true,
  enableShadows: true,
};

let currentConfig: AppConfig = { ...defaultConfig };

export function getConfig(): AppConfig {
  return { ...currentConfig };
}

export function updateConfig(partial: Partial<AppConfig>): AppConfig {
  currentConfig = { ...currentConfig, ...partial };
  return { ...currentConfig };
}

export function resetConfig(): AppConfig {
  currentConfig = { ...defaultConfig };
  return { ...currentConfig };
}

/**
 * Try to load config from localStorage (client-side only).
 */
export function loadSavedConfig(): AppConfig {
  if (typeof window === 'undefined') return getConfig();
  try {
    const saved = localStorage.getItem('vr-portfolio-config');
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<AppConfig>;
      currentConfig = { ...defaultConfig, ...parsed };
    }
  } catch {
    // Ignore parse errors — use defaults
  }
  return getConfig();
}

export function saveConfig(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('vr-portfolio-config', JSON.stringify(currentConfig));
  } catch {
    // Ignore storage errors
  }
}
