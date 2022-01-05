import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServerErrorComponent } from 'src/app/core/components/errors/server-error/server-error.component';
import { NotFoundComponent } from 'src/app/core/components/errors/not-found/not-found.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
 // { path: 'server-error', component: ServerErrorComponent, data: {breadcrumb: 'Server Error'} },
 // { path: 'not-found', component: NotFoundComponent, data: {breadcrumb: 'Not Found'} },
  {path: 'merchant-dashboard', loadChildren: () => import('./feature/merchant/merchant.module').then(m => m.MerchantModule)},
  {path: 'auth', loadChildren: () => import('./feature/auth/auth.module').then(m => m.AuthModule)},
  {path: 'customer-dashboard', loadChildren: () => import('./feature/customer/customer.module').then(m => m.CustomerModule)},
  {path: 'admin-dashboard', loadChildren: () => import('./feature/admin/admin.module').then(m => m.AdminModule)},
 // { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
