import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { extend, injectBeforeRender } from 'angular-three';
import { Points, PointsMaterial, BufferGeometry, BufferAttribute } from 'three';

extend({ Points, PointsMaterial, BufferGeometry, BufferAttribute });

@Component({
  selector: 'app-particles',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <ngt-points #points>
      <ngt-buffer-geometry>
        <ngt-buffer-attribute
          attach="attributes.position"
          [array]="positions()"
          [count]="particleCount"
          [itemSize]="3"
        />
      </ngt-buffer-geometry>
      <ngt-points-material
        [size]="0.02"
        color="#ffffff"
        [transparent]="true"
        [opacity]="0.8"
        [sizeAttenuation]="true"
      />
    </ngt-points>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticlesComponent implements OnInit {
  readonly particleCount = 300;
  readonly positions = signal<Float32Array>(new Float32Array(0));

  private readonly pointsRef = viewChild<ElementRef>('points');

  constructor() {
    injectBeforeRender(() => {
      const pts = this.pointsRef()?.nativeElement;
      if (!pts) return;
      const pos = pts.geometry.attributes['position'];
      if (!pos) return;
      const arr = pos.array as Float32Array;
      for (let i = 1; i < this.particleCount * 3; i += 3) {
        arr[i] -= 0.002;
        if (arr[i] < -15) arr[i] = 15;
      }
      pos.needsUpdate = true;
    });
  }

  ngOnInit(): void {
    const pos = new Float32Array(this.particleCount * 3);
    for (let i = 0; i < this.particleCount * 3; i += 3) {
      pos[i]     = (Math.random() - 0.5) * 40;  // x
      pos[i + 1] = (Math.random() - 0.5) * 30;  // y
      pos[i + 2] = (Math.random() - 0.5) * 40;  // z
    }
    this.positions.set(pos);
  }
}
