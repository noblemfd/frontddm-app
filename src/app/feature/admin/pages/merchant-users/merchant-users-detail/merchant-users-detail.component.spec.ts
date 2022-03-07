import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantUsersDetailComponent } from './merchant-users-detail.component';

describe('MerchantUsersDetailComponent', () => {
  let component: MerchantUsersDetailComponent;
  let fixture: ComponentFixture<MerchantUsersDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantUsersDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantUsersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
