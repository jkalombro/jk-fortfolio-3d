import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ParticlesComponent } from './particles.component';

describe('ParticlesComponent', () => {
  let fixture: ComponentFixture<ParticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticlesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(ParticlesComponent, {
        // Strip NgtArgs/extend-based directives — only the component logic is tested here
        set: { imports: [] },
      })
      .compileComponents();
    fixture = TestBed.createComponent(ParticlesComponent);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have the correct particle count', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.particleCount).toBe(150);
  });

  it('should initialise positions Float32Array with particleCount * 3 elements on ngOnInit', () => {
    fixture.detectChanges();
    const positions = fixture.componentInstance.positions();
    expect(positions.length).toBe(fixture.componentInstance.particleCount * 3);
  });

  it('should create a particle texture from a canvas gradient', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.particleTexture).toBeTruthy();
  });
});
