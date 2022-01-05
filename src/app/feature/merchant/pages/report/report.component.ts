import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  pageTitle = 'Reports';
  pageLabel = 'Report and Analytics';

  constructor() { }

  ngOnInit(): void {
  }

}
