import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeroLightsComponent } from './components/hero-lights/hero-lights.component';
import { ParticlesComponent } from './components/particles/particles.component';
import { RoomComponent } from './components/room/room.component';
import { OrbitControlsComponent } from './components/orbit-controls/orbit-controls.component';

@Component({
  selector: 'app-hero-scene',
  standalone: true,
  imports: [HeroLightsComponent, ParticlesComponent, RoomComponent, OrbitControlsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <app-orbit-controls />
    <app-hero-lights />
    <app-particles />
    <app-room />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSceneComponent {}
