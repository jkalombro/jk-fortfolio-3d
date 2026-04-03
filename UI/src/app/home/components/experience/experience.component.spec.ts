import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ExperienceComponent } from './experience.component';
import { EXP_CARDS } from '../../../shared/constants';

describe('ExperienceComponent', () => {
  let fixture: ComponentFixture<ExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ExperienceComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have id="experience" on section', () => {
    const section = fixture.debugElement.query(By.css('section#experience'));
    expect(section).toBeTruthy();
  });

  it('should render EXP_CARDS count of timeline cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.exp-card-wrapper'));
    expect(cards.length).toBe(EXP_CARDS.length);
  });

  it('should display title for each card', () => {
    const titles = fixture.debugElement.queryAll(By.css('.exp-title'));
    EXP_CARDS.forEach((card, i) => {
      expect(titles[i].nativeElement.textContent.trim()).toBe(card.title);
    });
  });

  it('should display date for each card', () => {
    const dates = fixture.debugElement.queryAll(By.css('.exp-date'));
    EXP_CARDS.forEach((card, i) => {
      expect(dates[i].nativeElement.textContent).toContain(card.date);
    });
  });

  it('should render responsibilities for each card', () => {
    const wrappers = fixture.debugElement.queryAll(By.css('.exp-responsibilities'));
    EXP_CARDS.forEach((card, i) => {
      const items = wrappers[i].queryAll(By.css('li'));
      expect(items.length).toBe(card.responsibilities.length);
    });
  });
});
