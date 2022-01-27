import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MandatesComponent } from './pages/mandates/mandates.component';
import { MerchantDashboardComponent } from './pages/merchant-dashboard/merchant-dashboard.component';
import { MerchantComponent } from './merchant.component';
import { MandateSchedulesComponent } from './pages/mandate-schedules/mandate-schedules.component';
import { ReportComponent } from './pages/report/report.component';
import { MandateByCustomerComponent } from './pages/mandate-by-customer/mandate-by-customer.component';
import { MandateDetailComponent } from './pages/mandates/mandate-detail/mandate-detail.component';
import { CompletedPaymentsComponent } from './pages/completed-payments/completed-payments.component';
import { ThisYearMandateComponent } from './pages/this-year-mandate/this-year-mandate.component';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
  {path: '',
  component: MerchantComponent,
  children: [
  {
    path: '',
    component: MerchantDashboardComponent
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
    path: 'completed-payments',
    component: CompletedPaymentsComponent
  },
  {
    path: 'this-year-mandates',
    component: ThisYearMandateComponent
  },
  {
    path: 'reports',
    component: ReportComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },

]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule { }
