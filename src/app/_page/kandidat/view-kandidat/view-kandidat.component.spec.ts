import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewKandidatComponent } from './view-kandidat.component';

describe('ViewKandidatComponent', () => {
  let component: ViewKandidatComponent;
  let fixture: ComponentFixture<ViewKandidatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewKandidatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewKandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
