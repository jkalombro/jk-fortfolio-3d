import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LOGO_ICONS_LIST } from '../../../shared/constants';

@Component({
  selector: 'app-logo-showcase',
  standalone: true,
  templateUrl: './logo-showcase.component.html',
  styleUrl: './logo-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoShowcaseComponent {
  readonly logoIcons = LOGO_ICONS_LIST;
}
