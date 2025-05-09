import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationCity, LocationGovernorate } from '../app/Model/Locaton';
import { GeneralResponse } from '../app/Model/GeneralResponse';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  // المحافظات
  getAllLocationsGovernorate(): Observable<ApiResponse<LocationGovernorate[]>> {
    return this.http.get<ApiResponse<LocationGovernorate[]>>(`${this.apiUrl}/api/Governorate/GetAllGovernorates`);
  }

  getLocationsGovernorateById(id: number): Observable<ApiResponse<LocationGovernorate>> {
    return this.http.get<ApiResponse<LocationGovernorate>>(`${this.apiUrl}/api/Location/GetLocationsGovernorateById/${id}`);
  }

  AddLocationsGovernorate(governorate: Partial<LocationGovernorate>): Observable<ApiResponse<LocationGovernorate>> {
    return this.http.post<ApiResponse<LocationGovernorate>>(`${this.apiUrl}/api/Governorate/AddGovernorate`, governorate);
  }

  UpdateLocationsGovernorate(governorate: LocationGovernorate): Observable<ApiResponse<LocationGovernorate>> {
    return this.http.put<ApiResponse<LocationGovernorate>>(`${this.apiUrl}/api/Governorate/DeleteGovernorate`, governorate);
  }

  DeleteLocationsGovernorate(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/api/Governorate/DeleteGovernorate?id=${id}`);
  }

  // المدن
  getAllLocationsCites(governorateId: number): Observable<ApiResponse<LocationCity[]>> {
    return this.http.get<ApiResponse<LocationCity[]>>(`${this.apiUrl}/api/City/GetCityByGovernorateId/${governorateId}`);
  }

  getLocationsCityById(id: number): Observable<ApiResponse<LocationCity>> {
    return this.http.get<ApiResponse<LocationCity>>(`${this.apiUrl}/api/Location/GetLocationsCityById/${id}`);
  }

  AddLocationsCity(city: Partial<LocationCity>): Observable<ApiResponse<LocationCity>> {
    return this.http.post<ApiResponse<LocationCity>>(`${this.apiUrl}/api/City/AddCity`, city);
  }

  UpdateLocationsCity(city: LocationCity): Observable<ApiResponse<LocationCity>> {
    return this.http.put<ApiResponse<LocationCity>>(`${this.apiUrl}/api/City/UpdateCity`, city);
  }

  DeleteLocationsCity(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/api/City/DeleteCity?id=${id}`);
  }

  // Method to get a location by ID
  getLocationsGovernorateDelete(id: number):Observable<GeneralResponse<LocationGovernorate>> {
    return this.http.get<GeneralResponse<LocationGovernorate>>(`${this.apiUrl}/api/Governorate/DeleteGovernorate/${id}`);
  }

  // Method to get a location by ID
  getCityByGovernorateId(id: number):Observable<GeneralResponse<LocationCity[]>> {
    return this.http.get<GeneralResponse<LocationCity[]>>(`${this.apiUrl}/api/City/GetCityByGovernorateId/${id}`);
  }
}

