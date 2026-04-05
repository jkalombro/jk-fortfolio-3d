import 'jest-preset-angular/setup-jest';

// Mock matchMedia — required by GSAP ScrollTrigger in JSDOM
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver — used by angular-three canvas
(globalThis as unknown as Record<string, unknown>)['ResizeObserver'] = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver — used by GlowCardComponent and ExperienceComponent slide-in animations
(globalThis as unknown as Record<string, unknown>)['IntersectionObserver'] = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
};

// Mock HTMLCanvasElement.getContext — required by ParticlesComponent which uses a 2D canvas
// for generating a soft-circle particle texture; JSDOM does not implement getContext.
HTMLCanvasElement.prototype.getContext = jest.fn().mockImplementation((type: string) => {
  if (type === '2d') {
    return {
      createRadialGradient: jest.fn().mockReturnValue({ addColorStop: jest.fn() }),
      fillRect: jest.fn(),
      fillStyle: '',
    };
  }
  return null;
}) as typeof HTMLCanvasElement.prototype.getContext;

// Mock HTMLElement.prototype.setPointerCapture — required by TechIconCardComponent drag-to-rotate;
// JSDOM does not implement Pointer Capture APIs.
if (!HTMLElement.prototype.setPointerCapture) {
  HTMLElement.prototype.setPointerCapture = jest.fn();
}

// Polyfill PointerEvent — JSDOM does not expose PointerEvent by default.
// Required by TechIconCardComponent drag-to-rotate tests.
if (typeof (globalThis as unknown as Record<string, unknown>)['PointerEvent'] === 'undefined') {
  class PointerEventPolyfill extends MouseEvent {
    readonly pointerId: number;
    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params);
      this.pointerId = params.pointerId ?? 0;
    }
  }
  (globalThis as unknown as Record<string, unknown>)['PointerEvent'] = PointerEventPolyfill;
}
