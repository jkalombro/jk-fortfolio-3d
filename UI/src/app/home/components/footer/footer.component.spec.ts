import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FooterComponent } from './footer.component';

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

  it('should display copyright text with "Jerich Alombro"', () => {
    const footer = fixture.debugElement.query(By.css('footer'));
    expect(footer.nativeElement.textContent).toContain('Jerich Alombro');
  });

  it('should display current year in copyright', () => {
    const footer = fixture.debugElement.query(By.css('footer'));
    expect(footer.nativeElement.textContent).toContain(
      new Date().getFullYear().toString(),
    );
  });
});
