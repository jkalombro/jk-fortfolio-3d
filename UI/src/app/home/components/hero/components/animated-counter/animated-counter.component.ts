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
import { COUNTER_ITEMS } from '../../../../../shared/constants';

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
  readonly counterItems = COUNTER_ITEMS;

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
}
