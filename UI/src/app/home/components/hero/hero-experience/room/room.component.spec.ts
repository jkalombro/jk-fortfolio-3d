import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RoomComponent } from './room.component';

describe('RoomComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(RoomComponent, {
        // Strip NgtArgs from imports so Angular doesn't complain about the un-decorated stub
        set: { imports: [] },
      })
      .compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RoomComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose a modelLoaded output', () => {
    const fixture = TestBed.createComponent(RoomComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.modelLoaded).toBeDefined();
  });

  it('should have a null scene when the model has not loaded', () => {
    const fixture = TestBed.createComponent(RoomComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.scene()).toBeNull();
  });
});
