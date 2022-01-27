import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule} from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
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
import { MandateEditComponent } from './pages/mandates/mandate-edit/mandate-edit.component';
import { MandateCreateComponent } from './pages/mandates/mandate-create/mandate-create.component';
import { MandateCancelComponent } from './pages/mandates/mandate-cancel/mandate-cancel.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreateDashboardMandateComponent } from './pages/merchant-dashboard/create-dashboard-mandate/create-dashboard-mandate.component';


@NgModule({
  providers: [
   // BsDatepickerConfig,
  ],
  declarations: [
    MandatesComponent,
    MerchantDashboardComponent,
    MerchantComponent,
    MandateSchedulesComponent,
    ReportComponent,
    MandateByCustomerComponent,
    MandateDetailComponent,
    CompletedPaymentsComponent,
    ThisYearMandateComponent,
    MandateEditComponent,
    MandateCreateComponent,
    MandateCancelComponent,
    ProfileComponent,
    CreateDashboardMandateComponent
  ],
  imports: [
    CommonModule,
    MerchantRoutingModule,
   // BsDatepickerModule.forRoot(),
  //  BrowserAnimationsModule,
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
    NgOptionHighlightModule
  ]
})
export class MerchantModule { }
