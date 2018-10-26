import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeEditComponent } from './grade-edit.component';

describe('GradeEditComponent', () => {
  let component: GradeEditComponent;
  let fixture: ComponentFixture<GradeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
