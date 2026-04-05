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
}
