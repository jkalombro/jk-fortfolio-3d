# Implementation Plan: Jk Alombro 3D Portfolio

**Branch**: `main` | **Date**: 2026-04-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/main/spec.md`

## Summary

Convert the React/Three.js 3D portfolio reference (`.reference/3d-portfolio`) into an Angular standalone application for Jk Alombro. Uses angular-three (NGT) for 3D scenes, GSAP for scroll animations, NgRx for contact form state, SCSS for all styling, and EmailJS for form submission. Scaffolded via `/create-ui-app`.

## Technical Context

**Language/Version**: TypeScript 5.x (Angular 18+)
**Primary Dependencies**: Angular 18, angular-three (NGT), @angular-three/soba, Three.js, GSAP + ScrollTrigger, NgRx (store + effects), @emailjs/browser
**Storage**: N/A — static portfolio, no persistence
**Testing**: Jest with 100% coverage; Angular Testing Library for components
**Target Platform**: Web (modern browsers — Chrome, Firefox, Safari, Edge)
**Project Type**: Single-page web application (portfolio)
**Performance Goals**: 60 fps 3D rendering; smooth GSAP scroll animations; <3s initial load
**Constraints**: Fully responsive (mobile 375px → desktop 1920px); accessible (semantic HTML, ARIA labels, alt text); passes ESLint + Prettier
**Scale/Scope**: 10 section components + 4 shared components + 1 NgRx feature store

## Constitution Check

*GATE: Must pass before implementation begins. Re-check after design phase.*

| Rule | Status | Notes |
|------|--------|-------|
| All components standalone (`standalone: true`) | PASS | Enforced on every component |
| No NgModules | PASS | Providers registered via `app.config.ts` |
| OnPush change detection everywhere | PASS | Required on all components, no exceptions |
| Signals in components (`input()`, `output()`, `signal()`, `computed()`) | PASS | All component I/O via signals |
| `toSignal()` for NgRx selectors in components | PASS | No `async` pipe |
| NgRx store for stateful interactions | PASS | Contact form state in feature store |
| SCSS only — no Tailwind | PASS | Design tokens in `variables.scss`, mixins in `mixins.scss` |
| Jest, not Karma/Jasmine | PASS | Set up via `/create-ui-app` |
| 100% Jest coverage | PASS | Enforced via coverage thresholds in `jest.config.js` |
| ESLint + `@angular-eslint` + Prettier | PASS | Set up via `/create-ui-app` |
| TDD: write tests before implementation | PASS | Each task writes tests first |
| Accessibility: semantic HTML, ARIA, alt text | PASS | Enforced in all template work |
| Reactive Forms only | PASS | Contact form uses `FormBuilder`/`FormGroup` |
| `@if`/`@for`/`@switch` (not `*ngIf`/`*ngFor`) | PASS | New control flow syntax throughout |
| No `async` pipe | PASS | `toSignal()` used instead |
| Interfaces: no `I` prefix | PASS | `NavLink`, `ExpCard`, `Testimonial` (not `INavLink`) |
| SCREAMING_SNAKE_CASE for module-level constants | PASS | `NAV_LINKS`, `TECH_STACK_ICONS`, etc. |
| Files: kebab-case | PASS | All filenames in kebab-case |

## Project Structure

### Documentation (this feature)

```text
specs/main/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── ui-contracts.md  # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks - NOT created here)
```

### Source Code (repository root)

```text
src/
├── styles.scss                          — imports global.scss
├── assets/
│   ├── images/                          — all portfolio images + logos
│   ├── models/                          — .glb 3D model files
│   └── styles/
│       ├── variables.scss               — design tokens (colors, spacing, breakpoints)
│       ├── mixins.scss                  — shared SCSS mixins
│       └── global.scss                  — body reset, layout helpers, marquee, card styles
└── app/
    ├── app.config.ts
    ├── app.routes.ts
    ├── app.component.{ts,html,scss}
    │
    ├── home/                            — lazy-loaded main page feature
    │   ├── home.routes.ts
    │   ├── home.component.{ts,html,scss}
    │   └── components/
    │       ├── navbar/
    │       ├── hero/
    │       │   └── components/
    │       │       ├── hero-experience/
    │       │       │   └── components/
    │       │       │       ├── hero-lights/
    │       │       │       ├── particles/
    │       │       │       └── room/
    │       │       └── animated-counter/
    │       ├── showcase-section/
    │       ├── logo-showcase/
    │       ├── feature-cards/
    │       ├── experience/
    │       ├── tech-stack/
    │       │   └── components/
    │       │       └── tech-icon-card/
    │       ├── testimonials/
    │       ├── contact/
    │       │   ├── store/
    │       │   │   ├── models/
    │       │   │   ├── actions/
    │       │   │   ├── reducers/
    │       │   │   ├── effects/
    │       │   │   └── api/
    │       │   └── components/
    │       │       └── contact-experience/
    │       └── footer/
    │
    └── shared/
        ├── components/
        │   ├── button/
        │   ├── title-header/
        │   └── glow-card/
        ├── services/
        │   └── email.service.ts
        └── helpers/
