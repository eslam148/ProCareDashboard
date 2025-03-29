import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {
  constructor(private httpClient: HttpClient) { }
  
  login(credentials: { username: string; password: string }) {
    return this.httpClient.post('/api/auth/login', credentials);
  }

  logout() {
    return this.httpClient.post('/api/auth/logout', {});
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  register(user: { username: string; email: string; password: string }) {
    return this.httpClient.post('/api/auth/register', user);
  }

  getUserDetails() {
    return this.httpClient.get('/api/auth/user-details');
  }
}
