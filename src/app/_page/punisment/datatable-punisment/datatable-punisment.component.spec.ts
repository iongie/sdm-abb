import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatablePunismentComponent } from './datatable-punisment.component';

describe('DatatablePunismentComponent', () => {
  let component: DatatablePunismentComponent;
  let fixture: ComponentFixture<DatatablePunismentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatablePunismentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatablePunismentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
