import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AdminResponse } from '../app/Model/AdminResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    private baseUrl = environment.API_URL; // Use API_URL from environment
  constructor(private http: HttpClient) { }

  getAllAdmins(pageNumber: number, pageSize: number, searchKey: string) {
    const body = {
      pageNumber,
      pageSize,
      searchKey
    };
    return this.http.post<AdminResponse>(`${this.baseUrl}/api/Admins/GetAllAdmins`, body);
  }

  deleteAdmin(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/Admins/DeleteAdmin/${id}`);
  }
}
