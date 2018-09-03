import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSingleComponent } from './users-single.component';

describe('UsersSingleComponent', () => {
  let component: UsersSingleComponent;
  let fixture: ComponentFixture<UsersSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
