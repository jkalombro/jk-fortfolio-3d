import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LogoShowcaseComponent } from './logo-showcase.component';
import { LOGO_ICONS_LIST } from '../../../shared/constants';

describe('LogoShowcaseComponent', () => {
  let fixture: ComponentFixture<LogoShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoShowcaseComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(LogoShowcaseComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render LOGO_ICONS_LIST items twice (for looping marquee)', () => {
    const items = fixture.debugElement.queryAll(By.css('.marquee-item'));
    expect(items.length).toBe(LOGO_ICONS_LIST.length * 2);
  });

  it('should have .marquee container', () => {
    const marquee = fixture.debugElement.query(By.css('.marquee'));
    expect(marquee).toBeTruthy();
  });

  it('should have .marquee-box inside marquee', () => {
    const box = fixture.debugElement.query(By.css('.marquee-box'));
    expect(box).toBeTruthy();
  });
});
