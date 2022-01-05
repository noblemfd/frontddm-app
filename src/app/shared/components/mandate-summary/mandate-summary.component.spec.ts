import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandateSummaryComponent } from './mandate-summary.component';

describe('MandateSummaryComponent', () => {
  let component: MandateSummaryComponent;
  let fixture: ComponentFixture<MandateSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandateSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandateSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
