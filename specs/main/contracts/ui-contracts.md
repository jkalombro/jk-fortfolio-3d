# UI Contracts: Jk Alombro 3D Portfolio

Component inputs/outputs and interaction contracts for all Angular standalone components.

---

## Shared Components (`src/app/shared/components/`)

### ButtonComponent
```typescript
// Input
text: InputSignal<string>          // Button label
className: InputSignal<string>     // Additional CSS classes
id: InputSignal<string>            // HTML id attribute

// No outputs — navigates to anchor via id
```

### TitleHeaderComponent
```typescript
// Inputs
title: InputSignal<string>  // Main heading text
sub: InputSignal<string>    // Subtitle / emoji tagline
```

### GlowCardComponent
```typescript
// Inputs
card: InputSignal<ExpCard | Testimonial>  // Card data
index: InputSignal<number>                // Position (used for glow color offset)

// Emits none — visual/interactive only
// Uses content projection (<ng-content>) for inner avatar/image slot
```

### AnimatedCounterComponent
```typescript
// No inputs — reads COUNTER_ITEMS constant internally
// Animates numbers on scroll via GSAP ScrollTrigger
```

---

## Feature: Home (`src/app/home/`)

### HomeComponent
```typescript
// Root container for entire single-page layout
// No inputs/outputs — orchestrates all section components
// Standalone, OnPush
```

---

## Home Section Components (`src/app/home/components/`)

### NavbarComponent
```typescript
// No inputs/outputs
// Internal: tracks scroll position to apply sticky/glass styles
// Reads NAV_LINKS constant
```

### HeroComponent
```typescript
// No inputs/outputs
// Reads WORDS, COUNTER_ITEMS constants
// Hosts HeroExperienceComponent (NGT canvas)
// Animates h1 tags via GSAP on init
```

### HeroExperienceComponent
```typescript
// No inputs/outputs
// Renders optimized-room.glb scene inside ngt-canvas
// Uses NgtLoader to load GLB
// Includes HeroLightsComponent, ParticlesComponent, RoomComponent
```

### ShowcaseSectionComponent
```typescript
// No inputs/outputs
// Static project data embedded in component
// Animates project cards via GSAP ScrollTrigger
```

### LogoShowcaseComponent
```typescript
// No inputs/outputs
// Reads LOGO_ICONS_LIST constant
// CSS infinite marquee animation
```

### FeatureCardsComponent
```typescript
// No inputs/outputs
// Reads ABILITIES constant
```

### ExperienceComponent
```typescript
// No inputs/outputs
// Reads EXP_CARDS constant
// Animates timeline and cards via GSAP ScrollTrigger
```

### TechStackComponent
```typescript
// No inputs/outputs
// Reads TECH_STACK_ICONS constant
// Animates cards via GSAP ScrollTrigger
```

### TechIconCardComponent
```typescript
// Input
model: InputSignal<TechStackIcon>

// Renders ngt-canvas if model.modelPath is defined
// Falls back to <img> if only model.imgPath is defined
// Standalone, OnPush
```

### TestimonialsComponent
```typescript
// No inputs/outputs
// Reads TESTIMONIALS constant
// Masonry CSS columns layout
```

### ContactComponent
```typescript
// No inputs/outputs
// Reactive Form: name, email, message (all required)
// Dispatches submitForm action to NgRx store
// Reads selectContactLoading, selectContactSuccess, selectContactError selectors
// Hosts ContactExperienceComponent (NGT canvas)
```

### ContactExperienceComponent
```typescript
// No inputs/outputs
// Renders computer-optimized-transformed.glb with OrbitControls
// Uses @angular-three/soba for OrbitControls + Environment
```

### FooterComponent
```typescript
// No inputs/outputs
// Reads SOCIAL_IMGS constant
// Displays current year via DatePipe
```

---

## Contact Feature Store

### Actions
```typescript
submitForm(props: { params: ContactForm })
submitFormSuccess()
submitFormFailure(props: { error: string })
resetContactForm()
```

### Selectors
```typescript
selectContactLoading: MemoizedSelector<AppState, boolean>
selectContactSuccess: MemoizedSelector<AppState, boolean>
selectContactError:   MemoizedSelector<AppState, string | null>
```

### Effects
```typescript
submitForm$ — listens for submitForm, calls EmailService.send(), dispatches success/failure
```

---

## Services

### EmailService (`src/app/shared/services/email.service.ts`)
```typescript
send(params: ContactForm): Observable<EmailJSResponseStatus>
```

---

## Routing Contract

Single route — the portfolio is a one-page app:

```typescript
// app.routes.ts
[
  { path: '', loadChildren: () => import('./home/home.routes').then(m => m.HOME_ROUTES) },
  { path: '**', redirectTo: '' }
]

// home/home.routes.ts
[
  { path: '', component: HomeComponent }
]
```
