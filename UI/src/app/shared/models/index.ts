export interface NavLink {
  name: string;
  link: string;
}

export interface Word {
  text: string;
  imgPath: string;
}

export interface CounterItem {
  value: number;
  suffix: string;
  label: string;
}

export interface LogoIcon {
  imgPath: string;
}

export interface Ability {
  imgPath: string;
  title: string;
  desc: string;
}

export interface TechStackImg {
  name: string;
  imgPath: string;
}

export interface TechStackIcon {
  name: string;
  modelPath?: string;
  imgPath?: string;
  scale: number;
  rotation: [number, number, number];
}

export interface ExpPosition {
  title: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface ExpCard {
  companyName: string;
  review: string;
  logoPath: string;
  positions: ExpPosition[];
}

export interface ExpLogo {
  name: string;
  imgPath: string;
}

export interface Testimonial {
  name: string;
  mentions: string;
  review: string;
  imgPath: string;
}

export interface SocialImg {
  name: string;
  imgPath: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
