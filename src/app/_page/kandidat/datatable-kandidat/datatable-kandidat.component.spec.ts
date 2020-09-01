import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableKandidatComponent } from './datatable-kandidat.component';

describe('DatatableKandidatComponent', () => {
  let component: DatatableKandidatComponent;
  let fixture: ComponentFixture<DatatableKandidatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableKandidatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableKandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
