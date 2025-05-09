import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginResponse, ApiResponse, UserDetails } from '../app/Model/ResponseModel';
import { environment } from '../environments/environment';
import { CookieService } from '../app/services/cookie.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {
  private baseUrl = environment.API_URL;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    const token = this.cookieService.getCookie(environment.TOKEN_KEY);
    if (token) {
      this.isAuthenticatedSubject.next(true);
    } else {
      this.isAuthenticatedSubject.next(false);
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'حدث خطأ غير متوقع';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `خطأ: ${error.error.message}`;
    } else {
      if (error.status === 401) {
        this.logout();
        this.router.navigate(['/login']);
        errorMessage = 'انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى';
      } else if (error.status === 403) {
        errorMessage = 'ليس لديك صلاحية للوصول إلى هذا المورد';
      } else if (error.status === 404) {
        errorMessage = 'المورد غير موجود';
      }
    }
    return throwError(() => new Error(errorMessage));
  }

  login(credentials: { phoneNumber: string; password: string }): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.baseUrl}/api/Auth/Login`, credentials).pipe(
      tap(response => {
        if (response.data?.token) {
          this.setToken(response.data.token);
          this.setUserData({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            phoneNumber: response.data.phoneNumber,
            role: response.data.role,
            loginStatus: response.data.loginStatus,
            birthOfDate: response.data.birthOfDate
          });
        }
      }),
      catchError(this.handleError.bind(this))
    );
  }

  logout(): void {
    this.cookieService.deleteCookie(environment.TOKEN_KEY);
    this.cookieService.deleteCookie(environment.USER_KEY);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.getCookie(environment.TOKEN_KEY);
    return !!token;
  }

  register(user: { firstName: string; lastName: string; phoneNumber: string, password: string, confirmPassword: string }): Observable<ApiResponse<UserDetails>> {
    return this.httpClient.post<ApiResponse<UserDetails>>(`${this.baseUrl}/api/Admins/AddAdmin`, user).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  getUserDetails(): Observable<ApiResponse<UserDetails>> {
    return this.httpClient.get<ApiResponse<UserDetails>>(`${this.baseUrl}/api/auth/user-details`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  getToken(): string | null {
    return this.cookieService.getCookie(environment.TOKEN_KEY);
  }

  setToken(token: string): void {
    this.cookieService.setCookie(environment.TOKEN_KEY, token, 7); // حفظ لمدة 7 أيام
    this.isAuthenticatedSubject.next(true);
  }

  setUserData(userData: UserDetails): void {
    this.cookieService.setCookie(environment.USER_KEY, JSON.stringify(userData), 7);
  }

  getUserData(): UserDetails | null {
    const userData = this.cookieService.getCookie(environment.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }
}
