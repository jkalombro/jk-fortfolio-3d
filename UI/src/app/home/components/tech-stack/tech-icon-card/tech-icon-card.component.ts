import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  computed,
  effect,
  inject,
  input,
  NgZone,
  OnDestroy,
  signal,
} from '@angular/core';
import { extend, loaderResource, NgtArgs } from 'angular-three';
import { NgtCanvasImpl, NgtCanvasContent } from 'angular-three/dom';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import {
  AmbientLight,
  DirectionalLight,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  SpotLight,
  TextureLoader,
} from 'three';
import type { TechStackIcon } from '../../../../shared/models';

extend({ AmbientLight, DirectionalLight, Mesh, MeshBasicMaterial, PlaneGeometry, SpotLight });

@Component({
  selector: 'app-tech-icon-card',
  standalone: true,
  imports: [NgtCanvasImpl, NgtCanvasContent, NgtArgs],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tech-icon-card.component.html',
  styleUrl: './tech-icon-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechIconCardComponent implements AfterViewInit, OnDestroy {
  readonly icon = input.required<TechStackIcon>();

  readonly hasModel = computed(() => !!this.icon().modelPath);
  readonly hasImg = computed(() => !this.icon().modelPath && !!this.icon().imgPath);

  private readonly zone = inject(NgZone);

  private readonly _rotation = signal<[number, number, number]>([0, 0, 0]);
  readonly rotation = computed(() => this._rotation());

  private isDragging = false;
  private lastX = 0;
  private lastY = 0;
  private rafId = 0;

  private readonly gltf = loaderResource(() => GLTFLoader, () => this.icon().modelPath ?? '', {
    extensions: (loader: GLTFLoader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/draco/');
      loader.setDRACOLoader(dracoLoader);
    },
  });

  private readonly textureResource = loaderResource(
    () => TextureLoader,
    () => this.icon().imgPath ?? '',
  );

  readonly scene = computed(() => (this.hasModel() ? (this.gltf.value()?.scene ?? null) : null));
  readonly texture = computed(() => (this.hasImg() ? (this.textureResource.value() ?? null) : null));
  readonly scale = computed(() => this.icon().scale);

  constructor() {
    effect(() => {
      const base = this.icon().rotation as [number, number, number];
      this._rotation.set([...base]);
    });
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      const animate = () => {
        if (!this.isDragging) {
          const [rx, ry, rz] = this._rotation();
          this._rotation.set([rx, ry + 0.005, rz]);
        }
        this.rafId = requestAnimationFrame(animate);
      };
      this.rafId = requestAnimationFrame(animate);
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
  }

  onPointerDown(event: PointerEvent): void {
    this.isDragging = true;
    this.lastX = event.clientX;
    this.lastY = event.clientY;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isDragging) return;
    const dx = (event.clientX - this.lastX) * 0.01;
    const dy = (event.clientY - this.lastY) * 0.01;
    this.lastX = event.clientX;
    this.lastY = event.clientY;
    const [rx, ry, rz] = this._rotation();
    this._rotation.set([rx + dy, ry + dx, rz]);
  }

  onPointerUp(): void {
    this.isDragging = false;
  }
}
