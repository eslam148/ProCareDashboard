import { createAction, props } from '@ngrx/store';
import { UserDetails } from '../../Model/ResponseModel';

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; user: UserDetails }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const checkAuth = createAction('[Auth] Check Auth');

export const checkAuthSuccess = createAction(
  '[Auth] Check Auth Success',
  props<{ isAuthenticated: boolean }>()
);

export const checkAuthFailure = createAction(
  '[Auth] Check Auth Failure',
  props<{ error: string }>()
); 