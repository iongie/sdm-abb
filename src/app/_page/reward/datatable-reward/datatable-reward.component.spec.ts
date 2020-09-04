import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableRewardComponent } from './datatable-reward.component';

describe('DatatableRewardComponent', () => {
  let component: DatatableRewardComponent;
  let fixture: ComponentFixture<DatatableRewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableRewardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
