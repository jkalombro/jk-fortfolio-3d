import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { ContactState, INITIAL_CONTACT_STATE } from '../models/contact-state.model';
import {
  submitForm,
  submitFormFailure,
  submitFormSuccess,
  resetContactForm,
} from '../actions/contact.actions';

export const contactReducer = createReducer(
  INITIAL_CONTACT_STATE,
  on(submitForm, (state) => ({ ...state, loading: true, success: false, error: null })),
  on(submitFormSuccess, (state) => ({ ...state, loading: false, success: true })),
  on(submitFormFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(resetContactForm, () => ({ ...INITIAL_CONTACT_STATE })),
);

export const selectContactFeature = createFeatureSelector<ContactState>('contact');
export const selectContactLoading = createSelector(selectContactFeature, (s) => s.loading);
export const selectContactSuccess = createSelector(selectContactFeature, (s) => s.success);
export const selectContactError = createSelector(selectContactFeature, (s) => s.error);
