import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandateSchedulesComponent } from './mandate-schedules.component';

describe('MandateSchedulesComponent', () => {
  let component: MandateSchedulesComponent;
  let fixture: ComponentFixture<MandateSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandateSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandateSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
