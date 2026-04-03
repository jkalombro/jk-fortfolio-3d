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

  it('should create', () => {
    const imgIcon = TECH_STACK_ICONS.find((i) => i.imgPath);
    fixture.componentRef.setInput('icon', imgIcon!);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render img when imgPath is set', () => {
    const imgIcon = TECH_STACK_ICONS.find((i) => i.imgPath);
    fixture.componentRef.setInput('icon', imgIcon!);
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('.tech-icon-img'));
    expect(img).toBeTruthy();
    expect(img.nativeElement.getAttribute('src')).toBe(imgIcon!.imgPath);
    expect(img.nativeElement.getAttribute('alt')).toBe(imgIcon!.name);
  });

  it('should render canvas when modelPath is set', () => {
    const modelIcon = TECH_STACK_ICONS.find((i) => i.modelPath);
    fixture.componentRef.setInput('icon', modelIcon!);
    fixture.detectChanges();
    const canvas = fixture.debugElement.query(By.css('.tech-icon-canvas'));
    expect(canvas).toBeTruthy();
  });

  it('should not render img when modelPath is set', () => {
    const modelIcon = TECH_STACK_ICONS.find((i) => i.modelPath);
    fixture.componentRef.setInput('icon', modelIcon!);
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('.tech-icon-img'));
    expect(img).toBeNull();
  });
});
