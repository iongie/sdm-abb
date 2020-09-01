import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKontrakKerjaComponent } from './add-kontrak-kerja.component';

describe('AddKontrakKerjaComponent', () => {
  let component: AddKontrakKerjaComponent;
  let fixture: ComponentFixture<AddKontrakKerjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKontrakKerjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKontrakKerjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
