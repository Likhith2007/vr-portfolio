'use client';
import { Bloom as PostBloom } from '@react-three/postprocessing';
export default function Bloom({ intensity = 1.5, luminanceThreshold = 0.2, luminanceSmoothing = 0.9 }) {
  return <PostBloom intensity={intensity} luminanceThreshold={luminanceThreshold} luminanceSmoothing={luminanceSmoothing} />;
}
