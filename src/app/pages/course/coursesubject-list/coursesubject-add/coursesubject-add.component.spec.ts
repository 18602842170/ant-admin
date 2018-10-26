import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesubjectAddComponent } from './coursesubject-add.component';

describe('CourseAddComponent', () => {
  let component: CoursesubjectAddComponent;
  let fixture: ComponentFixture<CoursesubjectAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesubjectAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesubjectAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
