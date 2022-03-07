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
  selector: 'app-merchant-user-create',
  templateUrl: './merchant-user-create.component.html',
  styleUrls: ['./merchant-user-create.component.scss']
})
export class MerchantUserCreateComponent implements OnInit {

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
  }

  onClose() {
    this.bsModalRef.hide();
  }
}
