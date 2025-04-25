import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'; // Adjusted import path
import { LoginResponse } from '../app/Model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {
  private baseUrl = environment.API_URL; // Use API_URL from environment

  constructor(private httpClient: HttpClient) {}

 

  login(credentials: { phoneNumber: string; password: string }) {
    return this.httpClient.post<LoginResponse>(`${this.baseUrl}/api/Auth/Login`, credentials); // Use baseUrl
  }

  logout() {
    return this.httpClient.post(`${this.baseUrl}/api/auth/logout`, {}); // Use baseUrl
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  register(user: { firstName: string; lastName: string; phoneNumber: string,password: string,confirmPassword: string }) {
    return this.httpClient.post(`${this.baseUrl}/api/Admins/AddAdmin`, user); // Use baseUrl
  }

  getUserDetails() {
    return this.httpClient.get(`${this.baseUrl}/api/auth/user-details`); // Use baseUrl
  }
}
