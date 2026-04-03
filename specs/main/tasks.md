# Tasks: Jk Alombro 3D Portfolio (Angular)

**Input**: Design documents from `specs/main/`
**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ data-model.md ✅ contracts/ ✅ quickstart.md ✅

**Tests**: TDD approach — constitution mandates 100% Jest coverage. Test tasks are included and must be written **before** implementation tasks within each story.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1–US4)
- Exact file paths included in all descriptions

---

## Phase 1: Setup (Project Scaffolding)

**Purpose**: Bootstrap the Angular project and prepare all external assets before any code is written.

- [x] T001 Run `/create-ui-app` to scaffold Angular 18+ standalone project at repository root (app name: `jk-portfolio`, style: SCSS, testing: Jest, linting: ESLint + Prettier)
- [x] T002 Install additional npm dependencies: `angular-three @angular-three/soba three @types/three gsap @emailjs/browser @ngrx/store @ngrx/effects @ngrx/store-devtools`
- [x] T003 [P] Copy all image assets from `.reference/3d-portfolio/public/images/` to `src/assets/images/`
- [x] T004 [P] Copy all 3D model assets from `.reference/3d-portfolio/public/models/` to `src/assets/models/`
- [x] T005 [P] Add tech stack logo SVGs to `src/assets/images/logos/` — download or create SVG icons for: `angular.svg`, `typescript.svg`, `csharp.svg`, `dotnet.svg`, `claude.svg`
- [x] T006 [P] Configure `angular.json` assets array to include `src/assets/images/` and `src/assets/models/` so they are served at `/images/` and `/models/` respectively
- [x] T007 [P] Create environment files `src/environments/environment.ts` and `src/environments/environment.prod.ts` with `emailjsServiceId`, `emailjsTemplateId`, `emailjsPublicKey` fields (empty strings as placeholders)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Global styles, all TypeScript interfaces, shared components, NgRx contact store, and app shell. MUST be complete before any user story begins.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

### Global Styles

- [x] T008 Create `src/assets/styles/variables.scss` — define all design tokens: `$color-bg-primary`, `$color-bg-card`, `$color-white`, `$color-white-50`, `$color-accent-amber: #cd7c2e`, `$color-accent-blue: #839cb5`, `$color-card-border`, `$breakpoint-md: 768px`, `$breakpoint-xl: 1280px`, `$section-padding-x`, `$section-padding-x-md`
- [x] T009 [P] Create `src/assets/styles/mixins.scss` — define mixins: `flex-center`, `section-padding`, `card-border`, `respond-to($bp)` for responsive media queries
- [x] T010 [P] Create `src/assets/styles/global.scss` — body reset, base typography, layout helper classes (`flex-center`, `grid-12-cols`, `grid-3-cols`, `padding-x`, `padding-x-lg`, `section-padding`), marquee animation keyframes, `.marquee`/`.marquee-box`/`.marquee-item` classes, `.card-border`, `.gradient-line`, `.glow-card` effect, hero layout classes (`hero-layout`, `hero-3d-layout`, `hero-text`, slide animation CSS), `.tech-grid`, `.app-showcase`, `.showcaselayout`, `.footer`/`.footer-container`/`.socials`
- [x] T011 Update `src/styles.scss` to `@use 'assets/styles/global'`

### TypeScript Interfaces & Constants

