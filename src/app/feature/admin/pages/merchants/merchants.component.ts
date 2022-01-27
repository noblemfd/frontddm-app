import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { WHO_TO_CHARGE_DATA } from 'src/app/core/enum/whotocharge';
import { CHARGE_MODE_DATA } from 'src/app/core/enum/chargemode';
import { CHARGE_REQUIRED_DATA } from 'src/app/core/enum/chargerequired';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { MerchantService } from 'src/app/feature/admin/services/merchant.service';
import { IMerchant, IMerchants, IResponse } from '../../models/merchants.model';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { MerchantCreateComponent } from '../merchants/merchant-create/merchant-create.component';

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
  @ViewChild('userNameTpl', { static: true }) userNameTpl!: TemplateRef<any>;
  @ViewChild('mobileNumberTpl', { static: true }) mobileNumberTpl!: TemplateRef<any>;
  @ViewChild('idTpl', { static: true }) idTpl!: TemplateRef<any>;

  bsModalRef?: BsModalRef;
  pageTitle = 'Merchants';
  pageLabel = 'Merchant List';
  allMerchantList: any[] = [];
 // allMerchantList!: Observable<IMerchants[]>;
  merchant!: IMerchant;
  merchantList: any;
  isSubmitted = false;
  options = {};
  data1 = [];
  dataBK = [];
  columns: any = {};
  columnsWithFeatures:any
  isLoading = false;
  showModal!: boolean;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  chargeRequiredData!: any[];
  chargeModeData!: any[];
  whoToChargeData!: any[];

  constructor(
    private merchantService: MerchantService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService
    ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadDatatable();
    this.loadAllMerchants();
    this.chargeRequiredData = CHARGE_REQUIRED_DATA;
    this.chargeRequiredData = CHARGE_MODE_DATA;
    this.whoToChargeData = WHO_TO_CHARGE_DATA;
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
        key: 'user',
        title:
          '<div class="blue"><i class="fa fa-phone"></i> Mobile No.</div>',
        width: 100,
        sorting: true,
        cellTemplate: this.mobileNumberTpl,
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
        this.allMerchantList = res.result;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error(error.message);
        this.isLoading = false;
      }
    })
  }

  addNewMerchant() {
    this.bsModalRef = this.modalService.show(MerchantCreateComponent, Object.assign({}, { class: 'gray modal-lg'}));
  }

  removeMerchantData(rowIndex: any) {}

  editMerchantData(row: any) {
  //  this.router.navigate(['/company-dashboard/vehicle-edit', row.id]);
    this.merchant = row;
  }

/*
  viewMerchantData(row: any) {
   // this.router.navigate(['/company-dashboard/vehicle-detail', row.id]);
    this.merchant = row;
    this.bsModalRef = this.modalService.show(MerchantDetailComponent, Object.assign({}, { class: 'gray modal-lg'}));
  }
*/
viewMerchantData(templateDetail: TemplateRef<any>, row: any) {
   this.merchantList = row;
   this.bsModalRef = this.modalService.show(templateDetail, Object.assign({}, { class: 'gray modal-lg'}));
 }

  onClose(){
    this.bsModalRef?.hide();
  }

}
