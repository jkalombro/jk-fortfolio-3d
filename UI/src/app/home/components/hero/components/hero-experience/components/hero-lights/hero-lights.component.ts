import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
} from '@angular/core';
import { extend, injectStore } from 'angular-three';
import { AmbientLight, DirectionalLight, PointLight, SpotLight } from 'three';

extend({ AmbientLight, DirectionalLight, PointLight, SpotLight });

@Component({
  selector: 'app-hero-lights',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <!-- Base ambient: bright blue fill -->
    <ngt-ambient-light [intensity]="2.5" color="#4488ff" />

    <!-- Key light: cool-blue tinted from front-right to reveal form -->
    <ngt-directional-light
      [position]="[4, 6, 4]"
      [intensity]="1.2"
      color="#99ccff"
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
export class HeroLightsComponent implements OnDestroy {
  private readonly chairSpot = new SpotLight('#ffffff', 120);
  private readonly store = injectStore();

  constructor() {
    const scene = this.store.snapshot.scene;

    this.chairSpot.position.set(0.5, 3, 1.5);
    this.chairSpot.angle = 0.25;
    this.chairSpot.penumbra = 0.4;
    this.chairSpot.distance = 8;
    this.chairSpot.castShadow = true;

    // Aim at the chair world position
    this.chairSpot.target.position.set(0.5, -1.5, 0.5);

    scene.add(this.chairSpot);
    scene.add(this.chairSpot.target);
  }

  ngOnDestroy() {
    const scene = this.store.snapshot.scene;
    scene.remove(this.chairSpot.target);
    scene.remove(this.chairSpot);
    this.chairSpot.dispose();
  }
}
