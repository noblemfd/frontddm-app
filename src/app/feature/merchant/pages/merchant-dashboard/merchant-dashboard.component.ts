import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { DashboardService } from 'src/app/feature/merchant/services/dashboard.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDashboardCount } from '../../models/dashboard-count.model';
import { IMandate, IMandates, IResponse } from '../../models/mandates.model';
import { CreateDashboardMandateComponent } from '../../pages/merchant-dashboard/create-dashboard-mandate/create-dashboard-mandate.component';


@Component({
  selector: 'app-merchant-dashboard',
  templateUrl: './merchant-dashboard.component.html',
  styleUrls: ['./merchant-dashboard.component.scss']
})
export class MerchantDashboardComponent implements OnInit {

  pageTitle = 'Merchant Dashboard';
  pageLabel = 'Dashboard Overview';
  bsModalRef?: BsModalRef;
  public dashboardData!: IDashboardCount;
  latestMandateList: any[] = [];
  mandate!: IMandate;

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.loadDashboardCounts();
    this.loadLatestMandates();
  }

  loadDashboardCounts(){
    this.dashboardService.getDataCounts().subscribe({
      next: (res: any) => {
        this.dashboardData = res[0];
      },
      error: () => {
        this.toastr.error('Data cannot be loaded');
      }
    })
  }

  loadLatestMandates(){
    this.dashboardService.getLatestMandates().subscribe({
      next: (res: any) => {
        this.latestMandateList = res.result;
      },
      error: (error) => {
        this.toastr.error(error.message);
      }
    })
  }

  addNewMandate() {
    this.bsModalRef = this.modalService.show(CreateDashboardMandateComponent, Object.assign({}, { class: 'gray modal-lg'}));
  }
}
