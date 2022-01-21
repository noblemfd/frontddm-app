import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { MerchantSidebarComponent } from './components/merchant-sidebar/merchant-sidebar.component';
import { MerchantHeaderComponent } from './components/merchant-header/merchant-header.component';
import { CustomerHeaderComponent } from './components/customer-header/customer-header.component';
import { CustomerSidebarComponent } from './components/customer-sidebar/customer-sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ServerErrorComponent } from './components/errors/server-error/server-error.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DropdownMenuComponent } from './components/dropdown/dropdown-menu/dropdown-menu.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AdminHeaderComponent,
    AdminSidebarComponent,
    MerchantSidebarComponent,
    MerchantHeaderComponent,
    CustomerHeaderComponent,
    CustomerSidebarComponent,
    FooterComponent,
    ServerErrorComponent,
    NotFoundComponent,
    DropdownComponent,
    DropdownMenuComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    ToastrModule.forRoot({
      timeOut: 15000, // 15 seconds
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      maxOpened : 5,
      closeButton: true,
      progressBar: true,
      progressAnimation : 'increasing',
    })
  ],
  exports: [
    AdminHeaderComponent,
    AdminSidebarComponent,
    MerchantSidebarComponent,
    MerchantHeaderComponent,
    CustomerHeaderComponent,
    CustomerSidebarComponent,
    FooterComponent
  ]
})
export class CoreModule { }
