import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRkpComponent } from './edit-rkp.component';

describe('EditRkpComponent', () => {
  let component: EditRkpComponent;
  let fixture: ComponentFixture<EditRkpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRkpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRkpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
