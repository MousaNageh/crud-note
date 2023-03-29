import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/login-reducers';
export const authName = 'auth';

export const selectAuthState = createFeatureSelector<AuthState>(authName);
export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (authContent) => {
    return authContent.loggedIn;
  }
);

export const selectAccessToken = createSelector(
  selectAuthState,
  (authContent) => authContent.token
);
export const selectError = createSelector(
  selectAuthState,
  (authContent) => authContent.error
);
