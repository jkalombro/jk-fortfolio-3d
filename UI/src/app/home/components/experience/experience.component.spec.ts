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

  it('should render EXP_CARDS count of card wrappers', () => {
    const cards = fixture.debugElement.queryAll(By.css('.exp-card-wrapper'));
    expect(cards.length).toBe(EXP_CARDS.length);
  });

  it('should display company name for each card', () => {
    const names = fixture.debugElement.queryAll(By.css('.exp-company-name'));
    EXP_CARDS.forEach((card, i) => {
      expect(names[i].nativeElement.textContent.trim()).toBe(card.companyName);
    });
  });

  it('should display title for each position', () => {
    const titles = fixture.debugElement.queryAll(By.css('.exp-title'));
    const allPositions = EXP_CARDS.flatMap((card) => card.positions);
    allPositions.forEach((pos, i) => {
      expect(titles[i].nativeElement.textContent.trim()).toBe(pos.title);
    });
  });

  it('should display date for each position', () => {
    const dates = fixture.debugElement.queryAll(By.css('.exp-date'));
    const allPositions = EXP_CARDS.flatMap((card) => card.positions);
    allPositions.forEach((pos, i) => {
      expect(dates[i].nativeElement.textContent).toContain(pos.startDate);
      expect(dates[i].nativeElement.textContent).toContain(pos.endDate);
    });
  });

  it('should render responsibilities for each position', () => {
    const wrappers = fixture.debugElement.queryAll(By.css('.exp-responsibilities'));
    const allPositions = EXP_CARDS.flatMap((card) => card.positions);
    allPositions.forEach((pos, i) => {
      const items = wrappers[i].queryAll(By.css('li'));
      expect(items.length).toBe(pos.responsibilities.length);
    });
  });
});
