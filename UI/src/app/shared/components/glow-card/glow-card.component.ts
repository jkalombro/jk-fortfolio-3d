import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  input,
  viewChild,
} from '@angular/core';
import type { ExpCard, Testimonial } from '../../models';

@Component({
  selector: 'app-glow-card',
  standalone: true,
  templateUrl: './glow-card.component.html',
  styleUrl: './glow-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlowCardComponent {
  card = input.required<ExpCard | Testimonial>();
  index = input<number>(0);

  private cardRef = viewChild<ElementRef<HTMLDivElement>>('cardEl');

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const el = this.cardRef()?.nativeElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const angle = Math.atan2(y - rect.height / 2, x - rect.width / 2) * (180 / Math.PI);
    el.style.setProperty('--start', String(angle + 90));
  }

  get review(): string {
    return (this.card() as ExpCard | Testimonial & { review: string }).review ?? '';
  }
}
