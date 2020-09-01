import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKandidatComponent } from './add-kandidat.component';

describe('AddKandidatComponent', () => {
  let component: AddKandidatComponent;
  let fixture: ComponentFixture<AddKandidatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKandidatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
