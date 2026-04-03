# Feature Specification: Jk Alombro 3D Portfolio (Angular)

## Overview

Convert the existing React/Three.js 3D portfolio reference project (`.reference/3d-portfolio`) into an Angular application. The portfolio is a single-page personal website for **Jk Alombro**, featuring 3D model rendering, scroll-driven GSAP animations, an EmailJS contact form, and responsive design across all screen sizes.

## Source Reference

- **Reference project**: `.reference/3d-portfolio/` (React + Vite + Tailwind + @react-three/fiber)
- **Target framework**: Angular (standalone components, NgRx, SCSS, angular-three)

## Sections to Implement

The portfolio is composed of the following sections rendered in order on a single page:

1. **Navbar** — Sticky navigation with anchor links: Work, Experience, Skills, Testimonials
2. **Hero** — Animated heading with word-cycling slide, hero bio text, CTA button, 3D room model, animated counters
3. **ShowcaseSection** — Project cards with GSAP scroll-triggered reveal animations (3 projects)
4. **LogoShowcase** — Infinite marquee of company logos
5. **FeatureCards** — 3 ability/value cards (Quality Focus, Reliable Communication, On-Time Delivery)
6. **Experience** — Timeline of work experience with GSAP scroll animations and glow cards
7. **TechStack** — 3D icon carousel for skills (angular-three), GSAP scroll-triggered animations
8. **Testimonials** — Masonry-style testimonial cards with glow effect
9. **Contact** — EmailJS contact form + 3D computer model
10. **Footer** — Social icons + copyright

## Personalization

- **Name**: Jk Alombro (replacing "Adrian" / "Adrian Hajdin" everywhere)
- **Hero bio**: Placeholder — "Hi, I'm Jk Alombro, a developer with a passion for code."
- **Stats**: Keep reference placeholder values (15+, 200+, 108+, 90%) — to be updated manually
- **Experience cards**: Keep reference placeholder entries — to be updated manually
- **Tech stack**: Angular, TypeScript, C#, .NET, Claude, React (replaces React/Python/Node/Three.js/Git)
- **Footer copyright**: "© [year] Jk Alombro. All rights reserved."

## Technical Decisions

| Concern | Decision |
|---------|----------|
| 3D rendering | `angular-three` (NGT) — Angular-native Three.js wrapper |
| Styling | SCSS only — no Tailwind; use `variables.scss`, `mixins.scss`, `global.scss` |
| State management | NgRx (Actions / Reducers / Effects) per constitution |
| Animations | GSAP + ScrollTrigger (used directly, no framework wrapper needed) |
| Contact form | `@emailjs/browser` via Angular injectable service |
| Change detection | OnPush on every component |
| Forms | Reactive Forms (contact form) |
| Testing | Jest with 100% coverage |
| Scaffolding | `/create-ui-app` skill to bootstrap the Angular project |

## Acceptance Criteria

- All 10 sections are implemented as standalone Angular components
- 3D models render correctly using angular-three (NGT) for Hero, TechStack, and Contact scenes
- GSAP scroll-triggered animations work on ShowcaseSection, Experience, and TechStack
- Word-cycling slide animation works in Hero
- Infinite marquee works in LogoShowcase
- Glow card hover effect works in Experience and Testimonials
- Contact form submits via EmailJS (service/template IDs via environment variables)
- All "Adrian" / "Adrian Hajdin" references replaced with "Jk Alombro"
- Tech stack shows Angular, TypeScript, C#, .NET, Claude, React
- Fully responsive (mobile, tablet, desktop)
- Passes ESLint + Prettier
- 100% Jest coverage on all services and helpers
