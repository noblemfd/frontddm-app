import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { ProfileService } from 'src/app/feature/merchant/services/profile.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMerchant, IMerchants, IResponse } from 'src/app/feature/admin/models/merchants.model';
import { Observable } from 'rxjs';
import { NgTypeToSearchTemplateDirective } from '@ng-select/ng-select';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  pageTitle = 'Profile';
  pageLabel = 'Profile';
  profile: any;
  isLoading = false;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadMerchantProfile();
  }

  loadMerchantProfile(){
    this.profileService.getProfileDetails().subscribe({
      next: (res: any) => {
        this.profile = res;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error(error.message);
        this.isLoading = false;
      }
    })
  }

}
