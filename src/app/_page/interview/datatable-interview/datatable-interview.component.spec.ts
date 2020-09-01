import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableInterviewComponent } from './datatable-interview.component';

describe('DatatableInterviewComponent', () => {
  let component: DatatableInterviewComponent;
  let fixture: ComponentFixture<DatatableInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
