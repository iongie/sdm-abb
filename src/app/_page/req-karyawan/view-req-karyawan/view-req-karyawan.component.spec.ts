import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReqKaryawanComponent } from './view-req-karyawan.component';

describe('ViewReqKaryawanComponent', () => {
  let component: ViewReqKaryawanComponent;
  let fixture: ComponentFixture<ViewReqKaryawanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReqKaryawanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReqKaryawanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
