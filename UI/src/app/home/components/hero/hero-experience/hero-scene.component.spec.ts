import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, output } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HeroSceneComponent } from './hero-scene.component';

@Component({ selector: 'app-orbit-controls', standalone: true, template: '' })
class OrbitControlsStub {}

@Component({ selector: 'app-hero-lights', standalone: true, template: '' })
class HeroLightsStub {}

@Component({ selector: 'app-particles', standalone: true, template: '' })
class ParticlesStub {}

@Component({ selector: 'app-room', standalone: true, template: '' })
class RoomStub {
  readonly modelLoaded = output<void>();
}

describe('HeroSceneComponent', () => {
  let fixture: ComponentFixture<HeroSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSceneComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(HeroSceneComponent, {
        set: {
          imports: [OrbitControlsStub, HeroLightsStub, ParticlesStub, RoomStub],
        },
      })
      .compileComponents();
    fixture = TestBed.createComponent(HeroSceneComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose a modelLoaded output', () => {
    expect(fixture.componentInstance.modelLoaded).toBeDefined();
  });

  it('should emit modelLoaded when the room child emits modelLoaded', () => {
    let emitted = false;
    fixture.componentInstance.modelLoaded.subscribe(() => (emitted = true));

    const room = fixture.debugElement.query(By.directive(RoomStub));
    room.componentInstance.modelLoaded.emit();
    expect(emitted).toBe(true);
  });
});
