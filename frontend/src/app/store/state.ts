import { ActionReducerMap } from '@ngrx/store';
import {
  authReducer,
  AuthState,
} from '../modules/login/store/reducers/login-reducers';

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState, any> = {
  auth: authReducer,
};
