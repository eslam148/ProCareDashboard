import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string | null;
  user: any | null;
  error: any | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export const initialState: AuthState = {
  token: null,
  user: null,
  error: null,
  loading: false,
  isAuthenticated: false
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { token, user }) => ({
    ...state,
    token,
    user,
    loading: false,
    error: null,
    isAuthenticated: true
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isAuthenticated: false
  })),
  on(AuthActions.logout, () => ({
    ...initialState
  })),
  on(AuthActions.checkAuth, (state) => ({
    ...state,
    loading: true
  })),
  on(AuthActions.checkAuthSuccess, (state, { isAuthenticated }) => ({
    ...state,
    loading: false,
    isAuthenticated
  })),
  on(AuthActions.checkAuthFailure, (state) => ({
    ...state,
    loading: false,
    isAuthenticated: false
  }))
); 