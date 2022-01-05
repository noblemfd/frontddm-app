import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin.component';
import { MerchantsComponent } from './pages/merchants/merchants.component';
import { MerchantCreateComponent } from './pages/merchants/merchant-create/merchant-create.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminComponent,
    MerchantsComponent,
    MerchantCreateComponent,
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule
  ]
})
export class AdminModule { }
