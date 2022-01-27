import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { MandateService } from 'src/app/feature/admin/services/mandate.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMandate, IMandates, IResponse } from '../../models/mandates.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-this-year-mandate',
  templateUrl: './this-year-mandate.component.html',
  styleUrls: ['./this-year-mandate.component.scss']
})
export class ThisYearMandateComponent implements OnInit {
  @ViewChild('actionTpl', { static: true }) actionTpl!: TemplateRef<any>;
  @ViewChild('addressTpl', { static: true }) addressTpl!: TemplateRef<any>;
  @ViewChild('merchantNameTpl', { static: true }) merchantNameTpl!: TemplateRef<any>;
  @ViewChild('isApprovedTpl', { static: true }) isApprovedTpl!: TemplateRef<any>;
  @ViewChild('startDateTpl', { static: true }) startDateTpl!: TemplateRef<any>;
  @ViewChild('endDateTpl', { static: true }) endDateTpl!: TemplateRef<any>;
  @ViewChild('paymentFrequencyTpl', { static: true }) paymentFrequencyTpl!: TemplateRef<any>;
  @ViewChild('amountTpl', { static: true }) amountTpl!: TemplateRef<any>;
  @ViewChild('idTpl', { static: true }) idTpl!: TemplateRef<any>;

  bsModalRef?: BsModalRef;
  pageTitle = 'Current Year Mandates';
  pageLabel = 'Current Year Mandate List';
  allMandateList: any[] = [];
  mandate!: IMandate;
  options = {};
  data1 = [];
  dataBK = [];
  columns: any = {};
  columnsWithFeatures:any
  isLoading = false;
  showModal!: boolean;

  constructor(
    private fb: FormBuilder,
    private mandateService: MandateService,
    private navigation: NavigationService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService
    ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadDatatable();
    this.loadAllMandates();
  }

  loadDatatable(){
    this.columns = [
      {
        key: 'id',
        title: '<div class="blue"><i class="fa fa-id-card-o"></i> SN.</div>',
        width: 60,
        sorting: true,
        cellTemplate: this.idTpl,
        align: {
          head: 'center',
          body: 'center'
        },
        vAlign: {
          head: 'bottom',
          body: 'middle'
        }
      },
      {
        key: 'reference_number',
        title: '<div class="blue"><i class="fa fa-envelope"></i> Reference No.</div>',
        align: {
          head: 'left'
        },
        width: 100,
        sorting: true
      },
      {
        key: 'dr_account_number',
        title:
          '<div class="blue"><i class="fa fa-envelope"></i> Debit Acct. No.</div>',
        width: 100,
        sorting: true,
        align: {
          head: 'center',
          body: 'center'
        }
      },
      {
        key: 'is_approved',
        title:
          '<div class="blue"><i class="fa fa-envelope"></i> Approved</div>',
        width: 100,
        sorting: true,
        cellTemplate: this.isApprovedTpl,
        align: {
          head: 'center',
          body: 'center'
        }
      },
      {
        key: 'start_date',
        title: '<div class="blue"><i class="fa fa-calendar"></i> Start Date</div>',
        align: {
          head: 'left'
        },
        width: 100,
        sorting: true,
        cellTemplate: this.startDateTpl
      },
      {
        key: 'end_date',
        title: '<div class="blue"><i class="fa fa-calendar"></i> End Date</div>',
        align: {
          head: 'left'
        },
        width: 100,
        sorting: true,
        cellTemplate: this.endDateTpl
      },
      {
        key: 'payment_frequency',
        title: '<div class="blue"><i class="fa fa-calendar"></i> Payment Frequency</div>',
        align: {
          head: 'left'
        },
        width: 100,
        sorting: true,
        cellTemplate: this.paymentFrequencyTpl
      },
      {
        key: 'amount',
        title: '<div class="blue"><i class="fa fa-calendar"></i> Amount</div>',
        align: {
          head: 'left'
        },
        width: 100,
        sorting: true,
        cellTemplate: this.amountTpl
      },
      {
        key: '',
        title: '<div class="blue">Action</div>',
        align: {
          head: 'center',
          body: 'center'
        },
        sorting: false,
        width: 80,
        cellTemplate: this.actionTpl
      }
    ];
  }

  loadAllMandates(){
    this.mandateService.getThisYearMandates().subscribe({
      next: (res: any) => {
        this.allMandateList = res.result;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error(error.message);
        this.isLoading = false;
      }
    })
  }

  addMandateData(templateAdd: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(templateAdd);
  }

  removeMandateData(rowIndex: any) {}

  editMandateData(row: any) {
  //  this.router.navigate(['/company-dashboard/vehicle-edit', row.id]);
    this.mandate = row;
  }

  viewMandateData(row: any) {
    this.router.navigate(['/admin-dashboard/this-year-mandate-detail', row.id]);
    this.mandate = row;
  }

  onClose(){
    this.bsModalRef?.hide();
  }

}
