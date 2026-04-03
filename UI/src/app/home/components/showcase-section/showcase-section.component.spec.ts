import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ShowcaseSectionComponent } from './showcase-section.component';

describe('ShowcaseSectionComponent', () => {
  let fixture: ComponentFixture<ShowcaseSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseSectionComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ShowcaseSectionComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the first project wrapper', () => {
    const first = fixture.debugElement.query(By.css('.first-project-wrapper'));
    expect(first).toBeTruthy();
  });

  it('should render 2 secondary project cards', () => {
    const projects = fixture.debugElement.queryAll(By.css('.project'));
    expect(projects.length).toBe(2);
  });

  it('should render project images with alt text', () => {
    const imgs = fixture.debugElement.queryAll(By.css('.image-wrapper img'));
    imgs.forEach((img) => {
      expect(img.nativeElement.getAttribute('alt')).toBeTruthy();
    });
  });

  it('should have #work anchor id', () => {
    const section = fixture.debugElement.query(By.css('#work'));
    expect(section).toBeTruthy();
  });
});
