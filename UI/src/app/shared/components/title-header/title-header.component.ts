import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-title-header',
  standalone: true,
  templateUrl: './title-header.component.html',
  styleUrl: './title-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleHeaderComponent {
  title = input<string>('');
  sub = input<string>('');
}
