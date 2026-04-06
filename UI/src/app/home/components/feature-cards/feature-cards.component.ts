import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ABILITIES } from '../../../shared/constants';
import { TitleHeaderComponent } from '../../../shared/components/title-header/title-header.component';

@Component({
  selector: 'app-feature-cards',
  standalone: true,
  imports: [TitleHeaderComponent],
  templateUrl: './feature-cards.component.html',
  styleUrl: './feature-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureCardsComponent {
  readonly abilities = ABILITIES;

  updateGlow(event: MouseEvent, card: HTMLElement): void {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI);
    card.style.setProperty('--start', String(angle + 90));
  }
}
