import { TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { ContactExperienceComponent } from './contact-experience.component';

@Component({ selector: 'app-orbit-controls-contact', standalone: true, template: '' })
class OrbitControlsContactStub {
  readonly minPolarAngle = input.required<number>();
  readonly maxPolarAngle = input.required<number>();
}

describe('ContactExperienceComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactExperienceComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(ContactExperienceComponent, {
        set: { imports: [OrbitControlsContactStub] },
      })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactExperienceComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have scene null when model has not loaded', () => {
    const fixture = TestBed.createComponent(ContactExperienceComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.scene()).toBeNull();
  });

  it('should define correct geometry and position constants', () => {
    const fixture = TestBed.createComponent(ContactExperienceComponent);
    fixture.detectChanges();
    const c = fixture.componentInstance;
    expect(c.planeGeomArgs).toEqual([30, 30]);
    expect(c.computerScale).toEqual([0.03, 0.03, 0.03]);
    expect(c.computerPosition).toEqual([0, -1.49, -2]);
  });
});
