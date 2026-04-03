import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgtCanvasImpl, NgtCanvasContent } from 'angular-three/dom';
import { HeroSceneComponent } from './hero-scene.component';

@Component({
  selector: 'app-hero-experience',
  standalone: true,
  imports: [NgtCanvasImpl, NgtCanvasContent, HeroSceneComponent],
  template: `
    <ngt-canvas [camera]="{ position: [0, 5, 15], fov: 75 }" [shadows]="true">
      <ng-template canvasContent>
        <app-hero-scene />
      </ng-template>
    </ngt-canvas>
  `,
  styles: [':host { display: block; width: 100%; height: 100vh; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroExperienceComponent {}
