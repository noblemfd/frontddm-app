import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule} from '@ng-select/ng-select';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NgxDatatableModule } from '@tusharghoshbd/ngx-datatable';
import { ngxChartsBarModule, ngxChartsLineModule, ngxChartsComboModule, ngxChartsPieModule, ngxChartsStackedModule } from '@tusharghoshbd/ngx-charts';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MerchantRoutingModule } from './merchant-routing.module';
import { MandatesComponent } from './pages/mandates/mandates.component';
import { MerchantDashboardComponent } from './pages/merchant-dashboard/merchant-dashboard.component';
import { MerchantComponent } from './merchant.component';
import { MandateSchedulesComponent } from './pages/mandate-schedules/mandate-schedules.component';
import { ReportComponent } from './pages/report/report.component';
import { MandateByCustomerComponent } from './pages/mandate-by-customer/mandate-by-customer.component';
import { MandateDetailComponent } from './pages/mandates/mandate-detail/mandate-detail.component';
import { CompletedPaymentsComponent } from './pages/completed-payments/completed-payments.component';
import { ThisYearMandateComponent } from './pages/this-year-mandate/this-year-mandate.component';


@NgModule({
  declarations: [
    MandatesComponent,
    MerchantDashboardComponent,
    MerchantComponent,
    MandateSchedulesComponent,
    ReportComponent,
    MandateByCustomerComponent,
    MandateDetailComponent,
    CompletedPaymentsComponent,
    ThisYearMandateComponent
  ],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    NgxIntlTelInputModule,
    NgxDatatableModule,
    ngxChartsBarModule,
    ngxChartsLineModule,
    ngxChartsComboModule,
    ngxChartsPieModule,
    ngxChartsStackedModule,
    NgSelectModule,
  ]
})
export class MerchantModule { }
