import { createAction, props } from '@ngrx/store';
import type { ContactForm } from '../../../../../shared/models';

export const submitForm = createAction(
  '[Contact] Submit Form',
  props<{ params: ContactForm }>(),
);

export const submitFormSuccess = createAction('[Contact] Submit Form Success');

export const submitFormFailure = createAction(
  '[Contact] Submit Form Failure',
  props<{ error: string }>(),
);

export const resetContactForm = createAction('[Contact] Reset Form');
