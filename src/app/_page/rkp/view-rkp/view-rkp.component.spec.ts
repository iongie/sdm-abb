import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRkpComponent } from './view-rkp.component';

describe('ViewRkpComponent', () => {
  let component: ViewRkpComponent;
  let fixture: ComponentFixture<ViewRkpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRkpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRkpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
