import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HasilInterviewComponent } from './hasil-interview.component';

describe('HasilInterviewComponent', () => {
  let component: HasilInterviewComponent;
  let fixture: ComponentFixture<HasilInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HasilInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HasilInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
