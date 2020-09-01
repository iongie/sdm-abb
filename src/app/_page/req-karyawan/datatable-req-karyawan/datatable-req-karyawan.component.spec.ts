import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableReqKaryawanComponent } from './datatable-req-karyawan.component';

describe('DatatableReqKaryawanComponent', () => {
  let component: DatatableReqKaryawanComponent;
  let fixture: ComponentFixture<DatatableReqKaryawanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableReqKaryawanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableReqKaryawanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
