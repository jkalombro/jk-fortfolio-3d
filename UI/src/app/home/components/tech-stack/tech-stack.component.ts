import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TECH_STACK_ICONS } from '../../../shared/constants';
import { TitleHeaderComponent } from '../../../shared/components/title-header/title-header.component';
import { TechIconCardComponent } from './tech-icon-card/tech-icon-card.component';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [TitleHeaderComponent, TechIconCardComponent],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackComponent implements AfterViewInit, OnDestroy {
  readonly techIcons = TECH_STACK_ICONS;

  @ViewChild('skillsWrapper') skillsWrapper!: ElementRef;

  private ctx!: gsap.Context;

  constructor(private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.ctx = gsap.context(() => {
        gsap.fromTo(
          '.tech-card',
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.inOut',
            stagger: 0.2,
            scrollTrigger: {
              trigger: this.skillsWrapper.nativeElement,
              start: 'top center',
            },
          },
        );
      });
    });
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
