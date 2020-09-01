import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableKontrakKerjaComponent } from './datatable-kontrak-kerja.component';

describe('DatatableKontrakKerjaComponent', () => {
  let component: DatatableKontrakKerjaComponent;
  let fixture: ComponentFixture<DatatableKontrakKerjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableKontrakKerjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableKontrakKerjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
