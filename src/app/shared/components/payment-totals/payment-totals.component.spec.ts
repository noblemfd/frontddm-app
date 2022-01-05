import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTotalsComponent } from './payment-totals.component';

describe('PaymentTotalsComponent', () => {
  let component: PaymentTotalsComponent;
  let fixture: ComponentFixture<PaymentTotalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentTotalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
