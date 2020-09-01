import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLokerComponent } from './edit-loker.component';

describe('EditLokerComponent', () => {
  let component: EditLokerComponent;
  let fixture: ComponentFixture<EditLokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
