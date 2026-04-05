import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HeroComponent } from './hero.component';
import { WORDS } from '../../../shared/constants';

@Component({ selector: 'app-button', standalone: true, template: '' })
class ButtonStub {}

@Component({ selector: 'app-animated-counter', standalone: true, template: '' })
class AnimatedCounterStub {}

@Component({ selector: 'app-hero-experience', standalone: true, template: '' })
class HeroExperienceStub {}

jest.mock('gsap', () => ({
  default: {
    registerPlugin: jest.fn(),
    context: jest.fn((fn: () => void) => { fn(); return { revert: jest.fn() }; }),
    fromTo: jest.fn(),
    to: jest.fn(),
  },
  ScrollTrigger: {},
}));

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(HeroComponent, {
        set: { imports: [ButtonStub, AnimatedCounterStub, HeroExperienceStub] },
      })
      .compileComponents();
    fixture = TestBed.createComponent(HeroComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have id="hero" on the section', () => {
    const section = fixture.debugElement.query(By.css('section#hero'));
    expect(section).toBeTruthy();
  });

  it('should expose the WORDS constant', () => {
    expect(fixture.componentInstance.words).toBe(WORDS);
  });

  it('should render one word item per WORDS entry', () => {
    const wordItems = fixture.debugElement.queryAll(By.css('.word-item'));
    expect(wordItems.length).toBe(WORDS.length);
  });

  it('should render app-animated-counter', () => {
    const counter = fixture.debugElement.query(By.directive(AnimatedCounterStub));
    expect(counter).toBeTruthy();
  });

  it('should render app-hero-experience', () => {
    const experience = fixture.debugElement.query(By.directive(HeroExperienceStub));
    expect(experience).toBeTruthy();
  });
});
