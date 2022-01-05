import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandateByCustomerComponent } from './mandate-by-customer.component';

describe('MandateByCustomerComponent', () => {
  let component: MandateByCustomerComponent;
  let fixture: ComponentFixture<MandateByCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandateByCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandateByCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
