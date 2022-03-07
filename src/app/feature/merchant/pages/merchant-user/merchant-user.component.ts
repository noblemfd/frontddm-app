import { Component, ViewChild, TemplateRef, OnInit, ElementRef } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { MerchantUserService } from 'src/app/feature/merchant/services/merchant-user.service';
import { MerchantUserCreateComponent } from '../merchant-user/merchant-user-create/merchant-user-create.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMerchantUser, IMerchantUsers, IResponse } from '../../models/merchant-user.model';
import { Observable } from 'rxjs';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ExcelExportService } from 'src/app/shared/services/excel-export.service';
import { PdfScriptService } from 'src/app/shared/services/pdf-script.service';
import { DatePipe } from '@angular/common';
declare let pdfMake: any ;

@Component({
  selector: 'app-merchant-user',
  templateUrl: './merchant-user.component.html',
  styleUrls: ['./merchant-user.component.scss']
})
export class MerchantUserComponent implements OnInit {
  @ViewChild('actionTpl', { static: true }) actionTpl!: TemplateRef<any>;
  @ViewChild('addressTpl', { static: true }) addressTpl!: TemplateRef<any>;
  @ViewChild('isMerchantAdminTpl', { static: true }) isMerchantAdminTpl!: TemplateRef<any>;
  @ViewChild('userNameTpl', { static: true }) userNameTpl!: TemplateRef<any>;
  @ViewChild('fullNameTpl', { static: true }) fullNameTpl!: TemplateRef<any>;
  @ViewChild('emailTpl', { static: true }) emailTpl!: TemplateRef<any>;
  @ViewChild('mobileNumberTpl', { static: true }) mobileNumberTpl!: TemplateRef<any>;
  @ViewChild('idTpl', { static: true }) idTpl!: TemplateRef<any>;
  @ViewChild('TABLE', { static: false }) TABLE!: ElementRef;

  bsModalRef?: BsModalRef;
  pageTitle = 'Merchant Users';
  pageLabel = 'Merchant Users List';
  advanceSearch = 'Advance Search';
  merchantUser!: IMerchantUser;
  merchantUserList: any;
  isSubmitted = false;
  options = {};
  allMerchantUsersList: IMerchantUsers[] = [];
  data: IMerchantUsers[] = [];
  dataBk: IMerchantUsers[] = this.allMerchantUsersList;
  columns: any[] = [];
  columnsWithFeatures: any
  isLoading = false;
  showModal!: boolean;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  selectedUserName: string = '';
  selectedEmail: string = '';
  //selectedStatus: number = -1;
  selectedFullName: string = '';
  excelHeaderColumns!: any[];

  constructor(
    private merchantUserService: MerchantUserService,
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
    this.config.bindValue = 'value';
    this.pdfService.load('pdfMake', 'vfsFonts');
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadDatatable();
    this.loadAllMerchantUsers();
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
        key: 'is_merchant_admin',
        title: '<div class="blue"><i class="fa fa-user"></i> Admin?</div>',
        width: 60,
        sorting: true,
        cellTemplate: this.isMerchantAdminTpl,
      },
      {
        key: 'user',
        title:
          '<div class="blue"><i class="fa fa-user"></i> User Name</div>',
        width: 100,
        sorting: true,
        cellTemplate: this.userNameTpl,
        align: {
          head: 'center',
          body: 'center'
        }
      },
      {
        key: 'user',
        title:
          '<div class="blue"><i class="fa fa-user"></i> Full Name</div>',
        width: 120,
        sorting: true,
        cellTemplate: this.fullNameTpl,
        align: {
          head: 'center',
          body: 'center'
        }
      },
      {
        key: 'user',
        title:
          '<div class="blue"><i class="fa fa-user"></i> Mobile No.</div>',
        width: 100,
        sorting: true,
        cellTemplate: this.mobileNumberTpl,
        align: {
          head: 'center',
          body: 'center'
        }
      },
      {
        key: 'user',
        title:
          '<div class="blue"><i class="fa fa-user"></i> Email</div>',
        width: 120,
        sorting: true,
        cellTemplate: this.emailTpl,
        align: {
          head: 'center',
          body: 'center'
        }
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

  loadAllMerchantUsers() {
    this.merchantUserService.getAllMerchantUsers().subscribe({
      next: (res: any) => {
        this.allMerchantUsersList = res.result;
        this.dataBk = res.result;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error(error.message);
        this.isLoading = false;
      }
    })
  }

  addNewMerchantUser() {
    this.bsModalRef = this.modalService.show(MerchantUserCreateComponent, Object.assign({}, { class: 'gray modal-lg' }));
  }

  removeMerchantData(rowIndex: any) { }

  editMerchantData(row: any) {
    //  this.router.navigate(['/company-dashboard/vehicle-edit', row.id]);
    this.merchantUser = row;
  }

  viewMerchantData(templateDetail: TemplateRef<any>, row: any) {
    this.merchantUserList = row;
    this.bsModalRef = this.modalService.show(templateDetail, Object.assign({}, { class: 'gray modal-lg' }));
  }

  onClose() {
    this.bsModalRef?.hide();
  }
///*
  onMerchantUserSearch() {
    this.allMerchantUsersList = this.dataBk.filter(
      (row) =>
        row.user.user_name
          ?.toLowerCase()
          .includes(this.selectedUserName?.toLowerCase()) &&
        row.user.email?.toLowerCase().includes(this.selectedEmail) &&
        row.user.fullname?.toLowerCase().includes(this.selectedFullName)
      //  (this.selectedStatus !== -1
       //   ? row.merchant_status === this.selectedStatus
       //   : true)
    );
  }
//*/
  exportExcel() {
    this.excelService.exportAsExcelFile('Merchants List Report', 'Printed Date : ' + this.datePipe.transform(new Date(), 'medium'),'', this.excelHeaderColumns, this.dataBk, 'merchant-list-report', 'Sheet1');
  }

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
