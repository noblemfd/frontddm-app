import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { WHO_TO_CHARGE_DATA } from 'src/app/core/enum/whotocharge';
import { CHARGE_MODE_DATA } from 'src/app/core/enum/chargemode';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { MerchantService } from 'src/app/feature/admin/services/merchant.service';
import { UsernameValidator } from 'src/app/shared/validators/username-validator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pagination, PaginatedResult } from 'src/app/shared/models/pagination';
import { IMerchant, IMerchants, IResponse } from '../../models/merchants.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss']
})
export class MerchantsComponent implements OnInit {
  @ViewChild('actionTpl', { static: true }) actionTpl!: TemplateRef<any>;
  @ViewChild('addressTpl', { static: true }) addressTpl!: TemplateRef<any>;
  @ViewChild('notificationRequiredTpl', { static: true }) notificationRequiredTpl!: TemplateRef<any>;
  @ViewChild('merchantStatusTpl', { static: true }) merchantStatusTpl!: TemplateRef<any>;
  @ViewChild('idTpl', { static: true }) idTpl!: TemplateRef<any>;

  bsModalRef?: BsModalRef;
  pageTitle = 'Merchants';
  pageLabel = 'Merchant List';
  allMerchantList: any[] = [];
 // allMerchantList!: Observable<IMerchants[]>;
  createForm!: FormGroup;
  editForm!: FormGroup;
  merchant!: IMerchant;
  isSubmitted = false;
  options = {};
  data1 = [];
  dataBK = [];
  columns: any = {};
  columnsWithFeatures:any
  isLoading = false;
  showModal!: boolean;

  constructor(
    private fb: FormBuilder,
    private merchantService: MerchantService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService
    ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadDatatable();
    this.loadAllMerchants();
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
        key: 'merchant_name',
        title: '<div class="blue"><i class="fa fa-user"></i> Merchant</div>',
        width: 100,
        sorting: true,
      },
      {
        key: 'account_number',
        title: '<div class="blue"><i class="fa fa-envelope"></i> Account No.</div>',
        align: {
          head: 'left'
        },
        width: 100,
        sorting: true
      },
      {
        key: 'mobile_number',
        title:
          '<div class="blue"><i class="fa fa-phone"></i> Mobile No.</div>',
        width: 100,
        sorting: true,
       // cellTemplate: this.vehiclemodelTpl,
        align: {
          head: 'center',
          body: 'center'
        }
      },
      {
        key: 'merchant_status',
        title: '<div class="blue"><i class="fa fa-calendar"></i> Status</div>',
        align: {
          head: 'left'
        },
        width: 100,
        sorting: true,
        cellTemplate: this.merchantStatusTpl
      },
      {
        key: 'notification_required',
        title: '<div class="blue"><i class="fa fa-calendar"></i> Notification Required</div>',
        align: {
          head: 'left'
        },
        width: 100,
        sorting: true,
        cellTemplate: this.notificationRequiredTpl
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

  loadAllMerchants(){
    this.merchantService.getAllMerchants().subscribe({
      next: (res: any) => {
      //  console.log(res);
        this.allMerchantList = res.result;
        this.isLoading = false;
      //  console.log(this.allMerchantList);
      },
      error: (error) => {
        this.toastr.error(error.message);
        this.isLoading = false;
      }
    })
  }

  createMerchant() {
    this.createForm = this.fb.group({
      UserName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), UsernameValidator.cannotContainSpace]],
      MerchantName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      AccountNumber: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    });
  }

  createValidate() {
    if(!this.createForm.valid) {
      this.createForm.markAllAsTouched();
      return;
    }
  }

  addMerchantData(templateAdd: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(templateAdd,
      Object.assign({}, { class: 'gray modal-lg'}));
  }

  submitCreateForm() {
  }

  removeMerchantData(rowIndex: any) {}

  editMerchantData(row: any) {
  //  this.router.navigate(['/company-dashboard/vehicle-edit', row.id]);
    this.merchant = row;
  }

  viewMerchantData(row: any) {
   // this.router.navigate(['/company-dashboard/vehicle-detail', row.id]);
    this.merchant = row;
  }

  onClose(){
    this.bsModalRef?.hide();
  }

}
