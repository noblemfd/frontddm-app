import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/models/user';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/feature/auth/services/auth.service';

@Injectable()
  export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      let currentUser: IUser | null;
      this.authService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);
      if(currentUser!){
        request = request.clone({
          setHeaders:{
            Authorization: `Bearer ${currentUser.token}`
          }
        });
      }
      return next.handle(request);
    }
  }
