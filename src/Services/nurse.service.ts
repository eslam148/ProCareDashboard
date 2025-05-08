import { Injectable } from '@angular/core';
import { ApiResponse, NurseRegistration } from '../app/Model/Nurse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NurseService {
  private baseUrl = "http://procare.runasp.net"//environment.API_URL; 
  constructor(private http: HttpClient) { }
  
  getNurses(pageNumber: number, pageSize: number, searchKey: string) {
    const body = {
      pageNumber,
      pageSize,
      searchKey
    };
    return this.http.post<ApiResponse>(`${this.baseUrl}/api/Nurse/GetAllNurses`,body);
  }
  getNurseById(id: number): Observable<NurseRegistration> {
    return this.http.get<NurseRegistration>(`${this.baseUrl}/api/Nurse/${id}`);
  }
  addNurse(nurse: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/Nurse`, nurse);
  }
  updateNurse(nurse: NurseRegistration): Observable<NurseRegistration> {
    return this.http.put<NurseRegistration>(`${this.baseUrl}/api/Nurse/${nurse.userData.id}`, nurse);
  }
  deleteNurse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/Nurse/DeletNurse/${id}`);
  }
  searchNurses(query: string): Observable<NurseRegistration[]> {
    return this.http.get<NurseRegistration[]>(`${this.baseUrl}/nurses/search`, { params: { query } });
  }
}
