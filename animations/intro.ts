import type { TimelineStep } from '@/types';
import { ANIMATION_DURATIONS } from '@/lib/constants';

/**
 * Intro sequence timeline — cinematic theatre opening.
 * Steps: Darkness → Curtains open → Projector beam on → Title reveal → Fade to lobby
 */
export const introTimeline: TimelineStep[] = [
  // Fade from black
  {
    target: '.intro-overlay',
    properties: { opacity: 0 },
    duration: ANIMATION_DURATIONS.fadeIn,
    offset: 0,
  },
  // Curtains open
  {
    target: '.curtain-left',
    properties: { x: '-100%' },
    duration: ANIMATION_DURATIONS.curtainOpen,
    offset: 0.5,
  },
  {
    target: '.curtain-right',
    properties: { x: '100%' },
    duration: ANIMATION_DURATIONS.curtainOpen,
    offset: '<', // same time as left curtain
  },
  // Projector light on
  {
    target: '.projector-beam',
    properties: { opacity: 1, scaleY: 1 },
    duration: ANIMATION_DURATIONS.projectorOn,
    offset: '+=0.3',
  },
  // Title text reveal
  {
    target: '.intro-title',
    properties: { opacity: 1, y: 0, scale: 1 },
    duration: ANIMATION_DURATIONS.titleReveal,
    offset: '+=0.2',
  },
  // Subtitle
  {
    target: '.intro-subtitle',
    properties: { opacity: 1, y: 0 },
    duration: 0.8,
    offset: '-=0.5',
  },
  // Hold
  {
    target: '.intro-container',
    properties: {},
    duration: 1.5,
    offset: '+=0',
  },
  // Fade to lobby
  {
    target: '.intro-container',
    properties: { opacity: 0 },
    duration: ANIMATION_DURATIONS.fadeOut,
    offset: '+=0',
  },
];

export const INTRO_TOTAL_DURATION = ANIMATION_DURATIONS.introTotal;
