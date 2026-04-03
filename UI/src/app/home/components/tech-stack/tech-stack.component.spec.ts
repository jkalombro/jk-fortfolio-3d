import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TechStackComponent } from './tech-stack.component';
import { TECH_STACK_ICONS } from '../../../shared/constants';

describe('TechStackComponent', () => {
  let fixture: ComponentFixture<TechStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechStackComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TechStackComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have id="skills" on wrapper', () => {
    const el = fixture.debugElement.query(By.css('#skills'));
    expect(el).toBeTruthy();
  });

  it('should render TECH_STACK_ICONS count of tech cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.tech-card'));
    expect(cards.length).toBe(TECH_STACK_ICONS.length);
  });

  it('should display name for each tech card', () => {
    const names = fixture.debugElement.queryAll(By.css('.tech-card-name'));
    TECH_STACK_ICONS.forEach((icon, i) => {
      expect(names[i].nativeElement.textContent.trim()).toBe(icon.name);
    });
  });
});
