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
import {
  Points,
  PointsMaterial,
  BufferGeometry,
  BufferAttribute,
  AdditiveBlending,
  Texture,
} from 'three';

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
        [size]="0.1"
        [map]="particleTexture"
        [transparent]="true"
        [opacity]="0.8"
        [sizeAttenuation]="true"
        [blending]="AdditiveBlending"
        [depthWrite]="false"
        color="#ffffff"
      />
    </ngt-points>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticlesComponent implements OnInit {
  readonly AdditiveBlending = AdditiveBlending;
  readonly particleCount = 150;
  readonly positions = signal<Float32Array>(new Float32Array(0));

  // To match React's 'particles' useMemo, we store speeds here
  private speeds = new Float32Array(this.particleCount);
  private readonly pointsRef = viewChild<ElementRef<Points>>('points');

  readonly particleTexture = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const texture = new Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  })();

  constructor() {
    injectBeforeRender(() => {
      const pts = this.pointsRef()?.nativeElement;
      if (!pts) return;

      const posAttr = pts.geometry.attributes['position'];
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < this.particleCount; i++) {
        const i3 = i * 3;

        // Apply individual speed (React: y -= particles[i].speed)
        arr[i3 + 1] -= this.speeds[i];

        // Reset logic (React: if (y < -2) y = Math.random() * 10 + 5)
        if (arr[i3 + 1] < -2) {
          arr[i3 + 1] = Math.random() * 10 + 5;
          arr[i3] = (Math.random() - 0.5) * 10; // Optional: Reset X/Z spread
          arr[i3 + 2] = (Math.random() - 0.5) * 10;
        }
      }

      posAttr.needsUpdate = true;
    });
  }

  ngOnInit(): void {
    const pos = new Float32Array(this.particleCount * 3);

    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      // Initial Positions (React logic)
      pos[i3] = (Math.random() - 0.5) * 10; // X
      pos[i3 + 1] = Math.random() * 10 + 3; // Y (High start)
      pos[i3 + 2] = (Math.random() - 0.5) * 10; // Z

      // Initial Speeds (React: 0.005 + Math.random() * 0.001)
      this.speeds[i] = 0.005 + Math.random() * 0.001;
    }

    this.positions.set(pos);
  }
}
