import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableReimbursementComponent } from './datatable-reimbursement.component';

describe('DatatableReimbursementComponent', () => {
  let component: DatatableReimbursementComponent;
  let fixture: ComponentFixture<DatatableReimbursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableReimbursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableReimbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
