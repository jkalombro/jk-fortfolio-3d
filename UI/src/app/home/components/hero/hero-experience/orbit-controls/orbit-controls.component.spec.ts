import { TestBed } from '@angular/core/testing';
import { OrbitControlsComponent } from './orbit-controls.component';

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

describe('OrbitControlsComponent', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [OrbitControlsComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(OrbitControlsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should disable zoom and configure damping on the controls', () => {
    TestBed.createComponent(OrbitControlsComponent);
    expect(mockControls.enableZoom).toBe(false);
    expect(mockControls.enableDamping).toBe(true);
  });

  it('should dispose controls on destroy', () => {
    const fixture = TestBed.createComponent(OrbitControlsComponent);
    fixture.detectChanges();
    fixture.destroy();
    expect(mockControls.dispose).toHaveBeenCalled();
  });
});
