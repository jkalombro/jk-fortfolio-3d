import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import { NgtCanvasImpl, NgtCanvasContent } from 'angular-three/dom';
import gsap from 'gsap';
import { HeroSceneComponent } from './hero-scene.component';

@Component({
  selector: 'app-hero-experience',
  standalone: true,
  imports: [NgtCanvasImpl, NgtCanvasContent, HeroSceneComponent],
  templateUrl: './hero-experience.component.html',
  styleUrl: './hero-experience.component.scss',
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
