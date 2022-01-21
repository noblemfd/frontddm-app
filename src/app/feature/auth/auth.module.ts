import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
//import { ErrorInterceptor } from 'src/app/core/interceptors/error.interceptor';
//import { LoadingInterceptor } from 'src/app/core/interceptors/loading.interceptor';
//import { JwtInterceptor } from 'src/app/core/interceptors/jwt.interceptor';
//import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { MustChangePasswordComponent } from './must-change-password/must-change-password.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    MustChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule
  ],
  providers: [
   // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  //  {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
  //  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
})
export class AuthModule { }
