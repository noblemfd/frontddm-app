import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDashboardMandateComponent } from './create-dashboard-mandate.component';

describe('CreateDashboardMandateComponent', () => {
  let component: CreateDashboardMandateComponent;
  let fixture: ComponentFixture<CreateDashboardMandateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDashboardMandateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDashboardMandateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
