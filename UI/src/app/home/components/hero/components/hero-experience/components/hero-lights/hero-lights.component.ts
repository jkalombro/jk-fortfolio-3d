import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { extend } from 'angular-three';
import { AmbientLight, DirectionalLight } from 'three';

extend({ AmbientLight, DirectionalLight });

@Component({
  selector: 'app-hero-lights',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <ngt-ambient-light [intensity]="1.5" />
    <ngt-directional-light [position]="[5, 10, 7]" [intensity]="2.5" [castShadow]="true" />
    <ngt-directional-light [position]="[-5, 5, -5]" [intensity]="0.8" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroLightsComponent {}
