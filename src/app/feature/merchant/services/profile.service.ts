import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { IProfile, IResponse } from 'src/app/feature/merchant/models/profile.model';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = environment.apiUrl;
  token = localStorage.getItem('token');

  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'}).set('Authorization',  `Bearer ${this.token}`)
  };

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  getProfileDetails(): Observable<IProfile> {
    return this.http.get(this.baseUrl + 'merchant/profile')
      .pipe(map((response: any) => {
        return response.result;
      }));
  }
}
