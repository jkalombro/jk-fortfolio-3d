import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TitleHeaderComponent } from './title-header.component';

describe('TitleHeaderComponent', () => {
  let fixture: ComponentFixture<TitleHeaderComponent>;

  function setup(inputs: { title?: string; sub?: string } = {}) {
    fixture = TestBed.createComponent(TitleHeaderComponent);
    if (inputs.title !== undefined) fixture.componentRef.setInput('title', inputs.title);
    if (inputs.sub !== undefined) fixture.componentRef.setInput('sub', inputs.sub);
    fixture.detectChanges();
    return fixture;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleHeaderComponent],
    }).compileComponents();
  });

  it('should create', () => {
    setup({ title: 'Title', sub: 'Sub' });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title text', () => {
    setup({ title: 'Professional Work Experience', sub: '💼 My Career Overview' });
    const titleEl = fixture.debugElement.query(By.css('h2'));
    expect(titleEl.nativeElement.textContent.trim()).toBe('Professional Work Experience');
  });

  it('should render the sub text', () => {
    setup({ title: 'Title', sub: '💼 My Career Overview' });
    const subEl = fixture.debugElement.query(By.css('p'));
    expect(subEl.nativeElement.textContent.trim()).toBe('💼 My Career Overview');
  });

  it('should update when title input changes', () => {
    setup({ title: 'Original', sub: 'Sub' });
    fixture.componentRef.setInput('title', 'Updated Title');
    fixture.detectChanges();
    const titleEl = fixture.debugElement.query(By.css('h2'));
    expect(titleEl.nativeElement.textContent.trim()).toBe('Updated Title');
  });
});
