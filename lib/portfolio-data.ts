import {
  Code2,
  Cpu,
  Database,
  Layers,
  Server,
  Smartphone,
  GitBranch,
  Brain,
  type LucideIcon,
} from 'lucide-react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export const PROFILE = {
  name: 'FITTO ARDIANSYAH',
  roles: ['AI Engineer', 'Full Stack Developer', 'Mobile Developer'],
  headline:
    'Building Intelligent Digital Experiences with AI & Modern Technologies.',
  description:
    'I craft AI-powered systems, scalable web platforms, and beautiful mobile apps. From computer vision pipelines to full-stack architecture, I turn complex problems into polished products.',
  email: 'fittoardiansyah12@gmail.com',
  whatsapp: '+62 896-9976-9191',
  location: 'Indonesia',
  socials: {
    github: 'https://github.com/fittoardi',
    linkedin: 'https://linkedin.com/in/fittoardiansyah',
    instagram: 'https://instagram.com/_fittoard',
  },
};

export type SkillCategory = {
  title: string;
  icon: LucideIcon;
  color: string;
  skills: { name: string; level: string }[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming',
    icon: Code2,
    color: 'bg-brand-yellow',
    skills: [
      { name: 'Python', level: 'Expert' },
      { name: 'PHP', level: 'Advanced' },
      { name: 'JavaScript', level: 'Advanced' },
      { name: 'Dart', level: 'Advanced' },
    ],
  },
  {
    title: 'Frontend',
    icon: Layers,
    color: 'bg-brand-pink',
    skills: [
      { name: 'Next.js', level: 'Advanced' },
      { name: 'React', level: 'Advanced' },
      { name: 'Tailwind', level: 'Expert' },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    color: 'bg-brand-blue',
    skills: [
      { name: 'Laravel', level: 'Advanced' },
      { name: 'FastAPI', level: 'Advanced' },
      { name: 'REST API', level: 'Advanced' },
    ],
  },
  {
    title: 'Database',
    icon: Database,
    color: 'bg-brand-green',
    skills: [
      { name: 'MySQL', level: 'Advanced' },
      { name: 'PostgreSQL', level: 'Advanced' },
    ],
  },
  {
    title: 'AI / ML',
    icon: Brain,
    color: 'bg-brand-yellow',
    skills: [
      { name: 'TensorFlow', level: 'Advanced' },
      { name: 'PyTorch', level: 'Advanced' },
      { name: 'OpenCV', level: 'Advanced' },
      { name: 'YOLO', level: 'Advanced' },
      { name: 'MediaPipe', level: 'Advanced' },
    ],
  },
  {
    title: 'Mobile & Tools',
    icon: Smartphone,
    color: 'bg-brand-pink',
    skills: [
      { name: 'Flutter', level: 'Expert' },
      { name: 'Git', level: 'Expert' },
      { name: 'Docker', level: 'Advanced' },
      { name: 'Linux', level: 'Advanced' },
    ],
  },
];

export type Project = {
  image: string | StaticImport;
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  techStack: string[];
  github: string;
  demo: string;
  caseStudy: string;
  gradient: string;
  accent: string;
  features: string[];
};

export const PROJECTS: Project[] = [
  {
    id: 'cv-teknik-sentosa',
    title: 'CV Teknik Sentosa',
    category: 'Company Profile',
    image: '/projects/cv-teknik-sentosa.png',
    description:
      'A professional company profile website for CV Teknik Sentosa Engineering.',
    longDescription:
      'A modern company profile website designed to present CV Teknik Sentosa Engineering, its services, company information, and professional identity to prospective clients.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/fittoardi/Company-Profile-Cv-Teknik-Sentosa',
    demo: 'https://company-profile-cv-teknik-sentosa.vercel.app/',
    caseStudy: '#',
    gradient: 'from-brand-blue to-brand-green',
    accent: '#2563EB',
    features: [
      'Professional company profile presentation',
      'Responsive layout for desktop and mobile',
      'Clear service and business information',
    ],
  },
  {
    id: 'maze-runner-ultimate',
    title: 'Maze Runner Ultimate',
    category: 'Game Development',
    image: '/projects/maze-runner-ultimate.png',
    description:
      'An interactive maze game focused on exploration, challenge, and responsive gameplay.',
    longDescription:
      'Maze Runner Ultimate is an interactive browser-based game where players navigate challenging mazes, avoid obstacles, and reach the finish point through an engaging visual experience.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Game UI'],
    github: 'https://github.com/fittoardi/Maze-Runner-Ultimate',
    demo: 'https://maze-runner-ultimate.vercel.app/',
    caseStudy: '#',
    gradient: 'from-brand-pink to-brand-yellow',
    accent: '#FF4D6D',
    features: [
      'Interactive maze gameplay',
      'Responsive controls and layout',
      'Browser-based experience with no installation required',
    ],
  },
  {
    id: 'System Information School Mithos',
    title: '(mi thoriqussalam) Mithos School Information System',
    category: 'Web Development',
    image: '/projects/mithos.png',
    description:
      'A comprehensive school information system for managing student data, academic records, and administrative tasks.',
    longDescription:
      'A comprehensive school information system built with Laravel and MySQL. It allows administrators to manage student data, academic records, and administrative tasks efficiently. The platform features a responsive design and provides a user-friendly interface for teachers, students, and parents.',
    techStack: ['php native', 'MySQL', 'Bootstrap', 'REST API'],
    github: '#',
    demo: 'https://mithos.sch.id/ ',
    caseStudy: '#',
    gradient: 'from-brand-pink to-brand-yellow',
    accent: '#FF4D6D',
    features: [
      'CRUD operations for student data',
      'Academic record management',
      'User-friendly interface for teachers, students, and parents',
    ],
  },
  {
    id: 'village-info-system',
    title: 'Village Information System',
    category: 'Web Development',
    image: "/projects/wonokarang.png",
    description:
      'A Laravel-based web platform for managing village data, services, and community engagement.',
    longDescription:
      'A comprehensive village information system built with Laravel and MySQL. It allows local administrators to manage village data, services, and community announcements. The platform features a responsive design using Bootstrap and provides REST API endpoints for integration with mobile apps.',
    techStack: ['PHP', 'Laravel', 'MySQL', 'Bootstrap', 'REST API'],
    github: 'https://github.com/choco-mette/KKN-TEMATIK-ASIK',
    demo: '#',
    caseStudy: '#',
    gradient: 'from-brand-green to-brand-yellow',
    accent: '#FFD60A',
    features: [
      'CRUD operations for village data',
      'Community announcement system',
      'Responsive design for mobile and desktop',
    ],
  },
  // {
  //   id: 'macro-expression',
  //   title: 'Macro Expression Recognition',
  //   category: 'Deep Learning',
  //   image: "/projects/village-system.png",
  //   description:
  //     'Deep learning model to classify subtle facial expressions from video.',
  //   longDescription:
  //     'A deep learning pipeline that detects and classifies macro facial expressions from video streams. Uses a CNN+LSTM architecture trained on the CK+ dataset with temporal feature extraction for frame-by-frame analysis.',
  //   techStack: ['Python', 'PyTorch', 'OpenCV', 'MediaPipe', 'NumPy'],
  //   github: '#',
  //   demo: '#',
  //   caseStudy: '',
  //   gradient: 'from-brand-blue to-brand-green',
  //   accent: '#2563EB',
  //   features: [
  //     'CNN + LSTM temporal architecture',
  //     'MediaPipe facial landmark extraction',
  //     '7 expression categories',
  //     'Real-time webcam inference',
  //   ],
  // },
  {
    id: 'E-commerce-platform',
    title: 'Greens Harvest',
    category: 'Web Development',
    image: "/projects/GreenHarvest.png",
    description:
      'Full-featured e-commerce platform for local farmers to sell fresh produce online.',
    longDescription:
      'A full-featured e-commerce platform for local farmers to sell fresh produce online. Built with Laravel and MySQL, featuring a responsive design and seamless payment integration.',
    techStack: ['PHP', 'Laravel', 'MySQL', 'Bootstrap', 'REST API'],
    github: 'https://github.com/fittoardi/greenharvest',
    demo: '#',
    caseStudy: '#',
    gradient: 'from-brand-pink to-brand-yellow',
    accent: '#FF4D6D',
    features: [
      'Product catalog and inventory management',
      'Shopping cart and checkout system',
      'User authentication and profile management',
      'Responsive design for mobile and desktop',
    ],
  },
  {
    id: 'hand-gesture-blur',
    title: 'Hand Gesture Blur Camera',
    category: 'Computer Vision',
    image: "/projects/hand-blur.png",
    description:
      'Privacy camera that blurs faces on hand gesture using MediaPipe.',
    longDescription:
      'An intelligent camera system that detects hand gestures via MediaPipe and automatically blurs faces in the frame for privacy. Designed for video calls and sensitive environments.',
    techStack: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'],
    github: 'https://github.com/fittoardiansyah/hand-gesture-blur',
    demo: '#',
    caseStudy: '#',
    gradient: 'from-brand-green to-brand-blue',
    accent: '#22C55E',
    features: [
      'MediaPipe hand landmark detection',
      'Gesture-triggered face blurring',
      'Virtual camera output',
      'Low-latency pipeline',
    ],
  },
  // {
  //   id: 'python-analytics',
  //   title: 'Python Data Analytics',
  //   category: 'Data Science',
  //   image: "/projects/village-system.png",
  //   description:
  //     'End-to-end analytics pipeline with interactive dashboards and ML insights.',
  //   longDescription:
  //     'A comprehensive data analytics platform that ingests, cleans, and visualizes datasets with interactive dashboards. Includes automated ML insights and predictive modeling capabilities.',
  //   techStack: ['Python', 'Pandas', 'Scikit-learn', 'Plotly', 'Streamlit'],
  //   github: '',
  //   demo: 'https://chatbot.it-trust.co.id/',
  //   caseStudy: '#',
  //   gradient: 'from-brand-yellow to-brand-blue',
  //   accent: '#FFD60A',
  //   features: [
  //     'Automated data cleaning pipeline',
  //     'Interactive Plotly dashboards',
  //     'Predictive modeling with scikit-learn',
  //     'Exportable PDF reports',
  //   ],
  // },
];

