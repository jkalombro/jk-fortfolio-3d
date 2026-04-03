import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { extend } from 'angular-three';
import { AmbientLight, DirectionalLight, PointLight, SpotLight } from 'three';

extend({ AmbientLight, DirectionalLight, PointLight, SpotLight });

@Component({
  selector: 'app-hero-lights',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <ngt-ambient-light [intensity]="0.05" />
    <ngt-directional-light [position]="[5, 5, 5]" [intensity]="0.3" [castShadow]="true" />
    <ngt-point-light [position]="[-5, 4, 3]" color="#4a6cf7" [intensity]="20" [distance]="25" />
    <ngt-point-light [position]="[4, 3, -3]" color="#6b2fff" [intensity]="12" [distance]="20" />
    <ngt-point-light [position]="[0, 5, 0]" color="#2255ff" [intensity]="8" [distance]="18" />
    <ngt-spot-light [position]="[2, 8, 4]" [intensity]="2" color="#aaaaff" [penumbra]="1" [angle]="0.5" [castShadow]="true" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroLightsComponent {}
