import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mandates',
  templateUrl: './mandates.component.html',
  styleUrls: ['./mandates.component.scss']
})
export class MandatesComponent implements OnInit {

  pageTitle = 'Mandates';
  pageLabel = 'Mandate List';

  constructor() { }

  ngOnInit(): void {
  }

}
