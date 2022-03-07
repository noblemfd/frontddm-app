import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { MerchantsComponent } from './pages/merchants/merchants.component';
import { MandatesComponent } from './pages/mandates/mandates.component';
import { MandateDetailComponent } from './pages/mandates/mandate-detail/mandate-detail.component';
import { MandateSchedulesComponent } from './pages/mandate-schedules/mandate-schedules.component';
import { MandateScheduleDetailComponent } from './pages/mandate-schedules/mandate-schedule-detail/mandate-schedule-detail.component';
import { CompletedPaymentsComponent } from './pages/completed-payments/completed-payments.component';
import { ThisYearMandateComponent } from './pages/this-year-mandate/this-year-mandate.component';
import { ThisYearMandateDetailComponent } from './pages/this-year-mandate/this-year-mandate-detail/this-year-mandate-detail.component';
import { MerchantUsersComponent } from './pages/merchant-users/merchant-users.component';
import { MerchantUsersDetailComponent } from './pages/merchant-users/merchant-users-detail/merchant-users-detail.component';

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
    path: 'merchant-users-list',
    component: MerchantUsersComponent
  },
  {
    path: 'merchant-users-detail/:id',
    component: MerchantUsersDetailComponent
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
  {
    path: 'mandate-schedule-detail/:id',
    component: MandateScheduleDetailComponent
  },
  {
    path: 'completed-payments',
    component: CompletedPaymentsComponent
  },
  {
    path: 'this-year-mandates',
    component: ThisYearMandateComponent
  },
  {
    path: 'this-year-mandate-detail/:id',
    component: ThisYearMandateDetailComponent
  },

]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
