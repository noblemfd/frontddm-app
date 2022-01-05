//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule,BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { AlertModule,AlertConfig } from 'ngx-bootstrap/alert';
import { PopoverModule, PopoverConfig } from 'ngx-bootstrap/popover';
import { ProgressbarModule,ProgressbarConfig } from 'ngx-bootstrap/progressbar';
import { MandateSummaryComponent } from './components/mandate-summary/mandate-summary.component';
import { MandateTotalsComponent } from './components/mandate-totals/mandate-totals.component';
import { PaymentTotalsComponent } from './components/payment-totals/payment-totals.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { PagerComponent } from './components/pager/pager.component';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { HasRoleDirective } from './directives/has-role.directive';


@NgModule({
  providers: [
    AlertConfig,
    BsDatepickerConfig,
    BsDropdownConfig,
   // BsModalService,
    ProgressbarConfig
  ],
  imports: [
    AlertModule,
    PaginationModule.forRoot(),
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  //  BrowserModule,
//BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule,
    PopoverModule,
    ProgressbarModule
  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent
  ],
  declarations: [
    MandateSummaryComponent,
    MandateTotalsComponent,
    PaymentTotalsComponent,
    TextInputComponent,
    PagerComponent,
    PagingHeaderComponent,
    HasRoleDirective
  ],
})
export class SharedModule { }
