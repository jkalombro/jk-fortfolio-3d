import { TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
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

function createComponent(minPolarAngle = Math.PI / 5, maxPolarAngle = Math.PI / 2) {
  const fixture = TestBed.createComponent(OrbitControlsContactComponent);
  const ref = fixture.componentRef as ComponentRef<OrbitControlsContactComponent>;
  ref.setInput('minPolarAngle', minPolarAngle);
  ref.setInput('maxPolarAngle', maxPolarAngle);
  fixture.detectChanges();
  return fixture;
}

describe('OrbitControlsContactComponent', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [OrbitControlsContactComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = createComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should configure polar angle limits from inputs and disable zoom', () => {
    createComponent(Math.PI / 5, Math.PI / 2);
    expect(mockControls.enableZoom).toBe(false);
    expect(mockControls.minPolarAngle).toBe(Math.PI / 5);
    expect(mockControls.maxPolarAngle).toBe(Math.PI / 2);
  });

  it('should apply custom polar angle inputs', () => {
    createComponent(Math.PI / 4, Math.PI / 3);
    expect(mockControls.minPolarAngle).toBe(Math.PI / 4);
    expect(mockControls.maxPolarAngle).toBe(Math.PI / 3);
  });

  it('should dispose controls on destroy', () => {
    const fixture = createComponent();
    fixture.destroy();
    expect(mockControls.dispose).toHaveBeenCalled();
  });
});
