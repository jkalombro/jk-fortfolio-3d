import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ContactComponent } from './contact.component';
import { selectContactLoading, selectContactSuccess, selectContactError } from './store/reducers/contact.reducer';
import { submitForm } from './store/actions/contact.actions';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let component: ContactComponent;
  let store: MockStore;

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
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  describe('email validation', () => {
    function getEmailInput(): HTMLInputElement {
      return fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
    }

    function setEmailValue(value: string): void {
      const input = getEmailInput();
      input.value = value;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }

    function blurEmailInput(): void {
      getEmailInput().dispatchEvent(new Event('blur'));
      fixture.detectChanges();
    }

    function getEmailError(): string | null {
      const el = fixture.debugElement.query(By.css('.field-error'));
      return el ? el.nativeElement.textContent.trim() : null;
    }

    it('should not show email error before the field is touched', () => {
      expect(getEmailError()).toBeNull();
    });

    it('should show required error when email is empty and field is blurred', () => {
      blurEmailInput();
      expect(getEmailError()).toBe('Email is required.');
    });

    it('should show format error when email has no @ symbol', () => {
      setEmailValue('invalidemail');
      blurEmailInput();
      expect(getEmailError()).toBe('Please enter a valid email address.');
    });

    it('should show format error when email has no domain', () => {
      setEmailValue('user@');
      blurEmailInput();
      expect(getEmailError()).toBe('Please enter a valid email address.');
    });

    it('should show format error when email has no TLD', () => {
      setEmailValue('user@domain');
      blurEmailInput();
      expect(getEmailError()).toBe('Please enter a valid email address.');
    });

    it('should show format error when email has spaces', () => {
      setEmailValue('user @domain.com');
      blurEmailInput();
      expect(getEmailError()).toBe('Please enter a valid email address.');
    });

    it('should show format error when email has only @ symbol', () => {
      setEmailValue('@');
      blurEmailInput();
      expect(getEmailError()).toBe('Please enter a valid email address.');
    });

    it('should not show error for a valid email', () => {
      setEmailValue('user@example.com');
      blurEmailInput();
      expect(getEmailError()).toBeNull();
    });

    it('should not show error for a valid email with subdomain', () => {
      setEmailValue('user@mail.example.com');
      blurEmailInput();
      expect(getEmailError()).toBeNull();
    });

    it('should not show error for a valid email with plus sign', () => {
      setEmailValue('user+tag@example.com');
      blurEmailInput();
      expect(getEmailError()).toBeNull();
    });

    it('should apply input-error class when email is invalid and touched', () => {
      setEmailValue('bad-email');
      blurEmailInput();
      expect(getEmailInput().classList).toContain('input-error');
    });

    it('should not apply input-error class when email is valid', () => {
      setEmailValue('user@example.com');
      blurEmailInput();
      expect(getEmailInput().classList).not.toContain('input-error');
    });

    it('should clear the error after correcting an invalid email', () => {
      setEmailValue('bad-email');
      blurEmailInput();
      expect(getEmailError()).toBeTruthy();

      setEmailValue('user@example.com');
      fixture.detectChanges();
      expect(getEmailError()).toBeNull();
    });
  });

  describe('onSubmit', () => {
    let dispatchSpy: jest.SpyInstance;

    beforeEach(() => {
      dispatchSpy = jest.spyOn(store, 'dispatch');
    });

    function fillValidForm(): void {
      const nameInput: HTMLInputElement = fixture.debugElement.query(By.css('input[name="name"]')).nativeElement;
      nameInput.value = 'John Doe';
      nameInput.dispatchEvent(new Event('input'));

      const emailInput: HTMLInputElement = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
      emailInput.value = 'john@example.com';
      emailInput.dispatchEvent(new Event('input'));

      const messageInput: HTMLTextAreaElement = fixture.debugElement.query(By.css('textarea[name="message"]')).nativeElement;
      messageInput.value = 'Hello!';
      messageInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();
    }

    it('should not dispatch when email is empty', () => {
      fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);
      fixture.detectChanges();
      expect(dispatchSpy).not.toHaveBeenCalledWith(expect.objectContaining({ type: submitForm.type }));
    });

    it('should not dispatch when email is invalid', () => {
      const emailInput: HTMLInputElement = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
      emailInput.value = 'not-an-email';
      emailInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);
      fixture.detectChanges();
      expect(dispatchSpy).not.toHaveBeenCalledWith(expect.objectContaining({ type: submitForm.type }));
    });

    it('should show email error on submit attempt with invalid email', () => {
      fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('.field-error'));
      expect(el).toBeTruthy();
    });

    it('should dispatch submitForm when all fields are valid', () => {
      fillValidForm();
      fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);
      fixture.detectChanges();
      expect(dispatchSpy).toHaveBeenCalledWith(
        submitForm({ params: { name: 'John Doe', email: 'john@example.com', message: 'Hello!' } }),
      );
    });
  });

  describe('reset', () => {
    it('should clear form fields and hide errors after reset', () => {
      store.overrideSelector(selectContactSuccess, true);
      store.refreshState();
      fixture.detectChanges();

      const resetBtn = fixture.debugElement.query(By.css('.reset-btn'));
      resetBtn.nativeElement.click();
      fixture.detectChanges();

      store.overrideSelector(selectContactSuccess, false);
      store.refreshState();
      fixture.detectChanges();

      const emailInput: HTMLInputElement = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
      expect(emailInput.value).toBe('');
      expect(fixture.debugElement.query(By.css('.field-error'))).toBeNull();
    });
  });
});
