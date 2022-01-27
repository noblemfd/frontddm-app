import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { IMerchant, IMerchants, IResponse } from 'src/app/feature/admin/models/merchants.model';
import { IMandate, IMandates} from 'src/app/feature/admin/models/mandates.model';
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
    this.allDataCount = this.http.get(this.baseUrl + 'admin/dashboard/data-count');
    return this.allDataCount;
  }

  getLatestMandates(): Observable<IMandates[]> {
    return this.http.get<IMandates[]>(this.baseUrl + 'admin/mandates/latest-mandate');
  }
}
