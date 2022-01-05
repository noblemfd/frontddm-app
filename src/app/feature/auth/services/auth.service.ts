import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { IUser } from 'src/app/shared/models/user';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
    export class AuthService {
      baseUrl = environment.apiUrl;
      private currentUserSource = new ReplaySubject<IUser | null>(1);
      currentUser$ = this.currentUserSource.asObservable();

      constructor(private http: HttpClient, private router: Router) { }

      login(model: any){
        return this.http.post(this.baseUrl+'auth/login', model).pipe(
          map((res: IUser)=>{
            const user = res;
            if(user && user.token){
             // localStorage.setItem('token', user.token);
             // localStorage.setItem('user', JSON.stringify(user.user));
              this.setCurrentUser(user);
            }
          })
        )
      }

      setCurrentUser(user: IUser){
        if(user && user.token){
          user.roles = [];
          const roles = this.getDecodedToken(user.token || '').role;//copy token to jwt.io see .role
          Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
          localStorage.setItem('user', JSON.stringify(user));
        //  localStorage.setItem('roles', user.roles);
          this.currentUserSource.next(user);
        }
      }

      logout(){
        localStorage.removeItem('user');
        this.currentUserSource.next(null);
      }


      getDecodedToken(token: string) {
        return JSON.parse(atob(token.split('.')[1]));
      }

    }
