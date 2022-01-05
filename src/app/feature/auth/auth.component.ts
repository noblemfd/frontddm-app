import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { IUser } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/feature/auth/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm!: FormGroup;
  user!: IUser | null;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
    ) {
    this.authService.currentUser$.pipe(take(1)).subscribe(user=> this.user = user);
  }

  ngOnInit(): void {
    if(this.user){//if user login then redict to home page
      this.router.navigateByUrl('/');
    }
    this.createForm();
  }

  createForm() {
    this.loginForm = new FormGroup({
      UserName: new FormControl('', Validators.required),
      Password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(80)])
    })
  }

  login(){
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(this.tokenHandler(res));
        this.tokenHandler(res);
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.message);
        this.isLoading = false;
      }
    })
  }

    tokenHandler(data: any){
   //   this.toastr.success('Successfully Logged In');
    //  console.log(data);
      this.toastr.success(data.message);
      if (data.result.roles[0].name == 'Admin'){
        this.router.navigateByUrl('/admin-dashboard');
      } else if (data.result.roles[0].name == 'Merchant'){
        this.router.navigateByUrl('/merchant-dashboard');
      } else {
        this.router.navigateByUrl('/customer-dashboard');
      }
    }

}
