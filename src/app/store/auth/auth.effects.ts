import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthServicesService } from '../../../Services/auth-services.service';
import { environment } from '../../../environments/environment';
import * as AuthActions from './auth.actions';
import { CookieService } from '../../services/cookie.service';
import { LoginResponse } from '../../Model/ResponseModel';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthServicesService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        this.authService.login({ phoneNumber: username, password }).pipe(
          map((response: LoginResponse) => {
            if (response.status === 0 && response.data && response.data.token) {
              const token = response.data.token;
              const user = response.data;
              return AuthActions.loginSuccess({ token, user });
            }
            return AuthActions.loginFailure({ 
              error: response.message || 'فشل تسجيل الدخول: لم يتم استلام التوكن' 
            });
          }),
          catchError(error => {
            return of(AuthActions.loginFailure({ 
              error: error.message || 'حدث خطأ أثناء تسجيل الدخول' 
            }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
        this.router.navigate(['/dashboard']);
      })
    ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginFailure),
      tap(() => {
        this.cookieService.deleteCookie(environment.TOKEN_KEY);
        this.cookieService.deleteCookie(environment.USER_KEY);
      })
    ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
        })
      ),
    { dispatch: false }
  );

  checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkAuth),
      switchMap(() => {
        const token = this.cookieService.getCookie(environment.TOKEN_KEY);
        if (token) {
        /* 
          return this.authService.getUserDetails().pipe(
            map(() => AuthActions.checkAuthSuccess({ isAuthenticated: true })),
            catchError(() => of(AuthActions.checkAuthFailure({ error: 'فشل التحقق من المصادقة' })))
          );

          */
        }
        return of(AuthActions.checkAuthFailure({ error: 'لم يتم العثور على التوكن' }));
      })
    )
  );
} 