import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merchant-dashboard',
  templateUrl: './merchant-dashboard.component.html',
  styleUrls: ['./merchant-dashboard.component.scss']
})
export class MerchantDashboardComponent implements OnInit {

  pageTitle = 'Dashboard';
  pageLabel = 'Dashboard Overview';

  constructor() { }

  ngOnInit(): void {
  }

}
