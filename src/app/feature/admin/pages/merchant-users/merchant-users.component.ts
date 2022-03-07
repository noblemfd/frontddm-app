import { Component, ViewChild, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { MerchantService } from 'src/app/feature/admin/services/merchant.service';
import { MerchantCreateComponent } from '../merchants/merchant-create/merchant-create.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMerchantsWithUsers, IResponse } from '../../models/merchants-with-users.model';
import { MERCHANT_STATUS_DATA } from 'src/app/core/enum/merchantstatus';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ExcelExportService } from 'src/app/shared/services/excel-export.service';
import { PdfScriptService } from 'src/app/shared/services/pdf-script.service';
import { DatePipe } from '@angular/common';
declare let pdfMake: any ;

@Component({
  selector: 'app-merchant-users',
  templateUrl: './merchant-users.component.html',
  styleUrls: ['./merchant-users.component.scss']
})
export class MerchantUsersComponent implements OnInit {
  @ViewChild('actionTpl', { static: true }) actionTpl!: TemplateRef<any>;
  @ViewChild('addressTpl', { static: true }) addressTpl!: TemplateRef<any>;
  @ViewChild('notificationRequiredTpl', { static: true }) notificationRequiredTpl!: TemplateRef<any>;
  @ViewChild('merchantStatusTpl', { static: true }) merchantStatusTpl!: TemplateRef<any>;
  @ViewChild('merchantUserTpl', { static: true }) merchantUserTpl!: TemplateRef<any>;
  @ViewChild('userNameTpl', { static: true }) userNameTpl!: TemplateRef<any>;
  @ViewChild('mobileNumberTpl', { static: true }) mobileNumberTpl!: TemplateRef<any>;
  @ViewChild('idTpl', { static: true }) idTpl!: TemplateRef<any>;
  @ViewChild('TABLE', { static: false }) TABLE!: ElementRef;
  @ViewChild('rowDetailTpl', { static: true }) rowDetailTpl!: TemplateRef<any>;

  bsModalRef?: BsModalRef;
  pageTitle = 'Merchant Users';
  pageLabel = 'Merchant Users List';
  advanceSearch = 'Advance Search';
  merchant!: IMerchantsWithUsers;
  merchantList: any;
  isSubmitted = false;
  options = {};
  allMerchantList: IMerchantsWithUsers[] = [];
  data: IMerchantsWithUsers[] = [];
  dataBk: IMerchantsWithUsers[] = this.allMerchantList;
  columns: any[] = [];
  optionsWithRowDetail = {}
  columnsWithFeatures: any
  isLoading = false;
  showModal!: boolean;
  chargeRequiredData!: any[];
  chargeModeData!: any[];
  whoToChargeData!: any[];
  merchantStatusData!: any[];
  selectedName: string = '';
  selectedNo: string = '';
  selectedStatus: number = -1;
  excelHeaderColumns!: any[];

  constructor(
    private merchantUserService: MerchantService,
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
      this.loadAllMerchants();
      // this.dataBk = this.allMerchantList;
     // this.chargeRequiredData = CHARGE_REQUIRED_DATA;
     // this.chargeModeData = CHARGE_MODE_DATA;
     this.merchantStatusData = MERCHANT_STATUS_DATA;
     this.loadOptionWithRowDetail();
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
    this.merchantUserService.getAllMerchantUsers().subscribe({
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

  loadOptionWithRowDetail(){
      this.optionsWithRowDetail = {
        checkboxes: false,
        rowDetailTemplate:this.rowDetailTpl
    }
  }

  addNewMerchant() {
    this.bsModalRef = this.modalService.show(MerchantCreateComponent, Object.assign({}, { class: 'gray modal-lg' }));
  }

  removeMerchantData(rowIndex: any) { }

  editMerchantData(row: any) {
    //  this.router.navigate(['/company-dashboard/vehicle-edit', row.id]);
    this.merchant = row;
  }

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
