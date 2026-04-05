import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { ContactEffects } from './contact.effects';
import { EmailService } from '../../../shared/services/email.service';
import { submitForm, submitFormFailure, submitFormSuccess } from '../actions/contact.actions';

describe('ContactEffects', () => {
  let actions$: Observable<Action>;
  let effects: ContactEffects;
  let emailService: jest.Mocked<EmailService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContactEffects,
        provideMockActions(() => actions$),
        {
          provide: EmailService,
          useValue: { send: jest.fn() },
        },
      ],
    });

    effects = TestBed.inject(ContactEffects);
    emailService = TestBed.inject(EmailService) as jest.Mocked<EmailService>;
  });

  it('should dispatch submitFormSuccess when EmailService.send succeeds', (done) => {
    const params = { name: 'Jk', email: 'jk@test.com', message: 'Hello' };
    (emailService.send as jest.Mock).mockReturnValue(of({ status: 200, text: 'OK' }));
    actions$ = of(submitForm({ params }));

    effects.submitForm$.subscribe((action) => {
      expect(action).toEqual(submitFormSuccess());
      done();
    });
  });

  it('should dispatch submitFormFailure when EmailService.send fails', (done) => {
    const params = { name: 'Jk', email: 'jk@test.com', message: 'Hello' };
    (emailService.send as jest.Mock).mockReturnValue(throwError(() => new Error('Send failed')));
    actions$ = of(submitForm({ params }));

    effects.submitForm$.subscribe((action) => {
      expect(action).toEqual(submitFormFailure({ error: 'Send failed' }));
      done();
    });
  });
});
