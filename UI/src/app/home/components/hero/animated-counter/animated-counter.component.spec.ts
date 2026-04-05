import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AnimatedCounterComponent } from './animated-counter.component';
import { CounterItem } from 'src/app/shared/models';

describe('AnimatedCounterComponent', () => {
  let fixture: ComponentFixture<AnimatedCounterComponent>;
  let counterItems: CounterItem[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedCounterComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AnimatedCounterComponent);
    fixture.detectChanges();

    counterItems = fixture.componentInstance[
      'getCounterItems'
    ]() as CounterItem[];
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the correct number of counter items', () => {
    const items = fixture.debugElement.queryAll(By.css('.counter-item'));
    expect(items.length).toBe(counterItems.length);
  });

  it('should render the suffix for each item', () => {
    const suffixes = fixture.debugElement.queryAll(By.css('.counter-suffix'));
    counterItems.forEach((item, i) => {
      expect(suffixes[i].nativeElement.textContent.trim()).toBe(item.suffix);
    });
  });

  it('should render the label for each item', () => {
    const labels = fixture.debugElement.queryAll(By.css('.counter-label'));
    counterItems.forEach((item, i) => {
      expect(labels[i].nativeElement.textContent.trim()).toBe(item.label);
    });
  });
});
