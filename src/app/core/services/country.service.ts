import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.services';
import { CountryListResponse, CountrySearchResponse } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiHost: string = '';
  constructor(
    private http: HttpClient,
    private configService: ConfigService) {
    this.apiHost = this.configService.getApiHost();
  }

  getListCountries(): Observable<CountryListResponse> {
    const endpoint = this.configService.getApiEndpoint('countries', 'list');
    const url = `${this.apiHost}${endpoint}`;
    return this.http.get<CountryListResponse>(url);
  }

  searchCountries(query: string): Observable<CountrySearchResponse> {
    const endpoint = this.configService.getApiEndpoint('countries', 'search');
    const url = `${this.apiHost}${endpoint}`;
    return this.http.get<CountrySearchResponse>(url, {
      params: {
        q: query
      }
    });
  }
}