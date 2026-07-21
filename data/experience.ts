import type { Experience } from '@/types';

export const experience: Experience[] = [
  {
    id: 'exp-1',
    company: 'Freelance',
    role: 'AI/ML Developer - Assamese Language Model Project',
    location: 'Remote',
    startDate: '2026',
    endDate: 'Present',
    description:
      'Working on domain-specific training and prompt optimization for regional language models.',
    highlights: [
      'Improved response quality and contextual understanding through domain-specific training and prompt optimization.',
      'Fine-tuned open-source LLMs on Assamese datasets, improving response quality and language understanding.',
    ],
    techStack: ['LLMs', 'Prompt Engineering', 'Fine-tuning', 'Python'],
    logo: '/assets/icons/company-1.svg',
  },
  {
    id: 'exp-2',
    company: 'LT Software Technologies (Ministry of Corporate Affairs)',
    role: 'Web Developer Intern',
    location: 'Drive',
    startDate: '2026',
    endDate: '2026',
    description:
      'Web development internship focusing on secure, scalable application architectures.',
    highlights: [
      'Implemented role-based access control (RBAC), enabling administrators to securely manage and grant user access permissions.',
      'Optimized application performance and maintained scalable code architecture.',
    ],
    techStack: ['Web Development', 'RBAC', 'Performance Optimization'],
    logo: '/assets/icons/company-2.svg',
  },
];