- [x] T012 Create TypeScript interfaces in `src/app/shared/models/index.ts`: `NavLink`, `Word`, `CounterItem`, `LogoIcon`, `Ability`, `TechStackIcon`, `TechStackImg`, `ExpCard`, `ExpLogo`, `Testimonial`, `SocialImg`, `ContactForm` — exact shapes per `specs/main/data-model.md`
- [x] T013 [P] Create static constants in `src/app/shared/constants/index.ts`: `NAV_LINKS`, `WORDS`, `COUNTER_ITEMS`, `LOGO_ICONS_LIST`, `ABILITIES`, `TECH_STACK_ICONS` (Angular/TS/C#/.NET/Claude/React with dual modelPath/imgPath per data-model.md), `EXP_CARDS` (placeholder entries with "Jk Alombro" replacing "Adrian" in reviews), `EXP_LOGOS`, `TESTIMONIALS` (replace all "Adrian" references with "Jk Alombro"), `SOCIAL_IMGS`

### Shared Components (TDD)

- [x] T014 [P] Write tests first for `ButtonComponent` in `src/app/shared/components/button/button.component.spec.ts` — cover: renders label text, applies className input, sets id attribute, emits click
- [x] T015 [P] Create `ButtonComponent` in `src/app/shared/components/button/button.component.{ts,html,scss}` — standalone, OnPush, inputs: `text`, `className`, `id` (all via `input()`); CTA button with arrow icon
- [x] T016 [P] Write tests first for `TitleHeaderComponent` in `src/app/shared/components/title-header/title-header.component.spec.ts` — cover: renders title, renders sub text
- [x] T017 [P] Create `TitleHeaderComponent` in `src/app/shared/components/title-header/title-header.component.{ts,html,scss}` — standalone, OnPush, inputs: `title`, `sub`
- [x] T018 [P] Write tests first for `GlowCardComponent` in `src/app/shared/components/glow-card/glow-card.component.spec.ts` — cover: renders projected content, applies glow on mousemove, accepts card/index inputs
- [x] T019 [P] Create `GlowCardComponent` in `src/app/shared/components/glow-card/glow-card.component.{ts,html,scss}` — standalone, OnPush, inputs: `card`, `index`; `<ng-content>` projection; CSS radial glow tracks mouse position via `HostListener`

### Email Service & Contact Store (TDD)

- [x] T020 Write tests first for `EmailService` in `src/app/shared/services/email.service.spec.ts` — cover: `send()` calls emailjs with correct params, returns Observable, handles rejection
- [x] T021 Create `EmailService` in `src/app/shared/services/email.service.ts` — `providedIn: 'root'`; `send(params: ContactForm): Observable<EmailJSResponseStatus>` wraps `emailjs.send()` via `from()`
- [x] T022 [P] Create `ContactState` model in `src/app/home/components/contact/store/models/contact-state.model.ts` — `{ loading: boolean, success: boolean, error: string | null }` with `initialContactState`
- [x] T023 [P] Create contact actions in `src/app/home/components/contact/store/actions/contact.actions.ts` — `submitForm({ params })`, `submitFormSuccess()`, `submitFormFailure({ error })`, `resetContactForm()`
- [x] T024 [P] Write tests first for contact reducer in `src/app/home/components/contact/store/reducers/contact.reducer.spec.ts` — cover all action transitions
- [x] T025 [P] Create contact reducer + selectors in `src/app/home/components/contact/store/reducers/contact.reducer.ts` — `contactReducer`, `selectContactLoading`, `selectContactSuccess`, `selectContactError`
- [x] T026 Write tests first for contact effects in `src/app/home/components/contact/store/effects/contact.effects.spec.ts` — cover: success path calls EmailService and dispatches success, failure path dispatches failure with error message
- [x] T027 Create contact effects in `src/app/home/components/contact/store/effects/contact.effects.ts` — `submitForm$` listens for `submitForm`, calls `EmailService.send()`, dispatches `submitFormSuccess` or `submitFormFailure`

### App Shell & Home Feature

- [x] T028 Update `src/app/app.routes.ts` — `{ path: '', loadChildren: () => import('./home/home.routes').then(m => m.HOME_ROUTES) }`, `{ path: '**', redirectTo: '' }`
- [x] T029 [P] Update `src/app/app.component.{ts,html,scss}` — standalone, OnPush, just `<router-outlet />`; configure `app.config.ts` with `provideStore()`, `provideEffects()`, `provideRouter(routes)`, `provideHttpClient()`
- [x] T030 Create `src/app/home/home.routes.ts` — `HOME_ROUTES` with `{ path: '', component: HomeComponent, providers: [provideState('contact', contactReducer), provideEffects(ContactEffects)] }`
- [x] T031 Create `HomeComponent` shell in `src/app/home/home.component.{ts,html,scss}` — standalone, OnPush; template is a sequence of section component tags (filled in as each section is completed)

**Checkpoint**: Foundation complete — all styles, interfaces, constants, shared components, and contact store are ready. User story work can now begin.

---

## Phase 3: User Story 1 — Navbar & Hero (Priority: P1) 🎯 MVP

**Goal**: As a visitor, I see a sticky navigation and an animated hero section with a 3D room, word-cycling headline, bio, and counter stats — giving a strong first impression.

**Independent Test**: `ng serve` → page loads at `/` → nav links are visible → hero headline animates in → 3D room model renders in canvas → counters animate on scroll.

### Tests — User Story 1

- [x] T032 [P] [US1] Write tests first for `NavbarComponent` in `src/app/home/components/navbar/navbar.component.spec.ts` — cover: renders all NAV_LINKS, applies sticky class on scroll, mobile menu toggles, anchor hrefs are correct
- [x] T033 [P] [US1] Write tests first for `AnimatedCounterComponent` in `src/app/home/components/hero/components/animated-counter/animated-counter.component.spec.ts` — cover: renders COUNTER_ITEMS count, displays suffix, renders label

### Implementation — User Story 1

- [x] T034 [US1] Create `NavbarComponent` in `src/app/home/components/navbar/navbar.component.{ts,html,scss}` — standalone, OnPush; reads `NAV_LINKS` constant; `@HostListener('window:scroll')` applies `.scrolled` class for glass effect; responsive hamburger menu toggled via `signal()`; uses `@for` for nav links
- [x] T035 [P] [US1] Create `AnimatedCounterComponent` in `src/app/home/components/hero/components/animated-counter/animated-counter.component.{ts,html,scss}` — standalone, OnPush; reads `COUNTER_ITEMS`; GSAP ScrollTrigger animates number from 0 to `value` on scroll; destroys trigger in `ngOnDestroy`
- [x] T036 [P] [US1] Create `HeroLightsComponent` in `src/app/home/components/hero/components/hero-experience/components/hero-lights/hero-lights.component.ts` — standalone, OnPush; NGT directional + ambient lights inside the scene
- [x] T037 [P] [US1] Create `ParticlesComponent` in `src/app/home/components/hero/components/hero-experience/components/particles/particles.component.ts` — standalone, OnPush; NGT particle system using `THREE.Points` with random positions
- [x] T038 [P] [US1] Create `RoomComponent` in `src/app/home/components/hero/components/hero-experience/components/room/room.component.ts` — standalone, OnPush; loads `optimized-room.glb` via `NgtLoader`; positions and scales the GLTF scene
- [x] T039 [US1] Create `HeroExperienceComponent` in `src/app/home/components/hero/components/hero-experience/hero-experience.component.{ts,html,scss}` — standalone, OnPush; wraps `ngt-canvas`; composes `HeroLightsComponent`, `ParticlesComponent`, `RoomComponent`; sets camera position
- [x] T040 [US1] Create `HeroComponent` in `src/app/home/components/hero/hero.component.{ts,html,scss}` — standalone, OnPush; reads `WORDS` constant for word-cycling slide (`@for`); GSAP `fromTo` animates `.hero-text h1` on `ngAfterViewInit`; includes `ButtonComponent`, `HeroExperienceComponent`, `AnimatedCounterComponent`; bio text "Hi, I'm Jk Alombro, a developer with a passion for code."
- [x] T041 [US1] Register `NavbarComponent` and `HeroComponent` in `HomeComponent` template (`src/app/home/home.component.html`)

**Checkpoint**: Navbar and Hero are fully functional — 3D room renders, headline animates, counters count up on scroll.

---

## Phase 4: User Story 2 — Work Showcase, Logos & Feature Cards (Priority: P2)

**Goal**: As a visitor, I can see Jk's project showcase cards with scroll animations, a scrolling logo marquee, and value proposition cards.

**Independent Test**: Scroll past hero → 3 project cards reveal one by one → logo marquee scrolls infinitely → 3 feature cards render with icons and descriptions.

### Tests — User Story 2

- [ ] T042 [P] [US2] Write tests first for `ShowcaseSectionComponent` in `src/app/home/components/showcase-section/showcase-section.component.spec.ts` — cover: renders 3 project cards, project titles are present, images have alt text
- [ ] T043 [P] [US2] Write tests first for `LogoShowcaseComponent` in `src/app/home/components/logo-showcase/logo-showcase.component.spec.ts` — cover: renders LOGO_ICONS_LIST items, marquee container exists
- [ ] T044 [P] [US2] Write tests first for `FeatureCardsComponent` in `src/app/home/components/feature-cards/feature-cards.component.spec.ts` — cover: renders ABILITIES count, displays title and desc for each, images have alt text

### Implementation — User Story 2

- [ ] T045 [P] [US2] Create `ShowcaseSectionComponent` in `src/app/home/components/showcase-section/showcase-section.component.{ts,html,scss}` — standalone, OnPush; static project data (3 entries from reference); GSAP ScrollTrigger `fromTo` reveal on each card in `ngAfterViewInit`; destroys triggers in `ngOnDestroy`; `id="work"` anchor
- [ ] T046 [P] [US2] Create `LogoShowcaseComponent` in `src/app/home/components/logo-showcase/logo-showcase.component.{ts,html,scss}` — standalone, OnPush; reads `LOGO_ICONS_LIST`; renders list twice (CSS marquee loop); uses `@for`; pure CSS `@keyframes marquee` animation from `global.scss`
- [ ] T047 [P] [US2] Create `FeatureCardsComponent` in `src/app/home/components/feature-cards/feature-cards.component.{ts,html,scss}` — standalone, OnPush; reads `ABILITIES`; 3-column grid; `@for` with `@if` check; meaningful `alt` on all images
- [ ] T048 [US2] Register `ShowcaseSectionComponent`, `LogoShowcaseComponent`, `FeatureCardsComponent` in `HomeComponent` template after `HeroComponent`

**Checkpoint**: Project showcase, logo marquee, and feature cards all render and animate correctly.

---

## Phase 5: User Story 3 — Experience & Tech Stack (Priority: P2)

**Goal**: As a visitor, I can view Jk's work experience timeline with scroll animations and a tech skills section with 3D model cards and image fallbacks.

**Independent Test**: Scroll to `#experience` → timeline reveals from left → cards animate in → scroll to `#skills` → 6 tech cards stagger-animate in → React card shows 3D logo model → other 5 cards show logo images.

### Tests — User Story 3

- [ ] T049 [P] [US3] Write tests first for `ExperienceComponent` in `src/app/home/components/experience/experience.component.spec.ts` — cover: renders EXP_CARDS count, renders responsibilities list, timeline element exists, GlowCard is used
- [ ] T050 [P] [US3] Write tests first for `TechIconCardComponent` in `src/app/home/components/tech-stack/components/tech-icon-card/tech-icon-card.component.spec.ts` — cover: renders ngt-canvas when `modelPath` is provided, renders `<img>` when only `imgPath` provided, displays skill name
- [ ] T051 [P] [US3] Write tests first for `TechStackComponent` in `src/app/home/components/tech-stack/tech-stack.component.spec.ts` — cover: renders TECH_STACK_ICONS count, TitleHeader is present, `id="skills"` anchor exists

### Implementation — User Story 3

- [ ] T052 [US3] Create `ExperienceComponent` in `src/app/home/components/experience/experience.component.{ts,html,scss}` — standalone, OnPush; reads `EXP_CARDS`; GSAP ScrollTrigger animates `.timeline-card` (xPercent: -100 → 0) and `.expText` (opacity 0 → 1) in `ngAfterViewInit`; animates `.timeline` scaleY on scroll; uses `GlowCardComponent` and `TitleHeaderComponent`; `@for` + `@for` for responsibilities; `id="experience"` anchor; destroys triggers in `ngOnDestroy`
- [ ] T053 [US3] Create `TechIconCardComponent` in `src/app/home/components/tech-stack/components/tech-icon-card/tech-icon-card.component.{ts,html,scss}` — standalone, OnPush; input: `model: InputSignal<TechStackIcon>`; `@if (model().modelPath)` → renders `ngt-canvas` scene with GLTF model via `NgtLoader`; `@else` → renders `<img [src]="model().imgPath" [alt]="model().name">`; card layout with name label below
- [ ] T054 [US3] Create `TechStackComponent` in `src/app/home/components/tech-stack/tech-stack.component.{ts,html,scss}` — standalone, OnPush; reads `TECH_STACK_ICONS`; GSAP ScrollTrigger stagger `fromTo` on `.tech-card` in `ngAfterViewInit`; uses `TechIconCardComponent` and `TitleHeaderComponent`; `@for`; `id="skills"` anchor; destroys trigger in `ngOnDestroy`
- [ ] T055 [US3] Register `ExperienceComponent` and `TechStackComponent` in `HomeComponent` template after `FeatureCardsComponent`

**Checkpoint**: Experience timeline and tech stack section are complete — animations fire on scroll, React GLB model renders, other skills show image fallbacks.

---

## Phase 6: User Story 4 — Testimonials, Contact & Footer (Priority: P3)

**Goal**: As a visitor, I can read client testimonials in a masonry layout, submit a contact message via the EmailJS form (with loading/success/error feedback), and view the footer with social links.

**Independent Test**: Scroll to `#testimonials` → 6 testimonial cards visible in 3-column masonry → scroll to `#contact` → fill form → submit → loading state shows → success state clears form (EmailJS env vars must be set for actual send) → footer shows social icons and "© Jk Alombro".

### Tests — User Story 4

- [ ] T056 [P] [US4] Write tests first for `TestimonialsComponent` in `src/app/home/components/testimonials/testimonials.component.spec.ts` — cover: renders TESTIMONIALS count, GlowCard used, reviewer name and handle rendered, avatar alt text present
- [ ] T057 [P] [US4] Write tests first for `ContactComponent` in `src/app/home/components/contact/contact.component.spec.ts` — cover: form has name/email/message controls, all fields required validation, submit dispatches `submitForm` action, loading signal disables button, success signal resets form, error signal shows message
- [ ] T058 [P] [US4] Write tests first for `FooterComponent` in `src/app/home/components/footer/footer.component.spec.ts` — cover: renders SOCIAL_IMGS count, copyright text contains "Jk Alombro", copyright contains current year

### Implementation — User Story 4

- [ ] T059 [P] [US4] Create `TestimonialsComponent` in `src/app/home/components/testimonials/testimonials.component.{ts,html,scss}` — standalone, OnPush; reads `TESTIMONIALS`; CSS `columns: 3` masonry layout (responsive: 1 col mobile, 2 col tablet, 3 col desktop); uses `GlowCardComponent` with `<ng-content>` for avatar slot; uses `TitleHeaderComponent`; `@for`; `id="testimonials"` anchor
- [ ] T060 [US4] Create `ContactExperienceComponent` in `src/app/home/components/contact/components/contact-experience/contact-experience.component.{ts,html,scss}` — standalone, OnPush; `ngt-canvas`; loads `computer-optimized-transformed.glb` via `NgtLoader`; `NgtsOrbitControls` from `@angular-three/soba` (enableDamping, no zoom); `NgtsEnvironment` preset
- [ ] T061 [US4] Create `ContactComponent` in `src/app/home/components/contact/contact.component.{ts,html,scss}` — standalone, OnPush; `FormBuilder` creates `contactForm: FormGroup` with `name`, `email`, `message` controls (all `Validators.required`, email has `Validators.email`); `loading = toSignal(store.select(selectContactLoading))`; `success = toSignal(store.select(selectContactSuccess))`; `error = toSignal(store.select(selectContactError))`; `onSubmit()` dispatches `submitForm({ params: contactForm.value })`; `@if (success())` resets form and shows success message; uses `TitleHeaderComponent`, `ContactExperienceComponent`; `id="contact"` anchor
- [ ] T062 [P] [US4] Create `FooterComponent` in `src/app/home/components/footer/footer.component.{ts,html,scss}` — standalone, OnPush; reads `SOCIAL_IMGS`; injects `DatePipe` from `'@angular/common'`; displays `{{ today | date:'yyyy' }}`; copyright "© [year] Jk Alombro. All rights reserved."; social icon links with `aria-label`; `@for` with meaningful `alt` on images
- [ ] T063 [US4] Register `TestimonialsComponent`, `ContactComponent`, `FooterComponent` in `HomeComponent` template after `TechStackComponent`

**Checkpoint**: Full single-page portfolio renders end-to-end. Contact form dispatches to store; EmailJS sends when env vars are configured.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final quality, accessibility, and code health pass across all user stories.

- [ ] T064 [P] Accessibility audit — check all 10 section components: verify `<section>`, `<nav>`, `<header>`, `<footer>`, `<main>` semantic elements are used; all `<img>` have meaningful `alt`; all interactive elements have `aria-label` or visible text; no color-only information
- [ ] T065 [P] Responsive QA — verify layout at 375px (mobile), 768px (tablet), 1280px (desktop) using browser DevTools; fix any broken breakpoints in SCSS
- [ ] T066 [P] Keyboard navigation audit — verify tab order across navbar, CTA button, contact form inputs and submit button, social footer links; verify focus ring styles are visible
- [ ] T067 Run `ng lint` and fix all ESLint violations across the project
- [ ] T068 Run Prettier format check and fix all formatting issues (`npx prettier --write src/`)
- [ ] T069 Run Jest coverage report (`npm test -- --coverage`) and fix any files below 100% threshold

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** — No dependencies, start immediately
- **Foundational (Phase 2)** — Depends on Phase 1 completion; BLOCKS all user stories
- **US1 — Navbar & Hero (Phase 3)** — Depends on Phase 2 completion
- **US2 — Showcase (Phase 4)** — Depends on Phase 2 completion; independent of US1
- **US3 — Experience & Skills (Phase 5)** — Depends on Phase 2 completion; independent of US1/US2
- **US4 — Testimonials, Contact & Footer (Phase 6)** — Depends on Phase 2 (contact store) and shared components
- **Polish (Phase 7)** — Depends on all US phases being complete

### User Story Dependencies

- **US1 (P1)**: Can start after Phase 2 — no dependency on US2/US3/US4
- **US2 (P2)**: Can start after Phase 2 — no dependency on US1/US3/US4
- **US3 (P2)**: Can start after Phase 2 — no dependency on US1/US2/US4
- **US4 (P3)**: Can start after Phase 2 (contact store built there) — no dependency on US1/US2/US3

### Within Each User Story

1. Tests MUST be written first (TDD) and must FAIL before implementation starts
2. Leaf components (Lights, Particles, Room) before parent 3D experience components
3. Experience components before section containers
4. Section containers before HomeComponent registration

### Parallel Opportunities

- T003 + T004 + T005 + T006 + T007 — all setup asset tasks run in parallel (Phase 1)
- T008 + T009 + T010 — SCSS files run in parallel (Phase 2)
- T014–T019 — all shared component test + implementation pairs run in parallel per component (Phase 2)
- T022 + T023 + T024 — contact store models/actions/reducer run in parallel (Phase 2)
- T032 + T033 — US1 test writing runs in parallel (Phase 3)
- T036 + T037 + T038 — NGT sub-components (Lights, Particles, Room) run in parallel (Phase 3)
- T042 + T043 + T044 — US2 test writing runs in parallel (Phase 4)
- T045 + T046 + T047 — US2 components run in parallel (Phase 4)
- T049 + T050 + T051 — US3 test writing runs in parallel (Phase 5)
- T056 + T057 + T058 — US4 test writing runs in parallel (Phase 6)
- T059 + T060 + T062 — Testimonials, ContactExperience, Footer components run in parallel (Phase 6)
- T064 + T065 + T066 — accessibility/responsive/keyboard audits run in parallel (Phase 7)

---

## Parallel Example: User Story 1 (Navbar & Hero)

```bash
# Step 1 — Write all tests in parallel:
Task T032: "Write tests for NavbarComponent in .../navbar.component.spec.ts"
Task T033: "Write tests for AnimatedCounterComponent in .../animated-counter.component.spec.ts"

# Step 2 — Build leaf 3D sub-components in parallel:
Task T036: "Create HeroLightsComponent"
Task T037: "Create ParticlesComponent"
Task T038: "Create RoomComponent"

# Step 3 — Build experience composite (depends on T036+T037+T038):
Task T039: "Create HeroExperienceComponent wrapping all three"

# Step 4 — Build section components in parallel:
Task T034: "Create NavbarComponent"
Task T035: "Create AnimatedCounterComponent"

# Step 5 — Assemble hero (depends on T035+T039):
Task T040: "Create HeroComponent"

# Step 6 — Register in shell (depends on T034+T040):
Task T041: "Register Navbar + Hero in HomeComponent"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1 (Navbar + Hero)
4. **STOP and VALIDATE**: `ng serve` → check nav, animated headline, 3D room, counters
5. Merge/demo if ready

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. Add US1 (Navbar + Hero) → validate → demo MVP
3. Add US2 (Showcase + Logos + Cards) → validate → demo
4. Add US3 (Experience + Skills) → validate → demo
5. Add US4 (Testimonials + Contact + Footer) → validate → full portfolio live
6. Polish phase → production-ready

### Parallel Team Strategy

With two developers after Phase 2:
- Developer A: US1 (Navbar + Hero) → US4 (Contact section)
- Developer B: US2 (Showcase) → US3 (Experience + TechStack)

---

## Notes

- `[P]` tasks operate on different files with no dependency on incomplete sibling tasks
- `[Story]` label maps each task to a specific user story for traceability
- TDD: every test task must be written and confirmed to FAIL before its implementation task begins
- Destroy all GSAP ScrollTrigger instances in `ngOnDestroy` to prevent memory leaks
- Use `toSignal()` for all NgRx selector subscriptions in components — never `async` pipe
- Use `@if`/`@for`/`@switch` (Angular 17+ control flow) — never `*ngIf`/`*ngFor`
- All components: `standalone: true`, `changeDetection: ChangeDetectionStrategy.OnPush`
- All constants: `SCREAMING_SNAKE_CASE`; all interfaces: no `I` prefix; all files: `kebab-case`
