import type {
  NavLink,
  Word,
  LogoIcon,
  Ability,
  TechStackIcon,
  ExpCard,
} from '../models';

export const NAV_LINKS: NavLink[] = [
  { name: 'About Me', link: '#about-me' },
  { name: 'Skills', link: '#skills' },
  { name: 'Experience', link: '#experience' },
];

export const WORDS: Word[] = [
  { text: 'Ideas', imgPath: '/images/ideas.svg' },
  { text: 'Concepts', imgPath: '/images/concepts.svg' },
  { text: 'Designs', imgPath: '/images/designs.svg' },
  { text: 'Code', imgPath: '/images/code.svg' },
  { text: 'Ideas', imgPath: '/images/ideas.svg' },
  { text: 'Concepts', imgPath: '/images/concepts.svg' },
  { text: 'Designs', imgPath: '/images/designs.svg' },
  { text: 'Code', imgPath: '/images/code.svg' },
];

export const LOGO_ICONS_LIST: LogoIcon[] = [
  { imgPath: '/images/logos/company-logo-1.png' },
  { imgPath: '/images/logos/company-logo-2.png' },
  { imgPath: '/images/logos/company-logo-3.png' },
  { imgPath: '/images/logos/company-logo-4.png' },
  { imgPath: '/images/logos/company-logo-5.png' },
  { imgPath: '/images/logos/company-logo-6.png' },
  { imgPath: '/images/logos/company-logo-7.png' },
  { imgPath: '/images/logos/company-logo-8.png' },
  { imgPath: '/images/logos/company-logo-9.png' },
  { imgPath: '/images/logos/company-logo-10.png' },
  { imgPath: '/images/logos/company-logo-11.png' },
];

export const ABILITIES: Ability[] = [
  {
    imgPath: '/images/seo.png',
    title: 'Critical Thinker',
    desc: 'I always do my best to analyze complex logic and data. I create algorithms to solve complex problems.',
  },
  {
    imgPath: '/images/chat.png',
    title: 'Reliable Communication',
    desc: 'Keeping you updated at every step to ensure transparency and clarity.',
  },
  {
    imgPath: '/images/time.png',
    title: 'Learning Enthusiast',
    desc: "I'm always seeking to improve my skills and willing to learn new things.",
  },
];

export const TECH_STACK_ICONS: TechStackIcon[] = [
  {
    name: 'React Developer',
    modelPath: '/models/react_logo-transformed.glb',
    scale: 0.8,
    rotation: [0.15, 0.3, -0.1],
  },
  {
    name: 'Angular Developer',
    imgPath: '/images/logos/angular.svg',
    scale: 1,
    rotation: [-0.1, -0.25, 0.2],
  },
  {
    name: 'C# Developer',
    imgPath: '/images/logos/csharp.svg',
    scale: 1,
    rotation: [0.2, 0.15, -0.2],
  },
  {
    name: 'Node.js Developer',
    modelPath: '/models/node-transformed.glb',
    scale: 4,
    rotation: [0.2, -Math.PI / 2, 0.15],
  },
  {
    name: 'Claude Spec Developer',
    imgPath: '/images/logos/claude.svg',
    scale: 1,
    rotation: [-0.15, 0.35, 0.1],
  },
];

export const EXP_CARDS: ExpCard[] = [
  {
    companyName: 'AMCS Group',
    review:
      'A global leader in "Performance Sustainability" software and cloud-based solutions for waste, recycling, and resource-intensive industries.',
    logoPath: '/images/amcs-logo.jpg',
    positions: [
      {
        title: 'Senior Software Engineer',
        startDate: 'March 2023',
        endDate: 'Present',
        responsibilities: [
          "Maintain and develop new features for the company's ERP and plug-in applications.",
          'Contribute to architectural decisions for various applications.',
          'Guide co-developers through highly complex technical tasks.',
        ],
      },
    ],
  },
  {
    companyName: 'TeraVault Software',
    review:
      'A venture builder and digital product agency specializing in transforming software ideas into scalable startups, operating as a technical co-founder and incubator.',
    logoPath: '/images/teravault-logo.png',
    positions: [
      {
        title: 'Senior Full Stack Software Developer',
        startDate: 'May 2020',
        endDate: 'March 2023',
        responsibilities: [
          'Managed the end-to-end software development process (Front-End to Back-End) for clients.',
          'Conducted technical interviews for the developer hiring process.',
          'Made key architectural decisions for company applications.',
          'Designed databases and led junior developers on various projects.',
        ],
      },
    ],
  },
  {
    companyName: 'FPT Software',
    review:
      'A global technology and IT services provider headquartered in Vietnam; a subsidiary of FPT Corporation. Focuses on digital transformation and IT consulting.',
    logoPath: '/images/fpt-software-logo.png',
    positions: [
      {
        title: 'Software Development Engineer',
        startDate: 'March 2019',
        endDate: 'May 2020',
        responsibilities: [
          'Developed software for global clients with a focus on ReactJS, TypeScript, and IoT.',
          'Collaborated with the Firmware team to develop mobile and web interfaces for smart devices.',
        ],
      },
    ],
  },
  {
    companyName: 'GoodApps Inc.',
    review:
      'A FinTech subsidiary of Global Optimum Data Ventures; the carrier for the mobile platform "Goodkredit."',
    logoPath: '/images/goodapps-logo.png',
    positions: [
      {
        title: 'iOS/Software Developer',
        startDate: 'May 2018',
        endDate: 'March 2019',
        responsibilities: [
          'Developed iOS versions and back-end processes for company applications.',
          'Developed and maintained APIs for corporate partners.',
        ],
      },
      {
        title: 'Software Developer',
        startDate: 'December 2016',
        endDate: 'March 2019',
        responsibilities: [
          'Full-stack website development and maintenance.',
          'Developed back-end processes and integrated third-party APIs.',
          'Managed a team of 5 OJTs and served as project lead.',
        ],
      },
    ],
  },
];
