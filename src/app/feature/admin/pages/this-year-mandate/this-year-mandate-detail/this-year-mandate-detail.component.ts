import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { MandateService } from 'src/app/feature/admin/services/mandate.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMandate, IMandates, IResponse } from 'src/app/feature/admin/models/mandates.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-this-year-mandate-detail',
  templateUrl: './this-year-mandate-detail.component.html',
  styleUrls: ['./this-year-mandate-detail.component.scss']
})
export class ThisYearMandateDetailComponent implements OnInit {

  pageTitle = 'This Year Mandate Detail';
  pageLabel = 'This Year Mandate Detail';
  mandate!: any;
  isLoading = false;
  isSubmitted = false;
  data1: any;
  _id!: number;

  constructor(
    private route: ActivatedRoute,
    private mandateService: MandateService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this._id = this.route.snapshot.params['id'];
    this.loadAllMandateById();
  }

  loadAllMandateById(){
    this.mandateService.getMandateById(this._id).subscribe({
      next: (res: any) => {
        this.mandate = res.result;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error(error.message);
        this.isLoading = false;
      }
    })
  }

}
