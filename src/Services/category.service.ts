import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 import { GeneralResponse } from '../app/Model/GeneralResponse';
import { AddSubCategoryRequest, Category, SubCategoryRequest } from '../app/Model/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    private baseUrl ="http://procare.runasp.net" // environment.API_URL; // Use API_URL from environment

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<GeneralResponse<Category[]>> {
   
    return this.http.get<GeneralResponse<Category[]>>(this.baseUrl + '/api/ServiceCategory/GetAllCategories');
  }

  addCategory(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Accept', '*/*');

    return this.http.post<GeneralResponse<Category>>(
      `${this.baseUrl}/api/ServiceCategory/AddCategory`,
      formData,
      { headers }
    );
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<GeneralResponse<Category>>(
      `${this.baseUrl}/api/ServiceCategory/DeleteCategory/${id}`
    );
  }

  updateCategory(formData: FormData): Observable<any> {
    
  
    return this.http.put<GeneralResponse<Category>>(
      `${this.baseUrl}/api/ServiceCategory/updateCategory`,
      formData
     
    );
  }

  /////////////////////////////////////
  getAllSubCategories(id:number): Observable<GeneralResponse<SubCategoryRequest[]>> {
   
    return this.http.get<GeneralResponse<SubCategoryRequest[]>>(this.baseUrl + `/api/SubCategory/GetAllSubCategories?categoryId=${id}`);
  }
  deleteSubCategory(id: number): Observable<any> {
    return this.http.delete<GeneralResponse<SubCategoryRequest>>(
      `${this.baseUrl}/api/SubCategory/DeleteSubCategory/${id}`
    );
  }
}
