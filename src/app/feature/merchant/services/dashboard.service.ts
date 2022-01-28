import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { IMandate, IMandates, IResponse } from 'src/app/feature/merchant/models/mandates.model';
import { PaginatedResult } from 'src/app/shared/models/pagination';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = environment.apiUrl;
  token = localStorage.getItem('token');
  allDataCount: any;

  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'}).set('Authorization',  `Bearer ${this.token}`)
  };

  constructor(
    private http: HttpClient
  ) { }

  getDataCounts(): Observable<object> {
    this.allDataCount = this.http.get(this.baseUrl + 'merchant/dashboard/data-count');
    return this.allDataCount;
  }

  getLatestMandates(): Observable<IMandates[]> {
    return this.http.get<IMandates[]>(this.baseUrl + 'merchant/mandates/latest-mandate');
  }

  getCurrentYearMonthlyMandateChart() {
    return this.http.get(this.baseUrl + 'merchant/dashboard/current-year-monthly-mandate');
  }

  getLastFiveYearMandateChart() {
    return this.http.get(this.baseUrl + 'merchant/dashboard/last-five-year-mandate');
  }
}
