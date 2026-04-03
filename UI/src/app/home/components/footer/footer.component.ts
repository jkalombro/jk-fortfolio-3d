import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SOCIAL_IMGS } from '../../../shared/constants';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly socialImgs = SOCIAL_IMGS;
  readonly year = new Date().getFullYear();
}
