import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { PAYMENT_FREQUENCY_DATA } from 'src/app/core/enum/paymentfrequency';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { MandateService } from 'src/app/feature/merchant/services/mandate.service';
import { DateComparisonValidator } from 'src/app/shared/validators/date-comparison-validator';
import { IMandate, IMandates, IResponse } from 'src/app/feature/merchant/models/mandates.model';
import { Observable } from 'rxjs';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
declare var $: any;

@Component({
  selector: 'app-mandate-create',
  templateUrl: './mandate-create.component.html',
  styleUrls: ['./mandate-create.component.scss']
})
export class MandateCreateComponent implements OnInit {
  createMandateForm!: FormGroup;
  mandate!: IMandate;
  allMandateList: any[] = [];
  isSubmitted = false;
  isLoading = false;
  paymentFrequencyData!: any[];
  colorTheme = 'theme-red';
  bsConfig!: Partial<BsDatepickerConfig>;
  minStartDate!: Date;
  minEndDate!: Date;

  constructor(
    private fb: FormBuilder,
    private mandateService: MandateService,
    private router: Router,
    private toastr: ToastrService,
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
  ) {
    this.minStartDate = new Date();
    this.minEndDate = new Date();
    this.minStartDate.setDate(this.minStartDate.getDate());
    this.minEndDate.setDate(this.minEndDate.getDate() + 1);
  }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, { dateInputFormat: 'DD-MM-YYYY', showClearButton: true, isAnimated: true, adaptivePosition: true, containerClass: this.colorTheme });
    this.paymentFrequencyData = PAYMENT_FREQUENCY_DATA;
    this.createMandate();
  }

  createMandate() {
    this.createMandateForm = this.fb.group({
      ReferenceNumber: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      DrAccountNumber: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[0-9]*$')]],
      StartDate: ['', [Validators.required, DateComparisonValidator('EndDate')]],
      EndDate: ['', [Validators.required]],
      PaymentFrequency: ['', [Validators.required]],
      Amount: ['', [Validators.required, RxwebValidators.numeric({ allowDecimal: true, isFormat: true })]]
    });
  }

  createValidate() {
    if (!this.createMandateForm.valid) {
      this.createMandateForm.markAllAsTouched();
      return;
    }
  }

  get fc() {
    return this.createMandateForm.controls;
  };

  onMandateSubmitForm() {
    this.isSubmitted = true;
    // stop here if form is invalid
    if (this.createMandateForm.invalid) {
      return;
    }
    this.isLoading = true;

    const formData = this.createMandateForm.value;
   // formData.MobileNumber = formData.MobileNumber.e164Number;
    formData.StartDate = (new Date(formData.StartDate)).toUTCString();
    formData.EndDate = (new Date(formData.EndDate)).toUTCString();

    this.mandateService.createMandate(formData).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
        this.isLoading = false;
        this.onClose();
        window.location.reload();
      //  this.loadAllMandates();
       // this.router.navigate([this.router.url]);
       // this.router.navigateByUrl('/mandate-dashboard/mandate-list');
      },
      error: (error) => {
        this.toastr.error(error.message);
        this.isLoading = false;
      }
    })
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

  onClose() {
    this.bsModalRef.hide();
  }

}
