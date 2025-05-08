import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 import { City, Governorate, Specialty } from '../app/Model/Address';
import { Observable } from 'rxjs';
import { GeneralResponse } from '../app/Model/GeneralResponse';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
    private baseUrl ="http://procare.runasp.net" //environment.API_URL; // Use API_URL from environment
   constructor(private http: HttpClient) { }
    getCities() :Observable<GeneralResponse<City[]>> {
      return this.http.get<GeneralResponse<City[]>>(`${this.baseUrl}/api/City/GetAllCities`);
    }

   getGovernorates():Observable<GeneralResponse<Governorate[]>> {
      return this.http.get<GeneralResponse<Governorate[]>>(`${this.baseUrl}/api/Governorate/GetAllGovernorates`);
    }

   getSpecialties():Observable<GeneralResponse<Specialty[]>> {
      return this.http.get<GeneralResponse<Specialty[]>>(`${this.baseUrl}/api/Specialty/GetAllSpecialties`);
   }
 
}
