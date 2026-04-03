import type {
  NavLink,
  Word,
  CounterItem,
  LogoIcon,
  Ability,
  TechStackIcon,
  ExpCard,
  ExpLogo,
  Testimonial,
  SocialImg,
} from '../models';

export const NAV_LINKS: NavLink[] = [
  { name: 'Work', link: '#work' },
  { name: 'Experience', link: '#experience' },
  { name: 'Skills', link: '#skills' },
  { name: 'Testimonials', link: '#testimonials' },
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
    title: 'Quality Focus',
    desc: 'Delivering high-quality results while maintaining attention to every detail.',
  },
  {
    imgPath: '/images/chat.png',
    title: 'Reliable Communication',
    desc: 'Keeping you updated at every step to ensure transparency and clarity.',
  },
  {
    imgPath: '/images/time.png',
    title: 'On-Time Delivery',
    desc: 'Making sure projects are completed on schedule, with quality & attention to detail.',
  },
];

export const TECH_STACK_ICONS: TechStackIcon[] = [
  {
    name: 'React Developer',
    modelPath: '/models/react_logo-transformed.glb',
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: 'Angular Developer',
    imgPath: '/images/logos/angular.svg',
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: 'C# Developer',
    imgPath: '/images/logos/csharp.svg',
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: '.NET Developer',
    imgPath: '/images/logos/dotnet.svg',
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: 'Claude / AI',
    imgPath: '/images/logos/claude.svg',
    scale: 1,
    rotation: [0, 0, 0],
  },
];

export const EXP_CARDS: ExpCard[] = [
  {
    review:
      'Jk Alombro brought creativity and technical expertise to the team, significantly improving our frontend performance. His work has been invaluable in delivering faster experiences.',
    imgPath: '/images/exp1.png',
    logoPath: '/images/logo1.png',
    title: 'Frontend Developer',
    date: 'January 2023 - Present',
    responsibilities: [
      'Developed and maintained user-facing features for the Hostinger website.',
      'Collaborated closely with UI/UX designers to ensure seamless user experiences.',
      'Optimized web applications for maximum speed and scalability.',
    ],
  },
  {
    review:
      "Jk Alombro's contributions to Docker's web applications have been outstanding. He approaches challenges with a problem-solving mindset.",
    imgPath: '/images/exp2.png',
    logoPath: '/images/logo2.png',
    title: 'Full Stack Developer',
    date: 'June 2020 - December 2023',
    responsibilities: [
      "Led the development of Docker's web applications, focusing on scalability.",
      'Worked with backend engineers to integrate APIs seamlessly with the frontend.',
      'Contributed to open-source projects that were used with the Docker ecosystem.',
    ],
  },
  {
    review:
      "Jk Alombro's work on Appwrite's mobile app brought a high level of quality and efficiency. He delivered solutions that enhanced our mobile experience & meet our product goals.",
    imgPath: '/images/exp3.png',
    logoPath: '/images/logo3.png',
    title: 'React Native Developer',
    date: 'March 2019 - May 2020',
    responsibilities: [
      "Built cross-platform mobile apps using React Native, integrating with Appwrite's backend services.",
      'Improved app performance and user experience through code optimization and testing.',
      'Coordinated with the product team to implement features based on feedback.',
    ],
  },
];

export const EXP_LOGOS: ExpLogo[] = [
  { name: 'logo1', imgPath: '/images/logo1.png' },
  { name: 'logo2', imgPath: '/images/logo2.png' },
  { name: 'logo3', imgPath: '/images/logo3.png' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Esther Howard',
    mentions: '@estherhoward',
    review:
      "I can't say enough good things about Jk Alombro. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: '/images/client1.png',
  },
  {
    name: 'Wade Warren',
    mentions: '@wadewarren',
    review:
      'Working with Jk Alombro was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.',
    imgPath: '/images/client3.png',
  },
  {
    name: 'Guy Hawkins',
    mentions: '@guyhawkins',
    review:
      "Collaborating with Jk Alombro was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Jk Alombro's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Jk Alombro is the ideal partner.",
    imgPath: '/images/client2.png',
  },
  {
    name: 'Marvin McKinney',
    mentions: '@marvinmckinney',
    review:
      "Jk Alombro was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that's both modern and easy to navigate. Fantastic work overall.",
    imgPath: '/images/client5.png',
  },
  {
    name: 'Floyd Miles',
    mentions: '@floydmiles',
    review:
      "Jk Alombro's expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He's a true professional!",
    imgPath: '/images/client4.png',
  },
  {
    name: 'Albert Flores',
    mentions: '@albertflores',
    review:
      'Jk Alombro was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.',
    imgPath: '/images/client6.png',
  },
];

export const SOCIAL_IMGS: SocialImg[] = [
  { name: 'insta', imgPath: '/images/insta.png' },
  { name: 'fb', imgPath: '/images/fb.png' },
  { name: 'x', imgPath: '/images/x.png' },
  { name: 'linkedin', imgPath: '/images/linkedin.png' },
];
