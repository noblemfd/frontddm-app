import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantUserCreateComponent } from './merchant-user-create.component';

describe('MerchantUserCreateComponent', () => {
  let component: MerchantUserCreateComponent;
  let fixture: ComponentFixture<MerchantUserCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantUserCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantUserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
