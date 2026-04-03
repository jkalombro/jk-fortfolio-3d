import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestimonialsComponent } from './testimonials.component';
import { TESTIMONIALS } from '../../../shared/constants';

describe('TestimonialsComponent', () => {
  let fixture: ComponentFixture<TestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialsComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestimonialsComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have id="testimonials" on section', () => {
    const section = fixture.debugElement.query(By.css('section#testimonials'));
    expect(section).toBeTruthy();
  });

  it('should render TESTIMONIALS count of cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.testimonial-card'));
    expect(cards.length).toBe(TESTIMONIALS.length);
  });

  it('should display name and mention for each testimonial', () => {
    const names = fixture.debugElement.queryAll(By.css('.testimonial-name'));
    const mentions = fixture.debugElement.queryAll(By.css('.testimonial-mention'));
    TESTIMONIALS.forEach((t, i) => {
      expect(names[i].nativeElement.textContent.trim()).toBe(t.name);
      expect(mentions[i].nativeElement.textContent.trim()).toBe(t.mentions);
    });
  });
});
