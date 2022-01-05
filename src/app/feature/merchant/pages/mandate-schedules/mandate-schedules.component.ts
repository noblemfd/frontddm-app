import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mandate-schedules',
  templateUrl: './mandate-schedules.component.html',
  styleUrls: ['./mandate-schedules.component.scss']
})
export class MandateSchedulesComponent implements OnInit {

  pageTitle = 'Mandate Schedules';
  pageLabel = 'Mandate Schedule List';

  constructor() { }

  ngOnInit(): void {
  }

}
