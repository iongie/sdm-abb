import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableRkpComponent } from './datatable-rkp.component';

describe('DatatableRkpComponent', () => {
  let component: DatatableRkpComponent;
  let fixture: ComponentFixture<DatatableRkpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableRkpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableRkpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
