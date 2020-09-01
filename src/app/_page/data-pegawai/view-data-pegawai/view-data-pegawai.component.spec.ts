import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDataPegawaiComponent } from './view-data-pegawai.component';

describe('ViewDataPegawaiComponent', () => {
  let component: ViewDataPegawaiComponent;
  let fixture: ComponentFixture<ViewDataPegawaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDataPegawaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDataPegawaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
