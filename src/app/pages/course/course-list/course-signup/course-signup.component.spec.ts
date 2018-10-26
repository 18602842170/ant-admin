import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSignupComponent } from './course-signup.component';

describe('CourseSignupComponent', () => {
  let component: CourseSignupComponent;
  let fixture: ComponentFixture<CourseSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
