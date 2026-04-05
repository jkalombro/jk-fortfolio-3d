import { TestBed } from '@angular/core/testing';
import { HeroLightsComponent } from './hero-lights.component';

const mockScene = {
  add: jest.fn(),
  remove: jest.fn(),
};

jest.mock('angular-three', () => ({
  injectStore: jest.fn(() => ({
    snapshot: { scene: mockScene },
  })),
  injectBeforeRender: jest.fn(),
  extend: jest.fn(),
}));

describe('HeroLightsComponent', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [HeroLightsComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HeroLightsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should add chair spotlight to the scene on init', () => {
    TestBed.createComponent(HeroLightsComponent);
    expect(mockScene.add).toHaveBeenCalled();
  });

  it('should remove chair spotlight from scene on destroy', () => {
    const fixture = TestBed.createComponent(HeroLightsComponent);
    fixture.detectChanges();
    fixture.destroy();
    expect(mockScene.remove).toHaveBeenCalled();
  });
});
