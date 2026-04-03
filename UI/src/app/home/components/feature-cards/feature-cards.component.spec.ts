import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FeatureCardsComponent } from './feature-cards.component';
import { ABILITIES } from '../../../shared/constants';

describe('FeatureCardsComponent', () => {
  let fixture: ComponentFixture<FeatureCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureCardsComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(FeatureCardsComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render ABILITIES count of cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('.ability-card'));
    expect(cards.length).toBe(ABILITIES.length);
  });

  it('should display title for each ability', () => {
    const titles = fixture.debugElement.queryAll(By.css('.ability-card h3'));
    ABILITIES.forEach((ability, i) => {
      expect(titles[i].nativeElement.textContent.trim()).toBe(ability.title);
    });
  });

  it('should display description for each ability', () => {
    const descs = fixture.debugElement.queryAll(By.css('.ability-card p'));
    ABILITIES.forEach((ability, i) => {
      expect(descs[i].nativeElement.textContent.trim()).toBe(ability.desc);
    });
  });

  it('should have alt text on all images', () => {
    const imgs = fixture.debugElement.queryAll(By.css('.ability-card img'));
    imgs.forEach((img) => {
      expect(img.nativeElement.getAttribute('alt')).toBeTruthy();
    });
  });
});
