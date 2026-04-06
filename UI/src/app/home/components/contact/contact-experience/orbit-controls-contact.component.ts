import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { injectBeforeRender, injectStore } from 'angular-three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-orbit-controls-contact',
  standalone: true,
  template: '',
})
export class OrbitControlsContactComponent implements OnInit, OnDestroy {
  readonly minPolarAngle = input.required<number>();
  readonly maxPolarAngle = input.required<number>();

  private readonly store = injectStore();
  private controls!: OrbitControls;

  constructor() {
    injectBeforeRender(() => {
      this.controls?.update();
    });
  }

  ngOnInit(): void {
    const { camera, gl } = this.store.snapshot;
    this.controls = new OrbitControls(camera, gl.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = false;
    this.controls.minPolarAngle = this.minPolarAngle();
    this.controls.maxPolarAngle = this.maxPolarAngle();
    this.controls.target.set(0, 0, 0);
  }

  ngOnDestroy(): void {
    this.controls?.dispose();
  }
}
