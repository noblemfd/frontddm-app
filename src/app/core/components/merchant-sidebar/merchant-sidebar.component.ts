import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merchant-sidebar',
  templateUrl: './merchant-sidebar.component.html',
  styleUrls: ['./merchant-sidebar.component.scss']
})
export class MerchantSidebarComponent implements OnInit {
  userName = localStorage.getItem('username');

  constructor() { }

  ngOnInit(): void {
  }

  getUserName() {
    return this.userName;
  }
}
