import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableLokerComponent } from './datatable-loker.component';

describe('DatatableLokerComponent', () => {
  let component: DatatableLokerComponent;
  let fixture: ComponentFixture<DatatableLokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableLokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableLokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
