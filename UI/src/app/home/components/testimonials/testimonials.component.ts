import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TESTIMONIALS } from '../../../shared/constants';
import { TitleHeaderComponent } from '../../../shared/components/title-header/title-header.component';
import { GlowCardComponent } from '../../../shared/components/glow-card/glow-card.component';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [TitleHeaderComponent, GlowCardComponent],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsComponent {
  readonly testimonials = TESTIMONIALS;
}
