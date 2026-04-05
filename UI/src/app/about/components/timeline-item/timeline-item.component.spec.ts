import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TimelineItemComponent } from './timeline-item.component';

describe('TimelineItemComponent', () => {
  let fixture: ComponentFixture<TimelineItemComponent>;

  function setup(inputs: { emoji?: string; title?: string; desc?: string } = {}) {
    fixture = TestBed.createComponent(TimelineItemComponent);
    if (inputs.emoji !== undefined) fixture.componentRef.setInput('emoji', inputs.emoji);
    if (inputs.title !== undefined) fixture.componentRef.setInput('title', inputs.title);
    if (inputs.desc !== undefined) fixture.componentRef.setInput('desc', inputs.desc);
    fixture.detectChanges();
    return fixture;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineItemComponent],
    }).compileComponents();
  });

  it('should create', () => {
    setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title text', () => {
    setup({ title: 'Started my career', emoji: '🚀', desc: 'First job.' });
    const el = fixture.debugElement.query(By.css('.timeline-item__title'));
    expect(el.nativeElement.textContent).toContain('Started my career');
  });

  it('should render the emoji', () => {
    setup({ emoji: '🎓', title: 'Graduated' });
    const el = fixture.debugElement.query(By.css('.timeline-item__emoji'));
    expect(el.nativeElement.textContent.trim()).toBe('🎓');
  });

  it('should render the description', () => {
    setup({ desc: 'This is the description.' });
    const el = fixture.debugElement.query(By.css('.timeline-item__desc'));
    expect(el.nativeElement.textContent.trim()).toBe('This is the description.');
  });

  it('should default to empty strings when no inputs are provided', () => {
    setup();
    const titleEl = fixture.debugElement.query(By.css('.timeline-item__title'));
    const descEl = fixture.debugElement.query(By.css('.timeline-item__desc'));
    expect(titleEl.nativeElement.textContent.trim()).toBe('');
    expect(descEl.nativeElement.textContent.trim()).toBe('');
  });

  it('should update when title input changes', () => {
    setup({ title: 'Original' });
    fixture.componentRef.setInput('title', 'Updated');
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.timeline-item__title'));
    expect(el.nativeElement.textContent).toContain('Updated');
  });
});
