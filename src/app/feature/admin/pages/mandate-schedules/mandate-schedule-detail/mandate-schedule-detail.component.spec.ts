import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandateScheduleDetailComponent } from './mandate-schedule-detail.component';

describe('MandateScheduleDetailComponent', () => {
  let component: MandateScheduleDetailComponent;
  let fixture: ComponentFixture<MandateScheduleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandateScheduleDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandateScheduleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
