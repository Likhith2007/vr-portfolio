'use client';
import { DepthOfField } from '@react-three/postprocessing';
export default function DOF({ focusDistance = 0.01, focalLength = 0.02, bokehScale = 3 }) {
  return <DepthOfField focusDistance={focusDistance} focalLength={focalLength} bokehScale={bokehScale} />;
}
