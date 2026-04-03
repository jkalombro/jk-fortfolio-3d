# Quickstart: Jk Alombro 3D Portfolio (Angular)

## Prerequisites

- Node.js 20+
- Angular CLI 18+ (`npm install -g @angular/cli`)
- Git

---

## 1. Scaffold the Project

Run the `/create-ui-app` skill from the repository root. When prompted:
- **Framework**: Angular
- **Project name**: `jk-portfolio`
- **Directory**: repository root (`.`)

This will set up:
- Angular 18+ standalone project
- Jest (not Karma/Jasmine)
- ESLint + Prettier
- SCSS as default style format
- NgRx configured in `app.config.ts`

---

## 2. Install Additional Dependencies

```bash
# 3D rendering
npm install angular-three @angular-three/soba three
npm install -D @types/three

# Animations
npm install gsap

# Contact form
npm install @emailjs/browser

# NgRx (if not pre-installed by create-ui-app)
npm install @ngrx/store @ngrx/effects @ngrx/store-devtools
```

---

## 3. Copy Assets

Copy all assets from the reference project:

```bash
cp -r .reference/3d-portfolio/public/images src/assets/images
cp -r .reference/3d-portfolio/public/models src/assets/models
```

Then add these additional logo SVGs to `src/assets/images/logos/`:
- `angular.svg`
- `typescript.svg`
- `csharp.svg`
- `dotnet.svg`
- `claude.svg`

---

## 4. Configure Environment Variables

Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  emailjsServiceId: 'YOUR_SERVICE_ID',
  emailjsTemplateId: 'YOUR_TEMPLATE_ID',
  emailjsPublicKey: 'YOUR_PUBLIC_KEY',
};
```

Get your keys from [emailjs.com](https://www.emailjs.com/).

---

## 5. Run the Development Server

```bash
ng serve
```

Open [http://localhost:4200](http://localhost:4200).

---

## 6. Run Tests

```bash
npm test
# or with coverage
npm test -- --coverage
```

---

## 7. Build for Production

```bash
ng build --configuration production
```

Output is in `dist/jk-portfolio/`.

---

## Project Structure (after scaffolding)

```
src/
├── styles.scss
├── assets/
│   ├── images/
│   │   ├── logos/         ← tech stack + company logos
│   │   └── ...            ← all other reference images
│   ├── models/            ← .glb 3D model files
│   └── styles/
│       ├── variables.scss
│       ├── mixins.scss
│       └── global.scss
└── app/
    ├── app.config.ts
    ├── app.routes.ts
    ├── app.component.{ts,html,scss}
    ├── home/
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
    │       │   │   ├── actions/
    │       │   │   ├── reducers/
    │       │   │   ├── effects/
    │       │   │   └── api/
    │       │   └── components/
    │       │       └── contact-experience/
    │       └── footer/
    └── shared/
        ├── components/
        │   ├── button/
        │   ├── title-header/
        │   └── glow-card/
        ├── services/
        │   └── email.service.ts
        └── helpers/
```

---

## Key Implementation Notes

### 3D Scenes (angular-three)
Every 3D scene is a standalone Angular component wrapping `ngt-canvas`. Load `.glb` models via `NgtLoader`. Use `@angular-three/soba` for `NgtsOrbitControls` and `NgtsEnvironment`.

### GSAP Animations
Initialize GSAP timelines in `ngAfterViewInit`. Always destroy ScrollTrigger instances in `ngOnDestroy` to prevent leaks.

### NgRx Contact Store
The contact feature store lives at `home/components/contact/store/`. Provide it via `provideState` in `home.routes.ts` (not globally).

### TechIconCard Dual Mode
The `TechIconCardComponent` checks `model.modelPath`. If present → renders `ngt-canvas` scene with the GLB. If absent → renders a static `<img>` with `model.imgPath`. This supports Angular, TypeScript, C#, .NET, and Claude which have no `.glb` assets.
