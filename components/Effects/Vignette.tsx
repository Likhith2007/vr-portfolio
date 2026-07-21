'use client';
import { Vignette as PostVignette } from '@react-three/postprocessing';
export default function Vignette({ darkness = 0.6, offset = 0.3 }) {
  return <PostVignette darkness={darkness} offset={offset} />;
}