```

**Structure Decision**: Single Angular project at repository root. All sections as a lazy-loaded `home` feature following the constitution's feature-per-folder pattern. No separate backend — static portfolio only.

## Implementation Phases

### Phase 0: Research ✅
See [research.md](./research.md) — all decisions resolved:
- angular-three (NGT) chosen as React Three Fiber equivalent
- GSAP used directly in `ngAfterViewInit`/`ngOnDestroy`
- EmailJS wrapped in Angular injectable `EmailService`
- Tailwind → SCSS conversion strategy defined
- TechIconCard dual-mode (GLB model or img fallback) for Jk's tech stack
- Minimal NgRx — contact form state only

### Phase 1: Design & Contracts ✅
- [data-model.md](./data-model.md) — all TypeScript interfaces and constants
- [contracts/ui-contracts.md](./contracts/ui-contracts.md) — component I/O, store actions/selectors, routing
- [quickstart.md](./quickstart.md) — dev setup instructions

### Phase 2: Implementation (run `/speckit.tasks` next)

Task groups for task generation:

1. **Project Scaffolding** — `/create-ui-app` → Angular project at repo root; install extra deps; copy assets from `.reference/3d-portfolio/public/`
2. **Global Styles** — `variables.scss` (colors, spacing, breakpoints), `mixins.scss`, `global.scss` (reset, layout helpers, marquee, card borders, glow effects)
3. **Constants** — `src/app/shared/constants/index.ts` with all static data using Jk's name and tech stack (Angular, TypeScript, C#, .NET, Claude, React)
4. **Shared Components** — ButtonComponent, TitleHeaderComponent, GlowCardComponent (TDD)
5. **Email Service + Contact Store** — EmailService, ContactState models, actions, reducer, selectors, effect (TDD)
6. **Home Feature Shell** — HomeComponent, home.routes.ts, AppComponent routing
7. **Navbar** — sticky nav with scroll behaviour, anchor links, responsive hamburger menu (TDD)
8. **Hero Section** — GSAP h1 animation, word-cycling slide, CTA button, AnimatedCounterComponent, HeroExperienceComponent (NGT room GLB scene with lights + particles)
9. **ShowcaseSection** — 3 project cards, GSAP ScrollTrigger stagger reveal
10. **LogoShowcase** — CSS infinite marquee of company logos
11. **FeatureCards** — 3 static ability cards
12. **Experience Section** — timeline with GSAP scroll animation, GlowCard integration, responsibilities list
13. **TechStack Section** — TechIconCardComponent (GLB for React, img fallback for Angular/TS/C#/.NET/Claude), GSAP stagger animation
14. **Testimonials Section** — masonry 3-column layout, GlowCard integration
15. **Contact Section** — Reactive Form, NgRx dispatch, loading/success/error states, ContactExperienceComponent (NGT computer GLB + OrbitControls)
16. **Footer** — social icon links, `DatePipe` for current year, "© Jk Alombro"
17. **Accessibility & Integration** — semantic HTML audit, ARIA labels, alt text, keyboard navigation, responsive QA
18. **Final QA** — ESLint clean, Prettier clean, Jest coverage ≥ 100%
