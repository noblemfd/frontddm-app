import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  pageTitle = 'Admin Dashboard';
  pageLabel = 'Dashboard Overview';
  constructor() { }

  ngOnInit(): void {
  }

}
