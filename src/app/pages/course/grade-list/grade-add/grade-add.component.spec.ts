import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeAddComponent } from './grade-add.component';

describe('GradeAddComponent', () => {
  let component: GradeAddComponent;
  let fixture: ComponentFixture<GradeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
