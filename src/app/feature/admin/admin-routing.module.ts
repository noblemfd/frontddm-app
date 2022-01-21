import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { MerchantsComponent } from './pages/merchants/merchants.component';
import { MandatesComponent } from './pages/mandates/mandates.component';
import { MandateDetailComponent } from './pages/mandates/mandate-detail/mandate-detail.component';
import { MandateSchedulesComponent } from './pages/mandate-schedules/mandate-schedules.component';

const routes: Routes = [
  {path: '',
  component: AdminComponent,
  children: [
  {
    path: '',
    component: AdminDashboardComponent
   // redirectTo: '/admin-dashboard', pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/admin-dashboard', pathMatch: 'full'
  },
  {
    path: 'merchant-list',
    component: MerchantsComponent
  },
  {
    path: 'mandate-list',
    component: MandatesComponent
  },
  {
    path: 'mandate-detail/:id',
    component: MandateDetailComponent
  },
  {
    path: 'mandate-schedules',
    component: MandateSchedulesComponent
  },

]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
