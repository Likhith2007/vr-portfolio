import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'solving-high-llm-tokenization',
    title: 'Solving High LLM Tokenization',
    description: 'AI-Powered Document Intelligence',
    longDescription: 'Reduced LLM token usage by 90% using intelligent document parsing, context compression, and optimized retrieval while preserving response quality.',
    techStack: ['Python', 'LLM', 'NLP', 'LiteParse', 'RAG'],
    image: '/assets/textures/project-liteparse.jpg',
    githubUrl: 'https://github.com/imandilikhith',
    featured: true,
    category: 'AI / NLP',
    year: 2026,
  },
  {
    id: 'ai-thermal-gas-leak',
    title: 'AI-Based Thermal Gas Leak Detection',
    description: 'Industrial Thermal AI',
    longDescription: 'Real-time methane gas leak detection and localization using infrared thermal imaging and deep learning for industrial safety applications.',
    techStack: ['Deep Learning', 'Computer Vision', 'Python'],
    image: '/assets/textures/project-thermal.jpg',
    githubUrl: 'https://github.com/imandilikhith',
    featured: true,
    category: 'Computer Vision',
    year: 2025,
  },
  {
    id: 'tiny-llm-debugging',
    title: 'Tiny LLM – Debugging Agent',
    description: 'AI Coding Assistant',
    longDescription: 'Lightweight debugging agent that analyzes code, identifies runtime errors, explains failures, and suggests intelligent fixes directly inside the development workflow.',
    techStack: ['TinyLLM', 'VS Code', 'AI Agents', 'Python'],
    image: '/assets/textures/project-tinyllm.jpg',
    githubUrl: 'https://github.com/imandilikhith',
    featured: true,
    category: 'AI Agents',
    year: 2026,
  },
  {
    id: 'nasa-ar-vr',
    title: 'NASA AR/VR Data Utilization',
    description: 'Immersive Earth Explorer',
    longDescription: 'Interactive AR/VR platform transforming NASA Earth observation datasets into immersive 3D experiences for exploration, education, and environmental analysis.',
    techStack: ['Three.js', 'WebXR', 'NASA APIs', 'React'],
    image: '/assets/textures/project-nasa.jpg',
    githubUrl: 'https://github.com/imandilikhith',
    featured: true,
    category: 'AR/VR',
    year: 2026,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
