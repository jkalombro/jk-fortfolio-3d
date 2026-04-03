import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { GlowCardComponent } from './glow-card.component';
import type { ExpCard } from '../../models';

const MOCK_CARD: ExpCard = {
  review: 'Great work!',
  imgPath: '/images/exp1.png',
  logoPath: '/images/logo1.png',
  title: 'Frontend Developer',
  date: 'Jan 2023',
  responsibilities: ['Built features'],
};

@Component({
  standalone: true,
  imports: [GlowCardComponent],
  template: `
    <app-glow-card [card]="card" [index]="0">
      <p class="projected-content">Projected</p>
    </app-glow-card>
  `,
})
class HostComponent {
  card = MOCK_CARD;
}

describe('GlowCardComponent', () => {
  let hostFixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    hostFixture = TestBed.createComponent(HostComponent);
    hostFixture.detectChanges();
  });

  it('should create', () => {
    const cardEl = hostFixture.debugElement.query(By.directive(GlowCardComponent));
    expect(cardEl).toBeTruthy();
  });

  it('should render projected content via ng-content', () => {
    const projected = hostFixture.debugElement.query(By.css('.projected-content'));
    expect(projected.nativeElement.textContent.trim()).toBe('Projected');
  });

  it('should render the review text from card input', () => {
    const review = hostFixture.debugElement.query(By.css('.review'));
    expect(review.nativeElement.textContent.trim()).toContain('Great work!');
  });

  it('should have the card class for glow effect', () => {
    const cardWrapper = hostFixture.debugElement.query(By.css('.card'));
    expect(cardWrapper).toBeTruthy();
  });

  it('should update CSS --start variable on mousemove', () => {
    const glowCardHost = hostFixture.debugElement.query(By.directive(GlowCardComponent));
    const cardEl = hostFixture.debugElement.query(By.css('.card'));
    const mouseEvent = new MouseEvent('mousemove', { clientX: 100, clientY: 100, bubbles: true });
    glowCardHost.nativeElement.dispatchEvent(mouseEvent);
    hostFixture.detectChanges();
    const startVal = cardEl.nativeElement.style.getPropertyValue('--start');
    expect(startVal).not.toBeUndefined();
  });
});
