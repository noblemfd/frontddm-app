import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { MerchantService } from 'src/app/feature/admin/services/merchant.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMerchant, IMerchants, IResponse } from 'src/app/feature/admin/models/merchants.model';
import { Observable } from 'rxjs';
import { NgTypeToSearchTemplateDirective } from '@ng-select/ng-select';
declare var $: any;

@Component({
  selector: 'app-merchant-detail',
  templateUrl: './merchant-detail.component.html',
  styleUrls: ['./merchant-detail.component.scss']
})
export class MerchantDetailComponent implements OnInit {
  _id!: number;
  merchantProfile: any;
  merchantId!: number;

  constructor(
    private merchantService: MerchantService,
    private router: Router,
    private toastr: ToastrService,
    private bsModalRef: BsModalRef,
    private route: ActivatedRoute,
    private modalService: BsModalService
    ) { }

  ngOnInit(): void {
    this._id = this.route.snapshot.params['id'];
  }
/*
  loadMerchantProfile(){
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
  */

  onClose(){
    this.bsModalRef.hide();
  }

}
