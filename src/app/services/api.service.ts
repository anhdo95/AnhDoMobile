import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  private apiBase: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.apiBase = configService.get('apiBase');
  }

  get(url: string): Observable<any> {
    const apiUrl = this.apiBase + url;
    return this.http.get(apiUrl).map(res => res);
  }

  post(url: string, params?: any): Observable<any> {
    const apiUrl = this.apiBase + url;
    return this.http.post(apiUrl, params).map(res => res);
  }

  /**
   * This method used to completely replace a resource with updated data
   * If the same request multiple times calls, It will always product same result
   */
  put(url: string, params?: any): Observable<any> {
    const apiUrl = this.apiBase + url;
    return this.http.put(apiUrl, params).map(res => res);
  }

  delete(url: string): Observable<any> {
    const apiUrl = this.apiBase + url;
    return this.http.delete(apiUrl).map(res => res);
  }
}
