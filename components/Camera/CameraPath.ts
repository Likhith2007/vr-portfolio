import type { CameraPathConfig } from '@/types';
import { cameraPaths } from '@/animations/camera';

/**
 * Re-export camera paths and provide lookup helpers.
 */
export { cameraPaths };

export function getCameraPath(name: string): CameraPathConfig | undefined {
  return cameraPaths[name];
}

export function listCameraPaths(): string[] {
  return Object.keys(cameraPaths);
}
