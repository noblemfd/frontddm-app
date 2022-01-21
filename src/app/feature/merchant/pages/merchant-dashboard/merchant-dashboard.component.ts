import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { DashboardService } from 'src/app/feature/merchant/services/dashboard.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDashboardCount } from '../../models/dashboard-count.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-merchant-dashboard',
  templateUrl: './merchant-dashboard.component.html',
  styleUrls: ['./merchant-dashboard.component.scss']
})
export class MerchantDashboardComponent implements OnInit {

  pageTitle = 'Merchant Dashboard';
  pageLabel = 'Dashboard Overview';
  public dashboardData!: IDashboardCount;
  latestMandateList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private router: Router,
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
        console.log(res);
        this.latestMandateList = res.result;
        console.log(this.latestMandateList);
      },
      error: (error) => {
        this.toastr.error(error.message);
      }
    })
  }

}
