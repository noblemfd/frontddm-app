import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/feature/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MerchantGuard implements CanActivate {
  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('role') === 'Merchant') {
      return true;
    }
    this.router.navigate(['/merchant-dashboard']);
    return false;
  }

}
