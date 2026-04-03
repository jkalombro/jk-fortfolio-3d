import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, computed, input } from '@angular/core';
import { extend, injectLoader } from 'angular-three';
import { NgtCanvasImpl, NgtCanvasContent } from 'angular-three/dom';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AmbientLight, DirectionalLight, SpotLight } from 'three';
import type { TechStackIcon } from '../../../../shared/models';

extend({ AmbientLight, DirectionalLight, SpotLight });

@Component({
  selector: 'app-tech-icon-card',
  standalone: true,
  imports: [NgtCanvasImpl, NgtCanvasContent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tech-icon-card.component.html',
  styleUrl: './tech-icon-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechIconCardComponent {
  readonly icon = input.required<TechStackIcon>();

  readonly hasModel = computed(() => !!this.icon().modelPath);
  readonly hasImg = computed(() => !this.icon().modelPath && !!this.icon().imgPath);

  private readonly gltf = injectLoader(
    () => GLTFLoader,
    () => this.icon().modelPath ?? '',
  );

  readonly scene = computed(() => (this.hasModel() ? (this.gltf()?.scene ?? null) : null));
  readonly scale = computed(() => this.icon().scale);
  readonly rotation = computed(() => this.icon().rotation);
}
