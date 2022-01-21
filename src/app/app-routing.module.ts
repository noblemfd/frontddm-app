import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServerErrorComponent } from 'src/app/core/components/errors/server-error/server-error.component';
import { NotFoundComponent } from 'src/app/core/components/errors/not-found/not-found.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { MerchantGuard } from 'src/app/core/guards/merchant.guard';
import { CustomerGuard } from 'src/app/core/guards/customer.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  { path: 'server-error', component: ServerErrorComponent, data: {breadcrumb: 'Server Error'} },
  { path: 'not-found', component: NotFoundComponent, data: {breadcrumb: 'Not Found'} },
  {
    path: 'merchant-dashboard',
    canActivate: [AuthGuard, MerchantGuard],
    loadChildren: () => import('./feature/merchant/merchant.module').then(m => m.MerchantModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./feature/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'customer-dashboard',
    canActivate: [AuthGuard, CustomerGuard],
    loadChildren: () => import('./feature/customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'admin-dashboard',
    canActivate: [AuthGuard, AdminGuard],
  loadChildren: () => import('./feature/admin/admin.module').then(m => m.AdminModule)
},
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
