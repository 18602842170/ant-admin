import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseArrangingComponent } from './course-arranging.component';

describe('CourseArrangingComponent', () => {
  let component: CourseArrangingComponent;
  let fixture: ComponentFixture<CourseArrangingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseArrangingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseArrangingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
