import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsSingleComponent } from './units-single.component';

describe('UnitsSingleComponent', () => {
  let component: UnitsSingleComponent;
  let fixture: ComponentFixture<UnitsSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitsSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
