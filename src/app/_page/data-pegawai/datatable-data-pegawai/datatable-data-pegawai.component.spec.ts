import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableDataPegawaiComponent } from './datatable-data-pegawai.component';

describe('DatatableDataPegawaiComponent', () => {
  let component: DatatableDataPegawaiComponent;
  let fixture: ComponentFixture<DatatableDataPegawaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableDataPegawaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableDataPegawaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
