import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  computed,
  effect,
  output,
} from '@angular/core';
import { loaderResource, NgtArgs } from 'angular-three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [NgtArgs],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    @if (scene()) {
      <ngt-primitive
        *args="[scene()!]"
        [position]="[0.5, -1.5, 0]"
        [scale]="[0.5, 0.5, 0.5]"
        [rotation]="[-0.25, -Math.PI / 4, 0]"
      />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomComponent {
  protected readonly Math = Math;

  readonly modelLoaded = output<void>();

  private readonly gltf = loaderResource(
    () => GLTFLoader,
    () => '/models/game_room-optimized.glb',
  );

  readonly scene = computed(() => this.gltf.value()?.scene ?? null);

  constructor() {
    effect(() => {
      if (this.scene()) {
        this.modelLoaded.emit();
      }
    });
  }
}
