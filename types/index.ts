// ─── Scene & Navigation ───────────────────────────────────────────────────────

export type RoomId =
  | 'theatre'
  | 'lobby'
  | 'about'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'awards'
  | 'research'
  | 'contact';

export interface RoomConfig {
  id: RoomId;
  label: string;
  description: string;
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  icon: string;
}

export interface CameraKeyframe {
  position: [number, number, number];
  lookAt: [number, number, number];
  duration: number;
  easing?: string;
}

export interface CameraPathConfig {
  name: string;
  keyframes: CameraKeyframe[];
  loop?: boolean;
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

export type AvatarAnimationState = 'idle' | 'walk' | 'run' | 'interact' | 'wave';

export interface AvatarState {
  position: [number, number, number];
  rotation: [number, number, number];
  animation: AvatarAnimationState;
  velocity: [number, number, number];
}

// ─── Data Models ──────────────────────────────────────────────────────────────

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  avatar: string;
  email: string;
  phone?: string;
  location: string;
  socials: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number; // 0-100
  icon: string;
  color: string;
  connections?: string[]; // IDs of connected skills for the neural network
}

export type SkillCategory =
  | 'language'
  | 'framework'
  | 'tool'
  | 'database'
  | 'cloud'
  | 'design'
  | 'other';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: string;
  year: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
  highlights: string[];
  techStack: string[];
  logo?: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  icon?: string;
  url?: string;
}

// ─── App State ────────────────────────────────────────────────────────────────

export interface AppState {
  currentRoom: RoomId;
  previousRoom: RoomId | null;
  isLoading: boolean;
  loadingProgress: number;
  introComplete: boolean;
  audioEnabled: boolean;
  debugMode: boolean;
  quality: QualityLevel;
}

export type QualityLevel = 'low' | 'medium' | 'high' | 'ultra';

export interface SceneState {
  isTransitioning: boolean;
  transitionProgress: number;
  activePortal: RoomId | null;
  hoveredObject: string | null;
}

// ─── UI ───────────────────────────────────────────────────────────────────────

export interface HUDData {
  roomName: string;
  fps: number;
  controlsHint: string;
  showMinimap: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// ─── Shaders ──────────────────────────────────────────────────────────────────

export interface ShaderUniforms {
  [key: string]: {
    value: number | number[] | Float32Array;
    type?: string;
  };
}

// ─── Animation ────────────────────────────────────────────────────────────────

export interface AnimationConfig {
  name: string;
  duration: number;
  delay?: number;
  easing?: string;
  repeat?: number;
  yoyo?: boolean;
}

export interface TimelineStep {
  target: string;
  properties: Record<string, unknown>;
  duration: number;
  offset?: string | number;
}
