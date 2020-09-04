import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPunismentComponent } from './view-punisment.component';

describe('ViewPunismentComponent', () => {
  let component: ViewPunismentComponent;
  let fixture: ComponentFixture<ViewPunismentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPunismentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPunismentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
