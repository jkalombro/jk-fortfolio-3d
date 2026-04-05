import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
} from '@angular/core';
import { extend, injectStore } from 'angular-three';
import { AmbientLight, DirectionalLight } from 'three';

extend({ AmbientLight });

@Component({
  selector: 'app-contact-lights',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<ngt-ambient-light [intensity]="0.5" color="#fff4e6" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactLightsComponent implements OnDestroy {
  private readonly store = injectStore();
  private readonly dirLight = new DirectionalLight('#ffd9b3', 2.5);

  constructor() {
    const scene = this.store.snapshot.scene;

    this.dirLight.position.set(8, 10, 5);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 2048;
    this.dirLight.shadow.mapSize.height = 2048;
    this.dirLight.shadow.camera.left = -10;
    this.dirLight.shadow.camera.right = 10;
    this.dirLight.shadow.camera.top = 10;
    this.dirLight.shadow.camera.bottom = -10;
    this.dirLight.shadow.camera.near = 0.1;
    this.dirLight.shadow.camera.far = 50;
    this.dirLight.shadow.camera.updateProjectionMatrix();

    scene.add(this.dirLight);
  }

  ngOnDestroy() {
    this.store.snapshot.scene.remove(this.dirLight);
    this.dirLight.dispose();
  }
}
