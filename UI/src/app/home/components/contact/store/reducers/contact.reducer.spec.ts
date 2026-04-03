import { contactReducer } from './contact.reducer';
import { INITIAL_CONTACT_STATE } from '../models/contact-state.model';
import {
  submitForm,
  submitFormFailure,
  submitFormSuccess,
  resetContactForm,
} from '../actions/contact.actions';

describe('contactReducer', () => {
  it('should return initial state for unknown action', () => {
    const state = contactReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(INITIAL_CONTACT_STATE);
  });

  it('should set loading=true on submitForm', () => {
    const action = submitForm({ params: { name: 'Jk', email: 'jk@test.com', message: 'Hi' } });
    const state = contactReducer(INITIAL_CONTACT_STATE, action);
    expect(state.loading).toBe(true);
    expect(state.success).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should set loading=false and success=true on submitFormSuccess', () => {
    const loadingState = { loading: true, success: false, error: null };
    const state = contactReducer(loadingState, submitFormSuccess());
    expect(state.loading).toBe(false);
    expect(state.success).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should set loading=false and error on submitFormFailure', () => {
    const loadingState = { loading: true, success: false, error: null };
    const state = contactReducer(loadingState, submitFormFailure({ error: 'Network error' }));
    expect(state.loading).toBe(false);
    expect(state.success).toBe(false);
    expect(state.error).toBe('Network error');
  });

  it('should reset to initial state on resetContactForm', () => {
    const dirtyState = { loading: false, success: true, error: null };
    const state = contactReducer(dirtyState, resetContactForm());
    expect(state).toEqual(INITIAL_CONTACT_STATE);
  });
});
