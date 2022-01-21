import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { MandateService } from 'src/app/feature/merchant/services/mandate.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pagination, PaginatedResult } from 'src/app/shared/models/pagination';
import { IMandate, IMandates, IResponse } from '../../models/mandates.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mandates',
  templateUrl: './mandates.component.html',
  styleUrls: ['./mandates.component.scss']
})
export class MandatesComponent implements OnInit {
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
  pageTitle = 'Mandates';
  pageLabel = 'Mandate List';
  allMandateList: any[] = [];
 // allMerchantList!: Observable<IMerchants[]>;
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
    this.mandateService.getAllMandates().subscribe({
      next: (res: any) => {
      //  console.log(res);
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
   // this.router.navigate(['/company-dashboard/vehicle-detail', row.id]);
    this.mandate = row;
  }

  onClose(){
    this.bsModalRef?.hide();
  }

}
