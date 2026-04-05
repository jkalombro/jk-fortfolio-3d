export interface ContactState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

export const INITIAL_CONTACT_STATE: ContactState = {
  loading: false,
  success: false,
  error: null,
};
