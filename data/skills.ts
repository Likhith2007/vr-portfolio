import type { Skill } from '@/types';

export const skills: Skill[] = [
  // Languages
  { id: 'python', name: 'Python', category: 'language', proficiency: 90, icon: 'SiPython', color: '#3776ab', connections: ['tensorflow', 'deeplearning', 'pandas', 'scikitlearn', 'fastapi'] },
  { id: 'java', name: 'Java', category: 'language', proficiency: 85, icon: 'FaJava', color: '#007396', connections: ['springboot', 'cpp'] },
  { id: 'cpp', name: 'C++', category: 'language', proficiency: 80, icon: 'SiCplusplus', color: '#00599c', connections: ['java', 'golang'] },
  { id: 'golang', name: 'Go(Golang)', category: 'language', proficiency: 75, icon: 'SiGo', color: '#00add8', connections: ['cpp', 'fastapi'] },

  // Machine Learning & AI
  { id: 'tensorflow', name: 'TensorFlow', category: 'framework', proficiency: 85, icon: 'SiTensorflow', color: '#ff6f00', connections: ['python', 'deeplearning', 'pytorch'] },
  { id: 'pytorch', name: 'PyTorch', category: 'framework', proficiency: 80, icon: 'SiPytorch', color: '#ee4c2c', connections: ['python', 'deeplearning', 'tensorflow', 'llms'] },
  { id: 'scikitlearn', name: 'Scikit-learn', category: 'framework', proficiency: 85, icon: 'SiScikitlearn', color: '#f7931e', connections: ['python', 'pandas'] },
  { id: 'pandas', name: 'Pandas & NumPy', category: 'tool', proficiency: 85, icon: 'SiPandas', color: '#150458', connections: ['python', 'scikitlearn'] },
  { id: 'deeplearning', name: 'Deep Learning', category: 'framework', proficiency: 85, icon: 'FaBrain', color: '#8a2be2', connections: ['python', 'tensorflow', 'pytorch', 'computervision'] },
  { id: 'computervision', name: 'Computer Vision', category: 'framework', proficiency: 85, icon: 'FaEye', color: '#20b2aa', connections: ['deeplearning', 'llms'] },
  { id: 'llms', name: 'LLMs', category: 'tool', proficiency: 90, icon: 'FaRobot', color: '#ff00ff', connections: ['computervision', 'langchain', 'pytorch'] },
  { id: 'langchain', name: 'LangChain', category: 'tool', proficiency: 85, icon: 'FaLink', color: '#ff1493', connections: ['llms'] },

  // Full Stack
  { id: 'react', name: 'ReactJS', category: 'framework', proficiency: 85, icon: 'SiReact', color: '#61dafb', connections: ['fastapi', 'springboot', 'angular'] },
  { id: 'angular', name: 'AngularJS', category: 'framework', proficiency: 75, icon: 'SiAngular', color: '#dd0031', connections: ['react'] },
  { id: 'springboot', name: 'Spring Boot', category: 'framework', proficiency: 80, icon: 'SiSpringboot', color: '#6db33f', connections: ['java', 'react', 'mysql'] },
  { id: 'fastapi', name: 'FastAPI', category: 'framework', proficiency: 85, icon: 'SiFastapi', color: '#009688', connections: ['python', 'react', 'mongodb', 'golang'] },

  // Cloud & Databases
  { id: 'gcp', name: 'GCP', category: 'cloud', proficiency: 80, icon: 'SiGooglecloud', color: '#4285f4', connections: ['mongodb', 'mysql', 'jenkins'] },
  { id: 'mongodb', name: 'MongoDB', category: 'database', proficiency: 85, icon: 'SiMongodb', color: '#47a248', connections: ['fastapi', 'gcp'] },
  { id: 'mysql', name: 'MySQL', category: 'database', proficiency: 85, icon: 'SiMysql', color: '#4479a1', connections: ['springboot', 'gcp'] },
  { id: 'git', name: 'Git/GitHub', category: 'tool', proficiency: 90, icon: 'SiGit', color: '#f05032', connections: ['jenkins'] },
  { id: 'jenkins', name: 'Jenkins/CircleCI', category: 'tool', proficiency: 75, icon: 'SiJenkins', color: '#d33833', connections: ['git', 'gcp'] },
];

/**
 * Group skills by category.
 */
export function getSkillsByCategory(): Record<string, Skill[]> {
  return skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );
}
