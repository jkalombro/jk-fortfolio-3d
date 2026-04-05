import { TestBed } from '@angular/core/testing';
import { OrbitControlsContactComponent } from './orbit-controls-contact.component';

const mockControls = {
  enableDamping: false,
  dampingFactor: 0,
  enableZoom: true,
  minPolarAngle: 0,
  maxPolarAngle: Math.PI,
  target: { set: jest.fn() },
  update: jest.fn(),
  dispose: jest.fn(),
};

jest.mock('angular-three', () => ({
  injectStore: jest.fn(() => ({
    snapshot: {
      camera: {},
      gl: { domElement: document.createElement('canvas') },
    },
  })),
  injectBeforeRender: jest.fn(),
  extend: jest.fn(),
  loaderResource: jest.fn(() => ({ value: jest.fn(() => null) })),
  NgtArgs: class {},
}));

jest.mock('three/examples/jsm/controls/OrbitControls.js', () => ({
  OrbitControls: jest.fn().mockImplementation(() => mockControls),
}));

describe('OrbitControlsContactComponent', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [OrbitControlsContactComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(OrbitControlsContactComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should configure polar angle limits and disable zoom', () => {
    TestBed.createComponent(OrbitControlsContactComponent);
    expect(mockControls.enableZoom).toBe(false);
    expect(mockControls.minPolarAngle).toBe(Math.PI / 5);
    expect(mockControls.maxPolarAngle).toBe(Math.PI / 2);
  });

  it('should dispose controls on destroy', () => {
    const fixture = TestBed.createComponent(OrbitControlsContactComponent);
    fixture.detectChanges();
    fixture.destroy();
    expect(mockControls.dispose).toHaveBeenCalled();
  });
});
