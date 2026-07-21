'use client';
import { Glitch as PostGlitch } from '@react-three/postprocessing';
import { GlitchMode } from 'postprocessing';
import { Vector2 } from 'three';
export default function Glitch({ active = false }) {
  if (!active) return null;
  return <PostGlitch delay={new Vector2(1.5, 3.5)} duration={new Vector2(0.1, 0.3)} strength={new Vector2(0.1, 0.2)} mode={GlitchMode.SPORADIC} />;
}
