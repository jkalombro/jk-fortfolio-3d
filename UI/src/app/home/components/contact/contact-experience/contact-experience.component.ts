import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  computed,
} from '@angular/core';
import { extend, loaderResource, NgtArgs } from 'angular-three';
import { NgtCanvasImpl, NgtCanvasContent } from 'angular-three/dom';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PlaneGeometry, MeshStandardMaterial } from 'three';
import { OrbitControlsContactComponent } from './orbit-controls-contact.component';
import { ContactLightsComponent } from './contact-lights.component';

extend({ PlaneGeometry, MeshStandardMaterial });

@Component({
  selector: 'app-contact-experience',
  standalone: true,
  imports: [
    NgtCanvasImpl,
    NgtCanvasContent,
    NgtArgs,
    OrbitControlsContactComponent,
    ContactLightsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './contact-experience.component.html',
  styleUrl: './contact-experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactExperienceComponent {
  private readonly gltf = loaderResource(
    () => GLTFLoader,
    () => '/models/computer-optimized.glb',
  );

  readonly scene = computed(() => {
    const scene = this.gltf.value()?.scene ?? null;
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
    return scene;
  });

  readonly planeGeomArgs: [number, number] = [30, 30];
  readonly floorRotation: [number, number, number] = [-Math.PI / 2, 0, 0];
  readonly computerScale: [number, number, number] = [0.03, 0.03, 0.03];
  readonly computerPosition: [number, number, number] = [0, -1.49, -2];
  readonly minPolarAngle = Math.PI / 5;
  readonly maxPolarAngle = Math.PI / 2;
}
