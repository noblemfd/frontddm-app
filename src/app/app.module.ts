import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { NgSelectModule} from '@ng-select/ng-select';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
//import { AuthModule } from './feature/auth/auth.module';
//import { AuthService } from './feature/auth/services/auth.service';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NgxDatatableModule } from '@tusharghoshbd/ngx-datatable';
//import { ngxChartsBarModule, ngxChartsLineModule, ngxChartsComboModule, ngxChartsPieModule, ngxChartsStackedModule } from '@tusharghoshbd/ngx-charts';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  //  AuthModule,
    CoreModule,
    FormsModule,
    NgChartsModule,
    NgxSpinnerModule,
    RxReactiveFormsModule,
    NgxDatatableModule,
  //  ngxChartsBarModule,
  //  ngxChartsLineModule,
  //  ngxChartsComboModule,
  //  ngxChartsPieModule,
  //  ngxChartsStackedModule,
    NgSelectModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
