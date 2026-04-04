import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TechIconCardComponent } from './tech-icon-card.component';
import { TECH_STACK_ICONS } from '../../../../shared/constants';

describe('TechIconCardComponent', () => {
  let fixture: ComponentFixture<TechIconCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechIconCardComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TechIconCardComponent);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    const imgIcon = TECH_STACK_ICONS.find((i) => i.imgPath);
    fixture.componentRef.setInput('icon', imgIcon!);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should always render the canvas wrapper', () => {
    const imgIcon = TECH_STACK_ICONS.find((i) => i.imgPath);
    fixture.componentRef.setInput('icon', imgIcon!);
    fixture.detectChanges();
    const canvas = fixture.debugElement.query(By.css('.tech-icon-canvas'));
    expect(canvas).toBeTruthy();
  });

  it('should render canvas wrapper for model icons too', () => {
    const modelIcon = TECH_STACK_ICONS.find((i) => i.modelPath);
    fixture.componentRef.setInput('icon', modelIcon!);
    fixture.detectChanges();
    const canvas = fixture.debugElement.query(By.css('.tech-icon-canvas'));
    expect(canvas).toBeTruthy();
  });

  it('should expose hasModel as true when modelPath is set', () => {
    const modelIcon = TECH_STACK_ICONS.find((i) => i.modelPath);
    fixture.componentRef.setInput('icon', modelIcon!);
    fixture.detectChanges();
    expect(fixture.componentInstance.hasModel()).toBe(true);
    expect(fixture.componentInstance.hasImg()).toBe(false);
  });

  it('should expose hasImg as true when only imgPath is set', () => {
    const imgIcon = TECH_STACK_ICONS.find((i) => i.imgPath && !i.modelPath);
    fixture.componentRef.setInput('icon', imgIcon!);
    fixture.detectChanges();
    expect(fixture.componentInstance.hasImg()).toBe(true);
    expect(fixture.componentInstance.hasModel()).toBe(false);
  });

  describe('drag-to-rotate', () => {
    it('should update rotation on pointer drag', () => {
      const imgIcon = TECH_STACK_ICONS.find((i) => i.imgPath);
      fixture.componentRef.setInput('icon', imgIcon!);
      fixture.detectChanges();

      const component = fixture.componentInstance;
      const initialRotation = [...component.rotation()];

      const canvasWrapper = fixture.debugElement.query(By.css('.tech-icon-canvas'));
      const el = canvasWrapper.nativeElement as HTMLElement;
      jest.spyOn(el, 'setPointerCapture').mockImplementation(() => {});

      el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, clientY: 100, pointerId: 1 }));
      el.dispatchEvent(new PointerEvent('pointermove', { clientX: 120, clientY: 110, pointerId: 1 }));
      el.dispatchEvent(new PointerEvent('pointerup', { pointerId: 1 }));

      const updatedRotation = component.rotation();
      expect(updatedRotation[1]).not.toEqual(initialRotation[1]);
    });

    it('should not update rotation after pointer up', () => {
      const imgIcon = TECH_STACK_ICONS.find((i) => i.imgPath);
      fixture.componentRef.setInput('icon', imgIcon!);
      fixture.detectChanges();

      const component = fixture.componentInstance;
      const canvasWrapper = fixture.debugElement.query(By.css('.tech-icon-canvas'));
      const el = canvasWrapper.nativeElement as HTMLElement;
      jest.spyOn(el, 'setPointerCapture').mockImplementation(() => {});

      el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, clientY: 100, pointerId: 1 }));
      el.dispatchEvent(new PointerEvent('pointerup', { pointerId: 1 }));
      const rotationAfterUp = [...component.rotation()];

      el.dispatchEvent(new PointerEvent('pointermove', { clientX: 200, clientY: 200, pointerId: 1 }));

      expect([...component.rotation()]).toEqual(rotationAfterUp);
    });

    it('should stop drag on pointerleave', () => {
      const imgIcon = TECH_STACK_ICONS.find((i) => i.imgPath);
      fixture.componentRef.setInput('icon', imgIcon!);
      fixture.detectChanges();

      const component = fixture.componentInstance;
      const canvasWrapper = fixture.debugElement.query(By.css('.tech-icon-canvas'));
      const el = canvasWrapper.nativeElement as HTMLElement;
      jest.spyOn(el, 'setPointerCapture').mockImplementation(() => {});

      el.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, clientY: 100, pointerId: 1 }));
      el.dispatchEvent(new PointerEvent('pointerleave', { pointerId: 1 }));
      const rotationAfterLeave = [...component.rotation()];

      el.dispatchEvent(new PointerEvent('pointermove', { clientX: 200, clientY: 200, pointerId: 1 }));

      expect([...component.rotation()]).toEqual(rotationAfterLeave);
    });
  });
});
