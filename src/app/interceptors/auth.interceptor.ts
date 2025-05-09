import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { CookieService } from '../services/cookie.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);

  // الحصول على التوكن من الكوكيز
  const token = cookieService.getCookie(environment.TOKEN_KEY);

  // إذا كان هناك توكن، قم بإضافته إلى رأس الطلب
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // معالجة الطلب وإضافة معالجة الأخطاء
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // إذا كان الخطأ 401 (غير مصرح)، قم بتسجيل الخروج وإعادة التوجيه إلى صفحة تسجيل الدخول
        cookieService.deleteCookie(environment.TOKEN_KEY);
        cookieService.deleteCookie(environment.USER_KEY);
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
}; 