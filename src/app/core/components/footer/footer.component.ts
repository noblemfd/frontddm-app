import { Component, OnInit } from '@angular/core';
//import { DateTime } from 'luxon';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
 // public currentYear: string = DateTime.now().toFormat('y');

  constructor() { }

  ngOnInit(): void {
  }

}
