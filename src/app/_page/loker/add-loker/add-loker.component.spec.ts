import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLokerComponent } from './add-loker.component';

describe('AddLokerComponent', () => {
  let component: AddLokerComponent;
  let fixture: ComponentFixture<AddLokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
