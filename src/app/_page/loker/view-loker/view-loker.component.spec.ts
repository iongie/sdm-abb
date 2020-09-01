import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLokerComponent } from './view-loker.component';

describe('ViewLokerComponent', () => {
  let component: ViewLokerComponent;
  let fixture: ComponentFixture<ViewLokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
