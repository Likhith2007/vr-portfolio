'use client';
// MotionBlur placeholder — @react-three/postprocessing doesn't ship a motion blur
// This creates a subtle trailing effect via custom approach
export default function MotionBlur() {
  // Motion blur requires per-frame velocity buffers, which is complex.
  // This is a placeholder for future implementation using custom shaders.
  return null;
}
