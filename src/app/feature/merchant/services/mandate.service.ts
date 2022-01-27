import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { IMandate, IMandates, IResponse } from 'src/app/feature/merchant/models/mandates.model';
import { IMandateSchedules } from 'src/app/feature/merchant/models/mandate-schedules.model';
import { PaginatedResult } from 'src/app/shared/models/pagination';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MandateService {
  baseUrl = environment.apiUrl;
  token = localStorage.getItem('token');

  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'}).set('Authorization',  `Bearer ${this.token}`)
  };

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  getAllMandates(): Observable<IMandates[]> {
    return this.http.get<IMandates[]>(this.baseUrl + 'merchant/mandates');
  }

  getMandateById(mandateId: any): Observable<IMandates> {
    return this.http.get<IMandates>(this.baseUrl + 'merchant/mandates/' + mandateId);
  }

  createMandate(mandate: IMandate): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<IResponse<IMandate>>(this.baseUrl + 'merchant/mandate/add', mandate, httpOptions).pipe(
      tap((response) => {
        const data = response.results;
        return data;
      })
    );
  }

  getAllMandateSchedules(): Observable<IMandateSchedules[]> {
    return this.http.get<IMandateSchedules[]>(this.baseUrl + 'merchant/mandates/mandate-with-details');
  }

  getCompletedPayments(): Observable<IMandates[]> {
    return this.http.get<IMandates[]>(this.baseUrl + 'merchant/mandates/completed-payments');
  }

  getThisYearMandates(): Observable<IMandates[]> {
    return this.http.get<IMandates[]>(this.baseUrl + 'merchant/mandates/this-year-mandate');
  }
}
