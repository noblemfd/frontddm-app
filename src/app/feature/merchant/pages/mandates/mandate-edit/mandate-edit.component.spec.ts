import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandateEditComponent } from './mandate-edit.component';

describe('MandateEditComponent', () => {
  let component: MandateEditComponent;
  let fixture: ComponentFixture<MandateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
