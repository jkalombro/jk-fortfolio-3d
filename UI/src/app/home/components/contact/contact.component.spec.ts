import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
import { ContactComponent } from './contact.component';
import { selectContactLoading, selectContactSuccess, selectContactError } from './store/reducers/contact.reducer';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;

  const initialState = {
    contact: { loading: false, success: false, error: null },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            { selector: selectContactLoading, value: false },
            { selector: selectContactSuccess, value: false },
            { selector: selectContactError, value: null },
          ],
        }),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have id="contact" on section', () => {
    const section = fixture.debugElement.query(By.css('section#contact'));
    expect(section).toBeTruthy();
  });

  it('should render name, email, message fields', () => {
    expect(fixture.debugElement.query(By.css('input[name="name"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('input[name="email"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('textarea[name="message"]'))).toBeTruthy();
  });

  it('should render submit button', () => {
    const btn = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(btn).toBeTruthy();
  });

  it('should show "Send Message" when not loading', () => {
    const btn = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(btn.nativeElement.textContent).toContain('Send Message');
  });
});
