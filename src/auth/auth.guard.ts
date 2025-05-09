import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, catchError, take, switchMap } from 'rxjs/operators';
import { selectIsAuthenticated } from '../app/store/auth/auth.selectors';
import { AuthServicesService } from '../Services/auth-services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthServicesService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectIsAuthenticated).pipe(
      take(1),
      switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          // التحقق من وجود التوكن
          if (!this.authService.isAuthenticated()) {
            this.redirectToLogin(state.url);
            return of(false);
          }

          // محاولة تجديد التوكن
           
        }
        return of(true);
      })
    );
  }

  private redirectToLogin(returnUrl: string): void {
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: returnUrl }
    });
  }
}
