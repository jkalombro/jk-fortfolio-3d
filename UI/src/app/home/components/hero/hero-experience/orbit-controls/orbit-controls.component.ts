import { Component, OnDestroy } from '@angular/core';
import { injectBeforeRender, injectStore } from 'angular-three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-orbit-controls',
  standalone: true,
  template: '',
})
export class OrbitControlsComponent implements OnDestroy {
  private readonly store = injectStore();
  private readonly controls: OrbitControls;

  constructor() {
    const { camera, gl } = this.store.snapshot;
    this.controls = new OrbitControls(camera, gl.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = false;
    this.controls.minPolarAngle = Math.PI / 5;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.target.set(0, 0, 0);

    injectBeforeRender(() => {
      this.controls.update();
    });
  }

  ngOnDestroy() {
    this.controls.dispose();
  }
}