export type TimelineEvent = {
  year: string;
  level: string;
  title: string;
  description: string;
  color: string;
};

export const TIMELINE: TimelineEvent[] = [
  {
    year: '2021',
    level: 'Level 01',
    title: 'Started Coding Journey',
    description:
      'Began with Python and web fundamentals. Built first CRUD apps with PHP and MySQL.',
    color: 'bg-brand-yellow',
  },
  {
    year: '2022',
    level: 'Level 02',
    title: 'Full Stack Development',
    description:
      'Mastered Laravel, React, and REST API design. Shipped production web platforms.',
    color: 'bg-brand-pink',
  },
  {
    year: '2023',
    level: 'Level 03',
    title: 'RestApi',
    description:
      'Explored advanced backend systems, database optimization, and scalable architecture.',
    color: 'bg-brand-blue',
  },
  {
    year: '2024',
    level: 'Level 04',
    title: 'AI & Machine Learning',
    description:
      'Dived into computer vision, deep learning, and YOLO. Built AI-powered systems.',
    color: 'bg-brand-green',
  },
  {
    year: '2025',
    level: 'Level 05',
    title: 'AI Engineer',
    description:
      'Combining AI with full stack to ship intelligent, production-ready products.',
    color: 'bg-brand-yellow',
  },
];

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  link: string;
  color: string;
};

