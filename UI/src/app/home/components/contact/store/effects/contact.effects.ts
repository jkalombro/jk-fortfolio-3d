import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { submitForm, submitFormFailure, submitFormSuccess } from '../actions/contact.actions';
import { EmailService } from '../../../../../shared/services/email.service';

@Injectable()
export class ContactEffects {
  private readonly actions$ = inject(Actions);
  private readonly emailService = inject(EmailService);

  submitForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitForm),
      switchMap(({ params }) =>
        this.emailService.send(params).pipe(
          map(() => submitFormSuccess()),
          catchError((err: Error) =>
            of(submitFormFailure({ error: err?.message ?? 'Unknown error' })),
          ),
        ),
      ),
    ),
  );
}
