import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';

import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header if token exists', () => {
    localStorage.setItem('authToken', 'test-token');
    const req = new HttpRequest('GET', '/test');
    const next = (request: HttpRequest<any>) => {
      expect(request.headers.get('Authorization')).toBe('Bearer test-token');
      return of({} as HttpEvent<any>);
    };

    interceptor(req, next);
    localStorage.removeItem('authToken');
  });

  it('should not add Authorization header if token does not exist', () => {
    localStorage.removeItem('authToken');
    const req = new HttpRequest('GET', '/test');
    const next: HttpHandler = {
      handle: (request: HttpRequest<any>) => {
        expect(request.headers.has('Authorization')).toBeFalse();
        return of({} as HttpEvent<any>);
      }
    };
  });
});
