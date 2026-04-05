import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeroExperienceComponent } from './hero-experience.component';

// Stub the scene so no WebGL canvas is needed
@Component({ selector: 'app-hero-scene', standalone: true, template: '' })
class HeroSceneStub {}

// Mock GSAP so onComplete fires synchronously in tests
jest.mock('gsap', () => ({
  default: {
    to: jest.fn((_el: unknown, opts: { onComplete?: () => void }) => opts.onComplete?.()),
    context: jest.fn((fn: () => void) => { fn(); return { revert: jest.fn() }; }),
    fromTo: jest.fn(),
  },
}));

describe('HeroExperienceComponent', () => {
  let fixture: ComponentFixture<HeroExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroExperienceComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(HeroExperienceComponent, {
        set: { imports: [HeroSceneStub] },
      })
      .compileComponents();
    fixture = TestBed.createComponent(HeroExperienceComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have isLoaded false initially', () => {
    expect(fixture.componentInstance.isLoaded()).toBe(false);
  });

  it('should set isLoaded to true when onModelLoaded is called', () => {
    // With GSAP mocked to fire onComplete synchronously, isLoaded becomes true immediately
    fixture.componentInstance.onModelLoaded();
    expect(fixture.componentInstance.isLoaded()).toBe(true);
  });
});
