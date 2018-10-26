import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrangingDetailComponent } from './arranging-detail.component';

describe('ArrangingDetailComponent', () => {
  let component: ArrangingDetailComponent;
  let fixture: ComponentFixture<ArrangingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrangingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrangingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
