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
  public sidebarMenuOpened = true;
  @Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
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



}
