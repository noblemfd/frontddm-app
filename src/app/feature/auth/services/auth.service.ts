import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { IUser, IResponse } from 'src/app/shared/models/user';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();
  token = localStorage.getItem('token');

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
    ) { }

    // After Login
    httpOptions = {
      headers: new HttpHeaders({
      //  "Content-Type": 'application/json',
        "Authorization" :  `Bearer ${this.token}`
      })
    };

    httpOptions1 = {
      headers: new HttpHeaders({
        "Content-Type": 'application/json',
      })
    };

  login(model: any) {
    return this.http.post<IResponse<IUser>>(this.baseUrl + 'auth/login', model).pipe(
      tap((response) => {
        const user = response.results;
      //  if (user) {
       //   this.setCurrentUser(user);
      //  }
        return user;
      })
    )
  }

  mustChangePassword(CurrentPassword:string, NewPassword:string, ConfirmNewPassword:string){
    const data = {
      CurrentPassword:CurrentPassword,
      NewPassword:NewPassword,
      ConfirmNewPassword:ConfirmNewPassword
    }
    return this.http.post(this.baseUrl + 'auth/must-change-password', data);
  }

  changePassword(CurrentPassword:string, NewPassword:string, ConfirmNewPassword:string){
    const data = {
      CurrentPassword:CurrentPassword,
      NewPassword:NewPassword,
      ConfirmNewPassword:ConfirmNewPassword
    }
    return this.http.post(this.baseUrl + 'auth/must-change-password', data);
  }
/*
  mustChangePassword(model: any){
    return this.http.post<IResponse<IUser>>(this.baseUrl + '/auth/must-change-password', model).pipe(
      tap((response) => {
        const user = response.results;
        return user;
      })
    )
  }
  */
  setCurrentUser(user: IUser) {
    if (user && user.token) {
      user.roles = [];
      const roles = this.getDecodedToken(user.token).role;//copy token to jwt.io see .role
      Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSource.next(user);

      //
      //const user = body
      //users.push(user);
      //localStorage.setItem(usersKey, JSON.stringify(users));
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('passwordChanged');
    this.currentUserSource.next(null);
    this.router.navigate(['/auth'])
  }

  loggedIn() {
    const token = localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  public isAdmin(): boolean {
    if (localStorage.getItem("role") === "Admin") {
      return true
    } else {
      this.toastr.info('Forbidden!');
      this.router.navigate(['/auth']);
      return false;
    };
  }

  public isMerchant(): boolean {
    if (localStorage.getItem("role") === "Merchant") {
      return true
    } else {
      this.toastr.info('Forbidden!');
      this.router.navigate(['/auth']);
      return false;
    };
  }

  public isCustomer(): boolean {
    if (localStorage.getItem("role") === "Customer") {
      return true
    } else {
      this.toastr.info('Forbidden!');
      this.router.navigate(['/auth']);
      return false;
    };
  }

  public isStaff(): boolean {
    if (localStorage.getItem("role") === "Staff") {
      return true
    } else {
      this.toastr.info('Forbidden!');
      this.router.navigate(['/auth']);
      return false;
    };
  }
}
