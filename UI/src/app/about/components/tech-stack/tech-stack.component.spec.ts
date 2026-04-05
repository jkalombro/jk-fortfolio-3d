import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TechStackComponent } from './tech-stack.component';

describe('TechStackComponent (about)', () => {
  let fixture: ComponentFixture<TechStackComponent>;

  function setup(technologies: string[] = []) {
    fixture = TestBed.createComponent(TechStackComponent);
    fixture.componentRef.setInput('technologies', technologies);
    fixture.detectChanges();
    return fixture;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechStackComponent],
    }).compileComponents();
  });

  it('should create', () => {
    setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render no badges when technologies is empty', () => {
    setup([]);
    const badges = fixture.debugElement.queryAll(By.css('.badge'));
    expect(badges.length).toBe(0);
  });

  it('should render one badge per technology', () => {
    const techs = ['Angular', 'TypeScript', 'RxJS'];
    setup(techs);
    const badges = fixture.debugElement.queryAll(By.css('.badge'));
    expect(badges.length).toBe(techs.length);
  });

  it('should render the correct badge labels', () => {
    const techs = ['Angular', 'TypeScript'];
    setup(techs);
    const badges = fixture.debugElement.queryAll(By.css('.badge'));
    techs.forEach((tech, i) => {
      expect(badges[i].nativeElement.textContent.trim()).toBe(tech);
    });
  });

  it('should update when technologies input changes', () => {
    setup(['Angular']);
    fixture.componentRef.setInput('technologies', ['Angular', 'Jest']);
    fixture.detectChanges();
    const badges = fixture.debugElement.queryAll(By.css('.badge'));
    expect(badges.length).toBe(2);
  });
});
