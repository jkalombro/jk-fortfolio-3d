import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  signal,
} from '@angular/core';
import { extend } from 'angular-three';
import { Points, PointsMaterial, BufferGeometry, BufferAttribute } from 'three';

extend({ Points, PointsMaterial, BufferGeometry, BufferAttribute });

@Component({
  selector: 'app-particles',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <ngt-points>
      <ngt-buffer-geometry>
        <ngt-buffer-attribute
          attach="attributes.position"
          [array]="positions()"
          [count]="particleCount"
          [itemSize]="3"
        />
      </ngt-buffer-geometry>
      <ngt-points-material
        [size]="0.015"
        color="#ffffff"
        [transparent]="true"
        [opacity]="0.6"
        [sizeAttenuation]="true"
      />
    </ngt-points>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticlesComponent implements OnInit {
  readonly particleCount = 200;
  readonly positions = signal<Float32Array>(new Float32Array(0));

  ngOnInit(): void {
    const pos = new Float32Array(this.particleCount * 3);
    for (let i = 0; i < this.particleCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 20;
    }
    this.positions.set(pos);
  }
}
