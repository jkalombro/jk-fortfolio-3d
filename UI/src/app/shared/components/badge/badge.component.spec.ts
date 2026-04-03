import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(BadgeComponent);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the label', () => {
    fixture.componentRef.setInput('label', 'Angular');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.badge')?.textContent?.trim()).toBe('Angular');
  });

  it('should apply the variant class', () => {
    fixture.componentRef.setInput('label', 'TypeScript');
    fixture.componentRef.setInput('variant', 'success');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.badge')?.classList).toContain('badge--success');
  });

  it('should default variant to primary', () => {
    fixture.componentRef.setInput('label', '');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.badge')?.classList).toContain('badge--primary');
  });
});
