import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationCity, LocationGovernorate } from '../app/Model/Locaton';
import { GeneralResponse } from '../app/Model/GeneralResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  // Define the base URL for the API
  private baseUrl ="http://procare.runasp.net" // environment.API_URL; // Use API_URL from environment
  // Define the headers for the HTTP requests
  
  constructor(private http:HttpClient) { }
  // Method to get all locations
  getAllLocationsGovernorate():Observable<GeneralResponse<LocationGovernorate[]>> {
    return this.http.get<GeneralResponse<LocationGovernorate[]>>(this.baseUrl+ '/api/Governorate/GetAllGovernorates');
  }
  // Method to get a location by ID
  getLocationsGovernorateById(id: number):Observable<GeneralResponse<LocationGovernorate>> {
    return this.http.get<GeneralResponse<LocationGovernorate>>(`${this.baseUrl}/api/Governorate/GetGovernorateById/${id}`);
  }
  getLocationsGovernorateDelete(id: number):Observable<GeneralResponse<LocationGovernorate>> {
    return this.http.get<GeneralResponse<LocationGovernorate>>(`${this.baseUrl}/api/Governorate/DeleteGovernorate/${id}`);
  }
  AddLocationsGovernorate(location: LocationGovernorate):Observable<GeneralResponse<LocationGovernorate>> {
    return this.http.post<GeneralResponse<LocationGovernorate>>(`${this.baseUrl}/api/Governorate/AddGovernorate`, location);
  }
  UpdateLocationsGovernorate(location: LocationGovernorate):Observable<GeneralResponse<LocationGovernorate>> {
    return this.http.put<GeneralResponse<LocationGovernorate>>(`${this.baseUrl}/api/Governorate/UpdateGovernorate`, location);
  }
  DeleteLocationsGovernorate(id: number):Observable<GeneralResponse<LocationGovernorate>> { 
    return this.http.delete<GeneralResponse<LocationGovernorate>>(`${this.baseUrl}/api/Governorate/DeleteGovernorate?id=${id}`);
  }

  AddLocationsCity(location: LocationCity):Observable<GeneralResponse<LocationCity>> {
    return this.http.post<GeneralResponse<LocationCity>>(`${this.baseUrl}/api/City/AddCity`, location);
  }
  UpdateLocationsCity(location: LocationCity):Observable<GeneralResponse<LocationCity>> {
    return this.http.put<GeneralResponse<LocationCity>>(`${this.baseUrl}/api/City/UpdateCity`, location);
  }
  DeleteLocationsCity(id: number):Observable<GeneralResponse<LocationCity>> {
    return this.http.delete<GeneralResponse<LocationCity>>(`${this.baseUrl}/api/City/DeleteCity?id=${id}`);
  }
  // Method to create a new location
  // createLocationsGovernorate(location: any) {
  //   return this.http.post(this.baseUrl, location);
  // }
  // // Method to update an existing location
  // updateLocationsGovernorate(id: number, location: any) {
  //   return this.http.put(`${this.baseUrl}/${id}`, location);
  // }
  // // Method to delete a location
  // deleteLocationsGovernorate(id: number) {
  //   return this.http.delete(`${this.baseUrl}/${id}`);
  // }
  
  getAllLocationsCites(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  // Method to get a location by ID
  getCityByGovernorateId(id: number):Observable<GeneralResponse<LocationCity[]>> {
    return this.http.get<GeneralResponse<LocationCity[]>>(`${this.baseUrl}/api/City/GetCityByGovernorateId/${id}`);
  }
  // Method to create a new location
  // createLocationsGovernorate(location: any) {
  //   return this.http.post(this.baseUrl, location);
  // }
  // // Method to update an existing location
  // updateLocationsGovernorate(id: number, location: any) {
  //   return this.http.put(`${this.baseUrl}/${id}`, location);
  // }
  // // Method to delete a location
  // deleteLocationsGovernorate(id: number) {
  //   return this.http.delete(`${this.baseUrl}/${id}`);
  // }
  
}
