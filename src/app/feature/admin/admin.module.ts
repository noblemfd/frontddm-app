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
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin.component';
import { MerchantsComponent } from './pages/merchants/merchants.component';
import { MerchantCreateComponent } from './pages/merchants/merchant-create/merchant-create.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { MandatesComponent } from './pages/mandates/mandates.component';
import { MandateDetailComponent } from './pages/mandates/mandate-detail/mandate-detail.component';
import { MandateSchedulesComponent } from './pages/mandate-schedules/mandate-schedules.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminComponent,
    MerchantsComponent,
    MerchantCreateComponent,
    TransactionsComponent,
    MandatesComponent,
    MandateDetailComponent,
    MandateSchedulesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
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
export class AdminModule { }
