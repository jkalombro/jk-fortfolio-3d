import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  viewChildren,
} from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CounterItem } from 'src/app/shared/models';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-animated-counter',
  standalone: true,
  templateUrl: './animated-counter.component.html',
  styleUrl: './animated-counter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimatedCounterComponent implements AfterViewInit, OnDestroy {
  // Public variables
  readonly counterItems = this.getCounterItems();

  // Private variables
  private counterEls = viewChildren<ElementRef<HTMLSpanElement>>('counterVal');
  private triggers: ScrollTrigger[] = [];

  ngAfterViewInit(): void {
    this.counterEls().forEach((elRef, i) => {
      const item = this.counterItems[i];
      const obj = { val: 0 };
      const trigger = ScrollTrigger.create({
        trigger: elRef.nativeElement,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(obj, {
            val: item.value,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              elRef.nativeElement.textContent = Math.floor(obj.val).toString();
            },
          });
        },
      });
      this.triggers.push(trigger);
    });
  }

  ngOnDestroy(): void {
    this.triggers.forEach((t) => t.kill());
  }

  private getCounterItems(): CounterItem[] {
    return [
      {
        value: this.getYearsSince2016(),
        suffix: '+',
        label: 'Years of Experience',
      },
      { value: 200, suffix: '+', label: 'Satisfied Clients' },
      { value: 108, suffix: '+', label: 'Completed Projects' },
      { value: 90, suffix: '%', label: 'Client Retention Rate' },
    ];
  }

  private getYearsSince2016(): number {
    const currentYear: number = new Date().getFullYear();
    const startYear: number = 2016;

    return currentYear - startYear;
  }
}
