import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKandidatComponent } from './edit-kandidat.component';

describe('EditKandidatComponent', () => {
  let component: EditKandidatComponent;
  let fixture: ComponentFixture<EditKandidatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditKandidatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
