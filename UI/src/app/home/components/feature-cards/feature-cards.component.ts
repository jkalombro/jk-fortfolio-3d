import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ABILITIES } from '../../../shared/constants';

@Component({
  selector: 'app-feature-cards',
  standalone: true,
  templateUrl: './feature-cards.component.html',
  styleUrl: './feature-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureCardsComponent {
  readonly abilities = ABILITIES;
}
