import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  viewChildren,
} from '@angular/core';
import gsap from 'gsap';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AnimatedCounterComponent } from './animated-counter/animated-counter.component';
import { HeroExperienceComponent } from './hero-experience/hero-experience.component';
import { WORDS } from '../../../shared/constants';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent, AnimatedCounterComponent, HeroExperienceComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  // Public variables
  readonly words = WORDS;

  // Private variables
  private headings = viewChildren<ElementRef<HTMLHeadingElement>>('heading');
  private gsapCtx?: gsap.Context;

  ngAfterViewInit(): void {
    this.gsapCtx = gsap.context(() => {
      gsap.fromTo(
        this.headings().map((r) => r.nativeElement),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: 'power2.inOut' },
      );
    });
  }

  ngOnDestroy(): void {
    this.gsapCtx?.revert();
  }
}
