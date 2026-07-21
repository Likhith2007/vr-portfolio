'use client';
import { Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
export default function FilmGrain({ opacity = 0.15 }) {
  return <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={opacity} />;
}
