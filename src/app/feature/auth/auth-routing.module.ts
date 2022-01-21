import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginComponent } from '../../feature/auth/login/login.component';
import { AuthComponent } from '../../feature/auth/auth.component';
import { MustChangePasswordComponent } from './must-change-password/must-change-password.component';

const routes: Routes = [
{
    path: '',
  component: LoginComponent,
  children: [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'must-change-password',
    component: MustChangePasswordComponent
  }
]
}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
