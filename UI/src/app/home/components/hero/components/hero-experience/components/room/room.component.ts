import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  computed,
} from '@angular/core';
import { extend, injectLoader } from 'angular-three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Group } from 'three';

extend({ Group });

@Component({
  selector: 'app-room',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    @if (scene()) {
      <ngt-primitive
        [object]="scene()!"
        [position]="[0.5, -1, 0]"
        [scale]="[0.07, 0.07, 0.07]"
        [rotation]="[0, -Math.PI / 4, 0]"
      />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomComponent {
  protected readonly Math = Math;

  private readonly gltf = injectLoader(
    () => GLTFLoader,
    () => '/models/optimized-room.glb',
  );

  readonly scene = computed(() => this.gltf()?.scene ?? null);
}
