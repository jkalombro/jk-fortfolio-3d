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
        [size]="0.6"
        [map]="particleTexture"
        [transparent]="true"
        [opacity]="0.9"
        [sizeAttenuation]="true"
        [blending]="AdditiveBlending"
        [depthWrite]="false"
        [alphaTest]="0.001"
        color="#ffffff"
      />
    </ngt-points>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticlesComponent implements OnInit {
  readonly AdditiveBlending = AdditiveBlending;
  readonly particleCount = 400; // Increased count for better "glow" density
  readonly positions = signal<Float32Array>(new Float32Array(0));

  private readonly pointsRef = viewChild<ElementRef>('points');

  // Create a circular glow texture
  readonly particleTexture = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128; // Higher resolution for smoother glow
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    // The "Core" - Very bright
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.1, 'rgba(255, 255, 200, 1)'); // Slight yellow tint
    // The "Glow" - Saturated Blue/Cyan
    gradient.addColorStop(0.3, 'rgba(0, 150, 255, 0.6)');
    gradient.addColorStop(0.5, 'rgba(0, 50, 200, 0.2)');
    // The Edge - Invisible
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);

    const texture = new Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  })();

  constructor() {
    injectBeforeRender(() => {
      const pts = this.pointsRef()?.nativeElement;
      if (!pts) return;
      const pos = pts.geometry.attributes['position'];
      if (!pos) return;
      const arr = pos.array as Float32Array;
      for (let i = 0; i < this.particleCount * 3; i += 3) {
        // 1. SLOWER FALL (Y-axis)
        arr[i + 1] -= 0.005;

        // 2. FORWARD MOTION (Z-axis)
        arr[i + 2] += 0.001;

        // 2. COMPRESS TO CENTER (X-axis)
        // We move X toward 0 by a small factor (0.005) every frame
        // arr[i] += (0 - arr[i]) * 0.005;

        // 3. CONTINUOUS LOOP RESET
        if (arr[i + 1] < -5) {
          arr[i + 1] = 40; // Reset high up
          // MINIMIZE SPREAD:
          // Instead of multiplying by 40 or 60, use a small number like 10
          // This keeps the "column" of fireflies tight in the center
          arr[i] = (Math.random() - 0.5) * 10; // Narrow X
          arr[i + 2] = (Math.random() - 0.5) * 10; // Narrow Z
        }

        // Reset Z if it gets too close to the camera lens
        if (arr[i + 2] > 20) {
          arr[i + 2] = -20;
        }
      }

      pos.needsUpdate = true;
    });
  }

  ngOnInit(): void {
    const pos = new Float32Array(this.particleCount * 3);
    for (let i = 0; i < this.particleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 40; // x
      pos[i + 1] = (Math.random() - 0.5) * 30; // y
      pos[i + 2] = (Math.random() - 0.5) * 10; // z
    }
    this.positions.set(pos);
  }
}
