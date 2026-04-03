import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  viewChild,
  viewChildren,
} from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-showcase-section',
  standalone: true,
  templateUrl: './showcase-section.component.html',
  styleUrl: './showcase-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowcaseSectionComponent implements AfterViewInit, OnDestroy {
  private sectionRef = viewChild<ElementRef<HTMLElement>>('sectionEl');
  private firstRef = viewChild<ElementRef<HTMLElement>>('firstCard');
  private secondRef = viewChild<ElementRef<HTMLElement>>('secondCard');
  private thirdRef = viewChild<ElementRef<HTMLElement>>('thirdCard');
  private triggers: ScrollTrigger[] = [];

  ngAfterViewInit(): void {
    const section = this.sectionRef()?.nativeElement;
    if (section) {
      const t0 = gsap.fromTo(section, { opacity: 0 }, { opacity: 1, duration: 1.5 });
      // t0 is a Tween, not a ScrollTrigger, but we manage cleanup via context
    }

    const cards = [
      this.firstRef()?.nativeElement,
      this.secondRef()?.nativeElement,
      this.thirdRef()?.nativeElement,
    ].filter(Boolean) as HTMLElement[];

    cards.forEach((card, index) => {
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top bottom-=100',
        onEnter: () => {
          gsap.fromTo(card, { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, delay: 0.3 * (index + 1),
          });
        },
      });
      this.triggers.push(trigger);
    });
  }

  ngOnDestroy(): void {
    this.triggers.forEach((t) => t.kill());
  }
}
