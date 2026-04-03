# Data Model: Jk Alombro 3D Portfolio (Angular)

All data is static — no API calls, no database. Models are TypeScript interfaces for the constants that drive template rendering.

---

## Interfaces

### NavLink
```typescript
interface NavLink {
  name: string;   // Display label
  link: string;   // Anchor href (e.g. '#work')
}
```

### Word
```typescript
interface Word {
  text: string;     // Displayed word in hero slide
  imgPath: string;  // Icon image path
}
```

### CounterItem
```typescript
interface CounterItem {
  value: number;    // Numeric target for animation
  suffix: string;   // e.g. '+' or '%'
  label: string;    // Descriptor below the number
}
```

### LogoIcon
```typescript
interface LogoIcon {
  imgPath: string;  // Company logo path
}
```

### Ability
```typescript
interface Ability {
  imgPath: string;  // Icon path
  title: string;    // Card heading
  desc: string;     // Card description
}
```

### TechStackImg
```typescript
interface TechStackImg {
  name: string;    // Skill name
  imgPath: string; // 2D icon image (fallback)
}
```

### TechStackIcon
```typescript
interface TechStackIcon {
  name: string;          // Skill name displayed below the card
  modelPath?: string;    // Optional path to .glb 3D model
  imgPath?: string;      // Optional fallback 2D image (used when modelPath absent)
  scale: number;         // Three.js object scale
  rotation: [number, number, number]; // Euler rotation [x, y, z]
}
```

> Note: `modelPath` and `imgPath` are mutually exclusive. If `modelPath` is provided, the NGT canvas renders the model. Otherwise, the component falls back to an `<img>`.

### ExpCard
```typescript
interface ExpCard {
  review: string;            // Testimonial quote on the glow card
  imgPath: string;           // Card background image
  logoPath: string;          // Company logo
  title: string;             // Job title
  date: string;              // Date range
  responsibilities: string[]; // Bullet list of responsibilities
}
```

### ExpLogo
```typescript
interface ExpLogo {
  name: string;    // Logo identifier
  imgPath: string; // Logo image path
}
```

### Testimonial
```typescript
interface Testimonial {
  name: string;      // Reviewer name
  mentions: string;  // Social handle (e.g. '@estherhoward')
  review: string;    // Review text
  imgPath: string;   // Reviewer avatar
}
```

### SocialImg
```typescript
interface SocialImg {
  name: string;    // Platform name (insta, fb, x, linkedin)
  imgPath: string; // Icon image path
}
```

### ContactForm
```typescript
interface ContactForm {
  name: string;    // Sender name
  email: string;   // Sender email
  message: string; // Message body
}
```

---

## Contact Store State

```typescript
interface ContactState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ContactState = {
  loading: false,
  success: false,
  error: null,
};
```

---

## Constants Data

### navLinks
```typescript
const NAV_LINKS: NavLink[] = [
  { name: 'Work', link: '#work' },
  { name: 'Experience', link: '#experience' },
  { name: 'Skills', link: '#skills' },
  { name: 'Testimonials', link: '#testimonials' },
];
```

### techStackIcons (Jk Alombro)
```typescript
const TECH_STACK_ICONS: TechStackIcon[] = [
  { name: 'React Developer',      modelPath: '/models/react_logo-transformed.glb', scale: 1,    rotation: [0, 0, 0] },
  { name: 'Angular Developer',    imgPath: '/images/logos/angular.svg',             scale: 1,    rotation: [0, 0, 0] },
  { name: 'TypeScript Developer', imgPath: '/images/logos/typescript.svg',          scale: 1,    rotation: [0, 0, 0] },
  { name: 'C# Developer',         imgPath: '/images/logos/csharp.svg',              scale: 1,    rotation: [0, 0, 0] },
  { name: '.NET Developer',       imgPath: '/images/logos/dotnet.svg',              scale: 1,    rotation: [0, 0, 0] },
  { name: 'Claude / AI',          imgPath: '/images/logos/claude.svg',              scale: 1,    rotation: [0, 0, 0] },
];
```

> Logo images for Angular, TypeScript, C#, .NET, and Claude are to be added to `src/assets/images/logos/` during implementation.

---

## Environment Variables

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  emailjsServiceId: '',    // Set via CI or .env injection
  emailjsTemplateId: '',
  emailjsPublicKey: '',
};
```
