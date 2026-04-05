import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXP_CARDS } from '../../../shared/constants';
import { TitleHeaderComponent } from '../../../shared/components/title-header/title-header.component';
import { GlowCardComponent } from '../../../shared/components/glow-card/glow-card.component';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [TitleHeaderComponent, GlowCardComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent implements AfterViewInit, OnDestroy {
  readonly expCards = EXP_CARDS;

  getDuration(startDate: string, endDate: string): string {
    const parseDate = (d: string): Date => {
      if (d === 'Present') return new Date();
      const [month, year] = d.split(' ');
      return new Date(`${month} 1, ${year}`);
    };

    const start = parseDate(startDate);
    const end = parseDate(endDate);
    const totalMonths =
      (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years === 0) return `${months} mo${months !== 1 ? 's' : ''}`;
    if (months === 0) return `${years} yr${years !== 1 ? 's' : ''}`;
    return `${years} yr${years !== 1 ? 's' : ''} ${months} mo${months !== 1 ? 's' : ''}`;
  }

  @ViewChildren('timelineCard') timelineCards!: QueryList<ElementRef>;
  @ViewChildren('expText') expTexts!: QueryList<ElementRef>;
  @ViewChildren('timeline') timelines!: QueryList<ElementRef>;

  private ctx!: gsap.Context;

  constructor(private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.ctx = gsap.context(() => {
        this.timelineCards.forEach((card) => {
          gsap.from(card.nativeElement, {
            xPercent: -100,
            opacity: 0,
            transformOrigin: 'left left',
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: card.nativeElement,
              start: 'top 80%',
            },
          });
        });

        this.timelines.forEach((tl) => {
          gsap.to(tl.nativeElement, {
            transformOrigin: 'bottom bottom',
            ease: 'power1.inOut',
            scrollTrigger: {
              trigger: tl.nativeElement,
              start: 'top center',
              end: '70% center',
              onUpdate: (self) => {
                gsap.to(tl.nativeElement, { scaleY: 1 - self.progress });
              },
            },
          });
        });

        this.expTexts.forEach((text) => {
          gsap.from(text.nativeElement, {
            opacity: 0,
            xPercent: 0,
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: text.nativeElement,
              start: 'top 60%',
            },
          });
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
