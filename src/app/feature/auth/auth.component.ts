import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { IUser } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/feature/auth/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm!: FormGroup;
  user!: IUser | null;
  isLoading = false;
  token = localStorage.getItem('token');
  isPasswordChanged = localStorage.getItem('passwordChanged');

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
    ) {
    this.authService.currentUser$.pipe(take(1)).subscribe(user=> this.user = user);
  }

  httpOptions = {
    headers: new HttpHeaders({
    //  "Content-Type": 'application/json',
      "Authorization" :  `Bearer ${this.token}`
    })
  };

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

  login1(){
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.tokenHandler(res);
      },
      error: (error) => {

        this.toastr.error(error.message);
        this.isLoading = false;
      }
    })
  }

  login2(){
    this.authService.login(this.loginForm.value).subscribe(res=>{
      this.router.navigateByUrl('/');
    }, error=>{
      console.log(error);
      this.toastr.error(error.error);
    })
  }

    tokenHandler(data: any){
     // this.toastr.success('Successfully Logged In');
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

    login(){
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
        //  if (res.result.is_password_changed == true) {
        //  if (this.isPasswordChanged == true) {
            this.toastr.success(res.message);
            if (res.result.roles[0] == 'Admin'){
              this.router.navigateByUrl('/admin-dashboard');
            } else if (res.result.roles[0] == 'Merchant'){
              this.router.navigateByUrl('/merchant-dashboard');
            } else {
              this.router.navigateByUrl('/customer-dashboard');
            }
         // } else {
          //  this.toastr.info('Kindly reset your password');
         //   this.router.navigateByUrl('/auth/must-change-password');
         // }
          localStorage.clear();
          localStorage.setItem('currentUser', JSON.stringify(res.result));
          //localStorage.setItem('token', JSON.stringify(res.result.token));
          //localStorage.setItem('role', JSON.stringify(res.result.roles[0]));
          //localStorage.setItem('username', JSON.stringify(res.result.user.user_name));
          //localStorage.setItem('username', JSON.stringify(res.result.user.is_password_changed));
          localStorage.setItem('token', res.result.token);
          localStorage.setItem('role', res.result.roles[0]);
          localStorage.setItem('username', res.result.user.user_name);
          localStorage.setItem('passwordChanged', res.result.user.is_password_changed);

         // console.log(`Bearer ${this.token}`);
        },
        error: (error) => {
          this.toastr.error(error.message);
        }
      })
    }

}