export const CERTIFICATES: Certificate[] = [
  {
    id: 'Pijar Fondation ',
    title: 'Asscoate Project Manager',
    issuer: 'Tenang AI',
    date: '2024',
    description:
      'Project management certification focusing on agile methodologies, team collaboration, and stakeholder management.',
    link: 'https://drive.google.com/file/d/1GgINYdU_nu6WDUMYOlAB5NcSYaiRqWaU/view?usp=sharing',
    color: 'bg-brand-yellow',
  },
  {
    id: 'ml-specialist',
    title: 'Machine Learning Specialist',
    issuer: 'Coursera',
    date: '2024',
    description:
      'Comprehensive ML specialization covering supervised, unsupervised, and deep learning.',
    link: '#',
    color: 'bg-brand-blue',
  },
];

export type Research = {
  id: string;
  title: string;
  field: string;
  dataset: string;
  method: string;
  result: string;
  accuracy: string;
  abstract: string;
  color: string;
};

export const RESEARCH: Research[] = [
  {
    id: 'expression-recognition',
    title: 'Comparative Performance Analysis of CNN, ResNet50, and EfficientNetB0 for Macro Facial Expression Recognition',
    field: 'Deep Learning',
    dataset: 'CK+ Dataset (20000 sequences)',
    method: 'CNN + Resnet50 + EfficientnetB0',
    result: '71% accuracy across 7 classes',
    accuracy: '71%',
    abstract:
      'This study evaluates the performance of CNN, ResNet50, and EfficientNetB0 architectures for macro facial expression recognition. Using the CK+ dataset, we analyze accuracy, inference time, and model complexity, providing insights into optimal model selection for real-time applications.',
    color: 'bg-brand-blue',
  },
  {
    id: 'hand-gesture',
    title: 'Hand Gesture-Based Privacy Camera System',
    field: 'Human-Computer Interaction',
    dataset: 'Custom (5K gesture frames)',
    method: 'MediaPipe + OpenCV',
    result: '91.2% gesture detection rate',
    accuracy: '91.2%',
    abstract:
      'An intelligent camera system that uses MediaPipe hand landmarks to detect privacy gestures and automatically blur faces. Achieves 91.2% gesture detection with real-time performance at 30 FPS.',
    color: 'bg-brand-pink',
  },
];

export const LOADING_MESSAGES = [
  'Initializing Portfolio...',
  'Loading Projects...',
  'Loading AI Models...',
  'Loading Workspace...',
  'Welcome.',
];

export const MARQUEE_ITEMS = [
  'AI',
  'Flutter',
  'Laravel',
  'Python',
  'Machine Learning',
  'Computer Vision',
  'Next.js',
  'FastAPI',
  'PyTorch',
  'TensorFlow',
  'Docker',
  'YOLO',
];
