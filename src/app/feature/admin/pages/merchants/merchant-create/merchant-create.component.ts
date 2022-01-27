import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { WHO_TO_CHARGE_DATA } from 'src/app/core/enum/whotocharge';
import { CHARGE_MODE_DATA } from 'src/app/core/enum/chargemode';
import { CHARGE_REQUIRED_DATA } from 'src/app/core/enum/chargerequired';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { MerchantService } from 'src/app/feature/admin/services/merchant.service';
import { UsernameValidator } from 'src/app/shared/validators/username-validator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pagination, PaginatedResult } from 'src/app/shared/models/pagination';
import { IMerchant, IMerchants, IResponse } from 'src/app/feature/admin/models/merchants.model';
import { Observable } from 'rxjs';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
declare var $: any;

@Component({
  selector: 'app-merchant-create',
  templateUrl: './merchant-create.component.html',
  styleUrls: ['./merchant-create.component.scss']
})
export class MerchantCreateComponent implements OnInit {

  // bsModalRef?: BsModalRef;
  createMerchantForm!: FormGroup;
  allMerchantList: any[] = [];
  merchant!: IMerchant;
  isSubmitted = false;
  isLoading = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  chargeRequiredData!: any[];
  chargeModeData!: any[];
  whoToChargeData!: any[];
  selectedChargeRequired: any;
  selectedChargeMode: any;

  constructor(
    private fb: FormBuilder,
    private merchantService: MerchantService,
    private router: Router,
    private toastr: ToastrService,
    private bsModalRef: BsModalRef,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    // this.isLoading = true;
    this.createMerchant();
    this.chargeRequiredData = CHARGE_REQUIRED_DATA;
    this.chargeModeData = CHARGE_MODE_DATA;
    this.whoToChargeData = WHO_TO_CHARGE_DATA;
   // this.createMerchantForm.get('ChargeRequired').valueChanges
    //.subscribe(value => this.toggleValidity(value));
  }

  createMerchant() {
    this.createMerchantForm = this.fb.group({
      UserName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), UsernameValidator.cannotContainSpace]],
      MerchantName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      AccountNumber: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern('^[0-9]*$')]],
      MobileNumber: ['', [Validators.maxLength(15)]],
      ChargeRequired: ['', [Validators.required]],
      WhoToCharge: [''],
      ChargeMode: [''],
      ChargePercent: ['', RxwebValidators.numeric({ allowDecimal: true, isFormat: true })],
      ChargeValue: ['', RxwebValidators.numeric({ allowDecimal: true, isFormat: true })],
    });
  }

  createValidate() {
    if (!this.createMerchantForm.valid) {
      this.createMerchantForm.markAllAsTouched();
      return;
    }
  }
  get fc() {
    return this.createMerchantForm.controls;
  };

  onMerchantSubmitForm() {
    this.isSubmitted = true;
    // stop here if form is invalid
    if (this.createMerchantForm.invalid) {
      return;
    }
    this.isLoading = true;

    const formData = this.createMerchantForm.value;
    formData.MobileNumber = formData.MobileNumber.e164Number;

    this.merchantService.createMerchant(formData).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
        this.isLoading = false;
        this.onClose();
        window.location.reload();
       // this.loadAllMerchants();
       // this.router.navigateByUrl('/admin-dashboard/merchant-list');
      },
      error: (error) => {
        this.toastr.error(error.message);
        this.isLoading = false;
      }
    })
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

  onClose() {
    this.bsModalRef.hide();
  }

  toggleValidity(selectedChargeRequired: string): void {
    if (selectedChargeRequired === '1') {
      const chargeModeCntrl = this.createMerchantForm.get('ChargeMode');
      chargeModeCntrl?.setValidators(Validators.required);
      chargeModeCntrl?.updateValueAndValidity();
    }
    else {
      this.createMerchantForm.controls["ChargeMode"].setErrors(null);
      this.createMerchantForm.controls["ChargeMode"].clearValidators();
      this.createMerchantForm.controls["ChargeMode"].updateValueAndValidity();
    }
  }
}
