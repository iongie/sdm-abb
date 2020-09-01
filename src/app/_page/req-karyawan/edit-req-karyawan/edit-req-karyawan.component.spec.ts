import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReqKaryawanComponent } from './edit-req-karyawan.component';

describe('EditReqKaryawanComponent', () => {
  let component: EditReqKaryawanComponent;
  let fixture: ComponentFixture<EditReqKaryawanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReqKaryawanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReqKaryawanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
