import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { extend } from 'angular-three';
import { AmbientLight, DirectionalLight, PointLight, SpotLight } from 'three';

extend({ AmbientLight, DirectionalLight, PointLight, SpotLight });

@Component({
  selector: 'app-hero-lights',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <ngt-ambient-light [intensity]="0.2" color="#1a1a40" />

    <ngt-directional-light
      [position]="[5, 5, 5]"
      [intensity]="0.3"
      [castShadow]="true"
    />

    <ngt-spot-light
      [position]="[4, 5, 4]"
      [intensity]="40"
      color="#4cc9f0"
      [penumbra]="0.5"
      [angle]="0.3"
      [castShadow]="true"
    />
    <ngt-spot-light
      [position]="[-3, 5, 5]"
      [intensity]="60"
      color="#9d4edd"
      [penumbra]="1"
      [angle]="0.4"
      [castShadow]="true"
    />

    <ngt-point-light [position]="[0, 1, 0]" color="#7209b7" [intensity]="10" />
    <ngt-point-light
      [position]="[1, 2, -2]"
      color="#0d00a4"
      [intensity]="100"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroLightsComponent {}
