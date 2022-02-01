//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
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
import { ToBooleanPipe } from './pipes/to-boolean.pipe';
import { ToTruePipe } from './pipes/to-true.pipe';
import { ToYesPipe } from './pipes/to-yes.pipe';
import { ToStatusPipe } from './pipes/to-status.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { ChargeModePipe } from './pipes/charge-mode.pipe';
import { NotificationResponsePipe } from './pipes/notification-response.pipe';
import { NotificationTypePipe } from './pipes/notification-type.pipe';
import { WhoToChargePipe } from './pipes/who-to-charge.pipe';
import { PaymentFrequencyPipe } from './pipes/payment-frequency.pipe';
import { MandateStatusPipe } from './pipes/mandate-status.pipe';
import { NotificationRequiredPipe } from './pipes/notification-required.pipe';
import { BackButtonDirective } from './directives/back-button.directive';
import { ExcelExportService } from './services/excel-export.service';
import { PdfScriptService } from './services/pdf-script.service';
import { DatePipe } from '../../../node_modules/@angular/common';

@NgModule({
  providers: [
    AlertConfig,
    BsDatepickerConfig,
    BsDropdownConfig,
    BsModalService,
    ProgressbarConfig,
    ExcelExportService,
    PdfScriptService,
    DatePipe
  ],
  imports: [
    AlertModule,
    PaginationModule.forRoot(),
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
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
    TextInputComponent,
    ToBooleanPipe,
    ToTruePipe,
    ToYesPipe,
    ToStatusPipe,
    DurationPipe,
    ChargeModePipe,
    NotificationResponsePipe,
    NotificationTypePipe,
    WhoToChargePipe,
    PaymentFrequencyPipe,
    MandateStatusPipe,
    BsDatepickerModule
  ],
  declarations: [
    MandateSummaryComponent,
    MandateTotalsComponent,
    PaymentTotalsComponent,
    TextInputComponent,
    PagerComponent,
    PagingHeaderComponent,
    HasRoleDirective,
    ToBooleanPipe,
    ToTruePipe,
    ToYesPipe,
    ToStatusPipe,
    DurationPipe,
    ChargeModePipe,
    NotificationResponsePipe,
    NotificationTypePipe,
    WhoToChargePipe,
    PaymentFrequencyPipe,
    MandateStatusPipe,
    NotificationRequiredPipe,
    BackButtonDirective
  ],
})
export class SharedModule { }
