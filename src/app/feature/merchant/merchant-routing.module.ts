import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MandatesComponent } from './pages/mandates/mandates.component';
import { MerchantDashboardComponent } from './pages/merchant-dashboard/merchant-dashboard.component';
import { MerchantComponent } from './merchant.component';
import { MandateSchedulesComponent } from './pages/mandate-schedules/mandate-schedules.component';
import { ReportComponent } from './pages/report/report.component';
import { MandateByCustomerComponent } from './pages/mandate-by-customer/mandate-by-customer.component';

const routes: Routes = [
  {path: '',
  component: MerchantComponent,
  children: [
  {
    path: '',
    component: MerchantDashboardComponent
  },
/*  {
    path: 'vehicle-detail/:id',
    component: VehicleDetailComponent
  },*/
  {
    path: 'mandate-list',
    component: MandatesComponent
  },
  {
    path: 'mandate-schedules',
    component: MandateSchedulesComponent
  },
  {
    path: 'reports',
    component: ReportComponent
  },

]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule { }
