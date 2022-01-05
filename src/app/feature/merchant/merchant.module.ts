import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { MerchantRoutingModule } from './merchant-routing.module';
import { MandatesComponent } from './pages/mandates/mandates.component';
import { MerchantDashboardComponent } from './pages/merchant-dashboard/merchant-dashboard.component';
import { MerchantComponent } from './merchant.component';
import { MandateSchedulesComponent } from './pages/mandate-schedules/mandate-schedules.component';
import { ReportComponent } from './pages/report/report.component';
import { MandateByCustomerComponent } from './pages/mandate-by-customer/mandate-by-customer.component';


@NgModule({
  declarations: [
    MandatesComponent,
    MerchantDashboardComponent,
    MerchantComponent,
    MandateSchedulesComponent,
    ReportComponent,
    MandateByCustomerComponent
  ],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    CoreModule
  ]
})
export class MerchantModule { }
