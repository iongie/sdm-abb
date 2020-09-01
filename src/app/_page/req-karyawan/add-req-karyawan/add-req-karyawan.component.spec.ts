import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReqKaryawanComponent } from './add-req-karyawan.component';

describe('AddReqKaryawanComponent', () => {
  let component: AddReqKaryawanComponent;
  let fixture: ComponentFixture<AddReqKaryawanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReqKaryawanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReqKaryawanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
