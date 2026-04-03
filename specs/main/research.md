# Research: Jk Alombro 3D Portfolio (Angular)

## 1. angular-three (NGT) — Three.js in Angular

**Decision**: Use `angular-three` v3 (NGT) for all 3D canvas scenes.

**Rationale**: NGT is the closest Angular equivalent to `@react-three/fiber`. It wraps Three.js objects as Angular components/directives, supports standalone components, and handles the render loop automatically. It also supports postprocessing via `@angular-three/postprocessing` and helpers via `@angular-three/soba` (equivalent of `@react-three/drei`).

**Key packages**:
- `angular-three` — core canvas + scene graph
- `@angular-three/soba` — helper components (OrbitControls, Environment, Float, etc.)
- `@angular-three/postprocessing` — bloom, depth-of-field effects
- `three` + `@types/three` — underlying Three.js

**Alternatives considered**:
- Plain Three.js: More verbose, no declarative scene graph, harder to integrate with Angular DI
- Skip 3D: Would lose the key visual differentiator of the portfolio

**3D scenes to implement**:
| Reference (React) | Angular equivalent |
|---|---|
| `HeroExperience` | `ngt-canvas` scene with `optimized-room.glb` + lights + particles |
| `TechIconCardExperience` | `ngt-canvas` scene with individual `.glb` tech logo models |
| `ContactExperience` | `ngt-canvas` scene with `computer-optimized-transformed.glb` + OrbitControls |

**GLB loading**: Use `NgtLoader` (NGT's loader service) to load `.glb` files, equivalent to `useLoader(GLTFLoader, path)` in R3F.

---

## 2. GSAP in Angular

**Decision**: Use GSAP + ScrollTrigger directly — no Angular-specific wrapper needed.

**Rationale**: GSAP is framework-agnostic. In Angular, animations are triggered in `ngAfterViewInit` using `ElementRef` or native DOM queries. `ScrollTrigger.refresh()` should be called after Angular's change detection completes.

**Pattern**:
```typescript
// In component after view init
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

ngAfterViewInit(): void {
  gsap.fromTo(this.el.nativeElement.querySelector('.hero-text h1'), ...);
}
```

**Cleanup**: Unregister ScrollTrigger instances in `ngOnDestroy` to prevent memory leaks.

---

## 3. EmailJS in Angular

**Decision**: Wrap `@emailjs/browser` in an injectable Angular service (`EmailService`).

**Rationale**: Keeps the component clean; the service handles all EmailJS calls and error handling. Environment variables are stored in `src/environments/environment.ts` (and `environment.prod.ts`).

**Pattern**:
```typescript
@Injectable({ providedIn: 'root' })
export class EmailService {
  send(templateParams: EmailTemplateParams): Observable<EmailJSResponseStatus> {
    return from(emailjs.send(
      environment.emailjsServiceId,
      environment.emailjsTemplateId,
      templateParams,
      environment.emailjsPublicKey
    ));
  }
}
```

**Alternatives considered**: Angular's `HttpClient` to a backend proxy — adds unnecessary infrastructure for a static portfolio.

---

## 4. SCSS Conversion from Tailwind

**Decision**: Convert all Tailwind utility classes to SCSS using the existing design tokens.

**Rationale**: Constitution mandates SCSS-only. All colors, spacing, and layout constants go in `variables.scss`; reusable patterns go in `mixins.scss`.

**Mapping strategy**:
- Tailwind layout utilities (`flex-center`, `grid-12-cols`) → SCSS classes defined in `global.scss`
- Tailwind responsive prefixes (`md:`, `xl:`) → SCSS `@media` queries using breakpoint variables
- Tailwind color utilities (`text-white-50`, `bg-[#cd7c2e]`) → SCSS variables

**Key variables to define** (from Tailwind config analysis):
```scss
// variables.scss
$color-bg-primary: #0a0a0a;
$color-bg-card: #1a1a1a;
$color-white: #ffffff;
$color-white-50: rgba(255, 255, 255, 0.5);
$color-accent-amber: #cd7c2e;
$color-accent-blue: #839cb5;

$breakpoint-md: 768px;
$breakpoint-xl: 1280px;

$section-padding-x: 1.25rem;
$section-padding-x-md: 2.5rem;
```

---

## 5. Tech Stack 3D Models

**Decision**: Use available `.glb` models from the reference; add static image fallbacks for skills without 3D models.

**Jk Alombro's tech stack**: Angular, TypeScript, C#, .NET, Claude, React

**Model availability** (from `.reference/3d-portfolio/public/models/`):
| Skill | Available GLB | Approach |
|---|---|---|
| React | `react_logo-transformed.glb` | Use existing |
| TypeScript | None | Static icon image fallback |
| Angular | None | Static icon image fallback |
| C# | None | Static icon image fallback |
| .NET | None | Static icon image fallback |
| Claude | None | Static icon image fallback |

**Rationale**: Rather than blocking on missing 3D assets, the `TechIconCard` component will support both a `modelPath` and an `imgPath` input. If `modelPath` is absent, it renders an `<img>` inside the card instead of an NGT canvas.

---

## 6. NgRx Usage

**Decision**: Minimal NgRx — only for contact form state (loading, success, error).

**Rationale**: The portfolio is mostly presentational/static. NgRx is required by the constitution. The contact form is the only stateful interaction worth tracking in the store. All other sections are pure presentational components driven by static data from constants.

**Feature store**: `contact/store/` with:
- Actions: `submitForm`, `submitFormSuccess`, `submitFormFailure`
- Reducer: `{ loading: boolean, success: boolean, error: string | null }`
- Effect: calls `EmailService.send()`, dispatches success/failure
- Selector: `selectContactLoading`, `selectContactSuccess`, `selectContactError`

---

## 7. Scaffolding with /create-ui-app

**Decision**: Use `/create-ui-app` to bootstrap the Angular project at the repository root.

**Rationale**: The user explicitly requested this. The skill sets up the Angular CLI project with the correct constitution-compliant configuration (Jest, ESLint, SCSS, NgRx, standalone components).

**Post-scaffold steps**:
1. Install additional dependencies: `angular-three`, `@angular-three/soba`, `three`, `@types/three`, `gsap`, `@emailjs/browser`, `@ngrx/store`, `@ngrx/effects`
2. Copy assets from `.reference/3d-portfolio/public/` to `src/assets/`
3. Configure `angular.json` to serve assets correctly
