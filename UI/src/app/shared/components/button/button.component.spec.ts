import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;

  function setup(inputs: { text?: string; className?: string; id?: string } = {}) {
    fixture = TestBed.createComponent(ButtonComponent);
    if (inputs.text !== undefined) fixture.componentRef.setInput('text', inputs.text);
    if (inputs.className !== undefined) fixture.componentRef.setInput('className', inputs.className);
    if (inputs.id !== undefined) fixture.componentRef.setInput('id', inputs.id);
    fixture.detectChanges();
    return fixture;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();
  });

  it('should create', () => {
    setup({ text: 'Click me' });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the label text', () => {
    setup({ text: 'See My Work' });
    const textEl = fixture.debugElement.query(By.css('.text'));
    expect(textEl.nativeElement.textContent.trim()).toBe('See My Work');
  });

  it('should apply the className input as a CSS class on the wrapper', () => {
    setup({ text: 'Click', className: 'md:w-80' });
    const wrapper = fixture.debugElement.query(By.css('.cta-wrapper'));
    expect(wrapper.nativeElement.classList.contains('md:w-80')).toBe(true);
  });

  it('should set the id attribute on the wrapper', () => {
    setup({ text: 'Click', id: 'counter' });
    const wrapper = fixture.debugElement.query(By.css('.cta-wrapper'));
    expect(wrapper.nativeElement.getAttribute('id')).toBe('counter');
  });

  it('should render the arrow image', () => {
    setup({ text: 'Click' });
    const arrow = fixture.debugElement.query(By.css('.arrow-wrapper img'));
    expect(arrow).toBeTruthy();
    expect(arrow.nativeElement.getAttribute('alt')).toBe('arrow');
  });

  it('should use default empty string when className is not provided', () => {
    setup({ text: 'Click' });
    const wrapper = fixture.debugElement.query(By.css('.cta-wrapper'));
    expect(wrapper.nativeElement.className).toContain('cta-wrapper');
  });
});
