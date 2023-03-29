import { createReducer, on } from '@ngrx/store';
import { LoginActions } from '../actions/login-type';

export interface AuthState {
  refresh: string;
  token: string;
  loggedIn: boolean;
  error: string;
}
// initState value
export const initState: AuthState = {
  refresh: '',
  token: '',
  loggedIn: false,
  error: '',
};
export const authReducer = createReducer(
  initState,
  on(LoginActions.logInSuccess, (state, action) => {
    return {
      ...state,
      ...action,
      loggedIn: true,
      error: '',
    };
  }),
  on(LoginActions.AuthFail, (state, action) => {
    return {
      ...state,
      loggedIn: false,
      error: action.error,
    };
  }),
  on(LoginActions.updateToken, (state, action) => ({
    ...state,
    access: action.access,
    error: '',
  })),

  on(LoginActions.logout, (state, action) => {
    return {
      ...state,
      refresh: '',
      token: '',
      loggedIn: false,
      error: '',
    };
  }),
  on(LoginActions.clearErrorMessage, (state, action) => {
    return {
      ...state,
      error: '',
    };
  })
);
