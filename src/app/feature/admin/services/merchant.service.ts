import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { IMerchant, IMerchants, IResponse } from 'src/app/feature/admin/models/merchants.model';
import { PaginatedResult } from 'src/app/shared/models/pagination';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  baseUrl = environment.apiUrl;
  token = localStorage.getItem('token');

  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'}).set('Authorization',  `Bearer ${this.token}`)
  };

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  getAllMerchants(): Observable<IMerchants[]> {
    return this.http.get<IMerchants[]>(this.baseUrl + 'admin/merchants');
  }

  getMerchantById1(merchantId: any): Observable<any> {
    return this.http.get(this.baseUrl + 'admin/merchant/' + merchantId);
  }

  getMerchantDetails(merchantId: number): Observable<IMerchants> {
    return this.http.get(this.baseUrl + 'admin/merchant/' + merchantId)
      .pipe(map((response: any) => {
        return response.result;
      }));
  }

  createMerchant(merchant: IMerchant): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<IResponse<IMerchant>>(this.baseUrl + 'admin/merchant/add', merchant, httpOptions).pipe(
      tap((response) => {
        const data = response.results;
        return data;
      })
    );
  }
 /*
   createMerchant(data: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.baseUrl + 'admin/merchant/add', data, httpOptions);
  }
  createMerchant(merchant: IMerchant): Observable<IMerchant> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<IMerchant>(this.baseUrl + 'admin/merchant/add', merchant, httpOptions);
  }
  getAllMerchants(): Observable<any> {
    return this.http.get(this.baseUrl + 'admin/merchants', this.httpOptions);
  }

  updateMerchant(merchant: IMerchant): Observable<IMerchant> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<IMerchant>(this.baseUrl + 'admin/merchant/update/', merchant, httpOptions);
  }

  deleteMerchantById(merchantid: string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.baseUrl + 'admin/merchant/delete?id=' + merchantid, httpOptions);
  }
*/
}
