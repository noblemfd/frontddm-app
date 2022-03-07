import { Component, ViewChild, ElementRef, TemplateRef, OnInit } from '@angular/core';
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
import { MERCHANT_STATUS_DATA } from 'src/app/core/enum/merchantstatus';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ExcelExportService } from 'src/app/shared/services/excel-export.service';
import { PdfScriptService } from 'src/app/shared/services/pdf-script.service';
import { DatePipe } from '@angular/common';
//import pdfMake from "pdfmake/build/pdfmake";
//import pdfFonts from "pdfmake/build/vfs_fonts";
declare let pdfMake: any ;

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
  @ViewChild('TABLE', { static: false }) TABLE!: ElementRef;

  bsModalRef?: BsModalRef;
  pageTitle = 'Merchants';
  pageLabel = 'Merchant List';
  advanceSearch = 'Advance Search';
  // allMerchantList: any[] = [];
  // allMerchantList: IMerchants[] = [];
  // allMerchantList!: Observable<IMerchants[]>;
  merchant!: IMerchant;
  merchantList: any;
  isSubmitted = false;
  options = {};
  allMerchantList: IMerchants[] = [];
  data: IMerchants[] = [];
  dataBk: IMerchants[] = this.allMerchantList;
  columns: any[] = [];
  columnsWithFeatures: any
  isLoading = false;
  showModal!: boolean;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  chargeRequiredData!: any[];
  chargeModeData!: any[];
  whoToChargeData!: any[];
  merchantStatusData!: any[];
  selectedName: string = '';
  selectedNo: string = '';
  selectedStatus: number = -1;
  excelHeaderColumns!: any[];

  constructor(
    private merchantService: MerchantService,
    private excelService: ExcelExportService,
    private pdfService: PdfScriptService,
    private datePipe: DatePipe,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private config: NgSelectConfig
  ) {
    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    // set the bindValue to global config when you use the same
    // bindValue in most of the place.
    // You can also override bindValue for the specified template
    // by defining `bindValue` as property
    // Eg : <ng-select bindValue="some-new-value"></ng-select>
    this.config.bindValue = 'value';
    this.pdfService.load('pdfMake', 'vfsFonts');
    //pdfMake.vfs = pdfFonts.pdfMake.vfs;
  //this.loadDatatable();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadDatatable();
    this.loadAllMerchants();
    // this.dataBk = this.allMerchantList;
   // this.chargeRequiredData = CHARGE_REQUIRED_DATA;
   // this.chargeModeData = CHARGE_MODE_DATA;
   // this.whoToChargeData = WHO_TO_CHARGE_DATA;
    this.merchantStatusData = MERCHANT_STATUS_DATA;
    this.excelHeaderColumns = ['Merchant Name', 'Account Number', 'Mobile No.', 'Merchant Status', 'Notification Required', 'Who To Charge', 'Charge Mode'];
  }

  loadDatatable() {
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

  loadAllMerchants() {
    this.merchantService.getAllMerchants().subscribe({
      next: (res: any) => {
        this.allMerchantList = res.result;
        this.dataBk = res.result;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error(error.message);
        this.isLoading = false;
      }
    })
  }

  addNewMerchant() {
    this.bsModalRef = this.modalService.show(MerchantCreateComponent, Object.assign({}, { class: 'gray modal-lg' }));
   // this.loadAllMerchants();
  }

  removeMerchantData(rowIndex: any) { }

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
    this.bsModalRef = this.modalService.show(templateDetail, Object.assign({}, { class: 'gray modal-lg' }));
  }

  onClose() {
    this.bsModalRef?.hide();
  }

  /**
   * Advanced search
   *
   */
/*
  onMerchantNameSearch(value: string) {
    // this.data = this.dataBk.filter((row: { merchant_name: string; }) => row.merchant_name.toLowerCase().indexOf(value) > -1);
    // this.data = this.dataBk.filter((row) => row['merchant_name'].toLowerCase().indexOf(value) > -1);
    // this.data = this.dataBk.filter((row) => row.merchant_name?.toLowerCase().indexOf(value) ?? -1 > -1);
    this.allMerchantList = this.dataBk.filter((row) => row.merchant_name?.toLowerCase().includes(value.toLowerCase()));
  }

  onAccountNumberSearch(value: any) {
    this.allMerchantList = this.dataBk.filter((row) => row.account_number?.toLowerCase().includes(value.toLowerCase()));
  }
  /*
    onMerchantStatusSearch(value: any)
    {
      this.allMerchantList = this.dataBk.filter((row) => row.merchant_status == value);
     // this.data = this.dataBK.filter(row => value == '' ? true : row.marital_status.toLowerCase()==value);
    }
  */
  onMerchantSearch() {
    this.allMerchantList = this.dataBk.filter(
      (row) =>
        row.merchant_name
          ?.toLowerCase()
          .includes(this.selectedName?.toLowerCase()) &&
        row.account_number?.toLowerCase().includes(this.selectedNo) &&
        (this.selectedStatus !== -1
          ? row.merchant_status === this.selectedStatus
          : true)
    );
  }

  exportExcel() {
    this.excelService.exportAsExcelFile('Merchants List Report', 'Printed Date : ' + this.datePipe.transform(new Date(), 'medium'),'', this.excelHeaderColumns, this.dataBk, 'merchant-list-report', 'Sheet1');
  }
/*
  getProfilePicObject() {
   // if (this.DataBk.profilePic) {
      return {
      //  image: this.DataBk.profilePic ,
        width: 75,
        alignment : 'right'
      };
   // }
   // return null;
  }
*/
  getPdfDefinition() {
    return {
      content: [
        {
          text: 'Zenith Direct Debit Mandate',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'Merchant List Report',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'red'
        },
        {
          columns: [
            [
            {
              text: 'Printed Date : ' + this.datePipe.transform(new Date(), 'medium'),
            },
            ],
            [
             // this.getProfilePicObject()
            ]
          ]
        },
        {
          text: 'Skills',
          style: 'header'
        }
      ],
    };
  }

  generatePdf() {
    const pdfDefinition = this.getPdfDefinition();
    pdfMake.createPdf(pdfDefinition).print();
  }
}
