import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesubjectListComponent } from './coursesubject-list.component';

describe('CourseListComponent', () => {
  let component: CoursesubjectListComponent;
  let fixture: ComponentFixture<CoursesubjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesubjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesubjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
