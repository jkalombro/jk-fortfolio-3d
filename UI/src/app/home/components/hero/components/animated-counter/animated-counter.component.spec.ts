import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AnimatedCounterComponent } from './animated-counter.component';
import { COUNTER_ITEMS } from '../../../../../shared/constants';

describe('AnimatedCounterComponent', () => {
  let fixture: ComponentFixture<AnimatedCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedCounterComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AnimatedCounterComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the correct number of counter items', () => {
    const items = fixture.debugElement.queryAll(By.css('.counter-item'));
    expect(items.length).toBe(COUNTER_ITEMS.length);
  });

  it('should render the suffix for each item', () => {
    const suffixes = fixture.debugElement.queryAll(By.css('.counter-suffix'));
    COUNTER_ITEMS.forEach((item, i) => {
      expect(suffixes[i].nativeElement.textContent.trim()).toBe(item.suffix);
    });
  });

  it('should render the label for each item', () => {
    const labels = fixture.debugElement.queryAll(By.css('.counter-label'));
    COUNTER_ITEMS.forEach((item, i) => {
      expect(labels[i].nativeElement.textContent.trim()).toBe(item.label);
    });
  });
});
