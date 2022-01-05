import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/feature/auth/services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private toastr: ToastrService){}

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user => {
        if(user){
          if (user?.roles?.includes('Admin')) {
            return true;
          }
        }
        this.toastr.error('Requires Admin');
        return false;
      })
    )
  }

}
