import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { IUser } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/feature/auth/services/auth.service';

@Component({
  selector: 'app-merchant-header',
  templateUrl: './merchant-header.component.html',
  styleUrls: ['./merchant-header.component.scss']
})
export class MerchantHeaderComponent implements OnInit {
  @Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
  public searchForm!: FormGroup;
  menuAdminLogout = false;
  userName = localStorage.getItem('username');
  userRole = localStorage.getItem('role');

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
        search: new FormControl(null)
    });
}

  onAdminLogoutClick(): void {
    this.menuAdminLogout = !this.menuAdminLogout;
  }

  signOut() {
   Swal.fire({
    title: 'Are you sure want to signout?',
    text: 'You will be signed out from  ZMandate!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Signout!',
        'You have signed out successfully.',
        'success'
      ),
      this.authService.logout();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'You are back to the dashboard',
        'error'
      );
    }
  });
  }

  getUserName() {
    return this.userName;
  }

  getUserRole() {
    return this.userRole;
  }

}
