import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPunismentComponent } from './add-punisment.component';

describe('AddPunismentComponent', () => {
  let component: AddPunismentComponent;
  let fixture: ComponentFixture<AddPunismentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPunismentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPunismentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
