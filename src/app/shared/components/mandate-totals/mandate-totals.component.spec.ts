import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandateTotalsComponent } from './mandate-totals.component';

describe('MandateTotalsComponent', () => {
  let component: MandateTotalsComponent;
  let fixture: ComponentFixture<MandateTotalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandateTotalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandateTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
