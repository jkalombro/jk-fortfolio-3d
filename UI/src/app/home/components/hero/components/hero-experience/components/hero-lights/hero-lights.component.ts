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
    <!-- Base ambient: dim cool tone so the room doesn't go pitch-black -->
    <ngt-ambient-light [intensity]="0.3" color="#1a1a2e" />

    <!-- Key light: warm-white from front-right to reveal form -->
    <ngt-directional-light
      [position]="[4, 6, 4]"
      [intensity]="0.6"
      color="#ffffff"
      [castShadow]="true"
    />

    <!-- Monitor screen glow — cool blue-white from the front -->
    <ngt-spot-light
      [position]="[0, 2, 5]"
      [intensity]="60"
      color="#a8d8ff"
      [penumbra]="1"
      [angle]="0.45"
      [castShadow]="false"
    />

    <!-- RGB accent — cyan from the right -->
    <ngt-spot-light
      [position]="[5, 4, 2]"
      [intensity]="50"
      color="#00f5d4"
      [penumbra]="0.6"
      [angle]="0.35"
      [castShadow]="true"
    />

    <!-- RGB accent — magenta/pink from the left -->
    <ngt-spot-light
      [position]="[-4, 4, 2]"
      [intensity]="50"
      color="#f72585"
      [penumbra]="0.6"
      [angle]="0.35"
      [castShadow]="true"
    />

    <!-- Under-desk RGB strip glow — purple -->
    <ngt-point-light [position]="[0, -0.5, 0]" color="#7209b7" [intensity]="15" />

    <!-- Ceiling/back fill — deep indigo to add depth -->
    <ngt-point-light [position]="[0, 3, -3]" color="#3a0ca3" [intensity]="30" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroLightsComponent {}
