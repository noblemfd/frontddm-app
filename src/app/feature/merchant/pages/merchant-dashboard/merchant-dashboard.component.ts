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
import { ChartOptions, ChartDataset, Chart, registerables } from 'chart.js';
import { BaseChartDirective } from "ng2-charts";

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
  currentYearChartResult: any[] = [];
  currentYearChart: any = [];
  currentYearChartSum: any;
  currentYearChartMonth: any;
  currentYearChartMonthName: any;
  fiveYearChartResult: any[] = [];
  fiveYearChart: any = [];
  fiveYearChartTotal: any;
  fiveYearChartYear: any;
  fiveYearChartPercent: any;
  public chart_Options: ChartOptions = {
    responsive: true,
  };

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private toastr: ToastrService,
    private modalService: BsModalService
    ) {
      Chart.register(...registerables);
    }

  ngOnInit(): void {
    this.loadDashboardCounts();
    this.loadLatestMandates();
    this.loadFiveYearChart();
    this.loadcurrentYearChart();
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

  loadcurrentYearChart(){
    this.dashboardService.getCurrentYearMonthlyMandateChart().subscribe({
      next: (res: any) => {
        this.currentYearChartResult = res;
        this.currentYearChartMonth = this.currentYearChartResult.map(x => x['month_name']);
        this.currentYearChartSum = this.currentYearChartResult.map(y => y['item_sum']);
        this.currentYearChart = new Chart('monthCanvas', {
          type: 'bar',
          data: {
            labels: this.currentYearChartMonth,
            datasets: [
              {
                data: this.currentYearChartSum,
                label: 'Current Year',
                backgroundColor: [
                  'rgba(180, 0, 0, 1)',
                  'rgba(33, 81, 255, 1)',
                  'rgba(255, 166, 0, 1)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(201, 203, 207, 0.2)',
                  'rgba(200, 200, 200, 0.75)',
                  'rgba(30, 169, 224, 0.8)'
                  //'rgba(0, 0, 0, 0.1)',
                  //'rgba(77,83,96,0.2)','rgba(30, 169, 224, 0.8)'
                ],
                borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(201, 203, 207)'
                ],
                borderWidth: 1
              },
            ],
          },
        });
      }
    })
  }

  loadFiveYearChart(){
    this.dashboardService.getLastFiveYearMandateChart().subscribe({
      next: (res: any) => {
        this.fiveYearChartResult = res;
        this.fiveYearChartYear = this.fiveYearChartResult.map(x => x['year']);
        this.fiveYearChartTotal = this.fiveYearChartResult.map(y => y['item_percent']);
        this.fiveYearChart = new Chart('yearCanvas', {
          type: 'doughnut',
          data: {
            labels: this.fiveYearChartYear,
            datasets: [
              {
                data: this.fiveYearChartTotal,
                label: 'Past 5 Years',
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)',
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(201, 203, 207)'
                ],
                borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(201, 203, 207)'
                ],
                hoverOffset: 4
              },
            ],
          },
        });
      }
    })
  }
}
