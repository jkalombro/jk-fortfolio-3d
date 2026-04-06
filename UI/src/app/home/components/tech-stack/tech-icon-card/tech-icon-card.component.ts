import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  computed,
  effect,
  input,
  OnDestroy,
  signal,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { extend, loaderResource, NgtArgs } from 'angular-three';
import { NgtCanvasImpl, NgtCanvasContent } from 'angular-three/dom';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import {
  AmbientLight,
  Box3,
  Color,
  DirectionalLight,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  SpotLight,
  Texture,
  TextureLoader,
  Vector3,
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
export class TechIconCardComponent implements OnDestroy {
  readonly icon = input.required<TechStackIcon>();

  readonly hasModel = computed(() => !!this.icon().modelPath);
  readonly hasSvg = computed(
    () =>
      !this.icon().modelPath &&
      !!this.icon().imgPath &&
      this.icon().imgPath!.endsWith('.svg'),
  );
  readonly hasImg = computed(
    () =>
      !this.icon().modelPath &&
      !!this.icon().imgPath &&
      !this.icon().imgPath!.endsWith('.svg'),
  );

  readonly DoubleSide = DoubleSide;

  private readonly _rotation = signal<[number, number, number]>([0, 0, 0]);
  readonly rotation = computed(() => this._rotation());

  private readonly _texture = signal<Texture | null>(null);
  readonly texture = computed(() => this._texture());

  private readonly _svgGroup = signal<Group | null>(null);
  readonly svgGroup = computed(() => this._svgGroup());

  readonly isMobile: boolean;

  private isDragging = false;
  private lastX = 0;
  private lastY = 0;

  private readonly gltf = loaderResource(() => GLTFLoader, () => this.icon().modelPath ?? '', {
    extensions: (loader: GLTFLoader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/draco/');
      loader.setDRACOLoader(dracoLoader);
    },
  });

  readonly scene = computed(() => (this.hasModel() ? (this.gltf.value()?.scene ?? null) : null));
  readonly scale = computed(() => this.icon().scale);

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isMobile =
      isPlatformBrowser(platformId) && window.matchMedia('(max-width: 768px)').matches;

    effect(() => {
      this._rotation.set([...this.icon().rotation] as [number, number, number]);
    });

    effect(() => {
      if (!this.hasImg() || !this.icon().imgPath) return;
      const loader = new TextureLoader();
      loader.load(this.icon().imgPath!, (tex) => {
        this._texture.set(tex);
      });
    });

    effect(() => {
      if (!this.hasSvg() || !this.icon().imgPath) return;

      const loader = new SVGLoader();
      loader.load(
        this.icon().imgPath!,
        (data) => {
        // Pass 1: collect shapes + compute SVG-space bounds from actual path points
        // (avoids relying on data.xml which is undefined in some Three.js builds)
        const shapeEntries: { shape: ReturnType<typeof SVGLoader.createShapes>[0]; color: Color }[] = [];
        let svgMinX = Infinity, svgMinY = Infinity, svgMaxX = -Infinity, svgMaxY = -Infinity;

        for (const path of data.paths) {
          const fillStyle = path.userData?.['style']?.fill as string | undefined;
          if (fillStyle === 'none') continue;

          const shapes = SVGLoader.createShapes(path);
          if (shapes.length === 0) continue;

          const color = fillStyle ? new Color().setStyle(fillStyle) : path.color.clone();

          for (const shape of shapes) {
            for (const pt of shape.getPoints()) {
              if (pt.x < svgMinX) svgMinX = pt.x;
              if (pt.y < svgMinY) svgMinY = pt.y;
              if (pt.x > svgMaxX) svgMaxX = pt.x;
              if (pt.y > svgMaxY) svgMaxY = pt.y;
            }
            shapeEntries.push({ shape, color });
          }
        }

        // Depth is 15% of the actual SVG coordinate span — consistent across all viewBox sizes
        const svgMaxDim = Math.max(svgMaxX - svgMinX, svgMaxY - svgMinY) || 100;
        const depth = svgMaxDim * 0.15;

        // Pass 2: build extruded meshes with the correct proportional depth.
        // Each layer is offset slightly in Z to prevent Z-fighting between coplanar faces
        // (e.g. the white "A" on Angular and "C" on C# sitting on top of the base shape).
        const meshGroup = new Group();
        const zStep = depth * 0.03;

        shapeEntries.forEach(({ shape, color }, i) => {
          const geometry = new ExtrudeGeometry(shape, {
            depth,
            bevelEnabled: true,
            bevelThickness: depth * 0.2,
            bevelSize: depth * 0.15,
            bevelSegments: 3,
          });

          const mesh = new Mesh(geometry, new MeshStandardMaterial({
            color,
            roughness: 0.4,
            metalness: 0.1,
            side: DoubleSide,
          }));
          mesh.position.z = i * zStep;
          meshGroup.add(mesh);
        });

        // Center the mesh group in SVG coordinate space
        const boundingBox = new Box3().setFromObject(meshGroup);
        const center = new Vector3();
        boundingBox.getCenter(center);
        const size = new Vector3();
        boundingBox.getSize(size);
        meshGroup.position.set(-center.x, -center.y, 0);

        // Outer group: normalize all SVGs to ~3 Three.js units + flip Y axis (SVG vs Three.js convention)
        const maxDim = Math.max(size.x, size.y);
        const normalizedScale = maxDim > 0 ? 3 / maxDim : 1;

        const group = new Group();
        group.scale.set(normalizedScale, -normalizedScale, normalizedScale);
        group.add(meshGroup);

        this._svgGroup.set(group);
        },
        undefined,
        (error) => console.error('[SVGLoader] failed to load', this.icon().imgPath, error),
      );
    });
  }

  ngOnDestroy(): void {
    this._texture()?.dispose();
    this._disposeSvgGroup();
  }

  private _disposeSvgGroup(): void {
    const group = this._svgGroup();
    if (!group) return;
    group.traverse((obj) => {
      if (obj instanceof Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          (obj.material as MeshStandardMaterial).dispose();
        }
      }
    });
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
