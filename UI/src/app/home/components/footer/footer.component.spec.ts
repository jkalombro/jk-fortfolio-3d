import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FooterComponent } from './footer.component';
import { SOCIAL_IMGS } from '../../../shared/constants';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a footer element', () => {
    const footer = fixture.debugElement.query(By.css('footer'));
    expect(footer).toBeTruthy();
  });

  it('should render SOCIAL_IMGS count of social icons', () => {
    const icons = fixture.debugElement.queryAll(By.css('.social-icon'));
    expect(icons.length).toBe(SOCIAL_IMGS.length);
  });

  it('should display copyright text with "Jk Alombro"', () => {
    const footer = fixture.debugElement.query(By.css('footer'));
    expect(footer.nativeElement.textContent).toContain('Jk Alombro');
  });

  it('should display current year in copyright', () => {
    const footer = fixture.debugElement.query(By.css('footer'));
    expect(footer.nativeElement.textContent).toContain(new Date().getFullYear().toString());
  });
});
