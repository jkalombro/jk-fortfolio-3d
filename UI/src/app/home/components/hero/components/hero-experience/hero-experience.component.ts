import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgtCanvasImpl, NgtCanvasContent } from 'angular-three/dom';
import { HeroSceneComponent } from './hero-scene.component';

@Component({
  selector: 'app-hero-experience',
  standalone: true,
  imports: [NgtCanvasImpl, NgtCanvasContent, HeroSceneComponent],
  template: `
    <ngt-canvas [camera]="{ position: [0, 3, 8], fov: 45 }" [shadows]="true">
      <ng-template canvasContent>
        <app-hero-scene />
      </ng-template>
    </ngt-canvas>
  `,
  styles: [`
    :host { display: block; width: 100%; height: 100%; min-height: 100vh; }
    ngt-canvas { display: block; width: 100%; height: 100%; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroExperienceComponent {}
