import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { PaginatedResult } from 'src/app/shared/models/pagination';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IMerchantUser, IMerchantUsers, IResponse } from '../models/merchant-user.model';

@Injectable({
  providedIn: 'root'
})
export class MerchantUserService {
  baseUrl = environment.apiUrl;
  token = localStorage.getItem('token');

  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'}).set('Authorization',  `Bearer ${this.token}`)
  };

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

    getAllMerchantUsers(): Observable<IMerchantUsers[]> {
      return this.http.get<IMerchantUsers[]>(this.baseUrl + 'merchant/merchants/merchant-users');
    }

    getEmployeeById(id: number): Observable<IMerchantUsers> {
      return this.http.get<IMerchantUsers>(this.baseUrl + 'merchant/merchants/merchant-user/' + id);
    }

    getMerchantUserDetails(id: number): Observable<IMerchantUsers> {
      return this.http.get(this.baseUrl + 'merchant/merchants/merchant-user/' + id)
        .pipe(map((response: any) => {
          return response.result;
        }));
    }

    createMerchantUser(merchantuser: IMerchantUser): Observable<any> {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post<IResponse<IMerchantUser>>(this.baseUrl + 'merchant/merchant/add-merchant-user', merchantuser, httpOptions).pipe(
        tap((response) => {
          const data = response.results;
          return data;
        })
      );
    }

    updateMerchantUser(id: number, merchantuser: IMerchantUser): Observable<any> {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.put<IResponse<IMerchantUser>>(this.baseUrl + 'merchant/merchants/update-merchant-user/' + id, merchantuser, httpOptions).pipe(
        tap((response) => {
          const data = response.results;
          return data;
        })
      );
    }
/*
    updateMerchant(merchant: IMerchant): Observable<IMerchant> {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.put<IMerchant>(this.baseUrl + 'admin/merchant/update/', merchant, httpOptions);
    }
    */
}
