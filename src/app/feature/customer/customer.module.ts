import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerDashboardComponent } from './pages/customer-dashboard/customer-dashboard.component';


@NgModule({
  declarations: [
    CustomerComponent,
    CustomerDashboardComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CoreModule
  ]
})
export class CustomerModule { }
