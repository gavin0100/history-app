import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.services';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService) {}

  getListCountries(): Observable<any> {
    const apiHost = this.configService.getApiHost();
    const url = `${apiHost}/api/countries`;
    console.log('URL:', url);
    return this.http.get(url);
  }
}