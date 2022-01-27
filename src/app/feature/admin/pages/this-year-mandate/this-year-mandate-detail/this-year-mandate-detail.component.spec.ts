import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisYearMandateDetailComponent } from './this-year-mandate-detail.component';

describe('ThisYearMandateDetailComponent', () => {
  let component: ThisYearMandateDetailComponent;
  let fixture: ComponentFixture<ThisYearMandateDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThisYearMandateDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisYearMandateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
