import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisYearMandateComponent } from './this-year-mandate.component';

describe('ThisYearMandateComponent', () => {
  let component: ThisYearMandateComponent;
  let fixture: ComponentFixture<ThisYearMandateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThisYearMandateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisYearMandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
