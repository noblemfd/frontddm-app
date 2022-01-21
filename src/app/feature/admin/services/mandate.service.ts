import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { IMandate, IMandates, IResponse } from 'src/app/feature/admin/models/mandates.model';
import { IMandateSchedules } from 'src/app/feature/admin/models/mandate-schedules.model';
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
    return this.http.get<IMandates[]>(this.baseUrl + 'admin/mandates');
  }

  getMandateById(mandateId: any): Observable<IMandates> {
    return this.http.get<IMandates>(this.baseUrl + 'admin/mandate/' + mandateId);
  }

  getAllMandateSchedules(): Observable<IMandateSchedules[]> {
    return this.http.get<IMandateSchedules[]>(this.baseUrl + 'admin/mandates/mandate-with-details');
  }

}
