import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRkpComponent } from './add-rkp.component';

describe('AddRkpComponent', () => {
  let component: AddRkpComponent;
  let fixture: ComponentFixture<AddRkpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRkpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRkpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
