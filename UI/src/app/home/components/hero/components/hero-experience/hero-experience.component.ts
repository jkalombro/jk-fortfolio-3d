import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import { NgtCanvasImpl, NgtCanvasContent } from 'angular-three/dom';
import gsap from 'gsap';
import { HeroSceneComponent } from './hero-scene.component';

@Component({
  selector: 'app-hero-experience',
  standalone: true,
  imports: [NgtCanvasImpl, NgtCanvasContent, HeroSceneComponent],
  template: `
    <div class="scene-container">
      @if (!isLoaded()) {
        <div
          #loadingOverlay
          class="loading-overlay"
          aria-busy="true"
          aria-label="Loading 3D scene"
        >
          <div class="loader-ring"></div>
        </div>
      }
      <ngt-canvas [camera]="{ position: [0, 2, 5], fov: 60 }" [shadows]="true">
        <ng-template canvasContent>
          <app-hero-scene (modelLoaded)="onModelLoaded()" />
        </ng-template>
      </ngt-canvas>
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; height: 100%; }
    .scene-container { position: relative; width: 100%; height: 100%; }
    ngt-canvas { display: block; width: 100%; height: 100%; }

    .loading-overlay {
      position: absolute;
      inset: 0;
      z-index: 10;
      background: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .loader-ring {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #62e0ff;
      border-right-color: #fd5c79;
      border-bottom-color: #6d45ce;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroExperienceComponent {
  // Public variables
  readonly isLoaded = signal(false);

  // Private variables
  private readonly overlayRef = viewChild<ElementRef<HTMLDivElement>>('loadingOverlay');

  // Public methods
  onModelLoaded(): void {
    const el = this.overlayRef()?.nativeElement;
    if (!el) {
      this.isLoaded.set(true);
      return;
    }
    gsap.to(el, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => this.isLoaded.set(true),
    });
  }
}
