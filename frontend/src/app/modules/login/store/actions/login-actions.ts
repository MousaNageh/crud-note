import { createAction, props } from '@ngrx/store';
import { LogInPayload, LogInResponse } from '../../interfaces/login';

export const AuthFail = createAction(
  '[authEffect] auth fail ',
  props<{ error: any }>()
);
export const logIn = createAction(
  '[loginCompent] signup action',
  props<{ payload: LogInPayload }>()
);
export const logInSuccess = createAction(
  '[authEffect] auth success ',
  props<LogInResponse>()
);
export const updateToken = createAction(
  '[tokenInterceptor] signup success ',
  props<{ access: string }>()
);
export const clearErrorMessage = createAction(
  '[loginComponent] remove error message'
);
export const logout = createAction('[authEffect] logOut');
